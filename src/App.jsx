import React from "react"

const contractAddress = "TBA"
const ticker = "$UNDISPUTED"
const mainX = "#"
const xCommunity = "#"
const launchUrl = "#buy"
const truthPostUrl = "https://truthsocial.com/@realDonaldTrump/114857957325423668"
const truthEmbedUrl = `${truthPostUrl}?embed=true`

const aboutCopy = {
  title: "The Undisputed Narrative",
  body: [
    "Undisputed Coin (" + ticker + ") is a meme coin built on the idea that America is becoming the undisputed leader in digital assets. The eagle mascot stands for champions, pioneers, and a country that refuses to play second.",
    "The story connects the rise of WLFI and USD1 with the meme velocity of Bonk, capturing a moment where culture and capital move together.",
    "Donald Trump statement: \"The Senate just passed an incredible Bill that is going to make America the UNDISPUTED Leader in Digital Assets - Nobody will do it better, it is pure GENIUS! Digital Assets are the future, and our Nation is going to own it... Get it to my desk, ASAP - NO DELAYS, NO ADD ONS.\"",
    "We are launching on USD1 and rallying a community that believes in the American dream, financial freedom, and on-chain coordination.",
    "No closed doors, no back rooms. Just a loud, public mission to be undisputed."
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
    return { src, index, title: `Undisputed Meme ${match ? match[1] : ""}`.trim() }
  })
  if (entries.length === 0) {
    return mediaPalette.map((p, idx) => ({
      title: ["Eagle Standard", "USD1 Launch", "WLFI Signal", "Undisputed Champions", "Digital Asset Frontier"][idx] || `Meme ${idx + 1}`,
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
  { label: "Launch on USD1", href: launchUrl, description: "Launch route and swap details", primary: true },
  { label: "Main X (TBA)", href: mainX, description: "Official announcements and statements" },
  { label: "Community (TBA)", href: xCommunity, description: "Champions, pioneers, and coordination" }
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
    body: "Get a wallet ready and follow official channels so you can move the moment the launch opens."
  },
  {
    step: "Step 2",
    title: "Prepare USD1",
    body: "Acquire USD1 and double-check the official contract address once it is announced."
  },
  {
    step: "Step 3",
    title: "Swap for " + ticker,
    body: "Use the official USD1 route at launch, secure your keys, and join the champions."
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
    link.download = `${selectedMedia.title.replace(/\s+/g, "-") || "undisputed-media"}.png`
    link.href = selectedMedia.src || ""
    link.click()
  }

  return (
    <div className="page">
      <div className="ribbon" aria-hidden="true" />
      <header className="site-header">
        <div className="brand">
          <img src="/wh-meme.svg" alt="Undisputed coin mark" className="brand-mark" />
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
              Launch on USD1
            </a>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="hero-wrap" id="hero">
          <div className="hero-card">
            <div className="hero-left">
              <div className="pill-row">
                <span className="pill filled">USD1 Launch</span>
                <span className="pill outline">Eagle Mascot</span>
              </div>
              <h1>Undisputed Coin ({ticker})</h1>
              <p className="lede">
                The Leader In Digital Assets. Built for champions, pioneers, and believers in the American dream of
                financial freedom.
              </p>
              <div className="hero-actions">
                <a className="button primary" href={launchUrl}>
                  Launch on USD1
                </a>
                <a className="button ghost" href="#about">
                  Read the narrative
                </a>
                <a className="button ghost" href="#mission">
                  Mission
                </a>
              </div>
              <p className="micro">The Leader In Digital Assets.</p>
            </div>
            <div className="hero-right">
              <div className="hero-art">
                <img src="/wh-meme.svg" alt="Undisputed eagle art" className="hero-img" />
              </div>
            </div>
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
          <div className="truth-embed">
            <div className="truth-embed__header">
              <span className="truth-embed__label">Truth Social</span>
              <a className="truth-embed__handle" href={truthPostUrl} target="_blank" rel="noreferrer">
                @realDonaldTrump
              </a>
            </div>
            <div className="truth-embed__frame">
              <iframe title="Truth Social post by @realDonaldTrump" src={truthEmbedUrl} loading="lazy" />
            </div>
            <blockquote className="truth-embed__quote">
              The Senate just passed an incredible Bill that is going to make America the UNDISPUTED Leader in Digital
              Assets - Nobody will do it better, it is pure GENIUS! Digital Assets are the future, and our Nation is
              going to own it... Get it to my desk, ASAP - NO DELAYS, NO ADD ONS.
            </blockquote>
            <a className="button ghost truth-embed__cta" href={truthPostUrl} target="_blank" rel="noreferrer">
              View the post on Truth Social
            </a>
          </div>
        </section>

        <section className="mission-section" id="mission">
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

        <section className="media-section" id="media">
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

        <section className="buy-section" id="buy">
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
                    Launch on USD1
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

        <section className="links-section" id="links">
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
