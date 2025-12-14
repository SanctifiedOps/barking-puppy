import React from "react"

const contractAddress = "HpBW3bnSQx9ywe8ZbPQtgeFxPoxFPXBNwy9rNXRLbonk"
const ticker = "$WHITEHOUSE"
const mainX = "https://x.com/whitehouseusd1"
const xCommunity = "https://x.com/i/communities/1999923220523450384"

const bonkUrl = "https://bonk.fun/token/HpBW3bnSQx9ywe8ZbPQtgeFxPoxFPXBNwy9rNXRLbonk"

const aboutCopy = {
  title: "From the Desk of the Meme House",
  body: [
    "WHITEHOUSE exists for people who believe culture moves markets, and that memes are no longer background noise. They are the signal. On Solana, speed matters, visibility matters, and showing up in public matters. This office was formed to represent that reality, not dress it up.",
    "We operate as the meme wing of Solana. The timeline is our briefing room, the replies are our town hall, and every post is an announcement made in full view. There are no closed doors here. What resonates travels. What doesn't gets left behind. That is how culture has always worked.",
    "This is not about being early, and it is not about being promised anything. It is about participation. Holding $WHITEHOUSE means you're part of the room when it happens. You're watching it form, reacting in real time, and pushing it forward with the rest of the country.",
    "Every holder is part of the cabinet, whether they planned to be or not. Executive orders take the shape of memes. Policy is set by attention. Momentum is built collectively, on-chain, with receipts. We're here to laugh, to move fast, and to remind everyone that this space belongs to the people who show up.",
    "This isn't chaos. It's coordination, Solana-style. Public, unapologetic, and moving forward together.",
    "In memes we trust."
  ]
}

const mediaPalette = [
  { color: "#0b2f6f", accent: "#f0383f" },
  { color: "#0d2147", accent: "#3a6edc" },
  { color: "#102c5e", accent: "#f86c73" },
  { color: "#081224", accent: "#2c63cf" },
  { color: "#0e1c3f", accent: "#ff6b74" }
]

const mediaGlob = import.meta.glob("../public/whart*.png", { eager: true, as: "url" })

const mediaItems = (() => {
  const entries = Object.entries(mediaGlob).map(([path, src]) => {
    const match = path.match(/whart\s*\((\d+)\)/i)
    const index = match ? Number(match[1]) : 999
    return { src, index, title: `WH Meme ${match ? match[1] : ""}`.trim() }
  })
  if (entries.length === 0) {
    return mediaPalette.map((p, idx) => ({
      title: ["Oval Office Energy", "Cabinet Briefing", "Meme Stimulus", "Executive Orders", "Red, White & Brew"][idx] || `Meme ${idx + 1}`,
      color: p.color,
      accent: p.accent
    }))
  }
  return entries
    .sort((a, b) => a.index - b.index)
    .map((entry, idx) => ({
      title: entry.title || `WH Meme ${idx + 1}`,
      color: mediaPalette[idx % mediaPalette.length].color,
      accent: mediaPalette[idx % mediaPalette.length].accent,
      src: entry.src
    }))
})()

const linkTiles = [
  { label: "Buy " + ticker, href: bonkUrl, description: "Swap SOL for the meme office pass", primary: true },
  { label: "Main X", href: mainX, description: "Official statements and announcements" },
  { label: "X Community", href: xCommunity, description: "Cabinet chatter and open coordination" }
]

const missionPillars = [
  {
    title: "Inform",
    body:
      "Surface the signal first. We publish in public, share receipts, and keep the country updated on what matters on Solana."
  },
  {
    title: "Inspire",
    body:
      "Turn memes into motion. We celebrate the wins, remix the culture, and show how fast things move when everyone sees the mission."
  },
  {
    title: "Lead",
    body:
      "Set the pace for the timeline. Holders act as the cabinet, steering attention, backing the best ideas, and keeping the meme machine honest."
  }
]

const buySteps = [
  {
    step: "Step 1",
    title: "Fund your wallet",
    body: "Load up a Solana wallet (Phantom, Backpack, or your pick) so you're ready to move when the briefing drops."
  },
  {
    step: "Step 2",
    title: "Paste the $WHITEHOUSE contract",
    body: "Use your preferred DEX or aggregator, paste the official address, and confirm the ticker and art match the Whitehouse brand."
  },
  {
    step: "Step 3",
    title: "Join the country",
    body: "Complete the swap, secure your keys, and plug into the cabinet. Show up on the timeline and help steer the story."
  }
]

export default function App() {
  const [copied, setCopied] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const [selectedMedia, setSelectedMedia] = React.useState(null)
  const mediaTrackRef = React.useRef(null)
  const [menuOpen, setMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const targets = document.querySelectorAll("[data-animate]")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible")
          }
        })
      },
      { threshold: 0.18, rootMargin: "0px 0px -10% 0px" }
    )

    targets.forEach((el) => {
      // Immediately mark items already in view (e.g., hero) so they don't remain hidden
      const rect = el.getBoundingClientRect()
      if (rect.top < window.innerHeight * 0.9) {
        el.classList.add("visible")
      }
      observer.observe(el)
    })

    return () => {
      targets.forEach((el) => observer.unobserve(el))
    }
  }, [])

  React.useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setSelectedMedia(null)
        setMenuOpen(false)
      }
    }
    const handleResize = () => {
      if (window.innerWidth > 900) setMenuOpen(false)
    }
    window.addEventListener("keydown", handleEsc)
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("keydown", handleEsc)
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(contractAddress)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch (_err) {
      setCopied(true)
    }
  }

  const handleMediaScroll = (direction) => {
    const track = mediaTrackRef.current
    if (!track) return
    const scrollAmount = track.clientWidth * 0.8
    track.scrollBy({ left: direction === "next" ? scrollAmount : -scrollAmount, behavior: "smooth" })
    setPaused(true)
  }

  const openMedia = (item) => {
    setSelectedMedia(item)
    setPaused(true)
  }

  const downloadMedia = () => {
    if (!selectedMedia) return
    const link = document.createElement("a")
    link.download = `${selectedMedia.title.replace(/\s+/g, "-") || "whitehouse-media"}.png`
    link.href = selectedMedia.src || ""
    link.click()
  }

  return (
    <div className="page">
      <div className="ribbon" aria-hidden="true" />
      <header className="site-header">
        <div className="brand">
          <img src="/wh-meme.svg" alt="Whitehouse meme mark" className="brand-mark" />
          <div>
            <p className="brand-kicker">Meme Office</p>
            <p className="brand-name">{ticker}</p>
          </div>
        </div>
        <button
          className={`menu-toggle ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen((s) => !s)}
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
        <div className={`nav-drawer ${menuOpen ? "open" : ""}`}>
          <nav className="nav">
            <a href="#hero" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#mission" onClick={() => setMenuOpen(false)}>
              Mission
            </a>
            <a href="#media" onClick={() => setMenuOpen(false)}>
              Media
            </a>
            <a href="#links" onClick={() => setMenuOpen(false)}>
              Links
            </a>
          </nav>
          <div className="cta-row">
            <button className="chip ghost" onClick={handleCopy}>
              {copied ? "Copied" : "Copy CA"}
            </button>
            <a className="chip primary" href={bonkUrl} target="_blank" rel="noreferrer">
              Buy {ticker}
            </a>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="hero-wrap" id="hero">
          <div className="hero-card">
            <div className="hero-left">
              <div className="pill-row">
                <span className="pill filled">Solana Native</span>
                <span className="pill outline">Community Owned</span>
              </div>
              <h1>This is an official {ticker} communication.</h1>
              <p className="lede">
                We treat the timeline like a briefing room, release statements as memes, and let the public decide what
                carries weight.
              </p>
              <div className="hero-actions">
                <a className="button primary" href={bonkUrl} target="_blank" rel="noreferrer">
                  Buy {ticker}
                </a>
                <a className="button ghost" href={xCommunity} target="_blank" rel="noreferrer">
                  X Community
                </a>
                <a className="button ghost" href={mainX} target="_blank" rel="noreferrer">
                  Main X
                </a>
              </div>
              <p className="micro">In memes we trust.</p>
            </div>
            <div className="hero-right">
              <div className="hero-art">
                <img src="/wh-meme.svg" alt="Whitehouse meme art" className="hero-img" />
              </div>
            </div>
          </div>
        </section>

        <section className="mission-section" id="mission">
          <div className="section-tag">Mission</div>
          <h2>Inform, inspire, and lead the country.</h2>
          <p className="section-lede">
            WHITEHOUSE shows up in public. Briefings happen on the timeline, energy is earned together, and every holder
            helps steer the story.
          </p>
          <div className="mission-grid">
            {missionPillars.map((pillar) => (
              <div key={pillar.title} className="mission-card">
                <p className="mission-title">{pillar.title}</p>
                <p className="mission-body">{pillar.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <div className="section-tag">About</div>
          <h2>{aboutCopy.title}</h2>
          <div className="about-body">
            {aboutCopy.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </section>

        <section className="media-section" id="media">
          <div className="section-tag">Media</div>
          <h2>Moments from the movement</h2>
          <p className="section-lede">A rolling gallery straight from the internet West Wing. Pause for the briefing or let it cruise.</p>
          <div className="media-controls">
            <button className="circle-btn" onClick={() => handleMediaScroll("prev")} aria-label="Previous media">
              ←
            </button>
            <button className="circle-btn" onClick={() => setPaused((s) => !s)} aria-label="Toggle motion">
              {paused ? "▶" : "⏸"}
            </button>
            <button className="circle-btn" onClick={() => handleMediaScroll("next")} aria-label="Next media">
              →
            </button>
          </div>
          <div className={`media-track ${paused ? "paused" : ""}`} ref={mediaTrackRef}>
            {mediaItems.map((item, idx) => (
              <button
                key={`${item.title || "wh-meme"}-${idx}`}
                className="media-card"
                style={{ background: `linear-gradient(145deg, ${item.color}, ${item.accent})` }}
                onClick={() => openMedia(item)}
                aria-label={`Open ${item.title || "Whitehouse meme"}`}
              >
                {item.src && <img src={item.src} alt={item.title} className="media-img" />}
                <div className="media-overlay" />
              </button>
            ))}
          </div>
        </section>

        <section className="buy-section" id="buy">
          <div className="section-tag">Buy</div>
          <h2>Three steps to join the administration</h2>
          <p className="section-lede">
            Always double-check contract addresses and only move what you can afford to risk. Keep receipts, stay public.
          </p>
          <div className="buy-grid">
            {buySteps.map((step, idx) => (
              <div key={step.title} className="buy-card">
                <p className="step-label">{step.step}</p>
                <p className="step-title">{step.title}</p>
                <p className="step-body">{step.body}</p>
                {idx === 0 && (
                  <a className="button primary step-action" href={bonkUrl} target="_blank" rel="noreferrer">
                    Buy on Bonk.fun
                  </a>
                )}
                {idx === 1 && (
                  <button className="button primary step-action" onClick={handleCopy}>
                    {copied ? "Copied" : "Copy CA"}
                  </button>
                )}
                {idx === 2 && (
                  <a className="button primary step-action" href={xCommunity} target="_blank" rel="noreferrer">
                    Join the administration
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="links-section" id="links">
          <div className="section-tag">Links</div>
          <h2>Secure your seat in the West Wing</h2>
          <p className="section-lede">Official links only. Bookmark and ignore impostors.</p>
          <div className="link-tiles">
            {linkTiles.map((link) => (
              <a
                key={link.label}
                className={`link-tile ${link.primary ? "primary" : ""}`}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noreferrer" : undefined}
              >
                <span>{link.label}</span>
                <span className="link-desc">{link.description}</span>
                <span className="link-arrow">{"->"}</span>
              </a>
            ))}
          </div>
        </section>
      </main>

      <footer className="site-footer" id="footer">
        <p className="foot-year">(c) {new Date().getFullYear()} Whitehouse Meme Office</p>
        <p className="foot-note">
          WHITEHOUSE is a community-driven meme project on Solana. Holders coordinate in public and move fast together.
        </p>
        <p className="foot-note">
          Nothing here is financial advice. Verify contract addresses ({contractAddress}), stay skeptical, and never
          risk more than you can lose.
        </p>
      </footer>

      {selectedMedia && (
        <div className="lightbox" onClick={() => setSelectedMedia(null)} role="dialog" aria-modal="true">
          <div className="lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div
              className="lightbox-art"
              style={{ background: `linear-gradient(145deg, ${selectedMedia.color}, ${selectedMedia.accent})` }}
            >
              {selectedMedia.src && <img src={selectedMedia.src} alt={selectedMedia.title} className="media-img" />}
              <div className="media-overlay" />
            </div>
            <div className="lightbox-actions">
              <button className="button ghost" onClick={() => setSelectedMedia(null)}>
                Close
              </button>
              <button className="button primary" onClick={downloadMedia}>
                Download artwork
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
