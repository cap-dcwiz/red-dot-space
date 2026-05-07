import pptxgen from 'pptxgenjs'

const pptx = new pptxgen()

pptx.author = 'OpenCode'
pptx.company = 'Red Dot Space'
pptx.subject = 'Red Dot Space V1 Brand Color and Typography Guide'
pptx.title = 'Red Dot Space V1 Brand Color and Typography Guide'
pptx.lang = 'en-SG'
pptx.layout = 'LAYOUT_WIDE'

const C = {
  bg: '040811',
  bgSoft: '0B1322',
  card: '0A111E',
  text: 'F6F3EE',
  muted: 'D6E1F5',
  blue: '7AA6FF',
  red: 'D42128',
  border: 'A3BDFF',
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
      line: { color: C.border, transparency: 94, pt: 0.5 },
    })
  }
  for (let i = 0; i <= 8; i++) {
    slide.addShape(pptx.ShapeType.line, {
      x: 0,
      y: i * 0.94,
      w: page.w,
      h: 0,
      line: { color: C.border, transparency: 94, pt: 0.5 },
    })
  }
}

function addWordmark(slide) {
  slide.addText('RED DOT SPACE', {
    x: 0.55,
    y: 0.35,
    w: 2.6,
    h: 0.25,
    fontFace: 'Space Grotesk',
    fontSize: 12,
    bold: true,
    color: C.text,
    charSpace: 2.6,
    margin: 0,
  })
}

function addEyebrow(slide, text, x, y, w = 2.4) {
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
    h: 0.18,
    fontFace: 'Space Grotesk',
    fontSize: 10,
    color: C.blue,
    charSpace: 2.1,
    margin: 0,
  })
}

function addTitle(slide, text, x, y, w, size = 26, h = 0.8) {
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
    bold: options.bold || false,
    margin: options.margin ?? 0,
    fit: 'shrink',
    breakLine: options.breakLine ?? false,
    valign: 'top',
  })
}

function addPanel(slide, x, y, w, h) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w,
    h,
    rectRadius: 0.12,
    line: { color: C.border, transparency: 82, pt: 1 },
    fill: { color: C.card, transparency: 10 },
  })
}

function addColorChip(slide, x, y, swatchColor, label, value, darkText = false) {
  slide.addShape(pptx.ShapeType.roundRect, {
    x,
    y,
    w: 1.78,
    h: 1.08,
    rectRadius: 0.08,
    line: { color: C.border, transparency: 78, pt: 0.8 },
    fill: { color: swatchColor },
  })
  addBody(slide, label, x, y + 1.22, 1.78, 0.14, { fontSize: 10, color: C.text, bold: true })
  addBody(slide, value, x, y + 1.4, 1.78, 0.14, { fontSize: 9, color: C.muted })
}

function addBulletList(slide, items, x, y, w, gap = 0.48) {
  items.forEach((item, index) => {
    slide.addShape(pptx.ShapeType.ellipse, {
      x,
      y: y + index * gap + 0.08,
      w: 0.07,
      h: 0.07,
      line: { color: C.red, transparency: 100 },
      fill: { color: C.red },
    })
    addBody(slide, item, x + 0.14, y + index * gap, w - 0.14, 0.2, { fontSize: 12 })
  })
}

// Slide 1: Cover
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'V1 Brand Color + Type Guide', 0.75, 1.28, 3.1)
  addTitle(s, 'Red Dot Space', 0.75, 1.68, 4.6, 30, 0.78)
  addTitle(s, 'For future slides, decks, and demos', 0.75, 2.4, 5.8, 18, 0.58)
  addBody(s, 'Quick internal reference for keeping presentation materials visually consistent.', 0.75, 3.05, 5.4, 0.36, { fontSize: 13 })
  s.addShape(pptx.ShapeType.arc, {
    x: 8.55, y: 0.62, w: 3.3, h: 5.7,
    line: { color: C.blue, transparency: 74, pt: 0.9 }, fill: { color: C.bg, transparency: 100 }, adjustPoint: 0.2,
  })
  s.addShape(pptx.ShapeType.arc, {
    x: 8.05, y: 1.08, w: 2.45, h: 4.55,
    line: { color: C.border, transparency: 86, pt: 0.7 }, fill: { color: C.bg, transparency: 100 }, adjustPoint: 0.2,
  })
  s.addShape(pptx.ShapeType.ellipse, {
    x: 1.75, y: 4.82, w: 0.12, h: 0.12,
    line: { color: C.red, transparency: 100 }, fill: { color: C.red },
  })
}

// Slide 2: Core palette
{
  const s = pptx.addSlide()
  addBackground(s, true)
  addWordmark(s)
  addEyebrow(s, 'Core Palette', 0.75, 0.95, 1.8)
  addTitle(s, 'Blue-black base. Red as signal.', 0.75, 1.24, 5.3)
  addBody(s, 'Use deep navy for the foundation, white for content, blue for structure, and red sparingly for emphasis.', 0.75, 1.92, 5.9, 0.4, { fontSize: 13 })
  const chips = [
    [C.bg, 'Background Deep', '#040811', false],
    [C.bgSoft, 'Background Soft', '#0B1322', false],
    [C.text, 'Text Primary', '#F6F3EE', true],
    [C.blue, 'Sky Blue', '#7AA6FF', true],
    [C.red, 'Brand Red', '#D42128', false],
    [C.card, 'Card Surface', '#0A111E', false],
  ]
  chips.forEach((chip, i) => addColorChip(s, 0.85 + (i % 3) * 2.18, 2.8 + Math.floor(i / 3) * 2.0, chip[0], chip[1], chip[2], chip[3]))
  addPanel(s, 7.5, 2.8, 5.0, 3.95)
  addBody(s, 'Default ratio', 7.8, 3.12, 1.5, 0.18, { fontSize: 15, color: C.text, bold: true })
  addBulletList(s, ['75% dark navy / near-black', '20% white / muted text', '5% accents', 'Blue builds structure', 'Red marks importance'], 7.8, 3.52, 4.0, 0.52)
}

// Slide 3: Typography
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'Typography', 0.75, 0.95, 1.8)
  addTitle(s, 'Separate the brand wordmark from editable deck type.', 0.75, 1.24, 7.2)
  addBody(s, 'Use Space Grotesk for the approved logo asset and website/exported brand materials. Use Aptos for editable client PowerPoint headings and body text.', 0.75, 1.92, 6.7, 0.5, { fontSize: 13 })
  addPanel(s, 0.75, 2.75, 5.9, 3.95)
  addTitle(s, 'Brand wordmark', 1.05, 3.02, 3.5, 22, 0.5)
  addBody(s, 'Space Grotesk Bold', 1.05, 3.42, 2.8, 0.18, { fontSize: 11, color: C.blue, bold: true })
  addBody(s, 'Use only for the approved RED DOT SPACE logo asset and exported brand artwork.', 1.05, 3.72, 4.95, 0.42, { fontSize: 11.5 })
  addBulletList(s, ['Export as SVG/PNG for slides', 'Do not rebuild as live PPT text', 'Keep tracking controlled and consistent'], 1.05, 4.35, 4.7, 0.44)
  addPanel(s, 6.95, 2.75, 5.65, 3.95)
  addBody(s, 'Editable deck type', 7.25, 3.02, 2.4, 0.24, { fontSize: 20, color: C.text, bold: true })
  addBody(s, 'Aptos for client PPT', 7.25, 3.42, 2.8, 0.18, { fontSize: 11, color: C.blue, bold: true })
  addBody(s, 'Use Aptos for headings, labels, bullets, and body text when the file must remain editable on client machines.', 7.25, 3.72, 4.8, 0.42, { fontSize: 11.5 })
  addBulletList(s, ['Semibold for headings and metrics', 'Regular for body copy', 'Inter remains fine for web and exported PDFs'], 7.25, 4.35, 4.2, 0.44)
}

// Slide 4: Usage rules and sample
{
  const s = pptx.addSlide()
  addBackground(s)
  addWordmark(s)
  addEyebrow(s, 'Usage Rules', 0.75, 0.95, 1.8)
  addTitle(s, 'What to do on the next slide.', 0.75, 1.24, 5.1)
  addPanel(s, 0.75, 2.55, 4.9, 4.3)
  addBody(s, 'Quick rules', 1.05, 2.88, 1.4, 0.18, { fontSize: 15, color: C.text, bold: true })
  addBulletList(s, [
    'Use deep navy or soft navy for backgrounds',
    'Use white for primary text',
    'Use blue for labels, diagrams, and chart structure',
    'Use red sparingly for emphasis or CTA moments',
    'Avoid green as the main accent',
    'Prefer one red highlight per slide',
  ], 1.05, 3.25, 3.95, 0.46)
  addPanel(s, 6.0, 2.55, 6.55, 4.3)
  addBody(s, 'Sample application', 6.3, 2.88, 1.9, 0.18, { fontSize: 15, color: C.text, bold: true })
  addPanel(s, 6.3, 3.35, 5.95, 2.95)
  addEyebrow(s, 'The Opportunity', 6.58, 3.62, 2.2)
  addTitle(s, 'Compute in orbit.', 6.58, 3.95, 3.4, 22, 0.55)
  addBody(s, 'Use blue for structure, white for the main statement, one restrained red accent, and simple diagrams only where they improve scanability.', 6.58, 4.58, 4.55, 0.56, { fontSize: 10.8 })
  s.addShape(pptx.ShapeType.ellipse, {
    x: 8.45, y: 5.18, w: 0.1, h: 0.1,
    line: { color: C.red, transparency: 100 }, fill: { color: C.red },
  })
  s.addShape(pptx.ShapeType.line, {
    x: 10.2, y: 3.55, w: 1.45, h: 2.2,
    line: { color: C.blue, transparency: 74, pt: 0.9, beginArrowType: 'none', endArrowType: 'none' },
  })
}

await pptx.writeFile({ fileName: 'Red Dot Space V1 Brand Color and Typography Guide.pptx' })
