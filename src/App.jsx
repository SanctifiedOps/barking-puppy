import React from "react"

const contractAddress = "TBA"
const ticker = "$UNDISPUTED"
const mainX = "#"
const xCommunity = "#"
const launchUrl = "#buy"
const truthPostUrl = "https://truthsocial.com/@realDonaldTrump/114857957325423668"
const truthProfileUrl = "https://truthsocial.com/@realDonaldTrump"
const statsTokenAddress = "GMvCfcZg8YvkkQmwDaAzCtHDrrEtgE74nQpQ7xNabonk"

const aboutCopy = {
  title: "The Undisputed Narrative",
  body: [
    {
      lead: "Undisputed Coin",
      text:
        "(" +
        ticker +
        ") is a meme coin built on the belief that America is the undisputed leader in digital assets. The eagle mascot stands for champions and pioneers who refuse to play second."
    },
    {
      lead: "Narrative",
      text:
        "WLFI and USD1 momentum collides with the meme velocity of Bonk, capturing a moment where culture and capital move together on-chain."
    },
    {
      lead: "Community",
      text:
        "Launched on USD1 and powered by holders who believe in the American dream of financial freedom, coordination, and bold public momentum."
    }
  ]
}

const mediaPalette = [
  { color: "#0b2f6f", accent: "#d6a347" },
  { color: "#0d2147", accent: "#e1b35a" },
  { color: "#102c5e", accent: "#f0c36a" },
  { color: "#081224", accent: "#cfa047" },
  { color: "#0e1c3f", accent: "#f2c97c" }
]

const mediaGlob = import.meta.glob("../public/whart*.png", { eager: true, as: "url" })

const mediaItems = (() => {
  const entries = Object.entries(mediaGlob).map(([path, src]) => {
    const match = path.match(/whart\s*\((\d+)\)/i)
    const index = match ? Number(match[1]) : 999
    return { src, index, title: `Undisputed Meme ${match ? match[1] : ""}`.trim() }
  })
  if (entries.length === 0) {
    return mediaPalette.map((p, idx) => ({
      title: ["Eagle Standard", "USD1 Live", "WLFI Signal", "Undisputed Champions", "Digital Asset Frontier"][idx] || `Meme ${idx + 1}`,
      color: p.color,
      accent: p.accent
    }))
  }
  return entries
    .sort((a, b) => a.index - b.index)
    .map((entry, idx) => ({
      title: entry.title || `Undisputed Meme ${idx + 1}`,
      color: mediaPalette[idx % mediaPalette.length].color,
      accent: mediaPalette[idx % mediaPalette.length].accent,
      src: entry.src
    }))
})()

const linkTiles = [
  { label: "Buy on USD1", href: launchUrl, description: "Swap details and routes", primary: true },
  { label: "Main X", href: mainX, description: "Official announcements and statements" },
  { label: "Community", href: xCommunity, description: "Champions, pioneers, and coordination" }
]

const missionPillars = [
  {
    title: "Champion",
    body:
      "Carry the eagle signal and back the call for America to lead digital assets."
  },
  {
    title: "Pioneer",
    body:
      "Push WLFI and USD1 momentum, move fast, and keep the narrative on-chain."
  },
  {
    title: "Freedom",
    body:
      "Build the American dream of financial freedom with a community-first meme economy."
  }
]

const buySteps = [
  {
    step: "Step 1",
    title: "Set up your wallet",
    body: "Get a wallet ready and follow official channels so you can move fast and safely."
  },
  {
    step: "Step 2",
    title: "Prepare USD1",
    body: "Acquire USD1 and double-check the official contract address on every swap."
  },
  {
    step: "Step 3",
    title: "Swap for " + ticker,
    body: "Use the official USD1 route, secure your keys, and join the champions."
  }
]

const roadmapSteps = [
  {
    phase: "Phase 1",
    title: "Launch and community build",
    body:
      "We went live on USD1 and rallied the first wave of champions. The goal is visibility, momentum, and a daily flow of memes that keep the story front and center."
  },
  {
    phase: "Phase 2",
    title: "Reinvest into the brand",
    body:
      "Creator fees go back into sharper art, cinematic video drops, giveaways, and community airdrops that reward the loudest supporters."
  },
  {
    phase: "Phase 3",
    title: "Allied partnerships",
    body:
      "We team with WLFI and USD1 aligned creators, brands, and communities. Expect competitions, collabs, and virtual events that push reach and hype."
  },
  {
    phase: "Phase 4",
    title: "Undisputed expansion",
    body:
      "Community led initiatives, charitable donations, listing explorations, and the Undisputed commemorative challenge coin giveaway."
  }
]

export default function App() {
  const [copied, setCopied] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const [selectedMedia, setSelectedMedia] = React.useState(null)
  const mediaTrackRef = React.useRef(null)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [stats, setStats] = React.useState({
    price: null,
    fdv: null,
    volume24h: null,
    liquidity: null,
    holders: null,
    updatedAt: null
  })

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

  React.useEffect(() => {
    let isActive = true
    const fetchStats = async () => {
      try {
        const response = await fetch(`https://api.dexscreener.com/latest/dex/tokens/${statsTokenAddress}`)
        if (!response.ok) throw new Error("Failed to load stats")
        const data = await response.json()
        const pairs = Array.isArray(data.pairs) ? data.pairs : []
        const bestPair = pairs.reduce((best, pair) => {
          if (!pair?.liquidity?.usd) return best
          if (!best) return pair
          return pair.liquidity.usd > best.liquidity.usd ? pair : best
        }, null)

        if (!bestPair || !isActive) return

        setStats({
          price: Number(bestPair.priceUsd) || null,
          fdv: bestPair.fdv || bestPair.marketCap || null,
          volume24h: bestPair.volume?.h24 || null,
          liquidity: bestPair.liquidity?.usd || null,
          holders: null,
          updatedAt: Date.now()
        })
      } catch (_err) {
        if (!isActive) return
        setStats((prev) => ({ ...prev, updatedAt: Date.now() }))
      }
    }

    fetchStats()
    const intervalId = window.setInterval(fetchStats, 30000)
    return () => {
      isActive = false
      window.clearInterval(intervalId)
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
    link.download = `${selectedMedia.title.replace(/\s+/g, "-") || "undisputed-media"}.png`
    link.href = selectedMedia.src || ""
    link.click()
  }

  const formatUsd = (value, options = {}) => {
    if (value === null || Number.isNaN(value)) return "—"
    const formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      ...options
    })
    return formatter.format(value)
  }

  const formatCompact = (value, options = {}) => {
    if (value === null || Number.isNaN(value)) return "—"
    const formatter = new Intl.NumberFormat("en-US", {
      notation: "compact",
      maximumFractionDigits: 2,
      ...options
    })
    return formatter.format(value)
  }

  const statsItems = [
    { label: "Price", value: formatUsd(stats.price, { maximumFractionDigits: stats.price && stats.price < 1 ? 6 : 2 }) },
    { label: "FDV", value: formatUsd(stats.fdv, { notation: "compact", maximumFractionDigits: 2 }) },
    { label: "Holders", value: stats.holders ? formatCompact(stats.holders) : "—" },
    { label: "Volume (24h)", value: formatUsd(stats.volume24h, { notation: "compact", maximumFractionDigits: 2 }) },
    { label: "Liquidity", value: formatUsd(stats.liquidity, { notation: "compact", maximumFractionDigits: 2 }) }
  ]

  return (
    <div className="page">
      <div className="ribbon" aria-hidden="true" />
      <header className="site-header">
        <div className="brand">
          <img src="/UDUSD1%20FAVICON.png" alt="Undisputed coin mark" className="brand-mark" />
          <div>
            <p className="brand-kicker">Undisputed Coin</p>
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
            <a href="#about" onClick={() => setMenuOpen(false)}>
              About
            </a>
            <a href="#mission" onClick={() => setMenuOpen(false)}>
              Mission
            </a>
            <a href="#buy" onClick={() => setMenuOpen(false)}>
              Buy
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
            <a className="chip primary" href={launchUrl}>
              Buy on USD1
            </a>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="hero-wrap" id="hero">
          <div className="hero-card">
            <div className="hero-art">
              <img src="/UCUSD1-EAGLE.png" alt="Undisputed eagle art" className="hero-img" />
            </div>
            <div className="hero-left">
              <div className="hero-title-wrap">
                <img src="/UCUSD1-Hero.png" alt="Undisputed hero title" className="hero-title-image" />
              </div>
              <p className="hero-kicker">The Leader In Digital Assets</p>
              <div className="hero-actions">
                <a className="button primary" href={launchUrl}>
                  Buy on USD1
                </a>
                <a className="button ghost" href="#about">
                  Read the narrative
                </a>
                <a className="button ghost" href="#mission">
                  Mission
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="stats-strip animate" id="stats" data-animate>
          <div className="stats-shell">
            <div className="stats-header">
              <span className="stats-label">Live Stats</span>
              <span className="stats-meta">
                {stats.updatedAt ? "Auto-refresh every 30s" : "Loading live data"}
              </span>
            </div>
            <div className="stats-bar">
              <div className="stats-marquee">
                <div className="stats-track">
                  {statsItems.map((item) => (
                    <div key={item.label} className="stats-item">
                      <span className="stats-name">{item.label}</span>
                      <span className="stats-value">{item.value}</span>
                    </div>
                  ))}
                </div>
                <div className="stats-track stats-track--clone" aria-hidden="true">
                  {statsItems.map((item) => (
                    <div key={`${item.label}-clone`} className="stats-item">
                      <span className="stats-name">{item.label}</span>
                      <span className="stats-value">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section animate" id="about" data-animate>
          <div className="section-tag">About</div>
          <h2>{aboutCopy.title}</h2>
          <div className="about-body">
            {aboutCopy.body.map((item) => (
              <p key={item.lead}>
                <strong>{item.lead}.</strong> {item.text}
              </p>
            ))}
          </div>
          <div className="truth-embed">
            <div className="truth-embed__header">
              <span className="truth-embed__label">Truth Social</span>
              <a className="truth-embed__handle" href={truthProfileUrl} target="_blank" rel="noreferrer">
                @realDonaldTrump
              </a>
            </div>
            <div className="truth-embed__frame">
              <img src="/ucusd1-trump.png" alt="Truth Social update screenshot" className="truth-embed__image" />
            </div>
            <div className="truth-embed__actions">
              <a className="button ghost truth-embed__cta" href={truthPostUrl} target="_blank" rel="noreferrer">
                View the post
              </a>
              <a className="button ghost truth-embed__cta" href={truthProfileUrl} target="_blank" rel="noreferrer">
                Visit Trump's page
              </a>
            </div>
          </div>
        </section>

        <section className="roadmap-section animate" id="roadmap" data-animate>
          <div className="section-tag">Roadmap</div>
          <h2>Undisputable Growth</h2>
          <p className="section-lede">
            Four phases designed to build hype, reward the loudest supporters, and expand the Undisputed movement.
          </p>
          <div className="roadmap-grid">
            {roadmapSteps.map((step) => (
              <div key={step.phase} className="roadmap-card">
                <p className="roadmap-phase">{step.phase}</p>
                <p className="roadmap-title">{step.title}</p>
                <p className="roadmap-body">{step.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mission-section animate" id="mission" data-animate>
          <div className="section-tag">Mission</div>
          <h2>Champions, pioneers, freedom.</h2>
          <p className="section-lede">
            Undisputed Coin backs the narrative that America leads digital assets, and the community makes it visible.
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

        <section className="media-section animate" id="media" data-animate>
          <div className="section-tag">Media</div>
          <h2>Eagle standard gallery</h2>
          <p className="section-lede">Shareable art for the champions. Pause for the moment or let it cruise.</p>
          <div className="media-controls">
            <button className="circle-btn" onClick={() => handleMediaScroll("prev")} aria-label="Previous media">
              {"<"}
            </button>
            <button className="circle-btn" onClick={() => setPaused((s) => !s)} aria-label="Toggle motion">
              {paused ? "||" : ">"}
            </button>
            <button className="circle-btn" onClick={() => handleMediaScroll("next")} aria-label="Next media">
              {">"}
            </button>
          </div>
          <div className={`media-track ${paused ? "paused" : ""}`} ref={mediaTrackRef}>
            {mediaItems.map((item, idx) => (
              <button
                key={`${item.title || "undisputed-meme"}-${idx}`}
                className="media-card"
                style={{ background: `linear-gradient(145deg, ${item.color}, ${item.accent})` }}
                onClick={() => openMedia(item)}
                aria-label={`Open ${item.title || "Undisputed meme"}`}
              >
                {item.src && <img src={item.src} alt={item.title} className="media-img" />}
                <div className="media-overlay" />
              </button>
            ))}
          </div>
        </section>

        <section className="buy-section animate" id="buy" data-animate>
          <div className="section-tag">Buy</div>
          <h2>Three steps to join the champions</h2>
          <p className="section-lede">
            Always double-check official links and contract addresses. Move only what you can afford to risk.
          </p>
          <div className="buy-grid">
            {buySteps.map((step, idx) => (
              <div key={step.title} className="buy-card">
                <p className="step-label">{step.step}</p>
                <p className="step-title">{step.title}</p>
                <p className="step-body">{step.body}</p>
                {idx === 0 && (
                  <a className="button primary step-action" href={launchUrl}>
                    Buy on USD1
                  </a>
                )}
                {idx === 1 && (
                  <button className="button primary step-action" onClick={handleCopy}>
                    {copied ? "Copied" : "Copy CA"}
                  </button>
                )}
                {idx === 2 && (
                  <a className="button primary step-action" href="#links">
                    Join the champions
                  </a>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="links-section animate" id="links" data-animate>
          <div className="section-tag">Links</div>
          <h2>Official channels</h2>
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
        <p className="foot-year">(c) {new Date().getFullYear()} Undisputed Coin</p>
        <p className="foot-note">
          Undisputed Coin is a community-driven meme project aligned with the USD1 narrative and the call for America to
          lead digital assets.
        </p>
        <p className="foot-note">
          Nothing here is financial advice. Verify contract addresses ({contractAddress}), stay skeptical, and never risk
          more than you can lose.
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
