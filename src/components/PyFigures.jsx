// Diagrams for the "5 Pillars of Advanced Python Architecture" post.
// They reuse the site's `.meme.diagram` figure shell and `m-*` classes (see the
// Yellow Paper); `.pyf` in index.css adds success / failure colours for both
// themes. The numbers in the charts are real measurements, not illustrations:
// they come from scripts run on CPython 3.11.8 (macOS, Apple silicon, 12 cores).

function Fig({ label, caption, viewBox, children }) {
  return (
    <figure className="meme diagram pyf">
      <div className="figure-scroll">
        <svg viewBox={viewBox} role="img" aria-label={label}>
          <defs>
            <marker id="pf-arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10Z" fill="var(--text-dim)" />
            </marker>
            <marker id="pf-arr-acc" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10Z" fill="var(--accent)" />
            </marker>
            <marker id="pf-arr-ok" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10Z" fill="var(--pf-ok)" />
            </marker>
            <marker id="pf-arr-bad" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10Z" fill="var(--pf-bad)" />
            </marker>
          </defs>
          {children}
        </svg>
      </div>
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

const token = (path, extra = '') => ({
  className: `pf-token m-acc ${extra}`,
  style: { offsetPath: `path('${path}')` },
})

// 0 ── How the five pillars sit on one request ───────────────────────────────
export function PillarMap() {
  const steps = [
    { n: 3, name: 'BOUNDARY', line1: 'check what', line2: 'comes in', tool: 'Pydantic' },
    { n: 2, name: 'DOMAIN', line1: 'objects that', line2: 'speak Python', tool: 'dunder methods' },
    { n: 1, name: 'RESOURCES', line1: 'open, use,', line2: 'always close', tool: 'with / __exit__' },
    { n: 4, name: 'DATA FLOW', line1: 'stream it,', line2: 'don’t load it', tool: 'yield' },
    { n: 5, name: 'EXECUTION', line1: 'pick the right', line2: 'engine', tool: 'async / cores' },
  ]
  return (
    <Fig
      viewBox="0 0 600 236"
      label="A pipeline of the five pillars in the order a request meets them: boundary validation, domain objects, resource handling, data streaming and execution."
      caption="The five pillars as one request's journey. The numbers are the pillar numbers used in this post."
    >
      <text className="pf-sub" x="14" y="26">request in</text>
      <text className="pf-sub" x="586" y="26" textAnchor="end">result out</text>
      {steps.map((s, i) => {
        const x = 14 + i * 118
        return (
          <g key={s.name}>
            <rect className="pf-box soft" x={x} y="42" width="104" height="112" rx="10" />
            <rect className="pf-hl m-acc" style={{ animationDelay: `${i * 1.5}s` }} x={x} y="42" width="104" height="112" rx="10" />
            <text className="pf-num" x={x + 12} y="64">{`PILLAR ${s.n}`}</text>
            <text className="pf-title" x={x + 12} y="86">{s.name}</text>
            <text className="pf-sub" x={x + 12} y="108">{s.line1}</text>
            <text className="pf-sub" x={x + 12} y="123">{s.line2}</text>
            <text className="pf-code dim" x={x + 12} y="144" style={{ fontSize: 10 }}>{s.tool}</text>
            {i < steps.length - 1 && <path className="m-flow" d={`M${x + 106} 98H${x + 116}`} markerEnd="url(#pf-arr-acc)" />}
          </g>
        )
      })}
      <text className="pf-sub" x="300" y="190" textAnchor="middle">
        each pillar guards against one risk
      </text>
      <text className="pf-sub" x="300" y="208" textAnchor="middle" style={{ fontSize: 10.5 }}>
        bad data · awkward objects · leaks · memory blow-ups · wasted cores
      </text>
    </Fig>
  )
}

// 1 ── The with-statement lifecycle ───────────────────────────────────────────
export function ContextFlow() {
  const row = [
    { x: 8, w: 104, t1: 'with Handler()', t2: 'as session:', fs: 10.5 },
    { x: 130, w: 100, t1: '__enter__()', t2: 'setup, returns' },
    { x: 248, w: 100, t1: 'your code', t2: 'the with-body' },
    { x: 366, w: 110, t1: '__exit__()', t2: 'ALWAYS runs', exit: true },
    { x: 494, w: 98, t1: 'code after', t2: 'the block' },
  ]
  return (
    <Fig
      viewBox="0 0 600 338"
      label="Flow of a with statement: with, __enter__, the body, then __exit__ which always runs, then the code after the block. If the body raised an error, __exit__ decides whether it is suppressed or propagates."
      caption="__exit__ runs on both paths. What it returns decides whether an error disappears or reaches the caller."
    >
      <text className="pf-sub" x="8" y="22">normal run</text>
      {row.map((b, i) => (
        <g key={b.t1}>
          <rect className={`pf-box ${b.exit ? 'acc' : 'soft'}`} x={b.x} y="32" width={b.w} height="58" rx="9" />
          {b.exit && <rect className="pf-hl m-acc" x={b.x} y="32" width={b.w} height="58" rx="9" />}
          <text className="pf-code" x={b.x + 10} y="56" style={{ fontWeight: 700, fontSize: b.fs }}>{b.t1}</text>
          <text className="pf-sub" x={b.x + 10} y="74">{b.t2}</text>
          {i < row.length - 1 && <path className="m-flow" d={`M${b.x + b.w + 2} 61H${row[i + 1].x - 3}`} markerEnd="url(#pf-arr-acc)" />}
        </g>
      ))}
      <path {...token('M120 61H494')} />

      <text className="pf-bad-t" x="290" y="114" textAnchor="end">the body raises an error</text>
      <path className="pf-line bad" d="M298 92V126H392V94" markerEnd="url(#pf-arr-bad)" />
      <text className="pf-sub" x="438" y="146" textAnchor="end">skips the rest of the body, goes straight to __exit__</text>

      <path className="pf-line" d="M452 94V168" markerEnd="url(#pf-arr)" />
      <rect className="pf-box warn" x="330" y="170" width="240" height="46" rx="23" />
      <text className="pf-title" x="450" y="191" textAnchor="middle" style={{ fontSize: 12 }}>what does __exit__ return?</text>
      <text className="pf-sub" x="450" y="206" textAnchor="middle">it receives (type, value, traceback)</text>

      <path className="pf-line bad" d="M382 216L214 254" markerEnd="url(#pf-arr-bad)" />
      <path className="pf-line ok" d="M520 216L470 254" markerEnd="url(#pf-arr-ok)" />
      <text className="pf-bad-t" x="268" y="226" textAnchor="middle">True</text>
      <text className="pf-ok-t" x="544" y="236" textAnchor="middle">False or None</text>

      <rect className="pf-box bad" x="14" y="256" width="262" height="70" rx="10" />
      <rect className="pf-tint-bad" x="14" y="256" width="262" height="70" rx="10" />
      <text className="pf-bad-t" x="28" y="278">error SUPPRESSED</text>
      <text className="pf-sub" x="28" y="296">the code after the block keeps running</text>
      <text className="pf-sub" x="28" y="311">as if nothing happened. Bugs go silent.</text>

      <rect className="pf-box ok" x="324" y="256" width="262" height="70" rx="10" />
      <rect className="pf-tint-ok" x="324" y="256" width="262" height="70" rx="10" />
      <text className="pf-ok-t" x="338" y="278">error PROPAGATES</text>
      <text className="pf-sub" x="338" y="296">cleanup has already happened, then the</text>
      <text className="pf-sub" x="338" y="311">caller sees the exception and can react.</text>
    </Fig>
  )
}

// 2 ── Syntax → dunder method ─────────────────────────────────────────────────
export function DunderMap() {
  const rows = [
    { a: 'len(m)', b: 'type(m).__len__(m)', c: '__len__' },
    { a: 'm[1]', b: 'type(m).__getitem__(m, 1)', c: '__getitem__' },
    { a: 'm == other', b: 'type(m).__eq__(m, other)', c: '__eq__' },
    { a: 'repr(m)', b: 'type(m).__repr__(m)', c: '__repr__' },
    { a: 'for x in m   /   x in m', b: '__iter__ if it exists, else', b2: '__getitem__(0), (1), (2)...', c: '__iter__ or __getitem__' },
  ]
  return (
    <Fig
      viewBox="0 0 600 352"
      label="A table mapping everyday Python syntax to the special methods it calls: len calls __len__, indexing calls __getitem__, equality calls __eq__, repr calls __repr__, and iteration calls __iter__ or falls back to __getitem__."
      caption="Everyday syntax is a doorway into your class. Python looks the method up on the type, not on the instance."
    >
      <text className="pf-sub" x="20" y="24">YOU WRITE</text>
      <text className="pf-sub" x="214" y="24">PYTHON ACTUALLY CALLS</text>
      <text className="pf-sub" x="440" y="24">YOUR CLASS DEFINES</text>
      {rows.map((r, i) => {
        const y = 36 + i * 54
        return (
          <g key={r.a}>
            <rect className="pf-box soft" x="12" y={y} width="170" height="42" rx="8" />
            <text className="pf-code" x="24" y={y + 26} style={{ fontWeight: 700 }}>{r.a}</text>
            <rect className="pf-box" x="204" y={y} width="206" height="42" rx="8" />
            {r.b2 ? (
              <>
                <text className="pf-code dim" x="214" y={y + 18}>{r.b}</text>
                <text className="pf-code dim" x="214" y={y + 33}>{r.b2}</text>
              </>
            ) : (
              <text className="pf-code dim" x="214" y={y + 26}>{r.b}</text>
            )}
            <rect className="pf-box acc" x="430" y={y} width="158" height="42" rx="8" />
            <rect className="pf-hl m-acc" style={{ animationDelay: `${i * 1.5}s` }} x="430" y={y} width="158" height="42" rx="8" />
            <text className="pf-code" x="440" y={y + 26} style={{ fontWeight: 700, fontSize: r.c.length > 14 ? 10 : 11.5 }}>{r.c}</text>
            <path className="m-flow" d={`M${184} ${y + 21}H${201}`} markerEnd="url(#pf-arr-acc)" />
            <path className="m-flow" d={`M${412} ${y + 21}H${427}`} markerEnd="url(#pf-arr-acc)" />
          </g>
        )
      })}
      <rect className="pf-box warn" x="12" y="310" width="576" height="34" rx="8" />
      <text className="pf-warn-t" x="24" y="331">Gotcha: define __eq__ without __hash__ and instances become unhashable (no sets, no dict keys).</text>
    </Fig>
  )
}

// 3 ── The validation gate ────────────────────────────────────────────────────
export function BoundaryGate() {
  return (
    <Fig
      viewBox="0 0 600 316"
      label="A gate between untrusted input and trusted internal code. A good payload passes and is normalised; two bad payloads are turned back with specific error messages."
      caption="Validation happens once, at the edge. Bad data is rejected with a precise reason; good data arrives parsed and normalised."
    >
      <text className="pf-sub" x="14" y="22">UNTRUSTED INPUT</text>
      <text className="pf-sub" x="586" y="22" textAnchor="end">TRUSTED CODE</text>

      <rect className="pf-box ok" x="12" y="34" width="190" height="50" rx="8" />
      <text className="pf-code" x="22" y="56" style={{ fontWeight: 700 }}>region_code = "us"</text>
      <text className="pf-code dim" x="22" y="73">user_id = "42"</text>

      <rect className="pf-box bad" x="12" y="130" width="190" height="42" rx="8" />
      <text className="pf-code" x="22" y="156" style={{ fontWeight: 700 }}>region_code = "fr"</text>

      <rect className="pf-box bad" x="12" y="220" width="190" height="42" rx="8" />
      <text className="pf-code" x="22" y="246" style={{ fontWeight: 700 }}>account_balance = -5</text>

      {/* the gate */}
      <rect className="pf-box acc" x="262" y="30" width="76" height="244" rx="10" />
      <rect className="pf-tint-acc" x="262" y="30" width="76" height="244" rx="10" />
      <text className="pf-title" x="300" y="190" textAnchor="middle" transform="rotate(-90 300 190)" style={{ fontSize: 12.5 }}>PYDANTIC SCHEMA</text>
      <rect className="m-paper" x="262" y="46" width="76" height="40" rx="6" style={{ stroke: 'var(--pf-ok)' }} />
      <text className="pf-ok-t" x="300" y="70" textAnchor="middle">open</text>

      {/* good path */}
      <path className="pf-line ok" d="M204 60H260" markerEnd="url(#pf-arr-ok)" />
      <path className="pf-line ok" d="M340 66H388" markerEnd="url(#pf-arr-ok)" />
      <path {...token('M204 60H388 ', 'slow')} />

      <rect className="pf-box ok" x="392" y="34" width="196" height="76" rx="8" />
      <rect className="pf-tint-ok" x="392" y="34" width="196" height="76" rx="8" />
      <text className="pf-code" x="402" y="55" style={{ fontWeight: 700 }}>user_id = 42</text>
      <text className="pf-code" x="402" y="72" style={{ fontWeight: 700 }}>region_code = "US"</text>
      <text className="pf-ok-t" x="402" y="92">typed, parsed, normalised</text>
      <text className="pf-sub" x="402" y="106" style={{ fontSize: 10 }}>"42" became 42, "us" became "US"</text>

      {/* bad paths bounce */}
      <path className="pf-line bad" d="M204 151H250" />
      <path className="pf-line bad" d="M250 143L262 159M262 143L250 159" />
      <path className="pf-line bad" d="M340 151H356" markerEnd="url(#pf-arr-bad)" />
      <path className="pf-line bad" d="M204 241H250" />
      <path className="pf-line bad" d="M250 233L262 249M262 233L250 249" />
      <path className="pf-line bad" d="M340 241H356" markerEnd="url(#pf-arr-bad)" />
      <text className="pf-bad-t" x="300" y="112" textAnchor="middle" style={{ fontSize: 10 }}>blocked</text>

      <rect className="pf-box bad" x="360" y="130" width="228" height="42" rx="8" />
      <rect className="pf-tint-bad" x="360" y="130" width="228" height="42" rx="8" />
      <text className="pf-bad-t" x="372" y="148">ValidationError</text>
      <text className="pf-sub" x="372" y="163" style={{ fontSize: 10 }}>Region fr violates compliance standards.</text>

      <rect className="pf-box bad" x="360" y="220" width="228" height="42" rx="8" />
      <rect className="pf-tint-bad" x="360" y="220" width="228" height="42" rx="8" />
      <text className="pf-bad-t" x="372" y="238">ValidationError</text>
      <text className="pf-sub" x="372" y="253" style={{ fontSize: 10 }}>Input should be greater than 0</text>

      <text className="pf-sub" x="300" y="300" textAnchor="middle">several problems in one payload? Pydantic reports all of them at once.</text>
    </Fig>
  )
}

// 4a ── Memory: list vs generator (measured) ──────────────────────────────────
export function MemoryChart() {
  const data = [
    { n: '100,000 records', list: 22.39, gen: 0.0007 },
    { n: '1,000,000 records', list: 224.43, gen: 0.0007 },
  ]
  const max = 224.43
  const scale = 380 / max
  return (
    <Fig
      viewBox="0 0 600 262"
      label="Bar chart of peak memory: for 100,000 records a list used 22.39 megabytes and a generator 0.0007 megabytes; for 1,000,000 records a list used 224.43 megabytes and a generator 0.0007 megabytes."
      caption="Measured with tracemalloc on CPython 3.11.8, consuming the article's log records. Your numbers will differ; the shape will not."
    >
      <text className="pf-title" x="14" y="24">Peak memory while consuming the stream</text>
      {data.map((d, i) => {
        const y = 48 + i * 100
        return (
          <g key={d.n}>
            <text className="pf-code" x="14" y={y + 8} style={{ fontWeight: 700 }}>{d.n}</text>
            <text className="pf-sub" x="14" y={y + 40}>list</text>
            <rect className="pf-bar-list" x="64" y={y + 24} width={Math.max(2, d.list * scale)} height="22" rx="4" />
            <text className="pf-code" x={64 + Math.max(2, d.list * scale) + 8} y={y + 40}>{`${d.list.toFixed(2)} MB`}</text>
            <text className="pf-sub" x="14" y={y + 72}>yield</text>
            <rect className="pf-bar-gen" x="64" y={y + 56} width="3" height="22" rx="1" />
            <text className="pf-code" x="76" y={y + 72}>0.0007 MB, about 0.7 KB</text>
          </g>
        )
      })}
      <text className="pf-sub" x="14" y="252">the generator object itself is 216 bytes, whether it will yield 10 or 10 million records</text>
    </Fig>
  )
}

// 4b ── The hand-off between a consumer and a generator ───────────────────────
export function GeneratorPingPong() {
  return (
    <Fig
      viewBox="0 0 600 292"
      label="A sequence diagram: the consumer asks for the next item, the generator runs until yield and hands over one record then freezes with its local state kept, and resumes on the next request."
      caption="One record at a time. The generator's local state is frozen between requests, not re-created."
    >
      <text className="pf-title" x="60" y="24">Consumer</text>
      <text className="pf-sub" x="60" y="40">for record in stream:</text>
      <text className="pf-title" x="404" y="24">Generator</text>
      <text className="pf-sub" x="404" y="40">stream_system_logs()</text>
      <path className="pf-grid" d="M120 52V280M470 52V280" style={{ strokeDasharray: '4 4' }} />

      {[0, 1].map((k) => {
        const y = 70 + k * 100
        return (
          <g key={k}>
            <path className="pf-line acc" d={`M122 ${y}H466`} markerEnd="url(#pf-arr-acc)" />
            <text className="pf-code" x="294" y={y - 6} textAnchor="middle" style={{ fontWeight: 700 }}>next()</text>
            <rect className="pf-box acc" x="446" y={y + 6} width="148" height="34" rx="7" />
            <text className="pf-sub" x="456" y={y + 27}>runs until it hits yield</text>
            <path className="pf-line ok" d={`M468 ${y + 56}H124`} markerEnd="url(#pf-arr-ok)" />
            <text className="pf-code" x="296" y={y + 50} textAnchor="middle">{`yield {"log_id": ${k}, …}`}</text>
            <rect className="pf-pause pf-box soft" x="446" y={y + 62} width="148" height="26" rx="7" style={{ strokeDasharray: '4 3' }} />
            <text className="pf-sub" x="456" y={y + 79} style={{ fontSize: 10 }}>{`paused, line_id = ${k} kept`}</text>
            <rect className="pf-box" x="8" y={y + 62} width="150" height="26" rx="7" />
            <text className="pf-sub" x="18" y={y + 79} style={{ fontSize: 10 }}>{`handles record ${k}`}</text>
          </g>
        )
      })}
      <text className="pf-sub" x="300" y="284" textAnchor="middle">and so on, for as long as the consumer keeps asking</text>
    </Fig>
  )
}

// 5a ── Which concurrency tool? ───────────────────────────────────────────────
export function ConcurrencyChoice() {
  return (
    <Fig
      viewBox="0 0 600 292"
      label="A decision tree: if the work is mostly waiting on networks, disks or databases it is I/O-bound and asyncio fits; if it is mostly computing it is CPU-bound and multiprocessing fits."
      caption="Decide by what the program is doing most of the time, not by what the code looks like."
    >
      <rect className="pf-box acc" x="150" y="12" width="300" height="46" rx="23" />
      <text className="pf-title" x="300" y="32" textAnchor="middle" style={{ fontSize: 12.5 }}>What is the work mostly doing?</text>
      <text className="pf-sub" x="300" y="48" textAnchor="middle">profile it first: guess second</text>

      <path className="pf-line" d="M226 58L140 100" markerEnd="url(#pf-arr)" />
      <path className="pf-line" d="M374 58L460 100" markerEnd="url(#pf-arr)" />

      <rect className="pf-box soft" x="14" y="102" width="260" height="54" rx="10" />
      <text className="pf-title" x="28" y="124">WAITING</text>
      <text className="pf-sub" x="28" y="142">network calls, databases, disks, APIs</text>
      <rect className="pf-box soft" x="326" y="102" width="260" height="54" rx="10" />
      <text className="pf-title" x="340" y="124">COMPUTING</text>
      <text className="pf-sub" x="340" y="142">maths, parsing, encoding, compression</text>

      <path className="pf-line ok" d="M144 156V186" markerEnd="url(#pf-arr-ok)" />
      <path className="pf-line ok" d="M456 156V186" markerEnd="url(#pf-arr-ok)" />

      <rect className="pf-box ok" x="14" y="188" width="260" height="62" rx="10" />
      <rect className="pf-tint-ok" x="14" y="188" width="260" height="62" rx="10" />
      <text className="pf-ok-t" x="28" y="210" style={{ fontSize: 13 }}>I/O-bound → asyncio</text>
      <text className="pf-sub" x="28" y="228">one thread, many waits overlapped</text>
      <text className="pf-sub" x="28" y="242">threads work too for blocking libraries</text>

      <rect className="pf-box ok" x="326" y="188" width="260" height="62" rx="10" />
      <rect className="pf-tint-ok" x="326" y="188" width="260" height="62" rx="10" />
      <text className="pf-ok-t" x="340" y="210" style={{ fontSize: 13 }}>CPU-bound → multiprocessing</text>
      <text className="pf-sub" x="340" y="228">one process per core, each with its own GIL</text>
      <text className="pf-sub" x="340" y="242">pays for startup and for pickling data</text>

      <rect className="pf-box bad" x="14" y="260" width="572" height="26" rx="8" />
      <text className="pf-bad-t" x="26" y="277">Trap: one blocking call inside async code (time.sleep, requests.get) freezes every task on the loop.</text>
    </Fig>
  )
}

// 5b ── I/O timeline (measured) ───────────────────────────────────────────────
export function IoTimeline() {
  const x0 = 96
  const px = 96 / 0.5 // pixels per second
  const w = 0.5 * px
  const ticks = [0, 0.5, 1.0, 1.5, 2.0, 2.5]
  return (
    <Fig
      viewBox="0 0 600 322"
      label="Timeline of five simulated half-second network calls: run one after another they take 2.51 seconds; run together with asyncio.gather they take 0.50 seconds."
      caption="Five simulated calls of 0.5 s each, measured on CPython 3.11.8. Same work, 5× less waiting."
    >
      <text className="pf-title" x="14" y="22">One after another</text>
      <text className="pf-bad-t" x="586" y="22" textAnchor="end">2.51 s in total</text>
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k}>
          <text className="pf-sub" x="14" y={46 + k * 20} style={{ fontSize: 10 }}>{`call ${k + 1}`}</text>
          <rect className="pf-bar-bad" x={x0 + k * w} y={36 + k * 20} width={w - 2} height="14" rx="3" style={{ opacity: 0.85 }} />
        </g>
      ))}
      <text className="pf-title" x="14" y="172">Together, with asyncio.gather</text>
      <text className="pf-ok-t" x="586" y="172" textAnchor="end">0.50 s in total</text>
      {[0, 1, 2, 3, 4].map((k) => (
        <g key={k}>
          <text className="pf-sub" x="14" y={196 + k * 20} style={{ fontSize: 10 }}>{`call ${k + 1}`}</text>
          <rect className="pf-bar-ok" x={x0} y={186 + k * 20} width={w - 2} height="14" rx="3" style={{ opacity: 0.9 }} />
        </g>
      ))}
      <path className="pf-grid" d={`M${x0} 292H${x0 + 2.5 * px}`} />
      {ticks.map((t) => (
        <g key={t}>
          <path className="pf-grid" d={`M${x0 + t * px} 288V296`} />
          <text className="pf-sub" x={x0 + t * px} y="312" textAnchor="middle" style={{ fontSize: 10 }}>{`${t.toFixed(1)} s`}</text>
        </g>
      ))}
      <path className="pf-grid" d={`M${x0 + 0.5 * px} 36V292`} style={{ strokeDasharray: '3 4' }} />
    </Fig>
  )
}

// 5c ── CPU-bound work (measured) ─────────────────────────────────────────────
export function CpuChart() {
  const rows = [
    { name: 'one after another', s: 4.1, cls: 'pf-bar-neutral', note: 'baseline' },
    { name: '4 threads', s: 3.92, cls: 'pf-bar-bad', note: '1.05× faster: the GIL gets in the way' },
    { name: '4 processes', s: 1.06, cls: 'pf-bar-ok', note: '3.9× faster' },
  ]
  const scale = 330 / 4.1
  return (
    <Fig
      viewBox="0 0 600 236"
      label="Bar chart: four CPU-heavy jobs took 4.10 seconds one after another, 3.92 seconds with four threads, and 1.06 seconds with four processes."
      caption="Four jobs, each a sum of squares over 15 million numbers. Median of three runs, CPython 3.11.8, 12 cores. Threads barely help pure-Python CPU work."
    >
      <text className="pf-title" x="14" y="24">Four CPU-heavy jobs: how long until all four finish?</text>
      {rows.map((r, i) => {
        const y = 46 + i * 56
        return (
          <g key={r.name}>
            <text className="pf-code" x="14" y={y + 14} style={{ fontWeight: 700 }}>{r.name}</text>
            <rect className={r.cls} x="150" y={y} width={r.s * scale} height="24" rx="4" />
            <text className="pf-code" x={150 + r.s * scale + 8} y={y + 16}>{`${r.s.toFixed(2)} s`}</text>
            <text className="pf-sub" x="150" y={y + 42} style={{ fontSize: 10 }}>{r.note}</text>
          </g>
        )
      })}
    </Fig>
  )
}
