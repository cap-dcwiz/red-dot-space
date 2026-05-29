import { useEffect, useState } from 'react'
import { ArrowRight, Layers3, Menu, Shield, X, Zap } from 'lucide-react'
import { motion } from 'motion/react'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, '')}`

function trackEvent(name: string, params: Record<string, string>) {
  window.gtag?.('event', name, params)
}

const navLinks = [
  { href: '#mission', label: 'Mission' },
  { href: '#purpose', label: 'Purpose' },
  { href: '#platform', label: 'Platform' },
  { href: '#advantage', label: 'Advantage' },
  { href: '#contact', label: 'Contact' },
]

const missionCards = [
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
    descriptor: 'SOLO NODE',
    number: '01',
    title: 'Node Solo',
    text: 'Standalone orbital compute payload for single-satellite deployment, designed for on-orbit data preprocessing and edge inference.',
    points: ['Space-ready compute hardware', 'On-orbit preprocessing and inference'],
    visual: 'infrastructure',
    visualLabel: 'Single-node payload',
    image: asset('platform-node-solo.png'),
  },
  {
    layer: 'LAYER 1',
    descriptor: 'CONSTELLATION NODE',
    number: '02',
    title: 'Node Constellation',
    text: 'Networked compute architecture designed to scale capacity across multiple orbital nodes and satellite operators.',
    points: ['Distributed processing', 'Workload balancing across nodes'],
    visual: 'infrastructure',
    visualLabel: 'Distributed capacity',
    image: asset('platform-node-constellation.png'),
  },
  {
    layer: 'LAYER 2',
    descriptor: 'OPERATIONS INTELLIGENCE',
    number: '03',
    title: 'Red Dot Ops Engine',
    text: 'Intelligence layer for monitoring, scheduling, and optimizing orbital compute operations.',
    points: ['Power-aware workload planning', 'Fleet health and predictive operations'],
    visual: 'ops',
    visualLabel: 'Operations intelligence',
    image: asset('platform-ops-engine.png'),
  },
  {
    layer: 'LAYER 3',
    descriptor: 'CLOUD ACCESS',
    number: '04',
    title: 'Red Dot Cloud',
    text: 'Managed cloud access layer for customers to consume orbital compute capacity without managing satellite infrastructure.',
    points: ['Cloud-style access to orbital compute', 'Support for sovereign, dedicated, and hybrid orbital-terrestrial workloads'],
    visual: 'cloud',
    visualLabel: 'Managed cloud layer',
    image: asset('platform-cloud.png'),
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

const contactAddress = {
  line1: 'Nanyang Technological University',
  line2: '50 Nanyang Ave, Singapore 639798',
}

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
  const [activeSection, setActiveSection] = useState('#purpose')
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
          <img src={asset('red-dot-space-logo.png')} alt="Red Dot Space" className="wordmark-logo" />
        </a>

        <nav className="site-nav" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className={activeSection === link.href ? 'is-active' : undefined}>
              {link.label}
            </a>
          ))}
        </nav>

        <a className="header-cta" href="#contact" onClick={() => trackEvent('contact_intent', { location: 'header' })}>
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
             <a
               className="mobile-nav-cta"
               href="#contact"
               onClick={() => {
                 trackEvent('contact_intent', { location: 'mobile_menu' })
                 setMobileMenuOpen(false)
               }}
             >
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
                Space Data Centre.
                <br />
                <span>Compute in orbit.</span>
              </motion.h1>

              <motion.p className="hero-body" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.2 }}>
                Red Dot Space is developing orbital compute infrastructure that connects payload, operations intelligence, and cloud access into one managed layer. Built from Singapore, we are shaping a neutral infrastructure model for the next phase of digital infrastructure beyond Earth.
              </motion.p>

              <motion.div className="hero-actions" initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.72, delay: 0.3 }}>
                <a className="primary-button" href="#platform" onClick={() => trackEvent('platform_interest', { location: 'hero' })}>
                  Explore the platform
                </a>
                <a className="secondary-link" href="#contact" onClick={() => trackEvent('contact_intent', { location: 'hero' })}>
                  Start a conversation
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            </div>
          </div>
        </section>

        <section id="mission" className="content-section chapter-section chapter-mission">
          <FadeInSection>
            <SectionHeading
              eyebrow="MISSION"
              title="Make orbital compute accessible, trusted, and operationally reliable."
              body="As orbital systems generate more data, compute will need to move closer to where that data is created. Red Dot Space is developing a neutral infrastructure layer designed to support secure, sovereign, and scalable access to space-based compute capacity."
            />
          </FadeInSection>

          <div className="card-grid mission-grid">
            {missionCards.map((item, index) => {
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

        <section id="purpose" className="chapter-section chapter-perspective-spotlight perspective-spotlight-section">
          <div className="perspective-spotlight-inner">
            <div className="perspective-spotlight-layout">
              <FadeInSection>
                <div className="perspective-copy-block">
                  <div className="section-heading perspective-thesis-heading">
                    <div className="eyebrow">PURPOSE</div>
                    <h2>The next era of compute isn’t coming, it’s already here.</h2>
                    <p>On Earth, power is expensive, land is limited, and cooling is a constant battle.</p>
                    <p>In space, the rules change. Unlimited solar energy. Natural cold. No land constraints.</p>
                    <p>Built for the scale artificial intelligence, sovereign data, and human ambition now demand.</p>
                    <p className="perspective-emphasis">This isn’t theory. It’s already happening.</p>
                  </div>

                  <div className="perspective-actions">
                     <a
                       className="primary-button"
                       href={asset('space-data-centres-perspective.pdf')}
                       target="_blank"
                       rel="noreferrer"
                       onClick={() => trackEvent('research_paper_open', { location: 'purpose' })}
                     >
                       Read the research paper and see why the future is in orbit <ArrowRight size={14} />
                     </a>
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

        <section id="advantage" className="content-section chapter-section chapter-whyus">
          <FadeInSection>
            <SectionHeading
              eyebrow="ADVANTAGE"
              title="Built to deliver <span class='title-accent'>space compute infrastructure.</span>"
              body="Red Dot Space brings together compute operations expertise, Singapore-based neutrality, and ecosystem collaboration to explore a practical path toward orbital cloud infrastructure."
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
                  For partnerships, technical collaboration, research paper access, or investor enquiries, we would be happy to connect.
                </p>
              </div>

              <div className="contact-meta">
                <div>
                  <span className="meta-label">Address</span>
                  <span>
                    {contactAddress.line1}
                    <br />
                    {contactAddress.line2}
                  </span>
                </div>
              </div>

            </div>
          </FadeInSection>
        </section>
      </main>
    </div>
  )
}
