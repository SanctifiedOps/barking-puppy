import React from "react"
import * as faceapi from "face-api.js"

const contractAddress = "3B1ijcocM5EDga6XxQ7JLW7weocQPWWjuhBYG8Vepump"
const ticker = "$BP"
const mainX = "https://x.com/BPuppy80020"
const xCommunity = "https://x.com/i/communities/2017378247273492968"
const launchUrl = "https://pump.fun/coin/3B1ijcocM5EDga6XxQ7JLW7weocQPWWjuhBYG8Vepump"
const statsTokenAddress = "3B1ijcocM5EDga6XxQ7JLW7weocQPWWjuhBYG8Vepump"

const aboutCopy = {
  title: "The Barking Puppy Origin",
  body: [
    {
      lead: "Token First",
      text:
        ticker +
        " was minted before any public X account existed. No hype. No marketing. No socials. Just a contract on-chain. That alone separates it from 99% of meme launches."
    },
    {
      lead: "The Connection",
      text:
        "Hours later, the official X appeared. Then Instagram (kevinlegend14). Both linked. Same visuals. Same theme. Same narrative. Coin → identity → socials. Not the other way around."
    },
    {
      lead: "Survivor",
      text:
        "99% of coins would have died already if they went through what " + ticker + " went through. This one didn't. You're watching the origin story of a meme brand forming in real time."
    }
  ]
}

const mediaPalette = [
  { color: "#3d2810", accent: "#d4a04a" },
  { color: "#4a3015", accent: "#e8b84a" },
  { color: "#2d1f0d", accent: "#f0c36a" },
  { color: "#5c3d1a", accent: "#cfa047" },
  { color: "#3a2812", accent: "#f2c97c" },
  { color: "#4d361a", accent: "#daa520" },
  { color: "#352410", accent: "#e8c84a" },
  { color: "#4a3518", accent: "#d4b84b" },
  { color: "#2a1c0c", accent: "#f5d080" },
  { color: "#3d2a14", accent: "#c9a035" },
  { color: "#4a3820", accent: "#e0b050" },
  { color: "#332512", accent: "#f0c060" },
  { color: "#5a4020", accent: "#d8a840" },
  { color: "#28180a", accent: "#e5c070" }
]

const mediaGlob = import.meta.glob("../public/bp-pics*.*", { eager: true, query: "?url", import: "default" })

const mediaItems = (() => {
  const entries = Object.entries(mediaGlob).map(([path, src]) => {
    const match = path.match(/bp-pics\s*\((\d+)\)/i)
    const index = match ? Number(match[1]) : 999
    return { src, index, title: `Barking Puppy ${match ? match[1] : ""}`.trim() }
  })
  if (entries.length === 0) {
    return mediaPalette.map((p, idx) => ({
      title: ["The Origin", "Survivor", "Popcorn Time", "On-Chain Proof", "Community Meme"][idx] || `Meme ${idx + 1}`,
      color: p.color,
      accent: p.accent
    }))
  }
  return entries
    .sort((a, b) => a.index - b.index)
    .map((entry, idx) => ({
      title: entry.title || `Barking Puppy Meme ${idx + 1}`,
      color: mediaPalette[idx % mediaPalette.length].color,
      accent: mediaPalette[idx % mediaPalette.length].accent,
      src: entry.src
    }))
})()

const linkTiles = [
  { label: "Buy on Pump.fun", href: launchUrl, description: "Get your $BP tokens here", primary: true },
  { label: "Dev X", href: mainX, description: "Follow the dev's official account" },
  { label: "Community", href: xCommunity, description: "Join the Barking Puppy pack" },
  { label: "KevinLegend14", href: "https://instagram.com/kevinlegend14", description: "The legend's Instagram" }
]

const missionPillars = [
  {
    title: "Authenticity",
    body:
      "Token first, socials second. No pre-launch hype. No insider allocations. Just on-chain proof of intent."
  },
  {
    title: "Transparency",
    body:
      "Dev buybacks and burns visible on-chain. Over 2.5% of supply burned. No team wallet. Just community."
  },
  {
    title: "Community",
    body:
      "Direct airdrops to holders. Dev engages in chat. Memes flow from community to official accounts."
  }
]

const buySteps = [
  {
    step: "Step 1",
    title: "Set up your wallet",
    body: "Download Phantom or Solflare. Follow the dev's X and join the community for updates."
  },
  {
    step: "Step 2",
    title: "Get SOL ready",
    body: "Fund your wallet with SOL. Always verify the contract address before any swap."
  },
  {
    step: "Step 3",
    title: "Swap for " + ticker,
    body: "Head to Pump.fun, paste the CA, and join the pack. Welcome to Barking Puppy."
  }
]

const loreTimeline = [
  {
    phase: "Jan 17, 2026",
    title: "The Silent Mint",
    body:
      "A token appears on-chain. No announcement. No socials. No hype. Just a contract address sitting there, waiting to be discovered. Token first."
  },
  {
    phase: "3h 56m Later",
    title: "The Account Emerges",
    body:
      "An X account surfaces. Same visuals. Same energy. The timing is deliberate. Someone is building something. The question: who?"
  },
  {
    phase: "The Connections",
    title: "What If It's Him?",
    body:
      "KevinLegend14 on Instagram. The brother angle. The GameStop parallels. Coincidence? Maybe. But the confirmations keep rolling in. We're watching closely."
  },
  {
    phase: "Right Now",
    title: "You're Early",
    body:
      "This is the part of the story where people look back and say 'I wish I was there.' The lore is still being written. The legend is still forming."
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

  // Puppify state
  const [puppifyImage, setPuppifyImage] = React.useState(null)
  const [puppifyResult, setPuppifyResult] = React.useState(null)
  const [puppifyLoading, setPuppifyLoading] = React.useState(false)
  const [modelsLoaded, setModelsLoaded] = React.useState(false)
  const [puppifyError, setPuppifyError] = React.useState(null)
  const puppifyCanvasRef = React.useRef(null)

  React.useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
          faceapi.nets.faceLandmark68TinyNet.loadFromUri("/models")
        ])
        setModelsLoaded(true)
      } catch (err) {
        console.error("Failed to load face detection models:", err)
      }
    }
    loadModels()
  }, [])

  const handlePuppifyUpload = async (e) => {
    const file = e.target.files?.[0]
    if (!file || !modelsLoaded) return

    setPuppifyLoading(true)
    setPuppifyResult(null)
    setPuppifyError(null)

    try {
      const img = await faceapi.bufferToImage(file)
      setPuppifyImage(URL.createObjectURL(file))

      // Use lower score threshold for better detection
      const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.3 })
      const detections = await faceapi.detectAllFaces(img, options).withFaceLandmarks(true)

      const canvas = document.createElement("canvas")
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext("2d")

      ctx.drawImage(img, 0, 0)

      const mask = new Image()
      mask.crossOrigin = "anonymous"
      mask.src = "/mask.png"

      await new Promise((resolve) => {
        mask.onload = resolve
      })

      // If no faces detected, place mask in center of image
      if (detections.length === 0) {
        const maskSize = Math.min(img.width, img.height) * 0.6
        const maskX = (img.width - maskSize) / 2
        const maskY = (img.height - maskSize) / 2.5
        ctx.drawImage(mask, maskX, maskY, maskSize, maskSize)

        setPuppifyError("No face detected - mask placed in center. Try a clearer photo for better results!")
      } else {
        detections.forEach((det) => {
          const landmarks = det.landmarks
          const leftEye = landmarks.getLeftEye()
          const rightEye = landmarks.getRightEye()

          // Calculate center of each eye
          const leftEyeCenter = {
            x: leftEye.reduce((sum, p) => sum + p.x, 0) / leftEye.length,
            y: leftEye.reduce((sum, p) => sum + p.y, 0) / leftEye.length
          }
          const rightEyeCenter = {
            x: rightEye.reduce((sum, p) => sum + p.x, 0) / rightEye.length,
            y: rightEye.reduce((sum, p) => sum + p.y, 0) / rightEye.length
          }

          // Calculate distance between human eyes and angle
          const humanEyeDistance = Math.sqrt(
            Math.pow(rightEyeCenter.x - leftEyeCenter.x, 2) +
            Math.pow(rightEyeCenter.y - leftEyeCenter.y, 2)
          )
          const angle = Math.atan2(
            rightEyeCenter.y - leftEyeCenter.y,
            rightEyeCenter.x - leftEyeCenter.x
          )

          // Mask eye hole positions as percentage of mask dimensions
          // These are where the CENTER of each eye hole is on the mask
          const maskLeftEyeX = 0.35  // 35% from left edge
          const maskRightEyeX = 0.65 // 65% from left edge
          const maskEyeY = 0.40      // 40% from top edge

          // Calculate the distance between mask eye holes (as fraction of mask width)
          const maskEyeSpan = maskRightEyeX - maskLeftEyeX // 0.30

          // Scale mask so mask eye distance = human eye distance
          const maskWidth = humanEyeDistance / maskEyeSpan
          const maskHeight = maskWidth * (mask.naturalHeight / mask.naturalWidth)

          // Center point between human eyes
          const humanEyeCenterX = (leftEyeCenter.x + rightEyeCenter.x) / 2
          const humanEyeCenterY = (leftEyeCenter.y + rightEyeCenter.y) / 2

          // Center point between mask eye holes (as fraction)
          const maskEyeCenterX = (maskLeftEyeX + maskRightEyeX) / 2 // 0.50

          // Draw with rotation around the eye center point
          ctx.save()
          ctx.translate(humanEyeCenterX, humanEyeCenterY)
          ctx.rotate(angle)

          // Position mask so its eye center aligns with human eye center
          // Offset from center: mask top-left corner position
          const drawX = -maskWidth * maskEyeCenterX
          const drawY = -maskHeight * maskEyeY

          ctx.drawImage(mask, drawX, drawY, maskWidth, maskHeight)
          ctx.restore()
        })
      }

      setPuppifyResult(canvas.toDataURL("image/png"))
    } catch (err) {
      console.error("Puppify error:", err)
      setPuppifyError("Something went wrong. Please try again.")
    } finally {
      setPuppifyLoading(false)
    }
  }

  const downloadPuppifyResult = () => {
    if (!puppifyResult) return
    const link = document.createElement("a")
    link.download = "puppified-pfp.png"
    link.href = puppifyResult
    link.click()
  }

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
          if (!best) return pair
          const bestLiq = best?.liquidity?.usd ?? best?.fdv ?? 0
          const pairLiq = pair?.liquidity?.usd ?? pair?.fdv ?? 0
          return pairLiq > bestLiq ? pair : best
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
    link.download = `${selectedMedia.title.replace(/\s+/g, "-") || "barking-puppy-media"}.png`
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
          <img src="/mask.png" alt="Barking Puppy mark" className="brand-mark" />
          <div>
            <p className="brand-kicker">Barking Puppy</p>
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
              Buy on Pump.fun
            </a>
          </div>
        </div>
      </header>

      <main className="content">
        <section className="hero-wrap" id="hero">
          <div className="hero-content">
            <h1 className="hero-title-text">BARKING PUPPY</h1>
            <div className="hero-buttons">
              <a className="button primary" href={launchUrl}>
                Buy Now
              </a>
              <a className="button ghost" href={xCommunity}>
                Join Community
              </a>
              <button className="button ghost" onClick={handleCopy}>
                {copied ? "Copied!" : "Copy CA"}
              </button>
            </div>
            <div className="hero-stats">
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
              <span className="truth-embed__label">The Dev</span>
              <a className="truth-embed__handle" href={mainX} target="_blank" rel="noreferrer">
                @BPuppy80020
              </a>
            </div>
            <div className="truth-embed__frame">
              <img src="/EC-hx68f_400x400.jpg" alt="The Dev" className="truth-embed__image" />
            </div>
            <div className="truth-embed__actions">
              <a className="button ghost truth-embed__cta" href={mainX} target="_blank" rel="noreferrer">
                Follow the Dev
              </a>
              <a className="button ghost truth-embed__cta" href={xCommunity} target="_blank" rel="noreferrer">
                Join Community
              </a>
              <a className="button ghost truth-embed__cta" href="https://instagram.com/kevinlegend14" target="_blank" rel="noreferrer">
                KevinLegend14
              </a>
            </div>
          </div>
        </section>

        <section className="roadmap-section animate" id="roadmap" data-animate>
          <div className="section-tag">The Lore</div>
          <h2>What If It's Him?</h2>
          <p className="section-lede">
            The timeline. The connections. The confirmations keep rolling in. We're early.
          </p>
          <div className="roadmap-grid">
            {loreTimeline.map((step) => (
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
          <h2>Authenticity. Transparency. Community.</h2>
          <p className="section-lede">
            Not a random pump. Not a copy. Not noise. A narrative forming in real time.
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
          <h2>Media from the Pack</h2>
          <p className="section-lede">Shareable memes for the community.</p>
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
                aria-label={`Open ${item.title || "Barking Puppy meme"}`}
              >
                {item.src && <img src={item.src} alt={item.title} className="media-img" />}
                <div className="media-overlay" />
              </button>
            ))}
          </div>
        </section>

        <section className="buy-section animate" id="buy" data-animate>
          <div className="section-tag">Buy</div>
          <h2>Three steps to join the pack</h2>
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
                    Buy on Pump.fun
                  </a>
                )}
                {idx === 1 && (
                  <button className="button primary step-action" onClick={handleCopy}>
                    {copied ? "Copied" : "Copy CA"}
                  </button>
                )}
                {idx === 2 && (
                  <a className="button primary step-action" href={launchUrl} target="_blank" rel="noreferrer">
                    Join the pack
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
        <p className="foot-year">(c) {new Date().getFullYear()} Barking Puppy</p>
        <p className="foot-note">
          Barking Puppy is a community-driven meme project. Token first, socials second. You're either early or you'll read this later.
        </p>
        <p className="foot-note">
          Nothing here is financial advice. Verify contract addresses ({contractAddress}), stay skeptical, and never risk
          more than you can lose.
        </p>
        <p className="foot-credit">
          Website designed by <a href="https://x.com/opsiriussol" target="_blank" rel="noopener noreferrer">OPSIRIUS</a>
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
