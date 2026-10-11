import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDocumentMeta } from '../hooks/useDocumentMeta'
import ToyAnim from '../components/ToyAnim'
import { cols, rows, tasks, taskCount, modelTotal, MODELS_AS_OF } from '../content/tasks'
import './Tasks.css'

const compact = new Intl.NumberFormat('en', { notation: 'compact', maximumFractionDigits: 1 })
const full = new Intl.NumberFormat('en')
const colColors = ['#2563eb', '#c2410c', '#7c3aed', '#2b8a6e', '#be185d', '#475569']
const maxModels = Math.max(...tasks.map((t) => t.models))
const minModels = Math.min(...tasks.map((t) => t.models))
// 0..1 on a log scale, so 140 models and 423,000 models are both readable.
const logScale = (n) => (Math.log(n) - Math.log(minModels)) / (Math.log(maxModels) - Math.log(minModels))

const MODES = [
  { id: 'input', label: 'Input type' },
  { id: 'verb', label: 'What it does' },
  { id: 'models', label: 'Model count' },
]

function tileStyle(task, mode) {
  if (mode === 'input') return { '--tile': rows.find((r) => r.id === task.row).color, '--fill': 0.16 }
  if (mode === 'verb') return { '--tile': colColors[cols.findIndex((c) => c.id === task.col)], '--fill': 0.16 }
  return { '--tile': '#2b5fd9', '--fill': 0.06 + logScale(task.models) * 0.8 }
}

export default function Tasks() {
  useDocumentMeta({
    title: 'The Periodic Table of ML Tasks',
    description:
      'All 47 Hugging Face machine learning tasks in one table: hover for the meaning, click for a toy animation, a verified real-world case and the model count.',
  })
  const [mode, setMode] = useState('input')
  const [query, setQuery] = useState('')
  // ?task=Ss opens that tile straight away, so a single task can be linked to.
  const [selected, setSelected] = useState(() => {
    const sym = new URLSearchParams(window.location.search).get('task')
    return tasks.find((t) => t.sym.toLowerCase() === (sym || '').toLowerCase()) || null
  })
  const closeRef = useRef(null)
  const lastFocus = useRef(null)

  const q = query.trim().toLowerCase()
  const matches = (t) => !q || t.name.toLowerCase().includes(q) || t.sym.toLowerCase() === q || t.meaning.toLowerCase().includes(q)
  const matchCount = useMemo(() => tasks.filter(matches).length, [q]) // eslint-disable-line react-hooks/exhaustive-deps

  const open = (task, el) => {
    lastFocus.current = el
    setSelected(task)
  }
  const close = () => {
    setSelected(null)
    lastFocus.current?.focus()
  }

  useEffect(() => {
    if (!selected) return undefined
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') close()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [selected]) // eslint-disable-line react-hooks/exhaustive-deps

  const legend =
    mode === 'input'
      ? rows.map((r) => [r.name, r.color])
      : mode === 'verb'
        ? cols.map((c, i) => [c.name, colColors[i]])
        : null

  return (
    <main id="main" className="page-wrap">
      <section className="tk">
        <div className="wrap">
          <Link className="post-back" to="/writing">
            ← All writing
          </Link>
          <span className="post-type post-type-block" data-type="Interactive">Interactive</span>
          <h1 className="post-article-title">The Periodic Table of ML Tasks</h1>
          <p className="post-subtitle">
            Every machine learning task on Hugging Face, {taskCount} of them, laid out by what goes in (rows) and what
            comes out (columns). Hover a tile for the one-line meaning. Click it for a toy animation and a real-world
            case with its source.
          </p>

          <div className="tk-controls">
            <div className="tk-modes" role="group" aria-label="Colour the tiles by">
              <span className="tk-label">Colour by</span>
              {MODES.map((m) => (
                <button key={m.id} type="button" className="tk-mode" aria-pressed={mode === m.id} onClick={() => setMode(m.id)}>
                  {m.label}
                </button>
              ))}
            </div>
            <label className="tk-search">
              <span className="tk-label">Find</span>
              <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="e.g. speech, image, summary" />
              {q && <span className="tk-count">{matchCount} of {taskCount}</span>}
            </label>
          </div>

          <div className="tk-legend" aria-live="polite">
            {legend ? (
              legend.map(([name, color]) => (
                <span key={name} className="tk-key"><i style={{ background: color }} />{name}</span>
              ))
            ) : (
              <span className="tk-key">Darker = more models on Hugging Face (log scale, {compact.format(minModels)} to {compact.format(maxModels)})</span>
            )}
          </div>

          <div className="tk-scroll">
            <div className="tk-grid" role="table" aria-label="Periodic table of ML tasks">
              <div className="tk-corner" role="columnheader">in ↓ / out →</div>
              {cols.map((c) => (
                <div className="tk-colhead" role="columnheader" key={c.id}>
                  <strong>{c.name}</strong>
                  <span>{c.blurb}</span>
                </div>
              ))}
              {rows.map((r) => (
                <div className="tk-row" role="row" key={r.id}>
                  <div className="tk-rowhead" role="rowheader" style={{ '--tile': r.color }}>{r.name}</div>
                  {cols.map((c) => {
                    const cell = tasks.filter((t) => t.row === r.id && t.col === c.id)
                    return (
                      <div className={`tk-cell${cell.length ? '' : ' tk-empty'}`} role="cell" key={c.id} data-col={c.name} data-blurb={c.blurb}>
                        {cell.map((t) => (
                          <button
                            type="button"
                            key={t.sym}
                            className={`tk-tile${matches(t) ? '' : ' tk-dim'}`}
                            style={tileStyle(t, mode)}
                            onClick={(e) => open(t, e.currentTarget)}
                            aria-label={`${t.name}. ${t.meaning} ${full.format(t.models)} models.`}
                            aria-haspopup="dialog"
                          >
                            <span className="tk-sym">{t.sym}</span>
                            <span className="tk-n">{compact.format(t.models)}</span>
                            <span className="tk-tip" role="tooltip">
                              <strong>{t.name}</strong>
                              {t.meaning}
                            </span>
                          </button>
                        ))}
                      </div>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>

          <p className="tk-foot">
            Tasks and model counts from <a href="https://huggingface.co/tasks" target="_blank" rel="noreferrer">huggingface.co/tasks</a>,
            read on {MODELS_AS_OF} ({full.format(modelTotal)} model listings across the tasks; a model can sit under more than one).
            The counts change daily. Empty cells are task combinations that Hugging Face does not list as a task.
            The animations are cartoons with made-up numbers. The cases and their numbers come from the linked papers.
          </p>
        </div>
      </section>

      {selected && (
        <div className="tk-overlay" onClick={close}>
          <div className="tk-dialog" role="dialog" aria-modal="true" aria-label={selected.name} onClick={(e) => e.stopPropagation()}>
            <button type="button" className="tk-close" onClick={close} ref={closeRef} aria-label="Close">×</button>
            <div className="tk-dhead">
              <span className="tk-bigsym" style={tileStyle(selected, mode)}>{selected.sym}</span>
              <div>
                <h2>{selected.name}</h2>
                <p className="tk-dmeta">
                  {rows.find((r) => r.id === selected.row).name} in · {cols.find((c) => c.id === selected.col).name.toLowerCase()} out ·{' '}
                  <strong>{full.format(selected.models)}</strong> models
                </p>
              </div>
            </div>
            <p className="tk-meaning">{selected.meaning}</p>
            <ToyAnim key={selected.sym} anim={selected.anim} />
            <p className="tk-toy">Toy animation: a cartoon with made-up numbers.</p>
            <div className="tk-case">
              <span className="tk-case-label">Real-world case</span>
              <p className="tk-case-head">{selected.case.headline}</p>
              <p className="tk-case-detail">{selected.case.detail}</p>
              <a href={selected.case.source.href} target="_blank" rel="noreferrer">
                {selected.case.source.text} ↗
              </a>
            </div>
          </div>
        </div>
      )}
    </main>
  )
}
