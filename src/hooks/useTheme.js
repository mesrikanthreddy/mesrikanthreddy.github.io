import { useCallback, useEffect, useState } from 'react'

// Versioned key: an older saved "theme" value is deliberately ignored so the
// default is always light until the visitor picks something on this version.
const STORAGE_KEY = 'theme-v2'
const THEMES = ['light', 'system', 'dark']
const DEFAULT_THEME = 'light'
const THEME_COLOR = { light: '#ffffff', dark: '#14161a' }

// Storage can throw (private mode, blocked site data). Never let that break the app.
function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY)
    return THEMES.includes(value) ? value : DEFAULT_THEME
  } catch {
    return DEFAULT_THEME
  }
}

function writeStored(theme) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme)
  } catch {
    // ignore: the theme still applies for this visit
  }
}

function resolveSystemTheme() {
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function applyTheme(theme) {
  const resolved = theme === 'system' ? resolveSystemTheme() : theme
  const final = resolved === 'dark' ? 'dark' : 'light'
  document.documentElement.setAttribute('data-theme', final)
  const meta = document.querySelector('meta[name="theme-color"]')
  if (meta) meta.setAttribute('content', THEME_COLOR[final])
}

export function useTheme() {
  const [theme, setThemeState] = useState(readStored)

  useEffect(() => {
    applyTheme(theme)
    writeStored(theme)

    if (theme !== 'system') return undefined

    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => applyTheme('system')
    mql.addEventListener('change', onChange)
    return () => mql.removeEventListener('change', onChange)
  }, [theme])

  const setTheme = useCallback((next) => {
    if (!THEMES.includes(next)) return
    setThemeState(next)
  }, [])

  return { theme, setTheme, themes: THEMES }
}
