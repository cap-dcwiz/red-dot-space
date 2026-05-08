import { useEffect, useState } from 'react'
import { ArrowRight, Layers3, Menu, Shield, X, Zap } from 'lucide-react'
import { motion } from 'motion/react'

const navLinks = [
  { href: '#mission', label: 'Mission' },
  { href: '#paper', label: 'Perspective' },
  { href: '#platform', label: 'Platform' },
  { href: '#why-red-dot', label: 'Why Red Dot' },
  { href: '#contact', label: 'Contact' },
]

const positioningCards = [
  {
    icon: Zap,
    title: 'Bring compute closer to orbital data.',
    text: 'Enable data to be processed, filtered, and acted on closer to satellites and orbital assets.',
  },
  {
    icon: Layers3,
    title: 'Make space compute accessible.',
    text: 'Create a managed cloud-style access layer so customers can explore orbital compute without directly managing satellite infrastructure.',
  },
  {
    icon: Shield,
    title: 'Design for sovereignty and trust.',
    text: 'Build from Singapore with a focus on neutral access, supply-chain resilience, and trusted infrastructure.',
  },
]

const platformCards = [
  {
    layer: 'LAYER 1',
    descriptor: 'INFRASTRUCTURE · ORBITAL COMPUTE NODE',
    number: '01',
    title: 'Node Solo',
    text: 'Standalone orbital compute payload for single-satellite deployment, designed for on-orbit data preprocessing and edge inference.',
    points: [
      'Space-ready compute hardware with thermal management and resilient payload design.',
      'Designed for on-orbit data preprocessing and edge inference.',
    ],
    visual: 'infrastructure',
    visualLabel: 'Single-node payload',
    image: '/platform-node-solo.png',
  },
  {
    layer: 'LAYER 1',
    descriptor: 'INFRASTRUCTURE · ORBITAL COMPUTE NODE',
    number: '02',
    title: 'Node Constellation',
    text: 'Networked compute architecture designed to scale capacity across multiple orbital nodes and satellite operators.',
    points: [
      'Supports distributed processing and workload balancing.',
      'Designed for future inter-satellite compute coordination.',
    ],
    visual: 'infrastructure',
    visualLabel: 'Distributed capacity',
    image: '/platform-node-constellation.png',
  },
  {
    layer: 'LAYER 2',
    descriptor: 'OPERATIONS INTELLIGENCE',
    number: '03',
    title: 'Red Dot Ops Engine',
    text: 'Intelligence layer for monitoring, scheduling, and optimizing orbital compute operations.',
    points: [
      'Thermal and power-aware workload planning.',
      'Fleet health monitoring.',
      'Radiation and environmental risk monitoring.',
      'Predictive operations support.',
    ],
    visual: 'ops',
    visualLabel: 'Operations intelligence',
    image: '/platform-ops-engine.png',
  },
  {
    layer: 'LAYER 3',
    descriptor: 'CLOUD ACCESS',
    number: '04',
    title: 'Red Dot Cloud',
    text: 'Managed cloud access layer for customers to consume orbital compute capacity without managing satellite infrastructure.',
    points: [
      'Cloud-style access to orbital compute.',
      'Support for sovereign and dedicated workloads.',
      'Hybrid routing between orbital and ground infrastructure.',
    ],
    visual: 'cloud',
    visualLabel: 'Managed cloud layer',
    image: '/platform-cloud.png',
  },
]

const whyRedDotCards = [
  {
    title: 'Compute operations DNA',
    text: 'Our approach is informed by experience in data center thermal, energy, and workload optimization — disciplines that become critical when compute moves into constrained orbital environments.',
  },
  {
    title: 'Singapore-based neutrality',
    text: 'Headquartered in Singapore, Red Dot Space is built from a trusted infrastructure hub for markets that care about sovereignty, resilience, and regional access.',
  },
  {
    title: 'Ecosystem collaboration',
    text: 'We are working across the space compute ecosystem to explore practical deployment models across hardware, payload operations, cloud access, and mission requirements.',
  },
]

const perspectiveHighlights = [
  {
    title: 'Secure by design',
    text: 'Built around trusted infrastructure thinking for sensitive and sovereignty-aware workloads.',
  },
  {
    title: 'Cloud model in orbit',
    text: 'Explores how managed access and operations layers can make orbital compute usable.',
  },
  {
    title: 'Infrastructure shift',
    text: 'Frames space compute as part of the next cloud layer rather than a standalone payload story.',
  },
]

const contactChips = ['Partnerships', 'Investor conversations', 'Technical collaboration', 'Perspective paper request']

const contactEmail = 'invest@reddot.space'

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.65, delay }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({ eyebrow, title, body }: { eyebrow: string; title: string; body: string }) {
  return (
    <div className="section-heading">
      <div className="eyebrow">{eyebrow}</div>
      <h2 dangerouslySetInnerHTML={{ __html: title }} />
      <p>{body}</p>
    </div>
  )
}

export default function App() {
  const [heroShift, setHeroShift] = useState({ x: 0, y: 0 })
  const [headerCondensed, setHeaderCondensed] = useState(false)
  const [activeSection, setActiveSection] = useState('#mission')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroStyle = {
    '--hero-shift-x': `${heroShift.x}px`,
    '--hero-shift-y': `${heroShift.y}px`,
  } as React.CSSProperties

  useEffect(() => {
    const onScroll = () => setHeaderCondensed(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!mobileMenuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [mobileMenuOpen])

  useEffect(() => {
    const sections = navLinks.map((link) => document.querySelector(link.href)).filter((el): el is HTMLElement => el instanceof HTMLElement)
    if (sections.length === 0) return

    const updateActiveSection = () => {
      const probe = window.scrollY + Math.min(window.innerHeight * 0.35, 260)
      let currentSection = sections[0]
      for (const section of sections) {
        if (section.offsetTop <= probe) currentSection = section
        else break
      }
      setActiveSection(`#${currentSection.id}`)
    }

    updateActiveSection()
    window.addEventListener('scroll', updateActiveSection, { passive: true })
    window.addEventListener('resize', updateActiveSection)
    return () => {
      window.removeEventListener('scroll', updateActiveSection)
      window.removeEventListener('resize', updateActiveSection)
    }
  }, [])

  return (
    <div className="site-shell">
      <div className="site-atmosphere" aria-hidden="true" />
      <div className="site-noise" aria-hidden="true" />

      <header className={`site-header${headerCondensed ? ' is-condensed' : ''}`}>
        <a className="wordmark" href="#top" aria-label="Red Dot Space home">
          <span>RED DOT SPACE</span>
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={activeSection === link.href ? 'is-active' : undefined}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact">
          Talk to us
        </a>

        <button
          type="button"
          className="mobile-nav-toggle"
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-nav-panel"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </header>

      {mobileMenuOpen && (
        <div className="mobile-nav-backdrop" onClick={() => setMobileMenuOpen(false)}>
          <div
            id="mobile-nav-panel"
            className="mobile-nav-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
            onClick={(event) => event.stopPropagation()}
          >
            <nav className="mobile-nav-links" aria-label="Mobile">
              {navLinks.map((link) => (
                <a key={link.href} href={link.href} className={activeSection === link.href ? 'is-active' : undefined} onClick={() => setMobileMenuOpen(false)}>
                  {link.label}
                </a>
              ))}
            </nav>
            <a className="mobile-nav-cta" href="#contact" onClick={() => setMobileMenuOpen(false)}>
              Talk to us
            </a>
          </div>
        </div>
      )}

      <main id="top">
        <section
          className="hero-section hero-section-simplified"
          style={heroStyle}
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width - 0.5
            const y = (event.clientY - bounds.top) / bounds.height - 0.5
            setHeroShift({ x: x * 16, y: y * 12 })
          }}
          onMouseLeave={() => setHeroShift({ x: 0, y: 0 })}
        >
          <div className="hero-inner">
            <div className="hero-copy hero-copy-light">
              <motion.div className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                SPACE COMPUTE · NEUTRAL CLOUD · SINGAPORE BASE
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.1 }}>
                Compute <span>in orbit.</span>
              </motion.h1>

              <motion.p className="hero-body" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.2 }}>
              Red Dot Space is building a neutral cloud layer for orbital compute — connecting payload, operations intelligence, and cloud access into one managed infrastructure model.
            </motion.p>

              <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.3 }}>
                <a className="primary-button" href={`mailto:${contactEmail}`}>
                  Start a conversation <ArrowRight size={16} />
                </a>
                <a className="secondary-link" href="#platform">
                  Explore the platform
                </a>
              </motion.div>

            </div>
          </div>

        </section>

        <section id="mission" className="content-section chapter-section chapter-mission">
          <FadeInSection>
            <SectionHeading
              eyebrow="MISSION"
              title="Building neutral infrastructure for the next cloud layer beyond Earth."
              body="As orbital systems generate more data, compute will need to move closer to where that data is created. Red Dot Space is developing a neutral infrastructure layer designed to support secure, sovereign, and scalable access to space-based compute capacity."
            />
          </FadeInSection>

          <div className="card-grid mission-grid">
            {positioningCards.map((item, index) => {
              const Icon = item.icon
              return (
                <FadeInSection key={item.title} delay={index * 0.08}>
                  <article className="info-card mission-card">
                    <div className="icon-chip"><Icon size={20} /></div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </FadeInSection>
              )
            })}
          </div>
        </section>

        <section id="paper" className="chapter-section chapter-perspective-spotlight perspective-spotlight-section">
          <div className="perspective-spotlight-inner">
          <div className="perspective-spotlight-layout">
            <FadeInSection>
              <div className="perspective-copy-block">
                <SectionHeading
                  eyebrow="PERSPECTIVE"
                  title="Space compute needs a new infrastructure model."
                  body="Our perspective paper outlines why orbital workloads require a neutral cloud layer, how sovereign infrastructure thinking applies to space compute, and what a future space compute platform could look like."
                />

                <div className="perspective-mini-points">
                  {perspectiveHighlights.map((item) => (
                    <div key={item.title} className="perspective-mini-point">
                      <div className="perspective-signal-dot" aria-hidden="true" />
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="perspective-actions">
                  <a className="primary-button" href="/space-data-centres-perspective.pdf" target="_blank" rel="noreferrer">
                    Read our research paper <ArrowRight size={14} />
                  </a>
                  <p className="perspective-supporting-copy">
                    Explore the full vision, infrastructure model, and strategic context in the perspective paper.
                  </p>
                </div>
              </div>
            </FadeInSection>
          </div>
          </div>
        </section>

        <section id="platform" className="content-section build-section chapter-section chapter-product">
          <FadeInSection>
            <SectionHeading
              eyebrow="OUR PLATFORM"
              title="A full-stack <span class='title-accent'>space compute</span> platform from payload to cloud."
              body="The platform is organized across three layers: orbital compute nodes, operations intelligence, and managed cloud access."
            />
          </FadeInSection>

          <FadeInSection delay={0.04}>
            <p className="section-subline">THREE LAYERS · FOUR BUILDING BLOCKS · ONE MANAGED CLOUD LAYER</p>
          </FadeInSection>

          <div className="platform-grid">
            {platformCards.map((layer, index) => (
              <FadeInSection key={layer.title} delay={index * 0.08}>
                <article className="layer-card layer-card-structured platform-card">
                  <div className="platform-card-head">
                    <div className="layer-number">{layer.number}</div>
                    <div className="layer-label-group">
                      <div className="layer-label">{layer.layer}</div>
                      <div className="layer-sublabel">{layer.descriptor}</div>
                    </div>
                  </div>
                  <div className={`build-visual build-visual-${layer.visual}`} aria-hidden="true">
                    <img src={layer.image} alt="" className="build-visual-image" />
                    <div className="build-visual-image-overlay" />
                    <div className="build-visual-caption">{layer.visualLabel}</div>
                  </div>
                  <div className="platform-card-body">
                    <h3>{layer.title}</h3>
                    <p>{layer.text}</p>
                    <ul className="layer-points">
                      {layer.points.map((point) => (
                        <li key={point}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </article>
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="why-red-dot" className="content-section chapter-section chapter-whyus">
          <FadeInSection>
            <SectionHeading
              eyebrow="WHY RED DOT"
              title="Why Red Dot Space is positioned to <span class='title-accent'>build this layer.</span>"
              body="Red Dot Space brings together compute operations thinking, Singapore-based neutrality, and ecosystem collaboration to explore a practical path toward orbital cloud infrastructure."
            />
          </FadeInSection>

          <div className="card-grid why-us-grid">
            {whyRedDotCards.map((card, index) => (
              <FadeInSection key={card.title} delay={index * 0.08}>
                <article className="info-card why-us-card">
                  <div className="why-us-icon-chip" aria-hidden="true">
                    {index === 0 && '↗'}
                    {index === 1 && '⟲'}
                    {index === 2 && '◈'}
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="contact" className="content-section contact-section chapter-section chapter-contact">
          <FadeInSection>
            <div className="contact-panel">
              <div>
                <div className="eyebrow">Contact</div>
                <h2>Let’s talk about orbital compute.</h2>
                <p>
                  Whether you are exploring satellite infrastructure, sovereign cloud models, orbital AI workloads, or future mission partnerships, we would be happy to start a conversation.
                </p>
                <a className="primary-button" href={`mailto:${contactEmail}`}>
                  Talk to us <ArrowRight size={16} />
                </a>
              </div>

              <div className="contact-meta">
                <div>
                  <span className="meta-label">Email</span>
                  <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                </div>
                <div>
                  <span className="meta-label">Base</span>
                  <span>Singapore</span>
                </div>
              </div>

              <div className="contact-chip-row" aria-label="Contact topics">
                {contactChips.map((chip) => (
                  <span key={chip} className="contact-chip">{chip}</span>
                ))}
              </div>
            </div>
          </FadeInSection>
        </section>
      </main>
    </div>
  )
}
