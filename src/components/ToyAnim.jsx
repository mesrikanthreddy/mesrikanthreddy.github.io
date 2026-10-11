// Toy animations for the ML task table. Everything here is a cartoon with made-up
// numbers, drawn with CSS and SVG, and says so on screen. Each animation loops, and
// its resting style is the finished state, so reduced-motion users see the end result.
import './ToyAnim.css'

const pct = (v) => `${Math.round(v * 100)}%`

function Bars({ labels, delay = 0 }) {
  return (
    <div className="ta-bars">
      {labels.map(([name, v], i) => (
        <div className="ta-bar-row" key={name}>
          <span className="ta-bar-name">{name}</span>
          <span className="ta-bar-track">
            <span className="ta-bar-fill" style={{ '--w': pct(v), animationDelay: `${delay + i * 0.25}s` }} />
          </span>
          <span className="ta-bar-val">{v >= 1 ? '' : pct(v)}</span>
        </div>
      ))}
    </div>
  )
}

function Wave({ n = 28, hue = 0 }) {
  return (
    <div className="ta-wave" aria-hidden="true">
      {Array.from({ length: n }, (_, i) => (
        <span
          key={i}
          style={{
            '--h': `${20 + ((i * 37) % 70)}%`,
            animationDelay: `${(i % 9) * 0.07}s`,
            filter: hue ? `hue-rotate(${hue}deg)` : undefined,
          }}
        />
      ))}
    </div>
  )
}

const typeStyle = (s) => ({ '--n': Math.max(8, [...s].length), '--steps': Math.max(8, [...s].length) })

export default function ToyAnim({ anim }) {
  const a = anim
  switch (a.kind) {
    case 'label':
      return (
        <div className="ta ta-label">
          <div className="ta-chip ta-input">{a.input}</div>
          <Bars labels={a.labels} />
          {a.tag && <div className="ta-note">{a.tag}</div>}
        </div>
      )
    case 'tokens':
      return (
        <div className="ta ta-tokens">
          {a.words.map(([w, tag], i) => (
            <span className="ta-tok" key={i}>
              <span className="ta-tok-w">{w}</span>
              {tag && (
                <span className="ta-tok-tag" style={{ animationDelay: `${0.4 + i * 0.35}s` }}>
                  {tag}
                </span>
              )}
            </span>
          ))}
        </div>
      )
    case 'text':
      return (
        <div className="ta ta-text">
          <div className="ta-chip ta-from">{a.from}</div>
          <div className="ta-arrow" aria-hidden="true">↓</div>
          <div className="ta-chip ta-to">
            <span className="ta-typed" style={typeStyle(a.to)}>{a.to}</span>
          </div>
        </div>
      )
    case 'rank': {
      const order = [...a.items].sort((x, y) => y[1] - x[1])
      return (
        <div className="ta ta-rank">
          <div className="ta-chip ta-input">query: {a.query}</div>
          <div className="ta-rank-list" style={{ '--count': a.items.length }}>
            {a.items.map(([name, v], i) => {
              const to = order.findIndex((o) => o[0] === name)
              return (
                <div className="ta-rank-item" key={name} style={{ '--from': i, '--to': to }}>
                  <span className="ta-rank-name">{name}</span>
                  <span className="ta-rank-score">{v.toFixed(2)}</span>
                </div>
              )
            })}
          </div>
        </div>
      )
    }
    case 'vector':
      return (
        <div className="ta ta-vector">
          <div className="ta-chip ta-input">{a.input}</div>
          <div className="ta-arrow" aria-hidden="true">↓</div>
          <div className="ta-vec">
            {Array.from({ length: a.dims }, (_, i) => (
              <span key={i} style={{ '--h': `${15 + ((i * 53) % 80)}%`, animationDelay: `${i * 0.06}s` }} />
            ))}
          </div>
          <div className="ta-note">a list of numbers: the embedding</div>
        </div>
      )
    case 'gen':
      return (
        <div className="ta ta-gen">
          <div className="ta-chip ta-input">{a.prompt}</div>
          <div className="ta-canvas">
            <span className="ta-canvas-emoji">{a.out}</span>
            <span className="ta-noise" />
          </div>
          <div className="ta-note">noise → picture (toy)</div>
        </div>
      )
    case 'video':
      return (
        <div className="ta ta-video">
          <div className="ta-chip ta-input">{a.prompt}</div>
          <div className="ta-frames" style={{ '--frames': a.frames.length }}>
            {a.frames.map((f, i) => (
              <span key={i} style={{ '--i': i }}>{f}</span>
            ))}
          </div>
          {a.labels && <Bars labels={a.labels} delay={0.5} />}
        </div>
      )
    case 'spin':
      return (
        <div className="ta ta-spin">
          <div className="ta-chip ta-input">{a.prompt}</div>
          <div className="ta-spinner"><span>{a.out}</span></div>
          <div className="ta-note">rotating 3D object (toy)</div>
        </div>
      )
    case 'wave':
      return (
        <div className="ta ta-wavebox">
          {a.direction === 'in' && (<><Wave /><div className="ta-arrow" aria-hidden="true">↓</div><div className="ta-chip ta-to"><span className="ta-typed" style={typeStyle(a.text)}>{a.text}</span></div></>)}
          {a.direction === 'out' && (<><div className="ta-chip ta-from">{a.text}</div><div className="ta-arrow" aria-hidden="true">↓</div><Wave hue={120} /></>)}
          {a.direction === 'label' && (<><Wave /><Bars labels={a.labels} /></>)}
          {a.direction === 'split' && (
            <div className="ta-split">
              <Wave n={30} />
              <div className="ta-arrow" aria-hidden="true">↓</div>
              {a.labels.map(([name], i) => (
                <div className="ta-split-row" key={name}><span>{name}</span><Wave n={20} hue={i * 90} /></div>
              ))}
            </div>
          )}
        </div>
      )
    case 'boxes':
      return (
        <div className="ta ta-boxes">
          {a.query && <div className="ta-note ta-query">{a.query}</div>}
          <div className="ta-scene">
            {a.items.map(([em, name, v], i) => (
              <div className="ta-obj" key={name} style={{ left: `${12 + i * 42}%` }}>
                <span className="ta-obj-emoji">{em}</span>
                <span className="ta-box" style={{ animationDelay: `${0.3 + i * 0.5}s` }}>
                  <span className="ta-box-label">{name} {v.toFixed(2)}</span>
                </span>
              </div>
            ))}
          </div>
        </div>
      )
    case 'keypoints': {
      const pts = [[50, 14], [50, 28], [38, 30], [62, 30], [30, 48], [70, 48], [44, 54], [56, 54], [40, 80], [60, 80]]
      const lines = [[0, 1], [1, 2], [1, 3], [2, 4], [3, 5], [1, 6], [1, 7], [6, 8], [7, 9]]
      return (
        <div className="ta ta-key">
          <svg viewBox="0 0 100 90" role="img" aria-label="Toy stick figure with detected joints">
            {lines.map(([p, q], i) => (
              <line key={i} x1={pts[p][0]} y1={pts[p][1]} x2={pts[q][0]} y2={pts[q][1]} className="ta-bone" style={{ animationDelay: `${0.5 + i * 0.15}s` }} />
            ))}
            {pts.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3.2" className="ta-joint" style={{ animationDelay: `${i * 0.15}s` }} />
            ))}
          </svg>
          <div className="ta-note">each dot is an (x, y) point</div>
        </div>
      )
    }
    case 'mask':
      return (
        <div className="ta ta-mask">
          <div className="ta-scene ta-scene-small">
            <span className="ta-obj-emoji ta-big">{a.item}</span>
            <span className="ta-blob" />
            {a.many && <span className="ta-blob ta-blob2" />}
            {a.many && <span className="ta-blob ta-blob3" />}
          </div>
          <div className="ta-note">{a.label}</div>
        </div>
      )
    case 'depth':
      return (
        <div className="ta ta-depth">
          <div className="ta-depth-grid" aria-label="Toy depth map: near is bright, far is dark">
            {Array.from({ length: 6 }, (_, r) => (
              <span key={r} style={{ '--d': r / 5, animationDelay: `${r * 0.12}s` }} />
            ))}
          </div>
          <div className="ta-note">near = bright, far = dark (toy)</div>
        </div>
      )
    case 'table':
      return (
        <div className="ta ta-table">
          <table>
            <thead>
              <tr><th>city</th><th>sales</th><th>{a.mode === 'class' ? 'will renew?' : 'region'}</th></tr>
            </thead>
            <tbody>
              {[['Pune', 42, 'yes'], ['Delhi', 18, 'no'], ['Goa', 31, 'yes']].map(([c, s, r], i) => (
                <tr key={c} className={a.mode === 'qa' && i !== 1 ? 'ta-hl' : ''} style={{ '--i': i }}>
                  <td>{c}</td>
                  <td>{s}</td>
                  <td>{a.mode === 'class' ? <span className={`ta-verdict ${r}`} style={{ animationDelay: `${0.4 + i * 0.4}s` }}>{r}</span> : ['west', 'north', 'west'][i]}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {a.mode === 'qa' && (
            <div className="ta-chip ta-to ta-qa"><span className="ta-q">Q: total sales in the west?</span> <span className="ta-ans">42 + 31 = 73</span></div>
          )}
        </div>
      )
    case 'regress':
      return (
        <div className="ta ta-regress">
          <svg viewBox="0 0 120 80" role="img" aria-label="Toy scatter plot with a fitted line">
            {[[10, 62], [22, 55], [34, 50], [46, 44], [58, 38], [70, 36], [82, 26], [94, 22], [106, 14]].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y + (i % 2 ? 5 : -5)} r="3" className="ta-dot" />
            ))}
            <line x1="6" y1="64" x2="110" y2="14" className="ta-fit" />
          </svg>
          <div className="ta-note">fit a line, predict a number (toy)</div>
        </div>
      )
    case 'agent':
      return (
        <div className="ta ta-agent">
          <div className="ta-grid" aria-label="Toy grid world: an agent walks to a prize">
            {Array.from({ length: 15 }, (_, i) => (
              <span key={i} className={i === 14 ? 'ta-goal' : ''}>{i === 14 ? '🏆' : ''}</span>
            ))}
            <span className="ta-walker">🤖</span>
          </div>
          <div className="ta-note">try, get a reward, improve (toy)</div>
        </div>
      )
    case 'edit':
      return (
        <div className="ta ta-edit">
          <div className="ta-edit-row">
            <span className="ta-edit-from">{a.from}</span>
            <span className="ta-edit-arrow" aria-hidden="true">→</span>
            <span className="ta-edit-to">{a.to}</span>
          </div>
          <div className="ta-note">{a.label}</div>
        </div>
      )
    default:
      return null
  }
}
