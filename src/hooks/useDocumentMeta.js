import { useEffect } from 'react'

const SITE_NAME = 'Bollampally, Srikanth Reddy'
const DEFAULT_DESCRIPTION =
  'Full-Stack Developer, DevSecOps Leader, and AI/ML Specialist with 12+ years building cloud infrastructure and production ML systems.'

export function useDocumentMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  noindex = false,
} = {}) {
  useEffect(() => {
    const fullTitle = title ? `${title} — ${SITE_NAME}` : `${SITE_NAME} — Full-Stack · DevSecOps · AI/ML`
    document.title = fullTitle

    const setMeta = (selector, attr, value) => {
      const el = document.head.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    setMeta('meta[name="description"]', 'content', description)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', description)
    setMeta('meta[name="twitter:title"]', 'content', fullTitle)
    setMeta('meta[name="twitter:description"]', 'content', description)
    setMeta('meta[name="robots"]', 'content', noindex ? 'noindex, nofollow' : 'index, follow')

    return () => setMeta('meta[name="robots"]', 'content', 'index, follow')
  }, [title, description, noindex])
}
