import { SiteSettings, PublicSiteSettings } from '@/types';
import { initialSiteSettings } from '@/lib/seedData';
import { validatePaymentSettings } from '../../validation/schemas';
import {
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';
import { isMySQLConfigured, queryOne, execute } from '../mysql';

function hydrateSettings(v: any): SiteSettings {
  if (!v) return initialSiteSettings;
  return {
    ...initialSiteSettings,
    ...v,
    brandName: v.brandName || v.studioName || initialSiteSettings.brandName,
    brandSubtitle: v.brandSubtitle || initialSiteSettings.brandSubtitle,
    logoUrl: v.logoUrl || v.logo || initialSiteSettings.logoUrl || '/logo.png',
    tagline: v.tagline || initialSiteSettings.tagline,
    architectName: v.architectName || initialSiteSettings.architectName,
    establishedYear: v.establishedYear || initialSiteSettings.establishedYear,
    googleRating: v.googleRating || initialSiteSettings.googleRating,
    contactEmail: v.contactEmail || v.supportEmail || initialSiteSettings.contactEmail,
    contactPhone: v.contactPhone || v.supportPhone || initialSiteSettings.contactPhone,
    whatsappNumber: v.whatsappNumber || initialSiteSettings.whatsappNumber,
    businessHours: v.businessHours || initialSiteSettings.businessHours,
    studioAddress: v.studioAddress || initialSiteSettings.studioAddress,
    city: v.city || initialSiteSettings.city,
    state: v.state || initialSiteSettings.state,
    country: v.country || initialSiteSettings.country,
    pincode: v.pincode || initialSiteSettings.pincode,
    currency: v.currency || initialSiteSettings.currency,
    currencySymbol: v.currencySymbol || initialSiteSettings.currencySymbol,
    taxRatePercent: Number(v.taxRatePercent !== undefined ? v.taxRatePercent : initialSiteSettings.taxRatePercent),
    freeShippingThreshold: Number(
      v.freeShippingThreshold !== undefined ? v.freeShippingThreshold : initialSiteSettings.freeShippingThreshold
    ),
    standardShippingFee: Number(
      v.standardShippingFee !== undefined ? v.standardShippingFee : initialSiteSettings.standardShippingFee
    ),
    gstinNumber: v.gstinNumber || initialSiteSettings.gstinNumber,
    minOrderValue: Number(v.minOrderValue !== undefined ? v.minOrderValue : initialSiteSettings.minOrderValue),
    socialInstagram: v.socialInstagram || initialSiteSettings.socialInstagram,
    socialPinterest: v.socialPinterest || initialSiteSettings.socialPinterest,
    socialLinkedin: v.socialLinkedin || initialSiteSettings.socialLinkedin,
    socialFacebook: v.socialFacebook || initialSiteSettings.socialFacebook,
    announcementBanner: {
      enabled:
        v.announcementBanner?.enabled !== undefined
          ? v.announcementBanner.enabled
          : initialSiteSettings.announcementBanner?.enabled ?? true,
      text: v.announcementBanner?.text || initialSiteSettings.announcementBanner?.text || '',
      linkUrl: v.announcementBanner?.linkUrl || initialSiteSettings.announcementBanner?.linkUrl || '/quote',
    },
    homepage: {
      ...initialSiteSettings.homepage,
      ...(v.homepage || {}),
    },
    paymentGateway: {
      ...initialSiteSettings.paymentGateway,
      ...(v.paymentGateway || {}),
    },
    portfolioAnimation: {
      ...initialSiteSettings.portfolioAnimation!,
      ...(v.portfolioAnimation || {}),
    },
    whatsapp: {
      ...initialSiteSettings.whatsapp!,
      ...(v.whatsapp || {}),
    },
  };
}

export async function getSiteSettings(): Promise<SiteSettings> {
  const now = Date.now();
  if (memoryCache.settings && now - memoryCache.settings.timestamp < CACHE_TTL_MS) {
    return memoryCache.settings.data;
  }

  // 1. Hostinger MySQL Primary/Dual Layer
  if (isMySQLConfigured()) {
    try {
      const row = await queryOne<{ raw_json?: any; value?: any }>(
        'SELECT raw_json, value FROM site_settings WHERE id = ? OR `key` = ? LIMIT 1',
        ['global', 'general']
      );
      if (row) {
        let v = row.raw_json || row.value;
        if (typeof v === 'string') {
          try {
            v = JSON.parse(v);
          } catch {
            try {
              v = JSON.parse(v.replace(/\\([^"\\/bfnrtu])/g, '$1'));
            } catch {}
          }
        }
        if (v) {
          const result = hydrateSettings(v);
          memoryCache.settings = { data: result, timestamp: now };
          return result;
        }
      }
    } catch (mysqlErr) {
      console.warn('Hostinger MySQL getSiteSettings failed, falling back:', mysqlErr);
    }
  }

  // 2. Resilient Local Database Cache Layer
  const db = getDb();
  const mergedSettings = hydrateSettings(db.siteSettings);
  memoryCache.settings = { data: mergedSettings, timestamp: now };
  return mergedSettings;
}

/**
 * Returns public-safe site settings DTO.
 * Explicitly excludes internal financial secrets (e.g. gstinNumber).
 */
export async function getPublicSiteSettings(): Promise<PublicSiteSettings> {
  const full = await getSiteSettings();
  return {
    brandName: full.brandName,
    brandSubtitle: full.brandSubtitle,
    logoUrl: full.logoUrl,
    tagline: full.tagline,
    architectName: full.architectName,
    establishedYear: full.establishedYear,
    googleRating: full.googleRating,
    contactEmail: full.contactEmail,
    contactPhone: full.contactPhone,
    whatsappNumber: full.whatsappNumber,
    businessHours: full.businessHours,
    studioAddress: full.studioAddress,
    city: full.city,
    state: full.state,
    country: full.country,
    pincode: full.pincode,
    currency: full.currency,
    currencySymbol: full.currencySymbol,
    socialInstagram: full.socialInstagram,
    socialPinterest: full.socialPinterest,
    socialLinkedin: full.socialLinkedin,
    socialFacebook: full.socialFacebook,
    announcementBanner: full.announcementBanner,
    homepage: full.homepage,
    paymentGateway: full.paymentGateway,
    portfolioAnimation: full.portfolioAnimation,
    whatsapp: full.whatsapp,
    taxRatePercent: full.taxRatePercent,
    freeShippingThreshold: full.freeShippingThreshold,
    standardShippingFee: full.standardShippingFee,
    minOrderValue: full.minOrderValue,
  };
}

function mergeSiteSettings(current: SiteSettings, partial: Partial<SiteSettings>): SiteSettings {
  return {
    ...current,
    ...partial,
    announcementBanner:
      partial.announcementBanner !== undefined
        ? {
            ...(current.announcementBanner || { enabled: true, text: '', linkUrl: '/quote' }),
            ...partial.announcementBanner,
          }
        : current.announcementBanner,
    homepage:
      partial.homepage !== undefined
        ? {
            ...(current.homepage || {}),
            ...partial.homepage,
          }
        : current.homepage,
    paymentGateway:
      partial.paymentGateway !== undefined
        ? {
            ...(current.paymentGateway || {}),
            ...partial.paymentGateway,
          }
        : current.paymentGateway,
    portfolioAnimation:
      partial.portfolioAnimation !== undefined
        ? {
            ...(current.portfolioAnimation || initialSiteSettings.portfolioAnimation!),
            ...partial.portfolioAnimation,
          }
        : current.portfolioAnimation,
    whatsapp:
      partial.whatsapp !== undefined
        ? {
            ...(current.whatsapp || initialSiteSettings.whatsapp!),
            ...partial.whatsapp,
          }
        : current.whatsapp,
  };
}

export async function updateSiteSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
  if (partial.paymentGateway) {
    validatePaymentSettings(partial.paymentGateway);
  }

  const current = await getSiteSettings();
  const merged = mergeSiteSettings(current, partial);
  const jsonStr = JSON.stringify(merged);

  // 1. Persist to Hostinger MySQL (if configured)
  if (isMySQLConfigured()) {
    try {
      await execute(
        `INSERT INTO site_settings (id, brand_name, tagline, contact_email, contact_phone, whatsapp_number, studio_address, raw_json, updated_at)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
         ON DUPLICATE KEY UPDATE
           brand_name = VALUES(brand_name),
           tagline = VALUES(tagline),
           contact_email = VALUES(contact_email),
           contact_phone = VALUES(contact_phone),
           whatsapp_number = VALUES(whatsapp_number),
           studio_address = VALUES(studio_address),
           raw_json = VALUES(raw_json),
           updated_at = NOW()`,
        [
          'global',
          merged.brandName,
          merged.tagline,
          merged.contactEmail,
          merged.contactPhone,
          merged.whatsappNumber || '',
          merged.studioAddress,
          jsonStr,
        ]
      );
      invalidateMemoryCache('settings');
      return merged;
    } catch (mysqlErr: any) {
      console.error('Hostinger MySQL updateSiteSettings error:', mysqlErr);
      throw mysqlErr;
    }
  }

  // 2. Persist to local JSON fallback
  const db = getDb();
  db.siteSettings = merged;
  saveDb(db);

  invalidateMemoryCache('settings');
  return merged;
}
