import { useEffect, useState } from 'react'
import { ArrowRight, Layers3, Menu, Orbit, Radar, Shield, X, Zap } from 'lucide-react'
import { motion } from 'motion/react'

const navLinks = [
  { href: '#opportunity', label: 'The Opportunity' },
  { href: '#arena', label: 'The Arena' },
  { href: '#build', label: 'Our Play' },
  { href: '#why-us', label: 'Why Us' },
  { href: '#roadmap', label: 'Roadmap' },
]

const constraintCards = [
  {
    value: '2x',
    title: 'Power pressure',
    text: 'AI demand is expected to push global data center power needs sharply higher this decade, while grid interconnection waits and electricity costs keep getting harder to absorb.',
  },
  {
    value: '+5ms',
    title: 'Latency and reach',
    text: 'Ground DCs have no coverage over oceans, poles, or remote zones. Long-haul fiber adds ~5ms per 1,000km — and space-origin data must downlink to ground just to be processed.',
  },
  {
    value: '$64B+',
    title: 'Sovereignty risk',
    text: 'Infrastructure approval, jurisdiction, and physical concentration are now strategic questions. Governments are tightening controls, and resilience assumptions are changing fast.',
  },
]

const orbitBenefits = [
  {
    icon: Zap,
    title: 'Energy and thermal advantage',
    text: 'Orbital compute changes the energy equation with sustained solar exposure and vacuum-based cooling dynamics that look fundamentally different from land- and water-intensive terrestrial facilities.',
  },
  {
    icon: Radar,
    title: 'Global coverage at the source',
    text: 'Processing closer to where space-origin data is generated opens up new coverage and routing possibilities, while reducing unnecessary dependence on ground-first data movement.',
  },
  {
    icon: Shield,
    title: 'Isolation and sovereign resilience',
    text: 'Space-native infrastructure introduces new ways to think about physical separation, continuity, and trust-critical workloads in a more sovereignty-sensitive environment.',
  },
]

const timingSignals = [
  {
    eyebrow: '01 / Launch',
    headline: 'Lower cost to orbit',
    metric: '$100/kg',
    detail: 'Launch economics are moving orbital compute closer to commercial viability instead of leaving it in the experimental bucket.',
  },
  {
    eyebrow: '02 / Compute',
    headline: 'Modern chips reach orbit',
    metric: '100x',
    detail: 'Data-center-class silicon is no longer a purely terrestrial assumption, making serious on-orbit workloads more realistic.',
  },
  {
    eyebrow: '03 / Networking',
    headline: 'Optical links are real',
    metric: '100Gbps',
    detail: 'Optical ISL networks point toward a future where compute, routing, and decision-making do not need to pass through the ground first.',
  },
]

const positioning = [
  {
    number: '01',
    title: 'Engineered for space',
    text: 'Red Dot Space is being shaped around orbital operating realities from day one, not adapted from a ground-cloud template after the fact.',
  },
  {
    number: '02',
    title: 'One cloud across every orbit',
    text: 'The long-term thesis is a neutral cloud layer that can aggregate compute capacity across multiple orbital operators behind one operating model.',
  },
  {
    number: '03',
    title: 'Neutral home in Singapore',
    text: 'Singapore offers a credible base for sovereign, cross-border infrastructure conversations across APAC and adjacent markets.',
  },
]

const buildLayers = [
  {
    label: 'Layer 1',
    title: 'Orbital compute infrastructure',
    text: 'Hosted payloads and future node architectures designed for on-orbit preprocessing, edge inference, and compute closer to source.',
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
    text: 'A simple commercial and technical interface for customers that need sovereign, elastic, or hybrid orbital compute capacity.',
    points: ['One managed interface', 'Hybrid orbital-terrestrial routing', 'Sovereign and elastic demand'],
    visual: 'cloud',
    visualLabel: 'Customer interface',
  },
]

const arenaDynamics = [
  {
    label: '01 · Demand Pull',
    title: 'Space compute is becoming real',
    text: 'Large technology and aerospace players are committing hardware, capital, and infrastructure attention to orbital compute, which makes this the right moment to establish position before the market settles.',
  },
  {
    label: '02 · White Space',
    title: 'No neutral cloud operator yet',
    text: 'Most current participants are vertically integrated. The independent cloud layer that customers would expect in a maturing infrastructure market still does not exist in orbit.',
  },
  {
    label: '03 · Neutral Base',
    title: 'APAC needs a trusted home',
    text: 'Markets across Southeast Asia and the Middle East will increasingly care about jurisdiction, sovereignty, and supply-chain independence, creating room for a neutral Singapore-based operator.',
  },
]

const whyUsCards = [
  {
    label: '01 · Base',
    title: 'The right jurisdiction',
    text: 'Singapore offers credible neutral ground for sovereign infrastructure conversations across APAC and adjacent markets.',
  },
  {
    label: '02 · Design',
    title: 'Orbit-first from day one',
    text: 'Every architecture decision starts with orbital realities rather than adapting a terrestrial model after the fact.',
  },
  {
    label: '03 · Model',
    title: 'Neutral by design',
    text: 'The operating model sits between orbital operators and enterprise customers, creating a more neutral trust layer for the market.',
  },
  {
    label: '04 · Timing',
    title: 'First mover in APAC',
    text: 'Governments and enterprises across the region are paying closer attention to sovereign compute before the category consolidates.',
  },
]

const roadmap = [
  {
    phase: '2026-2027',
    title: 'Foundation',
    text: 'Validate the stack, sharpen the operating model, and secure the earliest design-partner conversations.',
  },
  {
    phase: '2028-2030',
    title: 'Commercialization',
    text: 'Move from pilot momentum into commercial service, initial customers, and partner-backed orbital capacity.',
  },
  {
    phase: '2031+',
    title: 'Scale',
    text: 'Expand into a durable neutral compute layer for space-native and sovereignty-sensitive workloads across the region.',
  },
]

const contactEmail = 'invest@reddot.space'

const trustSignals = ['Singapore-based', 'Orbit-first infrastructure', 'Sovereign compute focus']

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
  const [heroShift, setHeroShift] = useState({ x: 0, y: 0 })
  const [headerCondensed, setHeaderCondensed] = useState(false)
  const [activeSection, setActiveSection] = useState('#constraint')
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
    const sections = navLinks
      .map((link) => document.querySelector(link.href))
      .filter((element): element is HTMLElement => element instanceof HTMLElement)

    if (sections.length === 0) return

    const updateActiveSection = () => {
      const probe = window.scrollY + Math.min(window.innerHeight * 0.35, 260)

      let currentSection = sections[0]

      for (const section of sections) {
        if (section.offsetTop <= probe) {
          currentSection = section
        } else {
          break
        }
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
                <a
                  key={link.href}
                  href={link.href}
                  className={activeSection === link.href ? 'is-active' : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
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
          className="hero-section"
          style={heroStyle}
          onMouseMove={(event) => {
            const bounds = event.currentTarget.getBoundingClientRect()
            const x = (event.clientX - bounds.left) / bounds.width - 0.5
            const y = (event.clientY - bounds.top) / bounds.height - 0.5
            setHeroShift({ x: x * 16, y: y * 12 })
          }}
          onMouseLeave={() => setHeroShift({ x: 0, y: 0 })}
        >
          <div className="hero-copy">
            <motion.div
              className="eyebrow"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Neutral infrastructure for space compute
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.1 }}
            >
              Compute <span>in orbit.</span>
            </motion.h1>

            <motion.p
              className="hero-body"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.2 }}
            >
              Red Dot Space is building a space-native cloud layer for workloads that demand new answers on
              power, reach, and sovereignty. Based in Singapore, the company is focused on neutral,
              trust-critical orbital compute across the region.
            </motion.p>

            <motion.div
              className="hero-actions"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.3 }}
            >
              <a className="primary-button" href={`mailto:${contactEmail}`}>
                Start a conversation <ArrowRight size={16} />
              </a>
              <a className="secondary-link" href="#opportunity">
                See the vision
              </a>
            </motion.div>

            <motion.div
              className="hero-trust"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.72, delay: 0.4 }}
            >
              {trustSignals.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="hero-visual"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            aria-hidden="true"
          >
            <div className="hero-cloud hero-cloud-1" />
            <div className="hero-starfield" />
            <div className="hero-side-signal" />
            <div className="hero-orbit-arc hero-orbit-arc-1" />
            <div className="hero-orbit-arc hero-orbit-arc-2" />
            <div className="planet-glow" />
            <div className="planet-ring ring-1" />
            <div className="planet-ring ring-2" />
            <div className="planet-core">
              <div className="planet-shade" />
              <div className="planet-highlight" />
            </div>
            <div className="signal-dot signal-1" />
            <div className="signal-dot signal-2" />
          </motion.div>
        </section>

        <FadeInSection>
          <section className="stat-band">
            <div>
              <span className="stat-value">2x</span>
              <span className="stat-label">terrestrial power demand pressure this decade</span>
            </div>
            <div>
              <span className="stat-value">$64B+</span>
              <span className="stat-label">in data center projects publicly reported as blocked or delayed</span>
            </div>
            <div>
              <span className="stat-value">APAC</span>
              <span className="stat-label">neutral base for sovereign compute conversations</span>
            </div>
          </section>
        </FadeInSection>

         <section id="opportunity" className="content-section chapter-section chapter-opportunity">
           <FadeInSection>
             <SectionHeading
               eyebrow="The Opportunity"
               title="Terrestrial infrastructure is hitting harder limits."
               body="The demand curve for AI is accelerating faster than the world can easily add power, fiber reach, and politically straightforward data center capacity."
             />
           </FadeInSection>

          <div className="card-grid constraint-grid">
            {constraintCards.map((card, index) => (
              <FadeInSection key={card.title} delay={index * 0.08}>
                <article className="info-card constraint-card">
                  <div className="metric">{card.value}</div>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="why-orbit" className="content-section split-section subsection-section chapter-section chapter-opportunity-secondary">
          <FadeInSection>
            <SectionHeading
              eyebrow="Within The Opportunity"
              title="Space compute changes the operating model, not just the location."
              body="The opportunity is not simply to move a data center upward. It is to rethink how infrastructure works when energy, routing, and physical isolation behave differently from the ground up."
            />
          </FadeInSection>

          <div className="card-grid orbit-grid">
            {orbitBenefits.map((benefit, index) => {
              const Icon = benefit.icon
              return (
                <FadeInSection key={benefit.title} delay={index * 0.08}>
                  <article className="info-card benefit-card">
                    <div className="icon-chip">
                      <Icon size={20} />
                    </div>
                    <h3>{benefit.title}</h3>
                    <p>{benefit.text}</p>
                  </article>
                </FadeInSection>
              )
            })}
          </div>
        </section>

        <section id="why-now" className="content-section why-now-section subsection-section chapter-section chapter-transition">
          <FadeInSection>
            <SectionHeading
              eyebrow="Within The Opportunity"
              title="Three curves are converging at once."
              body="Cost to orbit, orbit-capable compute, and orbital networking have all advanced enough to make the category commercially legible."
            />
          </FadeInSection>

          <div className="why-now-layout">
            <FadeInSection>
              <aside className="why-now-intro">
                <div className="timeline-eyebrow">Timing signal</div>
                <h3>The market stops feeling theoretical when all three move together.</h3>
                <p>
                  On their own, launch, compute, and networking are technical milestones. Together, they form
                  the commercial opening for a neutral orbital compute platform.
                </p>
                <div className="why-now-curve">
                  <span>2025</span>
                  <div className="curve-line" />
                  <span>2030</span>
                  <div className="curve-line is-bright" />
                  <span>2035</span>
                </div>
              </aside>
            </FadeInSection>

            <div className="why-now-signals">
              {timingSignals.map((signal, index) => (
                <FadeInSection key={signal.headline} delay={index * 0.08}>
                  <article className="timeline-card timeline-card-enhanced">
                    <div className="timeline-head">
                      <div className="timeline-eyebrow">{signal.eyebrow}</div>
                      <div className="timeline-metric">{signal.metric}</div>
                    </div>
                    <div>
                      <h3>{signal.headline}</h3>
                      <p>{signal.detail}</p>
                    </div>
                  </article>
                </FadeInSection>
              ))}
            </div>
          </div>

          <FadeInSection delay={0.12}>
            <div className="why-now-summary">
              <div className="summary-kicker">What this unlocks</div>
              <p>
                Commercial-scale orbital compute now has a credible path from concept to service layer,
                moving the category from frontier thesis toward operating opportunity.
              </p>
            </div>
          </FadeInSection>
        </section>

        <section id="arena" className="content-section chapter-section chapter-arena">
          <FadeInSection>
            <SectionHeading
              eyebrow="The Arena"
              title="Three market dynamics are shaping the space compute opportunity."
              body="The ecosystem is forming quickly, but the independent cloud layer remains open. That creates room for a neutral operator with clear jurisdictional positioning and a product strategy built around orchestration rather than vertical integration."
            />
          </FadeInSection>

          <FadeInSection delay={0.06}>
            <div className="arena-ladder" aria-hidden="true">
              <div>Compute stack</div>
              <div>Access to orbit</div>
              <div>Orbital infrastructure</div>
              <div>Applications</div>
            </div>
          </FadeInSection>

          <div className="card-grid arena-grid">
            {arenaDynamics.map((item, index) => (
              <FadeInSection key={item.title} delay={index * 0.08}>
                <article className="info-card arena-card">
                  <div className="timeline-eyebrow">{item.label}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              </FadeInSection>
            ))}
          </div>
        </section>

        <section id="build" className="content-section build-section chapter-section chapter-build">
          <FadeInSection>
            <SectionHeading
              eyebrow="Our Play"
              title="A three-layer stack from payload logic to cloud access."
              body="Red Dot Space is building a stack, not a single payload: infrastructure in orbit, intelligence to operate it, and a cloud layer customers can actually use."
            />
          </FadeInSection>

          <FadeInSection delay={0.06}>
            <div className="build-diagram" aria-hidden="true">
              <div className="build-diagram-line" />
              {buildLayers.map((layer) => (
                <div key={layer.label} className="build-diagram-node">
                  <Layers3 size={16} />
                  <span>{layer.title}</span>
                </div>
              ))}
            </div>
          </FadeInSection>

          <FadeInSection delay={0.08}>
            <div className="position-layout build-position-layout">
              <div className="position-intro">
                <div className="eyebrow">Our Positioning</div>
                <h2>The cloud layer for space compute.</h2>
                <p>
                  Red Dot Space is shaping around a neutral role in an emerging market: a serious operating
                  layer between orbital infrastructure and customers that need trusted compute outcomes.
                </p>
                <div className="position-badge">
                  <Orbit size={16} />
                  <span>Starting from Singapore</span>
                </div>
              </div>

              <div className="position-points">
                {positioning.map((item, index) => (
                  <FadeInSection key={item.title} delay={index * 0.08}>
                    <article className="position-card">
                      <div className="position-number">{item.number}</div>
                      <div>
                        <h3>{item.title}</h3>
                        <p>{item.text}</p>
                      </div>
                    </article>
                  </FadeInSection>
                ))}
              </div>
            </div>
          </FadeInSection>

          <div className="build-stack">
            <div className="build-rail" aria-hidden="true">
              <div className="rail-line" />
              {buildLayers.map((layer) => (
                <div key={layer.label} className="rail-node" />
              ))}
            </div>

            <div className="build-layers">
              {buildLayers.map((layer, index) => (
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

        <section id="why-us" className="content-section position-section chapter-section chapter-whyus">
          <FadeInSection>
            <SectionHeading
              eyebrow="Why Us"
              title="Built for this moment, from the right place."
              body="Red Dot Space combines orbit-first infrastructure thinking, a neutral operating model, and a Singapore base that is credible for sovereign compute conversations across APAC and adjacent markets."
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

          <FadeInSection delay={0.2}>
            <div className="team-stub">
              <div className="timeline-eyebrow">Team</div>
              <h3>Founders &amp; advisors</h3>
              <p>
                Founding team brings experience across cloud infrastructure, space systems, and enterprise
                technology in Singapore and the region. Additional background is available on request at{' '}
                <a href="mailto:invest@reddot.space">invest@reddot.space</a>.
              </p>
            </div>
          </FadeInSection>
        </section>

        <section id="roadmap" className="content-section roadmap-section chapter-section chapter-roadmap">
          <FadeInSection>
            <SectionHeading
              eyebrow="Roadmap"
              title="From validation to regional category leadership."
              body="The near-term focus is proof, partnerships, and platform credibility. The longer-term aim is to become a durable neutral operator in space-native compute."
            />
          </FadeInSection>

          <div className="roadmap-grid">
            {roadmap.map((item, index) => (
              <FadeInSection key={item.phase} delay={index * 0.08}>
                <article className="roadmap-card">
                  <div className="roadmap-phase">{item.phase}</div>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
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
                <h2>See you in orbit.</h2>
                <p>
                  If you are exploring sovereign compute, orbital infrastructure, design partnerships, or the
                  future of cloud beyond the ground, start the conversation here.
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
                  <span>Partnership and investor conversations</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </section>
      </main>
    </div>
  )
}
