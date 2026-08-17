import { MetadataRoute } from 'next'
import { API_URL } from '@/config'

const baseUrl = 'https://msspsuhatyai.org'

// Regenerate the sitemap hourly so new activities/blogs get discovered.
export const revalidate = 3600

type ActivityListItem = { _id: string; slug?: string; updatedAt?: string }
type BlogListItem = { _id: string; slug: string; createdAt?: string }
type PrayerRoomListItem = { _id: string; updatedAt?: string }

async function getActivities(): Promise<ActivityListItem[]> {
  try {
    const res = await fetch(`${API_URL}/activities`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    const list = json?.data?.data ?? json?.data ?? []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

async function getBlogs(): Promise<BlogListItem[]> {
  try {
    // Fetch a large limit for sitemap
    const res = await fetch(`${API_URL}/blog/preview?limit=1000`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    const list = json?.data?.data ?? json?.data ?? []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

async function getPrayerRooms(): Promise<PrayerRoomListItem[]> {
  try {
    const res = await fetch(`${API_URL}/prayer-rooms`, { next: { revalidate: 3600 } })
    if (!res.ok) return []
    const json = await res.json()
    const list = json?.data?.data ?? json?.data ?? []
    return Array.isArray(list) ? list : []
  } catch {
    return []
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/activities`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/prayer-rooms`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/news`, lastModified: now, changeFrequency: 'daily', priority: 0.7 },
    { url: `${baseUrl}/contents`, lastModified: now, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]

  const [activities, blogs, prayerRooms] = await Promise.all([
    getActivities(),
    getBlogs(),
    getPrayerRooms()
  ]);

  const activityPages: MetadataRoute.Sitemap = activities.map((a) => ({
    url: `${baseUrl}/activities/${a.slug || a._id}`,
    lastModified: a.updatedAt ? new Date(a.updatedAt) : now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const blogPages: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: `${baseUrl}/contents/${b.slug || b._id}`,
    lastModified: b.createdAt ? new Date(b.createdAt) : now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  const prayerRoomPages: MetadataRoute.Sitemap = prayerRooms.map((p) => ({
    url: `${baseUrl}/prayer-rooms/${p._id}`,
    lastModified: p.updatedAt ? new Date(p.updatedAt) : now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...activityPages, ...blogPages, ...prayerRoomPages]
}
