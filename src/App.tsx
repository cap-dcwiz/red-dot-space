import { useEffect, useState } from 'react'
import { ArrowRight, Calendar, FileText, Layers3, Menu, Newspaper, Orbit, Shield, X, Zap } from 'lucide-react'
import { motion } from 'motion/react'

const navLinks = [
  { href: '#mission', label: 'Mission' },
  { href: '#product', label: 'Our Product' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#perspective', label: 'Perspective' },
  { href: '#contact', label: 'Contact' },
]

const missionPillars = [
  {
    icon: Zap,
    label: 'Power',
    title: 'Infrastructure beyond the grid',
    text: 'Space-native compute opens up a different energy and thermal model from conventional terrestrial facilities.',
  },
  {
    icon: Orbit,
    label: 'Reach',
    title: 'Processing closer to the source',
    text: 'Orbital infrastructure can reduce unnecessary round-trips to the ground and create new routing possibilities.',
  },
  {
    icon: Shield,
    label: 'Sovereignty',
    title: 'Neutral, trust-critical compute',
    text: 'The mission is to create a more credible operating model for customers that care about resilience and control.',
  },
]

const productLayers = [
  {
    label: 'Layer 1',
    title: 'Orbital compute infrastructure',
    text: 'Hosted payloads and node architectures for on-orbit preprocessing, edge inference, and compute closer to source.',
    points: ['Hosted payloads', 'Node architectures', 'Distributed orbital capacity'],
    visual: 'infrastructure',
    visualLabel: 'Capacity in orbit',
  },
  {
    label: 'Layer 2',
    title: 'Operations intelligence',
    text: 'A control layer for thermal, power, health, and mission-aware workload decisions across orbital systems.',
    points: ['Thermal twin', 'Power-aware scheduling', 'Fleet health visibility'],
    visual: 'ops',
    visualLabel: 'Control layer',
  },
  {
    label: 'Layer 3',
    title: 'Unified cloud access',
    text: 'A single interface for customers that need sovereign, elastic, or hybrid orbital compute capacity.',
    points: ['Managed interface', 'Hybrid routing', 'Sovereign and elastic demand'],
    visual: 'cloud',
    visualLabel: 'Customer interface',
  },
]

const whyUsCards = [
  {
    label: '01 · Base',
    title: 'Singapore as a neutral home',
    text: 'A credible base for cross-border sovereign compute conversations across APAC and adjacent markets.',
  },
  {
    label: '02 · Design',
    title: 'Engineered for orbit',
    text: 'The operating model starts with orbital realities rather than adapting a terrestrial template after the fact.',
  },
  {
    label: '03 · Model',
    title: 'A neutral cloud layer',
    text: 'The role is to sit between orbital infrastructure and customers with a cleaner, trust-oriented operating model.',
  },
  {
    label: '04 · Timing',
    title: 'Built for where the market is going',
    text: 'Sovereign compute and orbital infrastructure are moving from edge cases to strategic conversations.',
  },
]

const perspectiveFeatured = {
  icon: FileText,
  type: 'Research',
  title: 'The development of carbon-neutral data centres in space',
  text: 'A Nature Electronics perspective exploring orbital edge and cloud data centres, carbon-neutral data processing in space, and a life-cycle framework for comparing orbital and terrestrial compute.',
  cta: 'Read full paper',
  href: '/space-data-centres-perspective.pdf',
  date: 'Featured',
}

const perspectiveItems = [
  {
    icon: Newspaper,
    type: 'News',
    title: 'Future updates and announcements',
    text: 'This space can carry product updates, ecosystem developments, milestones, and market commentary as Red Dot Space grows.',
    cta: 'See latest updates',
    href: '/perspective/index.html#news',
    date: 'Soon',
  },
  {
    icon: Newspaper,
    type: 'Media',
    title: 'Media and commentary',
    text: 'Interviews, commentary, and external mentions can reinforce category credibility as the market conversation develops.',
    cta: 'See coverage',
    href: '/perspective/index.html#media',
    date: 'Planned',
  },
  {
    icon: Calendar,
    type: 'Event',
    title: 'Upcoming conference appearance',
    text: 'Conference sessions, technical talks, and market briefings can surface here as dates and speakers are confirmed.',
    cta: 'See event updates',
    href: '/perspective/index.html#events',
    date: 'Upcoming',
  },
]

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
      <h2>{title}</h2>
      <p>{body}</p>
    </div>
  )
}

export default function App() {
  const FeaturedIcon = perspectiveFeatured.icon
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
          <div className="hero-copy hero-copy-light">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              Orbital infrastructure for compute
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.1 }}>
              Compute <span>in orbit.</span>
            </motion.h1>

            <motion.p className="hero-body" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.2 }}>
              Red Dot Space is building a neutral cloud layer for orbital compute, grounded in sovereign infrastructure thinking and a Singapore base.
            </motion.p>

            <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.3 }}>
              <a className="primary-button" href={`mailto:${contactEmail}`}>
                Start a conversation <ArrowRight size={16} />
              </a>
              <a className="secondary-link" href="#mission">
                Explore the mission
              </a>
            </motion.div>
          </div>

          <motion.div className="hero-visual hero-visual-horizon" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.15 }} aria-hidden="true">
            <div className="hero-horizon-glow" />
            <div className="hero-horizon-curve hero-horizon-curve-1" />
            <div className="hero-horizon-curve hero-horizon-curve-2" />
            <div className="hero-satellite-cluster">
              <div className="hero-satellite-body" />
              <div className="hero-solar hero-solar-left" />
              <div className="hero-solar hero-solar-right" />
              <div className="hero-satellite-node" />
            </div>
            <div className="hero-signal-dash hero-signal-dash-1" />
            <div className="hero-signal-dash hero-signal-dash-2" />
          </motion.div>
        </section>

        <section id="mission" className="content-section chapter-section chapter-mission">
          <FadeInSection>
            <SectionHeading
              eyebrow="Mission"
              title="Build a neutral cloud layer for compute beyond the grid."
              body="Red Dot Space exists to make orbital compute practical, credible, and useful where power, reach, and sovereignty matter most."
            />
          </FadeInSection>

          <div className="card-grid mission-grid">
            {missionPillars.map((item, index) => {
              const Icon = item.icon
              return (
                <FadeInSection key={item.title} delay={index * 0.08}>
                  <article className="info-card mission-card">
                    <div className="icon-chip"><Icon size={20} /></div>
                    <div className="timeline-eyebrow">{item.label}</div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </article>
                </FadeInSection>
              )
            })}
          </div>
        </section>

        <section id="product" className="content-section build-section chapter-section chapter-product">
          <FadeInSection>
            <SectionHeading
              eyebrow="Our Product"
              title="A three-layer product from orbital capacity to customer access."
              body="Red Dot Space is building a layered product model: infrastructure in orbit, an operational intelligence layer, and a unified interface customers can actually use."
            />
          </FadeInSection>

          <FadeInSection delay={0.06}>
            <div className="build-diagram" aria-hidden="true">
              <div className="build-diagram-line" />
              {productLayers.map((layer) => (
                <div key={layer.label} className="build-diagram-node">
                  <Layers3 size={16} />
                  <span>{layer.title}</span>
                </div>
              ))}
            </div>
          </FadeInSection>

          <div className="build-stack">
            <div className="build-rail" aria-hidden="true">
              <div className="rail-line" />
              {productLayers.map((layer) => (
                <div key={layer.label} className="rail-node" />
              ))}
            </div>

            <div className="build-layers">
              {productLayers.map((layer, index) => (
                <FadeInSection key={layer.title} delay={index * 0.08}>
                  <article className="layer-card layer-card-structured">
                    <div className="layer-label">{layer.label}</div>
                    <div className={`build-visual build-visual-${layer.visual}`} aria-hidden="true">
                      <div className="build-visual-grid" />
                      <div className="build-visual-core" />
                      <div className="build-visual-node build-visual-node-1" />
                      <div className="build-visual-node build-visual-node-2" />
                      <div className="build-visual-node build-visual-node-3" />
                      <div className="build-visual-accent build-visual-accent-1" />
                      <div className="build-visual-accent build-visual-accent-2" />
                      <div className="build-visual-accent build-visual-accent-3" />
                      <div className="build-visual-caption">{layer.visualLabel}</div>
                    </div>
                    <div className="layer-body">
                      <div>
                        <h3>{layer.title}</h3>
                        <p>{layer.text}</p>
                      </div>
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
          </div>
        </section>

        <section id="why-us" className="content-section chapter-section chapter-whyus">
          <FadeInSection>
            <SectionHeading
              eyebrow="Why Us"
              title="Built for this category and this region."
              body="Red Dot Space combines orbit-first product thinking, a neutral operating model, and a Singapore base that is credible for sovereign compute conversations across APAC."
            />
          </FadeInSection>

          <div className="card-grid why-us-grid">
            {whyUsCards.map((card, index) => (
              <FadeInSection key={card.title} delay={index * 0.08}>
                <article className="info-card why-us-card">
                  <div className="timeline-eyebrow">{card.label}</div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="perspective" className="content-section chapter-section chapter-perspective">
          <FadeInSection>
            <SectionHeading
              eyebrow="Perspective"
              title="Research, signals, and why this matters now."
              body="Orbital compute is moving from frontier idea to serious technical discussion. Perspective keeps the site anchored in research, upcoming activity, and public-facing updates as the company grows."
            />
          </FadeInSection>

          <div className="perspective-layout">
            <FadeInSection>
              <article className="info-card perspective-featured">
                <div className="perspective-meta-row">
                  <div className="icon-chip"><FeaturedIcon size={18} /></div>
                  <div className="perspective-date">{perspectiveFeatured.date}</div>
                </div>
                <div className="timeline-eyebrow">{perspectiveFeatured.type}</div>
                <h3>{perspectiveFeatured.title}</h3>
                <p>{perspectiveFeatured.text}</p>
                <a className="perspective-link" href={perspectiveFeatured.href} target="_blank" rel="noreferrer">
                  {perspectiveFeatured.cta} <ArrowRight size={14} />
                </a>
              </article>
            </FadeInSection>

            <div className="perspective-grid">
              {perspectiveItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <FadeInSection key={item.title} delay={index * 0.08}>
                    <article className="info-card perspective-card">
                      <div className="perspective-meta-row">
                        <div className="icon-chip"><Icon size={18} /></div>
                        <div className="perspective-date">{item.date}</div>
                      </div>
                      <div className="timeline-eyebrow">{item.type}</div>
                      <h3>{item.title}</h3>
                      <p>{item.text}</p>
                      {item.href ? (
                        <a className="perspective-link" href={item.href}>
                          {item.cta} <ArrowRight size={14} />
                        </a>
                      ) : (
                        <div className="perspective-muted">{item.cta}</div>
                      )}
                    </article>
                  </FadeInSection>
                )
              })}
            </div>
          </div>

          <FadeInSection delay={0.12}>
            <div className="perspective-footer-actions">
              <a className="secondary-link" href="/perspective/index.html">
                View all perspective <ArrowRight size={14} />
              </a>
            </div>
          </FadeInSection>
        </section>

        <section id="contact" className="content-section contact-section chapter-section chapter-contact">
          <FadeInSection>
            <div className="contact-panel">
              <div>
                <div className="eyebrow">Contact</div>
                <h2>See you in orbit.</h2>
                <p>
                  If you are exploring sovereign compute, orbital infrastructure, partnerships, or research collaboration, start the conversation here.
                </p>
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
                <div>
                  <span className="meta-label">Focus</span>
                  <span>Research, partnerships, and public market development</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>
      </main>
    </div>
  )
}
