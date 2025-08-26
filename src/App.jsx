import React, { useMemo, useRef, useState } from 'react'

export default function App() {
  const flavors = useMemo(
    () => [
      {
        id: 'vnl',
        name: 'Vanilla Sky',
        colorA: '#8EC5FC',
        colorB: '#E0C3FC',
        calories: 90,
        protein: 12,
        sugar: 0,
        blurb: 'Classic, creamy, cloud-light.'
      },
      {
        id: 'chc',
        name: 'Midnight Cocoa',
        colorA: '#434343',
        colorB: '#000000',
        calories: 110,
        protein: 14,
        sugar: 0,
        blurb: 'Rich cacao with zero sugar.'
      },
      {
        id: 'str',
        name: 'Berry Sprint',
        colorA: '#FAD0C4',
        colorB: '#FF9A9E',
        calories: 95,
        protein: 13,
        sugar: 0,
        blurb: 'Strawberry burst, summer fast.'
      },
      {
        id: 'mnt',
        name: 'Mint Turbo',
        colorA: '#A8E6CF',
        colorB: '#56CCF2',
        calories: 100,
        protein: 15,
        sugar: 0,
        blurb: 'Cool mint, high gear protein.'
      }
    ],
    []
  )

  const [selectedFlavor, setSelectedFlavor] = useState(flavors[0].id)
  const [zip, setZip] = useState('')
  const [qty, setQty] = useState(4)
  const [est, setEst] = useState(null)
  const [placing, setPlacing] = useState(false)

  const computeETA = (z) => {
    const digits = (z || '').replace(/\D/g, '')
    if (!digits) return null
    const sum = digits.split('').reduce((a, c) => a + parseInt(c, 10), 0)
    let minutes = 18 + (sum % 13) // 18-30
    if (minutes > 30) minutes = 30
    return minutes
  }

  const handleEstimate = () => {
    const minutes = computeETA(zip)
    setEst(minutes)
  }

  const handleOrder = () => {
    setPlacing(true)
    setTimeout(() => {
      alert(
        `Order placed!\nFlavor: ${flavors.find((f) => f.id === selectedFlavor)?.name}\nQty: ${qty} minis\nETA: ${est || computeETA(zip) || 25} minutes via FedEx.`
      )
      setPlacing(false)
    }, 900)
  }

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 overflow-x-hidden">
      <SceneBackground />
      <Header />
      <main className="relative">
        <Hero onShopClick={() => {
          document.getElementById('flavors')?.scrollIntoView({ behavior: 'smooth' })
        }} />
        <ValueProps />
        <FlavorGallery flavors={flavors} selected={selectedFlavor} onSelect={setSelectedFlavor} />
        <Timeline />
        <Testimonials />
        <OrderCTA
          flavors={flavors}
          selectedFlavor={selectedFlavor}
          onSelectFlavor={setSelectedFlavor}
          zip={zip}
          onZip={setZip}
          qty={qty}
          onQty={setQty}
          est={est}
          onEstimate={handleEstimate}
          placing={placing}
          onOrder={handleOrder}
        />
      </main>
      <Footer />
      <GlobalStyles />
    </div>
  )
}

function Header() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md/0 bg-slate-950/40 supports-[backdrop-filter]:backdrop-blur-xl border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Logo3D />
          <div className="text-lg font-semibold tracking-tight">FedEx Ice Cream</div>
        </div>
        <nav className="hidden md:flex items-center gap-6 text-sm text-slate-300">
          <a className="hover:text-white transition" href="#flavors">Flavors</a>
          <a className="hover:text-white transition" href="#timeline">Delivery</a>
          <a className="hover:text-white transition" href="#testimonials">Love</a>
          <a className="px-4 py-2 rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white hover:opacity-90 transition" href="#order">Order</a>
        </nav>
      </div>
    </header>
  )
}

function Hero({ onShopClick }) {
  return (
    <section className="relative isolate overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 pt-16 pb-24 grid md:grid-cols-2 gap-10 items-center">
        <div className="relative z-10">
          <p className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-fuchsia-300/90 bg-white/5 ring-1 ring-white/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Delivered in 30 minutes via FedEx
          </p>
          <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-[1.05] bg-gradient-to-br from-white to-slate-300 bg-clip-text text-transparent">
            Guilt‑Free Indulgence. Packed with Protein. Delivered in a Flash.
          </h1>
          <p className="mt-5 text-slate-300/90 text-lg max-w-xl">
            Mini-sized, sugar-free, low‑calorie, high‑protein ice creams. Creamy taste meets fast, reliable delivery straight to your door.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button onClick={onShopClick} className="px-5 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:shadow-[0_8px_30px_rgba(99,102,241,.45)] transition text-white font-semibold">
              Explore Flavors
            </button>
            <a href="#order" className="px-5 py-3 rounded-xl border border-white/10 hover:border-white/30 text-slate-200 hover:text-white transition">Order Now</a>
          </div>
          <div className="mt-8 flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2"><ShieldIcon /> 0g sugar</span>
            <span className="flex items-center gap-2"><BoltIcon /> 12–15g protein</span>
            <span className="flex items-center gap-2"><ClockIcon /> 90–110 cal</span>
          </div>
        </div>
        <div className="relative h-[480px] md:h-[560px]">
          <HeroVisual />
        </div>
      </div>
    </section>
  )
}

function ValueProps() {
  const props = [
    {
      title: 'Guilt‑Free Indulgence',
      desc: 'Decadent flavor. Zero sugar. Mini portions for mindful snacking.'
    },
    {
      title: 'Packed with Protein',
      desc: '12–15g of clean protein per mini cup to fuel your day.'
    },
    {
      title: 'Delivered in a Flash',
      desc: 'Fresh to frozen in 30 minutes or less with FedEx reliability.'
    }
  ]
  return (
    <section className="relative">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-6">
        {props.map((p) => (
          <div key={p.title} className="p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl hover:-translate-y-0.5 transition will-change-transform">
            <h3 className="text-xl font-semibold mb-2 text-white">{p.title}</h3>
            <p className="text-slate-300/90">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function FlavorGallery({ flavors, selected, onSelect }) {
  return (
    <section id="flavors" className="relative py-8 md:py-14">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-end justify-between mb-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Flavor gallery</h2>
            <p className="text-slate-400 mt-2">3D product cards. Hover to tilt. Click to select.</p>
          </div>
          <a href="#order" className="hidden md:inline-flex px-4 py-2 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition">Order selected</a>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {flavors.map((f) => (
            <FlavorCard key={f.id} flavor={f} active={selected === f.id} onClick={() => onSelect(f.id)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FlavorCard({ flavor, active, onClick }) {
  const cardRef = useRef(null)
  const [rot, setRot] = useState({ x: 0, y: 0 })

  const handleMove = (e) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    const rx = (py - 0.5) * -10
    const ry = (px - 0.5) * 10
    setRot({ x: rx, y: ry })
  }

  const reset = () => setRot({ x: 0, y: 0 })

  return (
    <div className="[perspective:1000px]" onMouseLeave={reset} onMouseMove={handleMove}>
      <button
        ref={cardRef}
        onClick={onClick}
        className={`relative w-full h-80 rounded-2xl p-1 transition-transform [transform-style:preserve-3d] ${
          active ? 'ring-2 ring-violet-400/70' : 'ring-1 ring-white/10'
        }`}
        style={{ transform: `rotateX(${rot.x}deg) rotateY(${rot.y}deg)` }}
      >
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background: `linear-gradient(135deg, ${flavor.colorA}, ${flavor.colorB})`,
            filter: 'saturate(1.1)'
          }}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/10 to-black/20 mix-blend-overlay" />
        <div className="relative z-10 h-full rounded-2xl p-4 flex flex-col justify-between">
          <div className="flex items-center justify-between text-white">
            <span className="text-sm px-2 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/20">Mini • Sugar‑Free</span>
            <span className="text-sm px-2 py-1 rounded-full bg-black/20 backdrop-blur-md border border-white/20">{flavor.protein}g protein</span>
          </div>
          <div className="grid place-items-center">
            <CanVisual />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-semibold text-white drop-shadow-sm">{flavor.name}</h3>
            <p className="text-sm text-white/90">{flavor.blurb}</p>
            <div className="mt-1 text-xs text-white/80">{flavor.calories} cal • 0g sugar</div>
          </div>
        </div>
        <div className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-0 hover:opacity-100 transition" style={{ background: 'radial-gradient(600px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,.18), transparent 40%)' }} />
      </button>
    </div>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="relative py-16">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-6">Fast shipping, visualized</h2>
        <p className="text-slate-400 mb-8">From click to door in 30 minutes or less.</p>
        <div className="relative h-40 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1 bg-white/10" />
          <div className="absolute inset-x-6 top-1/2 -translate-y-1/2 flex justify-between text-xs text-slate-300">
            <span>Order placed</span>
            <span>Packed & dispatched</span>
            <span>On the way</span>
            <span>At your door</span>
          </div>
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2 h-1">
            <div className="h-1 bg-gradient-to-r from-fuchsia-400 via-violet-400 to-cyan-400 animate-progress" />
          </div>
          <div className="absolute left-6 right-6 top-1/2 -translate-y-1/2">
            <div className="w-8 h-8 -mt-3 rounded-full bg-white shadow-xl shadow-fuchsia-500/30 animate-dot" />
          </div>
        </div>
      </div>
    </section>
  )
}

function Testimonials() {
  const items = [
    {
      name: 'Avery T.',
      text: 'Tastes like a treat, stats like a protein shake. Unreal delivery speed.'
    },
    {
      name: 'Jordan M.',
      text: 'Mini size is perfect. Zero sugar and still creamy? I am in.'
    },
    { name: 'Samira K.', text: 'Arrived frosty in 22 minutes. New nightly ritual.' }
  ]
  return (
    <section id="testimonials" className="relative py-12">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold">Loved by snack optimists</h2>
        <div className="mt-6 grid md:grid-cols-3 gap-6">
          {items.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:-translate-y-1 transition">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-fuchsia-400 to-violet-500 grid place-items-center text-slate-900 font-bold">
                  {t.name.split(' ').map((w) => w[0]).join('')}
                </div>
                <div className="font-medium">{t.name}</div>
              </div>
              <p className="text-slate-300">“{t.text}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function OrderCTA({ flavors, selectedFlavor, onSelectFlavor, zip, onZip, qty, onQty, est, onEstimate, placing, onOrder }) {
  const selected = flavors.find((f) => f.id === selectedFlavor)
  return (
    <section id="order" className="relative py-16">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
          <div className="flex flex-col md:flex-row gap-8 items-stretch">
            <div className="md:w-1/2">
              <h3 className="text-2xl font-bold">Order minis</h3>
              <p className="text-slate-400 mt-2">Pick a flavor and get an instant delivery estimate.</p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {flavors.map((f) => (
                  <button key={f.id} onClick={() => onSelectFlavor(f.id)} className={`text-left p-3 rounded-xl border transition ${selectedFlavor === f.id ? 'border-violet-400/70 bg-violet-400/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>
                    <div className="font-medium">{f.name}</div>
                    <div className="text-xs text-slate-300">{f.calories} cal • {f.protein}g protein</div>
                  </button>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[4, 8, 12].map((n) => (
                  <button key={n} onClick={() => onQty(n)} className={`p-3 rounded-xl border transition ${qty === n ? 'border-fuchsia-400/70 bg-fuchsia-400/10' : 'border-white/10 bg-white/5 hover:border-white/30'}`}>{n} minis</button>
                ))}
              </div>
              <div className="mt-6">
                <label className="text-sm text-slate-300">ZIP code</label>
                <div className="mt-2 flex gap-2">
                  <input value={zip} onChange={(e) => onZip(e.target.value)} placeholder="e.g., 10001" className="w-full px-4 py-3 rounded-xl bg-black/30 border border-white/10 outline-none focus:border-white/30" />
                  <button onClick={onEstimate} className="px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 hover:opacity-90 transition">Estimate</button>
                </div>
                {est && (
                  <div className="mt-3 text-sm text-emerald-300 flex items-center gap-2"><ClockIcon /> Estimated delivery: {est} minutes via FedEx</div>
                )}
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="h-full rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 border border-white/10 p-6 flex flex-col">
                <div className="flex-1 grid place-items-center">
                  <div className="scale-110">
                    <CanVisual />
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-lg">{selected?.name}</div>
                      <div className="text-sm text-slate-400">{qty} minis • {selected?.calories} cal each • {selected?.protein}g protein</div>
                    </div>
                    <div className="text-right">
                      <div className="text-slate-400 text-sm">Delivered in</div>
                      <div className="text-xl font-bold">{est || 25} min</div>
                    </div>
                  </div>
                  <button disabled={placing} onClick={onOrder} className="mt-4 w-full py-3 rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-emerald-400 text-slate-900 font-semibold hover:brightness-110 disabled:opacity-70">
                    {placing ? 'Placing…' : 'Place order'}
                  </button>
                  <p className="mt-2 text-xs text-slate-400">FedEx priority cold-chain delivery. Free shipping over 12 minis.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function HeroVisual() {
  return (
    <div className="absolute inset-0 grid place-items-center">
      <div className="relative w-full max-w-md aspect-[4/5]">
        <div className="absolute -inset-8 rounded-[40px] bg-gradient-to-br from-fuchsia-500/20 via-indigo-500/10 to-cyan-500/20 blur-3xl" />
        <div className="relative z-10 w-full h-full grid place-items-center">
          <div className="flex flex-col items-center gap-6">
            <StackedCans />
            <div className="flex items-center gap-3 text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" /> Ice‑cold. Rush delivery.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function StackedCans() {
  return (
    <div className="relative h-[340px] w-[260px]">
      <div className="absolute left-4 top-14 rotate-[-12deg] scale-95">
        <MiniCan gradient="linear-gradient(135deg,#56CCF2,#2F80ED)" label="Mint Turbo" />
      </div>
      <div className="absolute left-20 top-0 rotate-[8deg]">
        <MiniCan gradient="linear-gradient(135deg,#8EC5FC,#E0C3FC)" label="Vanilla Sky" />
      </div>
      <div className="absolute right-4 top-24 rotate-[16deg] scale-90">
        <MiniCan gradient="linear-gradient(135deg,#FF9A9E,#FAD0C4)" label="Berry Sprint" />
      </div>
    </div>
  )
}

function MiniCan({ gradient, label }) {
  return (
    <div className="relative w-40 h-44 [filter:drop-shadow(0_20px_30px_rgba(0,0,0,.35))]">
      <div className="absolute inset-x-2 top-2 h-5 rounded-t-[24px] bg-white/60" />
      <div className="absolute inset-x-0 top-4 h-2 rounded-t-full bg-white/70" />
      <div className="absolute inset-x-0 top-6 bottom-2 rounded-b-[22px] border border-black/10 overflow-hidden">
        <div className="absolute inset-0" style={{ background: gradient }} />
        <div className="absolute inset-0 bg-[radial-gradient(120px_60px_at_30%_-10%,rgba(255,255,255,.5),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20" />
        <div className="absolute inset-x-0 bottom-0 h-8 bg-black/10" />
        <div className="absolute inset-x-0 bottom-0 h-2 rounded-b-full bg-black/30" />
        <div className="absolute left-0 right-0 top-10 mx-auto w-[70%] text-center text-[10px] tracking-widest uppercase text-white/95 font-semibold bg-black/20 rounded-full py-1">
          FedEx Ice Cream
        </div>
        <div className="absolute left-0 right-0 top-20 mx-auto w-[80%] text-center text-xs text-white/95 font-bold">
          {label}
        </div>
      </div>
    </div>
  )
}

function CanVisual() {
  return (
    <div className="relative w-40 h-48 [filter:drop-shadow(0_20px_30px_rgba(0,0,0,.35))]">
      <div className="absolute inset-x-3 top-2 h-5 rounded-t-[24px] bg-white/60" />
      <div className="absolute inset-x-1 top-4 h-2 rounded-t-full bg-white/70" />
      <div className="absolute inset-x-0 top-6 bottom-2 rounded-b-[22px] border border-black/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-fuchsia-400" />
        <div className="absolute inset-0 bg-[radial-gradient(160px_80px_at_30%_-10%,rgba(255,255,255,.5),transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/20" />
        <div className="absolute left-0 right-0 top-12 mx-auto w-[70%] text-center text-[10px] tracking-widest uppercase text-white/95 font-semibold bg-black/20 rounded-full py-1">
          FedEx Ice Cream
        </div>
        <div className="absolute left-0 right-0 top-24 mx-auto w-[80%] text-center text-xs text-white/95 font-bold">
          High‑Protein Mini
        </div>
      </div>
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-28 h-4 rounded-full bg-black/50 blur-md opacity-60" />
    </div>
  )
}

function Logo3D() {
  return (
    <div className="relative w-9 h-9">
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-fuchsia-500 to-violet-500" />
      <div className="absolute inset-0 rounded-xl bg-white/10 mix-blend-overlay" />
      <div className="absolute inset-0 grid place-items-center text-slate-950 font-extrabold">FI</div>
    </div>
  )
}

function SceneBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] bg-fuchsia-500/20 rounded-full blur-3xl" />
      <div className="absolute top-40 -right-40 w-[560px] h-[560px] bg-indigo-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-10 left-1/3 w-[420px] h-[420px] bg-cyan-500/10 rounded-full blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(60rem_30rem_at_top_right,rgba(255,255,255,.06),transparent)]" />
    </div>
  )
}

function Footer() {
  return (
    <footer className="relative py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4 text-slate-400">
        <div className="flex items-center gap-3">
          <Logo3D />
          <div>© {new Date().getFullYear()} FedEx Ice Cream. All rights reserved.</div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <a href="#flavors" className="hover:text-white">Flavors</a>
          <a href="#timeline" className="hover:text-white">Delivery</a>
          <a href="#order" className="hover:text-white">Order</a>
        </div>
      </div>
    </footer>
  )
}

function GlobalStyles() {
  return (
    <style>{`
      .animate-progress { animation: progress 6s ease-in-out infinite; }
      .animate-dot { animation: dot 6s ease-in-out infinite; }
      @keyframes progress {
        0% { width: 0%; }
        50% { width: 100%; }
        100% { width: 0%; }
      }
      @keyframes dot {
        0% { transform: translateX(0); }
        50% { transform: translateX(calc(100% - 2rem)); }
        100% { transform: translateX(0); }
      }
    `}</style>
  )
}

function BoltIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-300">
      <path d="M11 21h-1l1-7H7l6-11h1l-1 7h4l-6 11z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-emerald-300">
      <path d="M12 2l7 4v6c0 5-3.8 9.7-7 10-3.2-.3-7-5-7-10V6l7-4z" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="text-cyan-300">
      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 11H7v-2h4V5h2v8z" />
    </svg>
  )
}
