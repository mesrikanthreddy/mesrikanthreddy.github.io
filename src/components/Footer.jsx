const SOCIALS = [
  {
    label: 'X',
    href: 'https://x.com/mrbollampally',
    path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
    viewBox: '0 0 24 24',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/bsrikanth-reddy/',
    path: 'M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.97 0-1.75-.79-1.75-1.75s.78-1.75 1.75-1.75 1.75.79 1.75 1.75-.78 1.75-1.75 1.75zm13.5 10.28h-3v-4.5c0-1.07-.02-2.45-1.49-2.45-1.49 0-1.72 1.16-1.72 2.37v4.58h-3v-9h2.88v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v4.74z',
    viewBox: '0 0 24 24',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/mesrikanthreddy',
    path: 'M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8Z',
    viewBox: '0 0 16 16',
  },
]

export default function Footer() {
  return (
    <footer>
      <div className="wrap footer-inner">
        <p className="footer-text">
          Bollampally, Srikanth Reddy — Built end to end, shipped to
          production.
        </p>
        <div className="socials">
          <span className="socials-label">Socials</span>
          <div className="social-row">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                className="social-icon"
                href={s.href}
                target="_blank"
                rel="noopener"
                aria-label={s.label}
              >
                <svg viewBox={s.viewBox} aria-hidden="true">
                  <path d={s.path} fill="currentColor" />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
