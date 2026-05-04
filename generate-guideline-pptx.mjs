import pptxgen from 'pptxgenjs'

const pptx = new pptxgen()

pptx.author = 'OpenCode'
pptx.company = 'Red Dot Space'
pptx.subject = 'Red Dot Space V1 Visual Guideline'
pptx.title = 'Red Dot Space V1 Visual Guideline'
pptx.lang = 'en-SG'
pptx.layout = 'LAYOUT_WIDE'

const C = {
  bg: '040811',
  bgSoft: '0B1322',
  panel: '0A111E',
  panel2: '101A2D',
  text: 'F6F3EE',
  muted: 'D6E1F5',
  blue: '7AA6FF',
  red: 'D42128',
  line: 'A3BDFF',
}

const page = { w: 13.333, h: 7.5 }

function addBackground(slide, soft = false) {
  slide.background = { color: soft ? C.bgSoft : C.bg }
  slide.addShape(pptx.ShapeType.rect, {
    x: 0,
    y: 0,
    w: page.w,
    h: page.h,
    line: { color: soft ? C.bgSoft : C.bg, transparency: 100 },
    fill: {
      color: soft ? C.bgSoft : C.bg,
      transparency: 0,
      gradient: {
        angle: 90,
        stops: [
          { pos: 0, color: '07101D', transparency: 0 },
          { pos: 65, color: soft ? '0B1322' : '040811', transparency: 0 },
          { pos: 100, color: '03060D', transparency: 0 },
        ],
      },
    },
  })
  for (let i = 0; i <= 13; i++) {
    slide.addShape(pptx.ShapeType.line, {
      x: i * 1.02,
      y: 0,
      w: 0,
      h: page.h,
      line: { color: C.line, transparency: 93, pt: 0.6 },
    })
  }
  for (let i = 0; i <= 8; i++) {
    slide.addShape(pptx.ShapeType.line, {
      x: 0,
      y: i * 0.94,
      w: page.w,
      h: 0,
      line: { color: C.line, transparency: 93, pt: 0.6 },
    })
  }
}

function addWordmark(slide) {
  slide.addText('RED DOT SPACE', {
    x: 0.55,
    y: 0.35,
    w: 2.3,
    h: 0.3,
    fontFace: 'Space Grotesk',
    fontSize: 12,
    bold: true,
    color: C.text,
    charSpace: 2.6,
    margin: 0,
  })
}

function addEyebrow(slide, text, x, y, w = 2.6) {
  slide.addShape(pptx.ShapeType.ellipse, {
    x,
    y: y + 0.07,
    w: 0.07,
    h: 0.07,
    line: { color: C.red, transparency: 100 },
    fill: { color: C.red },
  })
  slide.addText(text.toUpperCase(), {
    x: x + 0.12,
    y,
    w,
    h: 0.2,
    fontFace: 'Space Grotesk',
    fontSize: 10,
    color: C.blue,
    charSpace: 2.2,
    margin: 0,
  })
}

function addTitle(slide, text, x, y, w, h = 0.9, size = 26) {
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontFace: 'Space Grotesk',
    fontSize: size,
    bold: true,
    color: C.text,
    margin: 0,
    breakLine: false,
    valign: 'mid',
  })
}

function addBody(slide, text, x, y, w, h, options = {}) {
  slide.addText(text, {
    x,
    y,
    w,
    h,
    fontFace: 'Inter',
    fontSize: options.fontSize || 12,
    color: options.color || C.muted,
    margin: options.margin ?? 0,
    breakLine: options.breakLine ?? false,
    fit: 'shrink',
    valign: 'top',
    bold: options.bold || false,
  })
}

function addPanel(slide, x, y, w, h, opts = {}) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.12,
    line: { color: opts.lineColor || C.line, transparency: opts.lineTransparency ?? 82, pt: 1 },
    fill: { color: opts.fillColor || C.panel, transparency: opts.fillTransparency ?? 10 },
  })
}

function addBullets(slide, items, x, y, w, lineGap = 0.36) {
  items.forEach((item, index) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x,
      y: y + index * lineGap + 0.09,
      w: 0.07,
      h: 0.07,
      line: { color: C.red, transparency: 100 },
      fill: { color: C.red },
    })
    addBody(slide, item, x + 0.13, y + index * lineGap, w - 0.13, 0.18, { fontSize: 12 })
  })
}

function addPaletteChip(slide, x, y, color, label, value) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 1.45,
    h: 1.18,
    rectRadius: 0.08,
    line: { color: C.line, transparency: 78, pt: 0.8 },
    fill: { color },
  })
  addBody(slide, label, x, y + 1.26, 1.45, 0.16, { fontSize: 10, color: C.text, bold: true })
  addBody(slide, value, x, y + 1.42, 1.45, 0.14, { fontSize: 9 })
}

// Slide 1: Cover
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'V1 Visual Guideline', 0.75, 1.35, 2.4)
  addTitle(s, 'Red Dot Space', 0.75, 1.72, 4.8, 0.8, 30)
  addTitle(s, 'Website and slide consistency system', 0.75, 2.48, 6.2, 0.7, 19)
  addBody(s, 'Internal working deck for aligning the website, product slides, and supporting materials.', 0.75, 3.2, 5.8, 0.5, { fontSize: 14 })
  s.addShape(pptx.ShapeType.arc, {
    x: 8.55, y: 0.6, w: 3.4, h: 5.8,
    line: { color: C.blue, transparency: 72, pt: 0.9 }, fill: { color: C.bg, transparency: 100 },
    adjustPoint: 0.2,
  })
  s.addShape(pptx.ShapeType.arc, {
    x: 8.05, y: 1.1, w: 2.55, h: 4.6,
    line: { color: C.line, transparency: 84, pt: 0.7 }, fill: { color: C.bg, transparency: 100 },
    adjustPoint: 0.2,
  })
  s.addShape(pptx.ShapeType.line, {
    x: 8.05, y: 5.95, w: 3.4, h: 0,
    line: { color: C.blue, transparency: 84, pt: 0.7 },
  })
  addBody(s, 'April 2026', 0.75, 6.65, 1.2, 0.16, { fontSize: 10, color: C.blue })
}

// Slide 2: Direction
{
  const s = pptx.addSlide()
  addBackground(s, true)
  addWordmark(s)
  addEyebrow(s, 'Brand Direction', 0.75, 0.95, 2.2)
  addTitle(s, 'A premium frontier-infrastructure identity.', 0.75, 1.24, 6.6, 0.9, 24)
  addBody(s, 'Red Dot Space should feel calm, technically credible, editorial, premium, and space-native. It should not feel neon, green-led, or deck-like in a literal way.', 0.75, 1.95, 6.4, 0.72, { fontSize: 13 })
  addPanel(s, 0.75, 3.0, 3.7, 2.6)
  addPanel(s, 4.7, 3.0, 3.7, 2.6)
  addPanel(s, 8.65, 3.0, 3.9, 2.6)
  addBody(s, 'Dark space first', 1.0, 3.28, 2.8, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBody(s, 'Deep navy and near-black foundations, not pure black or green-glow sci-fi.', 1.0, 3.65, 2.9, 0.7, { fontSize: 12 })
  addBody(s, 'Blue for structure', 4.95, 3.28, 2.8, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBody(s, 'Use blue for data, labels, diagrams, and interface framing.', 4.95, 3.65, 2.9, 0.7, { fontSize: 12 })
  addBody(s, 'Red for signal', 8.9, 3.28, 2.8, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBody(s, 'Use red as brand punctuation, CTA emphasis, or one deliberate focal point.', 8.9, 3.65, 3.0, 0.7, { fontSize: 12 })
}

// Slide 3: Palette
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'Colour System', 0.75, 0.95, 2.2)
  addTitle(s, 'Blue-black foundation with restrained red.', 0.75, 1.24, 5.9, 0.8, 24)
  addBody(s, 'Blue should dominate structure and technical framing. Red should remain sparse so it stays distinctive.', 0.75, 1.92, 5.8, 0.44, { fontSize: 13 })
  const chips = [
    [C.bg, 'Background (deep)', '#040811'],
    [C.bgSoft, 'Background (soft)', '#0B1322'],
    [C.panel2, 'Card surface', 'rgba(10,17,30,0.76)'],
    [C.red, 'Brand red', '#D42128'],
    [C.blue, 'Sky blue', '#7AA6FF'],
    [C.text, 'Text (primary)', '#F6F3EE'],
  ]
  chips.forEach((chip, i) => addPaletteChip(s, 0.9 + (i % 3) * 2.05, 2.85 + Math.floor(i / 3) * 2.15, chip[0], chip[1], chip[2]))
  addPanel(s, 7.35, 2.85, 5.1, 4.35)
  addBody(s, 'Usage ratio', 7.7, 3.15, 1.5, 0.2, { fontSize: 15, color: C.text, bold: true })
  addBullets(s, ['75% dark navy / near-black', '20% white / muted text', '5% accents', 'Blue for structure, red for emphasis', 'Avoid green as the primary highlight'], 7.7, 3.55, 4.2, 0.5)
}

// Slide 4: Typography
{
  const s = pptx.addSlide()
  addBackground(s, true)
  addWordmark(s)
  addEyebrow(s, 'Typography', 0.75, 0.95, 1.8)
  addTitle(s, 'One display family, one body family.', 0.75, 1.24, 5.8, 0.8, 24)
  addBody(s, 'Space Grotesk carries the brand voice and display hierarchy. Inter carries body/UI clarity.', 0.75, 1.92, 5.8, 0.4, { fontSize: 13 })
  addPanel(s, 0.75, 2.75, 6.05, 3.9)
  addTitle(s, 'SPACE GROTESK', 1.05, 3.02, 5.2, 0.48, 20)
  addBody(s, 'Display / wordmark family', 1.05, 3.48, 2.6, 0.18, { fontSize: 11, color: C.blue, bold: true })
  addBody(s, 'Wordmark, hero headings, section titles, metrics, and labels.', 1.05, 3.72, 4.95, 0.34, { fontSize: 11.5 })
  addBody(s, 'Recommended treatment', 1.05, 4.28, 2.2, 0.18, { fontSize: 11, color: C.blue, bold: true })
  addBullets(s, ['Wordmark: tighter, controlled uppercase', 'Headlines: bold, expressive, less branded'], 1.05, 4.58, 4.8, 0.42)
  addPanel(s, 6.95, 2.75, 5.65, 3.9)
  addBody(s, 'Inter', 7.25, 3.02, 2.2, 0.24, { fontSize: 18, color: C.text, bold: true })
  addBody(s, 'Body / UI family', 7.25, 3.34, 2.2, 0.18, { fontSize: 11, color: C.blue, bold: true })
  addBody(s, 'Body copy, supporting detail, UI, and slide notes.', 7.25, 3.62, 4.3, 0.32, { fontSize: 11.5 })
  addBody(s, 'Recommended rhythm', 7.25, 4.18, 2.1, 0.18, { fontSize: 11, color: C.blue, bold: true })
  addBullets(s, ['Regular 400', 'Line-height around 1.6 to 1.7', 'Muted text for secondary reading'], 7.25, 4.48, 4.2, 0.42)
}

// Slide 5: Wordmark
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'Wordmark Usage', 0.75, 0.95, 2.4)
  addTitle(s, 'Wordmark-first for v1.', 0.75, 1.24, 4.3, 0.8, 24)
  addBody(s, 'The current identity does not require a symbol. Use RED DOT SPACE as a controlled typographic mark.', 0.75, 1.92, 5.5, 0.45, { fontSize: 13 })
  addPanel(s, 0.75, 2.85, 5.3, 1.65)
  s.addText('RED DOT SPACE', { x: 1.05, y: 3.35, w: 3.8, h: 0.3, fontFace: 'Space Grotesk', fontSize: 20, bold: true, color: C.text, charSpace: 3.2, margin: 0 })
  addPanel(s, 6.3, 2.85, 6.0, 3.55)
  addBullets(s, ['Uppercase, stable tracking', 'No decorative effects or glows', 'No green styling', 'Red can appear nearby as punctuation, not as a dominant treatment', 'Same family as headlines is acceptable; treatment should remain more controlled'], 6.65, 3.2, 5.0, 0.52)
}

// Slide 6: Visual principles
{
  const s = pptx.addSlide()
  addBackground(s, true)
  addWordmark(s)
  addEyebrow(s, 'Visual Principles', 0.75, 0.95, 2.2)
  addTitle(s, 'A system people can reuse without guessing.', 0.75, 1.24, 6.1, 0.8, 24)
  addBody(s, 'Future slides and presentations should feel consistent through hierarchy, spacing, and disciplined accent usage, not through copying the website literally.', 0.75, 1.92, 6.2, 0.45, { fontSize: 13 })
  addPanel(s, 0.75, 2.85, 3.8, 3.7)
  addBody(s, 'Hierarchy', 1.05, 3.15, 1.4, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Lead with one clear headline', 'Support with one proof layer', 'Use cards only where structure helps'], 1.05, 3.55, 3.0, 0.56)
  addPanel(s, 4.8, 2.85, 3.8, 3.7)
  addBody(s, 'Rhythm', 5.1, 3.15, 1.2, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Alternate dense and quiet slides', 'Use spacing more than borders', 'Avoid repeating the same composition too often'], 5.1, 3.55, 3.0, 0.56)
  addPanel(s, 8.85, 2.85, 3.8, 3.7)
  addBody(s, 'Restraint', 9.15, 3.15, 1.3, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Blue for structure', 'Red for one deliberate signal', 'Avoid over-designing when clarity matters most'], 9.15, 3.55, 3.0, 0.56)
}

// Slide 7: Charts and diagrams
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'Data & Charts', 0.75, 0.95, 2.0)
  addTitle(s, 'Simplify for comprehension, not density.', 0.75, 1.24, 5.8, 0.8, 24)
  addBody(s, 'Presentation visuals should communicate one main idea each. Structure belongs to blue; emphasis belongs to red.', 0.75, 1.92, 6.0, 0.45, { fontSize: 13 })
  addPanel(s, 0.75, 2.8, 6.0, 3.9)
  addBody(s, 'Do', 1.05, 3.12, 0.8, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Blue for default series / linework', 'White for labels', 'Red for one highlighted datapoint only', 'Prefer summary numbers over dense mini-charts'], 1.05, 3.5, 4.7, 0.52)
  addPanel(s, 7.0, 2.8, 5.6, 3.9)
  addBody(s, 'Diagrams', 7.3, 3.12, 1.2, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Blue linework and nodes', 'Dark panels with white labels', 'One red emphasis where needed', 'Avoid green system highlighting'], 7.3, 3.5, 4.3, 0.52)
}

// Slide 8: Imagery
{
  const s = pptx.addSlide()
  addBackground(s, true)
  addWordmark(s)
  addEyebrow(s, 'Imagery', 0.75, 0.95, 1.6)
  addTitle(s, 'Engineered imagery, not generic space art.', 0.75, 1.24, 6.2, 0.8, 24)
  addPanel(s, 0.75, 2.75, 5.9, 3.95)
  addBody(s, 'Preferred imagery', 1.05, 3.05, 1.9, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Earth horizon', 'Orbital rings', 'Deep-atmosphere gradients', 'Satellite / infrastructure visuals that feel engineered', 'Subtle starfield and grid texture'], 1.05, 3.45, 4.8, 0.5)
  addPanel(s, 6.95, 2.75, 5.65, 3.95)
  addBody(s, 'Avoid', 7.25, 3.05, 1.0, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Clipart rockets', 'Generic AI imagery', 'Heavy neon glows', 'Overly cinematic scenes that overpower the copy'], 7.25, 3.45, 4.6, 0.56)
}

// Slide 9: Tone and copy
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'Tone & Copy', 0.75, 0.95, 1.9)
  addTitle(s, 'Confident, precise, technical.', 0.75, 1.24, 4.9, 0.8, 24)
  addPanel(s, 0.75, 2.75, 5.9, 3.9)
  addBody(s, 'Use', 1.05, 3.08, 0.8, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Confident, precise language', 'Compute in orbit.', 'Spell out Neocloud Provider on first use', 'Red Dot Space as three words'], 1.05, 3.48, 4.7, 0.56)
  addPanel(s, 7.0, 2.75, 5.6, 3.9)
  addBody(s, 'Avoid', 7.3, 3.08, 0.9, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Vague or speculative phrasing', 'Overwriting slides with long paragraphs', 'Inconsistent naming', 'Making every statement sound like a finalized capability'], 7.3, 3.48, 4.3, 0.56)
}

// Slide 10: Do / Don't
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'Do / Don’t', 0.75, 0.95, 1.8)
  addTitle(s, 'Keep the system disciplined.', 0.75, 1.24, 4.7, 0.8, 24)
  addPanel(s, 0.75, 2.75, 5.9, 4.2, { lineColor: C.blue, lineTransparency: 72, fillColor: C.panel2 })
  addBody(s, 'Do', 1.05, 3.08, 0.8, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Use blue for structure and technical framing', 'Use red sparingly for emphasis and brand punctuation', 'Keep layouts spacious', 'Let headlines carry the story'], 1.05, 3.48, 4.7, 0.56)
  addPanel(s, 7.0, 2.75, 5.6, 4.2, { lineColor: C.red, lineTransparency: 74, fillColor: C.panel })
  addBody(s, 'Don’t', 7.3, 3.08, 1.0, 0.2, { fontSize: 16, color: C.text, bold: true })
  addBullets(s, ['Reintroduce green as the primary accent', 'Turn every section into identical cards', 'Use more than one red highlight per chart', 'Overuse glow, blur, or motion'], 7.3, 3.48, 4.3, 0.56)
}

// Slide 11: Sample cover slide
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'Sample Cover Slide', 0.75, 1.15, 2.4)
  addTitle(s, 'Compute in orbit.', 0.75, 1.58, 4.7, 0.85, 28)
  addBody(s, 'Use a dark background, blue eyebrow, strong white title, and one restrained red accent.', 0.75, 2.3, 5.2, 0.44, { fontSize: 13 })
  s.addShape(pptx.ShapeType.arc, {
    x: 8.35, y: 0.8, w: 3.2, h: 5.3,
    line: { color: C.blue, transparency: 74, pt: 0.85 }, fill: { color: C.bg, transparency: 100 }, adjustPoint: 0.2,
  })
  s.addShape(pptx.ShapeType.arc, {
    x: 7.95, y: 1.32, w: 2.35, h: 4.15,
    line: { color: C.line, transparency: 86, pt: 0.65 }, fill: { color: C.bg, transparency: 100 }, adjustPoint: 0.2,
  })
  s.addShape(pptx.ShapeType.ellipse, {
    x: 1.78, y: 4.95, w: 0.12, h: 0.12,
    line: { color: C.red, transparency: 100 }, fill: { color: C.red },
  })
}

// Slide 12: Sample content slide
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'Sample Content Slide', 0.75, 0.95, 2.6)
  addTitle(s, 'Three curves are converging.', 0.75, 1.24, 4.8, 0.8, 24)
  addBody(s, 'Use large white framing, blue labels, and a single red emphasis when presenting timing, product stack, or system logic.', 0.75, 1.92, 5.4, 0.45, { fontSize: 13 })
  ;[
    ['01 / Launch', '$100/kg', 'Lower cost to orbit'],
    ['02 / Compute', '100x', 'Modern chips reach orbit'],
    ['03 / Networking', '100Gbps', 'Optical links are real'],
  ].forEach((item, i) => {
    const x = 0.75 + i * 4.2
    addPanel(s, x, 3.0, 3.75, 2.75)
    addBody(s, item[0], x + 0.28, 3.28, 1.6, 0.16, { fontSize: 10, color: C.blue, bold: true })
    addBody(s, item[1], x + 0.28, 3.72, 2.0, 0.34, { fontFace: 'Space Grotesk', fontSize: 24, color: i === 1 ? C.red : C.text, bold: true })
    addBody(s, item[2], x + 0.28, 4.28, 2.7, 0.24, { fontSize: 13, color: C.text, bold: true })
  })
}

await pptx.writeFile({ fileName: 'Red Dot Space V1 Visual Guideline.pptx' })
