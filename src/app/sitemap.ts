import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://msspsuhatyai.org'

  // Define static routes
  const routes = [
    '',
    '/about',
    '/contents',
    '/activities',
    '/prayer-times',
    '/articles',
    '/contact',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
