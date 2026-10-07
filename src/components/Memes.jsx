import { useEffect, useState } from 'react'

// Meme formats for MDX posts. Everything here is original: the GIFs in
// public/memes/ are drawn from flat shapes and system emoji, the rest is CSS,
// so there is nothing third-party to license. Styles live under `.mfx*` in
// index.css (a separate prefix from the site's older `.meme` SVG figures).
// Emoji are decorative (aria-hidden); the readable text is real DOM text.

function Frame({ kind, label, caption, children }) {
  return (
    <figure className={`mfx mfx-${kind}`} role="group" aria-label={label}>
      {children}
      {caption && <figcaption className="mfx-caption">{caption}</figcaption>}
    </figure>
  )
}

function usePrefersReducedMotion() {
  const query = '(prefers-reduced-motion: reduce)'
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && !!window.matchMedia && window.matchMedia(query).matches,
  )
  useEffect(() => {
    if (!window.matchMedia) return undefined
    const mq = window.matchMedia(query)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return reduced
}

// Animated meme. public/memes/<name>.gif plus <name>.png, a still of the
// punchline frame that readers who prefer reduced motion get instead.
export function Gif({ name, alt, caption }) {
  const reduced = usePrefersReducedMotion()
  return (
    <Frame kind="gif" label={alt} caption={caption}>
      <img
        className="mfx-gif-img"
        src={`/memes/${name}.${reduced ? 'png' : 'gif'}`}
        alt={alt}
        width="560"
        height="315"
        loading="lazy"
        decoding="async"
      />
    </Frame>
  )
}

// Real-world case study card: headline numbers, the result, the takeaway and
// a source link.
export function CaseStudy({ label = 'Real-world case', title, stats, winner, takeaway, source }) {
  // `source` is one { text, href } or an array of them.
  const sources = source ? [].concat(source) : []
  return (
    <aside className="mfx-case" aria-label={`${label}: ${title}`}>
      <span className="mfx-case-label">{label}</span>
      <h3 className="mfx-case-title">{title}</h3>
      {stats && (
        <dl className="mfx-case-stats">
          {stats.map(({ value, label: statLabel }) => (
            <div className="mfx-case-stat" key={statLabel}>
              <dt>{statLabel}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}
      {winner && <div className="mfx-case-winner"><span aria-hidden="true">🏆</span> {winner}</div>}
      {takeaway && <div className="mfx-case-takeaway">{takeaway}</div>}
      {sources.length > 0 && (
        <div className="mfx-case-source">
          {sources.length > 1 ? 'Sources:' : 'Source:'}
          {sources.map((s) => (
            <div key={s.href}>
              <a href={s.href} target="_blank" rel="noopener noreferrer">
                {s.text}
              </a>
            </div>
          ))}
        </div>
      )}
    </aside>
  )
}

// Three-friend dialogue told as chat bubbles. The author (sriku) sits on the
// right; the other two on the left. lines: [{ who: 'cherry' | 'sundu' | 'sriku', text }]
const SPEAKERS = {
  cherry: { name: 'Cherry', initial: 'Ch' },
  sundu: { name: 'Sundu', initial: 'Su' },
  sriku: { name: 'Sriku', initial: 'Sr' },
}
export function Convo({ lines }) {
  return (
    <div className="mfx-convo">
      {lines.map(({ who, text }, i) => (
        <div className="mfx-convo-row" data-who={who} key={i}>
          <span className="mfx-convo-avatar" aria-hidden="true">{SPEAKERS[who].initial}</span>
          <div className="mfx-convo-bubble">
            <span className="mfx-convo-name">{SPEAKERS[who].name}</span>
            <span>{text}</span>
          </div>
        </div>
      ))}
    </div>
  )
}

// Classic image macro: a big emoji scene with top and bottom text.
export function Meme({ top, bottom, emoji, tone = 'sunset', caption }) {
  return (
    <Frame kind="macro" label={[top, bottom].filter(Boolean).join(' — ')} caption={caption}>
      <div className="mfx-stage" data-tone={tone}>
        {top && <p className="mfx-text mfx-text-top">{top}</p>}
        <span className="mfx-emoji" aria-hidden="true">{emoji}</span>
        {bottom && <p className="mfx-text mfx-text-bottom">{bottom}</p>}
      </div>
    </Frame>
  )
}

// Two-row "reject this, approve that" format.
export function Approve({ no, yes, noIcon = '🙅', yesIcon = '😎', caption }) {
  return (
    <Frame kind="approve" label={`Not this: ${no}. This: ${yes}`} caption={caption}>
      <div className="mfx-approve-row" data-verdict="no">
        <span className="mfx-approve-icon" aria-hidden="true">{noIcon}</span>
        <p>{no}</p>
      </div>
      <div className="mfx-approve-row" data-verdict="yes">
        <span className="mfx-approve-icon" aria-hidden="true">{yesIcon}</span>
        <p>{yes}</p>
      </div>
    </Frame>
  )
}

// Bollywood-style poster card.
export function Poster({ title, tagline, rating, stats, badge, tone = 'saffron', caption }) {
  return (
    <Frame kind="poster" label={`Movie poster: ${title}. ${tagline}`} caption={caption}>
      <div className="mfx-poster-card" data-tone={tone}>
        {badge && <span className="mfx-poster-badge">{badge}</span>}
        <h3 className="mfx-poster-title">{title}</h3>
        {tagline && <p className="mfx-poster-tagline">{tagline}</p>}
        {rating && (
          <p className="mfx-poster-rating">
            <span aria-hidden="true">★</span> {rating}
          </p>
        )}
        {stats && (
          <ul className="mfx-poster-stats">
            {stats.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        )}
      </div>
    </Frame>
  )
}

// WhatsApp-style chat. messages: [{ from, text, me }]
export function Chat({ title, messages, caption }) {
  return (
    <Frame kind="chat" label={`Group chat: ${title}`} caption={caption}>
      <div className="mfx-chat-head">
        <span className="mfx-chat-avatar" aria-hidden="true">👥</span>
        <span>{title}</span>
      </div>
      <div className="mfx-chat-body">
        {messages.map((m, i) => (
          <div className="mfx-chat-bubble" data-me={m.me ? 'true' : 'false'} key={i}>
            {!m.me && m.from && <span className="mfx-chat-from">{m.from}</span>}
            <span>{m.text}</span>
            <span className="mfx-chat-tick" aria-hidden="true">{m.me ? '✓✓' : ''}</span>
          </div>
        ))}
      </div>
    </Frame>
  )
}

// Tap-to-react row. Local state only — nothing is stored or sent anywhere.
const REACTIONS = [
  { icon: '😂', label: 'Laughed' },
  { icon: '🤯', label: 'Mind blown' },
  { icon: '☕', label: 'Another chai' },
  { icon: '🎬', label: 'Blockbuster' },
]
export function Reactions({ prompt = 'How did that land?' }) {
  const [counts, setCounts] = useState({})
  return (
    <div className="mfx-reactions">
      <p className="mfx-reactions-prompt">{prompt}</p>
      <div className="mfx-reactions-row">
        {REACTIONS.map(({ icon, label }) => (
          <button
            type="button"
            className="mfx-reaction"
            aria-label={`${label}${counts[icon] ? `, ${counts[icon]} taps` : ''}`}
            onClick={() => setCounts((c) => ({ ...c, [icon]: (c[icon] || 0) + 1 }))}
            key={icon}
          >
            <span aria-hidden="true">{icon}</span>
            {counts[icon] > 0 && <span className="mfx-reaction-count">{counts[icon]}</span>}
          </button>
        ))}
      </div>
    </div>
  )
}
