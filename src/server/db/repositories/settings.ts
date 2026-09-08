import { SiteSettings, PublicSiteSettings } from '@/types';
import { initialSiteSettings } from '@/lib/seedData';
import { validatePaymentSettings } from '../../validation/schemas';
import {
  isSupabaseConfigured,
  getServiceSupabase,
  memoryCache,
  invalidateMemoryCache,
  CACHE_TTL_MS,
  getDb,
  saveDb,
} from '../client';

export async function getSiteSettings(): Promise<SiteSettings> {
  const now = Date.now();
  if (memoryCache.settings && now - memoryCache.settings.timestamp < CACHE_TTL_MS) {
    return memoryCache.settings.data;
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const { data, error } = await supabase
      .from('site_settings')
      .select('*')
      .eq('key', 'general')
      .maybeSingle();

    if (error) {
      console.error('Supabase getSiteSettings error:', error);
      if (
        process.env.NEXT_PHASE === 'phase-production-build' ||
        error.message?.includes('fetch failed') ||
        error.message?.includes('ENOTFOUND')
      ) {
        console.warn('Supabase unreachable. Falling back to default site settings.');
        const fallbackDb = getDb();
        return {
          ...initialSiteSettings,
          ...(fallbackDb.siteSettings || {}),
          gstinNumber: fallbackDb.siteSettings?.gstinNumber || initialSiteSettings.gstinNumber,
        };
      }
      throw new Error(`Failed to fetch site settings: ${error.message}`);
    }

    let result = initialSiteSettings;
    if (data && data.value) {
      const v = data.value;
      result = {
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
      };
    }
    memoryCache.settings = { data: result, timestamp: now };
    return result;
  }

  const db = getDb();
  const mergedSettings: SiteSettings = {
    ...initialSiteSettings,
    ...(db.siteSettings || {}),
    gstinNumber: db.siteSettings?.gstinNumber || initialSiteSettings.gstinNumber,
  };
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
  };
}

export async function updateSiteSettings(partial: Partial<SiteSettings>): Promise<SiteSettings> {
  if (partial.paymentGateway) {
    validatePaymentSettings(partial.paymentGateway);
  }

  if (isSupabaseConfigured()) {
    const supabase = getServiceSupabase();
    const current = await getSiteSettings();
    const merged = mergeSiteSettings(current, partial);

    const { data, error } = await supabase
      .from('site_settings')
      .upsert(
        {
          key: 'general',
          value: merged,
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'key' }
      )
      .select()
      .single();

    if (error || !data) {
      console.error('Supabase updateSiteSettings error:', error);
      throw new Error(`Failed to save studio settings to database: ${error?.message || 'Database error'}`);
    }

    invalidateMemoryCache('settings');
    return merged;
  }

  const db = getDb();
  const current = await getSiteSettings();
  const merged = mergeSiteSettings(current, partial);
  db.siteSettings = merged;
  saveDb(db);
  invalidateMemoryCache('settings');
  return db.siteSettings;
}
