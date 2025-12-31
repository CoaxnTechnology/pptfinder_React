const BASE = process.env.REACT_APP_API_BASE || 'http://localhost:8000'

export async function getFeaturedTemplates() {
  const res = await fetch(`${BASE}/templates/featured`)
  if (!res.ok) throw new Error('Failed to load')
  return res.json()
}

export async function searchTemplates(q, page=1) {
  const res = await fetch(`${BASE}/templates/search?q=${encodeURIComponent(q)}&page=${page}`)
  if (!res.ok) throw new Error('Search failed')
  return res.json()
}

export async function getCategories() {
  const res = await fetch(`${BASE}/categories`)
  if (!res.ok) throw new Error('Failed to load categories')
  return res.json()
}

export async function uploadTemplate(formData, token) {
  const res = await fetch(`${BASE}/templates/upload`, {
    method: 'POST',
    headers: token ? { 'Authorization': `Bearer ${token}` } : {},
    body: formData
  })
  if (!res.ok) throw new Error('Upload failed')
  return res.json()
}
