import React from "react"

const contractAddress = "CkbYA87RiD7K8Gd4mrueha3UyUFfrethNV7zSgRbonk"
const ticker = "$UNDISPUTED"
const mainX = "https://x.com/UCUSD1"
const xCommunity = "https://x.com/i/communities/2014784341105135973"
const launchUrl = "https://bonk.fun/token/CkbYA87RiD7K8Gd4mrueha3UyUFfrethNV7zSgRbonk"
const truthPostUrl = "https://truthsocial.com/@realDonaldTrump/114857957325423668"
const truthProfileUrl = "https://truthsocial.com/@realDonaldTrump"
const statsTokenAddress = "CkbYA87RiD7K8Gd4mrueha3UyUFfrethNV7zSgRbonk"

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
        "The stablecoin revolution meets meme culture—riding the wave of America's push to dominate crypto. Culture and capital moving together on-chain."
    },
    {
      lead: "Community",
      text:
        "Powered by holders building the movement together. Every buy amplifies the signal. Every share expands the reach."
    }
  ]
}

const mediaPalette = [
  { color: "#0b2f6f", accent: "#d6a347" },
  { color: "#0d2147", accent: "#e1b35a" },
  { color: "#102c5e", accent: "#f0c36a" },
  { color: "#081224", accent: "#cfa047" },
  { color: "#0e1c3f", accent: "#f2c97c" },
  { color: "#0a2856", accent: "#daa520" },
  { color: "#091d42", accent: "#e8b84a" },
  { color: "#0c2a5c", accent: "#d4a84b" },
  { color: "#071530", accent: "#f5d080" },
  { color: "#0f2348", accent: "#c9a035" },
  { color: "#0b2050", accent: "#e0b050" },
  { color: "#0a1a3d", accent: "#f0c060" },
  { color: "#0d2860", accent: "#d8a840" },
  { color: "#08142a", accent: "#e5c070" }
]

const mediaGlob = import.meta.glob("../public/UDUSD1-PIC*.png", { eager: true, as: "url" })

const mediaItems = (() => {
  const entries = Object.entries(mediaGlob).map(([path, src]) => {
    const match = path.match(/UDUSD1-PIC\s*\((\d+)\)/i)
    const index = match ? Number(match[1]) : 999
    return { src, index, title: `Undisputed ${match ? match[1] : ""}`.trim() }
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
      "Share memes, stack " + ticker + ", and amplify the signal. Every holder strengthens the movement."
  },
  {
    title: "Pioneer",
    body:
      "Move fast, stay coordinated, and keep the narrative visible. First movers set the pace."
  },
  {
    title: "Freedom",
    body:
      "Build financial independence with a community that rewards participation and conviction."
  }
]

const buySteps = [
  {
    step: "Step 1",
    title: "Set up your wallet",
    body: "Download Phantom or Solflare. Bookmark our official X for verified links and updates."
  },
  {
    step: "Step 2",
    title: "Prepare USD1",
    body: "Get USD1 stablecoin ready. Always verify the contract address before any swap."
  },
  {
    step: "Step 3",
    title: "Swap for " + ticker,
    body: "Use the official route, secure your keys, and join the champions. Welcome aboard."
  }
]

const roadmapSteps = [
  {
    phase: "Phase 1",
    title: "Launch and community build",
    body:
      "Live on USD1. Rally the first wave of champions with daily memes, visibility campaigns, and coordinated community momentum."
  },
  {
    phase: "Phase 2",
    title: "Reinvest into the brand",
    body:
      "Fees reinvested into professional art, video drops, and weekly airdrops. Your trades fund content that pumps the narrative."
  },
  {
    phase: "Phase 3",
    title: "Allied partnerships",
    body:
      "Strategic collabs with aligned creators and communities. Competitions, events, and cross-promotion that expands our reach."
  },
  {
    phase: "Phase 4",
    title: "Undisputed expansion",
    body:
      "Community initiatives, charitable contributions, exchange explorations, and the exclusive commemorative challenge coin drop."
  }
]

export default function App() {
  const [copied, setCopied] = React.useState(false)
  const [paused, setPaused] = React.useState(false)
  const [selectedMedia, setSelectedMedia] = React.useState(null)
  const mediaTrackRef = React.useRef(null)
  const heroVideoRef = React.useRef(null)
  const [heroVideoMuted, setHeroVideoMuted] = React.useState(true)
  const [heroVideoPaused, setHeroVideoPaused] = React.useState(false)
  const [menuOpen, setMenuOpen] = React.useState(false)
  const [scrollProgress, setScrollProgress] = React.useState(0)
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
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = docHeight > 0 ? scrollTop / docHeight : 0
      setScrollProgress(progress)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleHeroVideoMute = () => {
    const nextMuted = !heroVideoMuted
    setHeroVideoMuted(nextMuted)
    if (heroVideoRef.current) {
      heroVideoRef.current.muted = nextMuted
    }
  }

  const toggleHeroVideoPlay = async () => {
    const video = heroVideoRef.current
    if (!video) return
    if (video.paused) {
      try {
        await video.play()
        setHeroVideoPaused(false)
      } catch (err) {
        setHeroVideoPaused(true)
      }
    } else {
      video.pause()
      setHeroVideoPaused(true)
    }
  }

  const restartHeroVideo = async () => {
    const video = heroVideoRef.current
    if (!video) return
    video.currentTime = 0
    if (video.paused) {
      try {
        await video.play()
        setHeroVideoPaused(false)
      } catch (err) {
        setHeroVideoPaused(true)
      }
    }
  }

  React.useEffect(() => {
    let isActive = true
    const fetchStats = async () => {
      try {
        const [dexResult, holdersResult] = await Promise.allSettled([
          fetch(`https://api.dexscreener.com/latest/dex/tokens/${statsTokenAddress}`),
          fetch(`/api/holders?mint=${statsTokenAddress}`)
        ])

        let holdersCount = null
        if (holdersResult.status === "fulfilled" && holdersResult.value.ok) {
          const holdersData = await holdersResult.value.json()
          holdersCount = holdersData?.holders ?? null
        }

        if (dexResult.status !== "fulfilled" || !dexResult.value.ok) {
          if (!isActive) return
          setStats((prev) => ({
            ...prev,
            holders: holdersCount ?? prev.holders,
            updatedAt: Date.now()
          }))
          return
        }

        const data = await dexResult.value.json()
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
          holders: holdersCount,
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
  const statsRow = [...statsItems, ...statsItems, ...statsItems]

  const isLoading = !stats.updatedAt

  return (
    <div className="page">
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
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
              <video
                src="/UCUSD1-VID2%20(2).mp4"
                autoPlay
                loop
                muted={heroVideoMuted}
                playsInline
                className="hero-video"
                ref={heroVideoRef}
                onPlay={() => setHeroVideoPaused(false)}
                onPause={() => setHeroVideoPaused(true)}
              />
              <div className="hero-video-controls" role="group" aria-label="Hero video controls">
                <button
                  type="button"
                  className="hero-icon-button"
                  onClick={toggleHeroVideoPlay}
                  aria-label={heroVideoPaused ? "Play video" : "Pause video"}
                  title={heroVideoPaused ? "Play" : "Pause"}
                >
                  {heroVideoPaused ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M8 5l11 7-11 7z" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                    </svg>
                  )}
                </button>
                <button
                  type="button"
                  className="hero-icon-button"
                  onClick={restartHeroVideo}
                  aria-label="Restart video"
                  title="Restart"
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                    <path d="M12 6V3L8 7l4 4V8a4 4 0 1 1-4 4H6a6 6 0 1 0 6-6z" />
                  </svg>
                </button>
                <button
                  type="button"
                  className="hero-icon-button"
                  onClick={toggleHeroVideoMute}
                  aria-label={heroVideoMuted ? "Unmute video" : "Mute video"}
                  title={heroVideoMuted ? "Unmute" : "Mute"}
                >
                  {heroVideoMuted ? (
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M4 9v6h4l5 5V4L8 9H4zM16 9l4 4m0-4l-4 4" />
                    </svg>
                  ) : (
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                      <path d="M4 9v6h4l5 5V4L8 9H4zM16 8a4 4 0 0 1 0 8M18.5 5.5a8 8 0 0 1 0 13" />
                    </svg>
                  )}
                </button>
              </div>
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
                <a className="button ghost" href="https://x.com/i/communities/2014784341105135973">
                  Community
                </a>
              </div>
              <div className="trust-signals">
                <span className="trust-badge">Liquidity Locked</span>
                <span className="trust-badge">Verified on DexScreener</span>
                <span className="trust-badge">Community Driven</span>
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
                  {statsRow.map((item, index) => (
                    <div key={`${item.label}-${index}`} className="stats-item">
                      <span className="stats-name">{item.label}</span>
                      <span className={`stats-value ${isLoading ? "loading" : ""}`}>
                        {isLoading ? "" : item.value}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="stats-track stats-track--clone" aria-hidden="true">
                  {statsRow.map((item, index) => (
                    <div key={`${item.label}-clone-${index}`} className="stats-item">
                      <span className="stats-name">{item.label}</span>
                      <span className={`stats-value ${isLoading ? "loading" : ""}`}>
                        {isLoading ? "" : item.value}
                      </span>
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
          <h2>Undisputed Growth</h2>
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
          <img src="/UCUSD1-EAGLE.png" alt="Undisputed eagle" className="mission-eagle" />
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
          <h2>Media from the movement</h2>
          <p className="section-lede">Shareable art for the champions.</p>
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
