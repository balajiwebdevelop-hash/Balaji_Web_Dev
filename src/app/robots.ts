import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api/admin/*', '/studio', '/auth/*', '/account'],
      },
    ],
    sitemap: 'https://balaji-atelier.com/sitemap.xml',
  };
}
