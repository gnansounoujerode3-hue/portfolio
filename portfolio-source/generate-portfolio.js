/*
 * ANGE HMG HOME — Dossier de marque officiel
 * Source éditable du PDF. Généré avec: npm run build:portfolio
 */
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const root = path.resolve(__dirname, '..');
const exportTextLayer = process.env.HMG_EXPORT_TEXT_LAYER === '1';
const out = process.env.HMG_BACKGROUND_OUTPUT
  ? path.resolve(process.env.HMG_BACKGROUND_OUTPUT)
  : path.join(root, 'ANGE_HMG_HOME_Dossier_de_Marque_2026.pdf');
const asset = (name) => path.join(root, name);

const photo = {
  logo: asset('WhatsApp Image 2026-10-03 at 16.03.17.jpeg'),
  logoBlack: path.join(__dirname, 'ange-hmg-home-logo.png'),
  logoWhite: path.join(__dirname, 'ange-hmg-home-logo-white.png'),
  colorMuse: asset('WhatsApp Image 2026-10-05 at 00.38.14 (1).jpeg'),
  groupColor: asset('WhatsApp Image 2026-10-05 at 00.38.14.jpeg'),
  orangePortrait: asset('WhatsApp Image 2026-10-05 at 00.38.16.jpeg'),
  orangeSeated: asset('WhatsApp Image 2026-10-05 at 00.38.17.jpeg'),
  traditionalBride: asset('WhatsApp Image 2026-10-05 at 00.38.18 (1).jpeg'),
  colorCouple: asset('WhatsApp Image 2026-10-05 at 00.38.18.jpeg'),
  bride: asset('WhatsApp Image 2026-10-05 at 00.38.20 (1).jpeg'),
  brideSteps: asset('WhatsApp Image 2026-10-05 at 00.38.20.jpeg'),
  ivoryCouple: asset('WhatsApp Image 2026-10-05 at 00.38.21 (1).jpeg'),
  ivoryCoupleLandscape: asset('WhatsApp Image 2026-10-05 at 00.38.21.jpeg'),
  bridesmaids: asset('WhatsApp Image 2026-10-05 at 00.38.22.jpeg'),
  procession: asset('WhatsApp Image 2026-10-05 at 00.38.25 (1).jpeg'),
  threeLadies: asset('WhatsApp Image 2026-10-05 at 00.38.25 (2).jpeg'),
  brideDetail: asset('WhatsApp Image 2026-10-05 at 00.38.26.jpeg'),
  dressForms: asset('WhatsApp Image 2026-10-05 at 00.38.28 (1).jpeg'),
  stretchDress: asset('WhatsApp Image 2026-10-05 at 00.38.30.jpeg'),
  beading: asset('WhatsApp Image 2026-10-05 at 00.38.33 (1).jpeg'),
  veil: asset('WhatsApp Image 2026-10-05 at 00.38.34.jpeg'),
  beigeMenswear: asset('WhatsApp Image 2026-10-05 at 00.40.13 (1).jpeg'),
  weddingCouple: asset('WhatsApp Image 2026-10-05 at 00.40.13 (2).jpeg'),
  tailoredCouple: asset('WhatsApp Image 2026-10-05 at 00.40.15 (1).jpeg'),
  tailoredCouple2: asset('WhatsApp Image 2026-10-05 at 00.40.15 (2).jpeg'),
  heritageMan: asset('WhatsApp Image 2026-10-05 at 00.40.16 (1).jpeg'),
  heritageWoman: asset('WhatsApp Image 2026-10-05 at 00.40.16 (2).jpeg'),
  heritageCouple: asset('WhatsApp Image 2026-10-05 at 00.40.16.jpeg'),
};

const C = {
  earth: '#3E2723',
  earth2: '#241714',
  umber: '#69483B',
  clay: '#B77758',
  gold: '#B68A55',
  paleGold: '#E9D8BE',
  paper: '#F5F0E9',
  cream: '#FCFAF6',
  ink: '#201815',
  muted: '#7C6D64',
  line: '#D5C9BE',
  white: '#FFFFFF',
};

const W = 595.28;
const H = 841.89;
const M = 42;
const totalPages = 15;
let doc;
let currentPage = 0;
const textLayer = [];

function hex(c) { return c; }
function rect(x, y, w, h, fill, stroke, lw = 1) {
  doc.save();
  if (fill) doc.fillColor(fill);
  if (stroke) doc.strokeColor(stroke).lineWidth(lw);
  doc.rect(x, y, w, h);
  if (fill && stroke) doc.fillAndStroke();
  else if (fill) doc.fill();
  else if (stroke) doc.stroke();
  doc.restore();
}
function line(x1, y1, x2, y2, color = C.line, lw = .6) {
  doc.save().strokeColor(color).lineWidth(lw).moveTo(x1, y1).lineTo(x2, y2).stroke().restore();
}
function text(t, x, y, opts = {}) {
  const {
    font = 'Helvetica', size = 10, color = C.ink, width, align = 'left',
    lineGap = 2, characterSpacing = 0, opacity = 1, oblique = false,
  } = opts;
  if (exportTextLayer) {
    doc.save().font(font).fontSize(size);
    const lineHeight = doc.currentLineHeight(true);
    const height = doc.heightOfString(t, { width: width || 1000, lineGap, characterSpacing });
    doc.restore();
    textLayer.push({
      page: currentPage, text: t, x, y, width: width || null, height, lineHeight,
      font, size, color, align, lineGap, characterSpacing, opacity, oblique,
    });
    return;
  }
  doc.save().fillColor(color).font(font).fontSize(size).fillOpacity(opacity);
  doc.text(t, x, y, { width, align, lineGap, characterSpacing, oblique });
  doc.restore();
}
function measure(t, opts = {}) {
  doc.save().font(opts.font || 'Helvetica').fontSize(opts.size || 10);
  const h = doc.heightOfString(t, { width: opts.width, lineGap: opts.lineGap || 2, characterSpacing: opts.characterSpacing || 0 });
  doc.restore();
  return h;
}
function cap(t, x, y, opts = {}) {
  text(t.toUpperCase(), x, y, { font: 'Helvetica-Bold', size: 7.1, color: C.gold, characterSpacing: 1.65, ...opts });
}
function display(t, x, y, opts = {}) {
  text(t, x, y, { font: 'Times-Roman', size: 37, color: C.earth, lineGap: -4, ...opts });
}
function serif(t, x, y, opts = {}) {
  text(t, x, y, { font: 'Times-Roman', size: 15, color: C.earth, lineGap: 1, ...opts });
}
function footer(page, invert = false) {
  const color = invert ? '#D9CBC0' : C.muted;
  line(M, H - 36, W - M, H - 36, invert ? '#6E554B' : C.line, .45);
  text('ANGE HMG HOME', M, H - 27, { font: 'Helvetica-Bold', size: 6.4, color, characterSpacing: 1.1 });
  text(`DOSSIER DE MARQUE  /  ${String(page).padStart(2, '0')}`, W - M - 150, H - 27, { font: 'Helvetica', size: 6.2, color, width: 150, align: 'right', characterSpacing: .8 });
}
function header(kicker, title, page, opts = {}) {
  const invert = opts.invert || false;
  const titleColor = opts.titleColor || (invert ? C.white : C.earth);
  cap(kicker, M, 35, { color: opts.kickerColor || (invert ? C.paleGold : C.gold) });
  line(M, 53, W - M, 53, invert ? '#755C50' : C.line, .55);
  if (title) display(title, M, 70, { color: titleColor, size: opts.size || 32, width: opts.width || 420, lineGap: opts.lineGap ?? -3 });
  footer(page, invert);
}
function page(fill = C.paper) {
  currentPage += 1;
  doc.addPage({ size: 'A4', margin: 0 });
  rect(0, 0, W, H, fill);
}
function imageCover(file, x, y, w, h, opts = {}) {
  const img = doc.openImage(file);
  const srcW = img.width;
  const srcH = img.height;
  const scale = Math.max(w / srcW, h / srcH);
  const dw = srcW * scale;
  const dh = srcH * scale;
  const align = opts.align ?? .5;
  const valign = opts.valign ?? .5;
  const dx = x - (dw - w) * align;
  const dy = y - (dh - h) * valign;
  doc.save();
  doc.rect(x, y, w, h).clip();
  if (opts.opacity !== undefined) doc.opacity(opts.opacity);
  doc.image(file, dx, dy, { width: dw, height: dh });
  doc.restore();
  if (opts.border) rect(x, y, w, h, null, opts.border, opts.borderWidth || .75);
}
function imageContain(file, x, y, w, h, opts = {}) {
  const img = doc.openImage(file);
  const scale = Math.min(w / img.width, h / img.height);
  const dw = img.width * scale;
  const dh = img.height * scale;
  const dx = x + (w - dw) * (opts.align ?? .5);
  const dy = y + (h - dh) * (opts.valign ?? .5);
  if (opts.bg) rect(x, y, w, h, opts.bg);
  doc.save();
  if (opts.opacity !== undefined) doc.opacity(opts.opacity);
  doc.image(file, dx, dy, { width: dw, height: dh });
  doc.restore();
  if (opts.border) rect(x, y, w, h, null, opts.border, opts.borderWidth || .75);
}
function photoFrame(file, x, y, w, h, opts = {}) {
  if (opts.shadow) {
    rect(x + 4, y + 5, w, h, '#D7CDC4');
  }
  imageCover(file, x, y, w, h, { align: opts.align, valign: opts.valign, border: opts.border || null });
  if (opts.index) {
    rect(x + 10, y + 10, 24, 18, C.earth);
    text(opts.index, x + 10, y + 14, { font: 'Helvetica-Bold', size: 7, color: C.white, width: 24, align: 'center', characterSpacing: .7 });
  }
}
function wordmark(x, y, color = C.earth, scale = 1) {
  text('Ange', x, y, { font: 'Times-Italic', size: 28 * scale, color });
  text('HMG', x + 66 * scale, y + 14 * scale, { font: 'Helvetica-Bold', size: 11 * scale, color, characterSpacing: .4 });
  text('HOME', x + 112 * scale, y + 15 * scale, { font: 'Helvetica', size: 7 * scale, color, characterSpacing: 2.1 * scale });
}
function quote(textValue, x, y, width, opts = {}) {
  text('“', x - 5, y - 12, { font: 'Times-Roman', size: 45, color: opts.color || C.gold });
  serif(textValue, x + 18, y, { width, size: opts.size || 21, color: opts.textColor || C.earth, lineGap: 2 });
}
function label(txt, x, y, opts = {}) {
  rect(x, y, opts.w || 70, opts.h || 19, opts.fill || C.earth);
  text(txt.toUpperCase(), x + 7, y + 6, { font: 'Helvetica-Bold', size: 6, color: opts.color || C.white, characterSpacing: 1.05, width: (opts.w || 70) - 14, align: 'center' });
}

function p1_cover() {
  page(C.earth);
  // narrow editorial image strip
  imageCover(photo.beigeMenswear, W - 214, 0, 214, H, { align: .50, valign: .5, opacity: .93 });
  // warm grounding overlay where the image starts
  doc.save().fillColor(C.earth).opacity(.24).rect(W - 214, 0, 214, H).fill().restore();
  line(42, 48, 128, 48, C.gold, 1.3);
  cap('Dossier de marque officiel', 42, 61, { color: C.paleGold, size: 7.5 });
  imageContain(photo.logoWhite, 42, 108, 214, 94, { align: 0, valign: .5 });
  text('DOSSIER\nDE MARQUE', 42, 213, { font: 'Times-Roman', size: 45, color: C.white, lineGap: -7 });
  line(42, 326, 136, 326, C.gold, 1.2);
  serif('Une allure ancrée dans la terre béninoise, dessinée pour durer.', 42, 347, { width: 270, size: 17, color: '#EDE1D6', lineGap: 3 });
  cap('Édition 2026', 42, 457, { color: C.paleGold });
  text('CLASSIQUE · MODERNE · TRADITIONNEL', 42, 478, { font: 'Helvetica-Bold', size: 7.6, color: C.white, characterSpacing: 1.1 });
  // circular marker
  doc.save().strokeColor(C.gold).lineWidth(.7).circle(83, 626, 41).stroke().circle(83, 626, 31).stroke().restore();
  text('HMG', 61, 616, { font: 'Helvetica-Bold', size: 13, color: C.paleGold, characterSpacing: 1 });
  text('HOUEMAGNON', 43, 677, { font: 'Helvetica-Bold', size: 6.1, color: C.paleGold, characterSpacing: 1.15 });
  text('Atelier Tankpè, Abomey-Calavi · Bénin', 42, 756, { font: 'Helvetica', size: 7.1, color: '#E6D9CE' });
  text('01 42 65 66 61  ·  @Ange_hmg_home', 42, 773, { font: 'Helvetica-Bold', size: 7.1, color: C.white, characterSpacing: .25 });
  text('01', W - 76, H - 61, { font: 'Helvetica', size: 8, color: C.paleGold, characterSpacing: 1.2 });
}

function p2_manifesto() {
  page(C.paper);
  header('La maison', 'Une maison,\nune racine.', 2, { size: 33, width: 250 });
  photoFrame(photo.colorMuse, 328, 84, 225, 445, { align: .52, valign: .48, shadow: true });
  label('Bénin', 348, 105, { w: 54, fill: C.earth });
  serif('ANGE HMG HOME célèbre les silhouettes qui ont de la présence : une élégance naturellement affirmée, pensée pour les moments qui comptent.', 42, 191, { width: 248, size: 15.5, lineGap: 4 });
  line(42, 349, 290, 349, C.line);
  cap('Notre promesse', 42, 371);
  display('Confort.\nDurabilité.\nHaute gamme.', 42, 397, { size: 26, lineGap: -1, width: 230 });
  text('Chaque pièce est conçue pour accompagner le mouvement, honorer la personne qui la porte et garder sa tenue au fil du temps.', 42, 526, { font: 'Helvetica', size: 9.5, color: C.muted, width: 235, lineGap: 3 });
  rect(328, 555, 225, 141, C.earth);
  cap('Le manifeste', 348, 578, { color: C.paleGold });
  serif('Créer avec exigence, porter avec assurance.', 348, 604, { width: 175, size: 19, color: C.white, lineGap: 2 });
}

function p3_codes() {
  page(C.cream);
  header('Les codes HMG', 'Notre empreinte.', 3, { size: 34 });
  // Brand monogram panel
  rect(42, 148, 200, 209, C.earth);
  imageContain(photo.logoWhite, 69, 174, 142, 63, { align: 0, valign: .5 });
  line(69, 244, 211, 244, C.gold, .8);
  text('HMG = HOUEMAGNON', 69, 264, { font: 'Helvetica-Bold', size: 7.5, color: C.paleGold, characterSpacing: 1.15 });
  text('Un nom porté comme une signature.', 69, 292, { font: 'Times-Italic', size: 14.5, color: C.white, width: 141, lineGap: 2 });
  // earth meaning
  cap('Une couleur, une mémoire', 283, 158);
  serif('Le marron #3E2723 évoque la terre du Bénin : notre origine, notre stabilité, notre point de départ.', 283, 185, { width: 245, size: 17, lineGap: 4 });
  text('HMG est aussi un hommage à Lydwine HOUÉMAGNON, la mère du fondateur. Une maison guidée par un héritage de valeurs et de transmission.', 283, 284, { font: 'Helvetica', size: 9.6, color: C.muted, width: 242, lineGap: 3 });
  line(42, 394, W - 42, 394, C.line);
  cap('Nos trois valeurs', 42, 420);
  const cards = [
    ['01', 'Élégance', 'Des lignes justes, une allure qui reste.'],
    ['02', 'Adaptable', 'Des pièces au service de chaque personnalité.'],
    ['03', 'Impeccable', 'La précision comme standard, jusque dans la finition.'],
  ];
  cards.forEach((c, i) => {
    const x = 42 + i * 172;
    rect(x, 451, 151, 188, i === 0 ? C.earth : C.paper, i === 0 ? null : C.line, .7);
    text(c[0], x + 15, 468, { font: 'Helvetica-Bold', size: 7, color: i === 0 ? C.paleGold : C.gold, characterSpacing: 1.3 });
    serif(c[1], x + 15, 504, { size: 20, color: i === 0 ? C.white : C.earth, width: 119 });
    text(c[2], x + 15, 550, { font: 'Helvetica', size: 8.4, color: i === 0 ? '#E6D9CE' : C.muted, width: 118, lineGap: 2 });
    line(x + 15, 606, x + 66, 606, i === 0 ? C.gold : C.line, 1);
  });
  quote('Notre terre nous ancre. Notre travail nous élève.', 42, 685, 360, { size: 18 });
}

function p4_signatures() {
  page(C.paper);
  header('Nos trois signatures', 'Les essentiels\nde la maison.', 4, { size: 32, width: 360 });
  text('Trois pièces phares qui traduisent la vision HMG : le confort dans la coupe, la présence dans le détail et la tenue dans le temps.', 42, 153, { font: 'Helvetica', size: 9.6, color: C.muted, width: 375, lineGap: 3 });
  const items = [
    { n: '01', name: 'Ensemble homme\nen tissu crêpe', note: 'Souple, posé, résolument distingué.', img: photo.beigeMenswear, align: .50, valign: .45 },
    { n: '02', name: 'Pantalon classique\nhomme', note: 'Une ligne nette pour le quotidien et les grands jours.', img: photo.orangeSeated, align: .55, valign: .5 },
    { n: '03', name: 'Robe droite\nen tissu stretch', note: 'Épouser la silhouette, libérer le mouvement.', img: photo.stretchDress, align: .5, valign: .5 },
  ];
  const top = 231; const cardW = 160; const gap = 15;
  items.forEach((it, i) => {
    const x = 42 + i * (cardW + gap);
    photoFrame(it.img, x, top, cardW, 268, { align: it.align, valign: it.valign });
    rect(x, top + 224, cardW, 44, C.earth);
    text(it.n, x + 12, top + 237, { font: 'Helvetica-Bold', size: 6.4, color: C.paleGold, characterSpacing: 1.2 });
    rect(x, 516, cardW, 107, C.cream, C.line, .55);
    serif(it.name, x + 12, 529, { size: 15.5, width: cardW - 24, lineGap: -1 });
    text(it.note, x + 12, 579, { font: 'Helvetica', size: 7.6, color: C.muted, width: cardW - 24, lineGap: 2 });
  });
  cap('Une pièce HMG, c’est une pièce qui travaille pour vous.', 42, 669, { color: C.earth, size: 7 });
  line(42, 694, W - 42, 694, C.gold, 1.1);
}

function p5_ceremonies() {
  page(C.earth);
  header('Cérémonies & moments forts', 'Le sur-mesure\ncomme évidence.', 5, { invert: true, size: 32, width: 330 });
  photoFrame(photo.ivoryCoupleLandscape, 338, 85, 215, 200, { align: .5, valign: .5 });
  photoFrame(photo.bride, 42, 254, 165, 329, { align: .5, valign: .3 });
  photoFrame(photo.bridesmaids, 224, 254, 329, 160, { align: .5, valign: .55 });
  photoFrame(photo.procession, 224, 431, 160, 152, { align: .5, valign: .5 });
  photoFrame(photo.brideSteps, 401, 431, 152, 152, { align: .5, valign: .5 });
  cap('Pour celles et ceux qui marquent leur passage', 42, 616, { color: C.paleGold });
  serif('Mariage civil ou religieux, dot, réception : HMG accompagne les cérémonies avec des silhouettes à la hauteur de l’histoire.', 42, 645, { width: 475, size: 17, color: C.white, lineGap: 3 });
}

function p6_feminine() {
  page(C.cream);
  header('Silhouettes femme', 'La ligne épouse\nla personnalité.', 6, { size: 32, width: 300 });
  photoFrame(photo.stretchDress, 331, 83, 222, 359, { align: .52, valign: .47, shadow: true });
  cap('Féminité en mouvement', 42, 194);
  serif('De la robe structurée à la tenue de cérémonie, chaque construction cherche l’équilibre entre maintien, aisance et lumière.', 42, 223, { width: 244, size: 17, lineGap: 4 });
  line(42, 355, 282, 355, C.line);
  text('Le vêtement n’impose pas une façon d’être : il révèle une présence.', 42, 378, { font: 'Helvetica', size: 9.4, color: C.muted, width: 216, lineGap: 3 });
  photoFrame(photo.dressForms, 42, 493, 153, 183, { align: .5, valign: .5 });
  photoFrame(photo.threeLadies, 212, 493, 166, 183, { align: .5, valign: .45 });
  photoFrame(photo.traditionalBride, 395, 493, 158, 183, { align: .5, valign: .38 });
  cap('Robe droite stretch · tenues de cérémonie · pièces sur mesure', 42, 706, { color: C.earth, size: 6.4 });
}

function p7_masculine() {
  page(C.paper);
  header('Silhouettes homme', 'L’assurance\ndans la coupe.', 7, { size: 33, width: 320 });
  photoFrame(photo.beigeMenswear, 42, 193, 252, 375, { align: .50, valign: .48 });
  rect(319, 193, 234, 166, C.earth);
  cap('Le vestiaire HMG', 339, 218, { color: C.paleGold });
  serif('Classique ou traditionnel, le même parti pris : une posture nette et une élégance sans effort.', 339, 249, { width: 188, size: 17, color: C.white, lineGap: 3 });
  photoFrame(photo.orangeSeated, 319, 376, 112, 192, { align: .48, valign: .45 });
  photoFrame(photo.orangePortrait, 448, 376, 105, 192, { align: .53, valign: .45 });
  quote('Une allure qui vous ressemble, un tombé qui se remarque.', 42, 620, 430, { size: 20 });
  cap('Ensembles homme · pantalons classiques · tenues d’apparat', 42, 715, { color: C.earth, size: 6.5 });
}

function p8_detail() {
  page(C.earth2);
  header('Savoir-faire', 'Le détail\nfait la différence.', 8, { invert: true, size: 34, width: 330 });
  photoFrame(photo.beading, 42, 202, 250, 331, { align: .5, valign: .5 });
  photoFrame(photo.brideDetail, 313, 202, 240, 331, { align: .51, valign: .5 });
  cap('La précision est notre langage', 42, 573, { color: C.paleGold });
  serif('Finesse, justesse des proportions, attention aux finitions : HMG transforme le tissu en une signature que l’on voit de près comme de loin.', 42, 605, { width: 470, size: 17, color: C.white, lineGap: 3 });
  line(42, 729, W - 42, 729, '#755C50', .55);
  text('Confort  /  Durabilité  /  Haute gamme', 42, 748, { font: 'Helvetica-Bold', size: 7.2, color: C.paleGold, characterSpacing: 1.2 });
}

function p9_caseStudy() {
  page(C.cream);
  header('Histoire forte', 'Une saison,\nquinze tenues.', 9, { size: 32, width: 320 });
  cap('Mariage : dot · civil · religieux', 42, 176);
  serif('Le premier grand défi de la maison : habiller une mariée, son marié, la mère de la mariée et les demoiselles d’honneur pour l’ensemble des cérémonies.', 42, 204, { width: 270, size: 15.7, lineGap: 4 });
  photoFrame(photo.weddingCouple, 344, 89, 209, 273, { align: .5, valign: .45, shadow: true });
  // process cards
  const steps = [
    ['15', 'tenues à coordonner'],
    ['01', 'équipe engagée pour tenir le délai'],
    ['100%', 'finitions supervisées'],
  ];
  steps.forEach((s, i) => {
    const x = 42 + i * 95;
    text(s[0], x, 398, { font: 'Times-Roman', size: i === 2 ? 21 : 29, color: C.gold });
    text(s[1], x, 435, { font: 'Helvetica', size: 7.1, color: C.muted, width: 82, lineGap: 2 });
  });
  line(42, 476, 310, 476, C.line);
  text('Malgré le retard des tissus commandés au Nigeria et le temps compté, Ange-Marie a organisé l’équipe, dirigé les étapes de décoration et veillé personnellement à chaque finition.', 42, 497, { font: 'Helvetica', size: 9.5, color: C.ink, width: 267, lineGap: 3 });
  photoFrame(photo.ivoryCouple, 42, 626, 154, 122, { align: .5, valign: .4 });
  photoFrame(photo.bridesmaids, 211, 626, 154, 122, { align: .5, valign: .46 });
  photoFrame(photo.veil, 380, 626, 173, 122, { align: .5, valign: .5 });
  label('Résultat : une histoire portée avec cohérence.', 331, 406, { w: 222, h: 32, fill: C.earth });
}

function p10_method() {
  page(C.paper);
  header('L’atelier HMG', 'De l’idée\nau dernier point.', 10, { size: 33, width: 320 });
  photoFrame(photo.heritageCouple, 338, 84, 215, 265, { align: .5, valign: .45, shadow: true });
  const flows = [
    ['01', 'Écouter', 'Comprendre l’occasion, la silhouette et l’intention.'],
    ['02', 'Dessiner', 'Choisir les lignes, les matières et les détails utiles.'],
    ['03', 'Construire', 'Couper, ajuster et assembler avec soin.'],
    ['04', 'Finaliser', 'Contrôler le tombé et signer chaque finition.'],
  ];
  flows.forEach((f, i) => {
    const y = 210 + i * 105;
    text(f[0], 42, y, { font: 'Helvetica-Bold', size: 7.1, color: C.gold, characterSpacing: 1.1 });
    serif(f[1], 42, y + 19, { size: 19, width: 120 });
    text(f[2], 166, y + 24, { font: 'Helvetica', size: 8.8, color: C.muted, width: 140, lineGap: 2 });
    line(42, y + 83, 306, y + 83, C.line, .5);
  });
  rect(338, 374, 215, 197, C.earth);
  cap('Le point d’honneur', 358, 400, { color: C.paleGold });
  serif('Un vêtement doit être aussi juste à porter qu’à regarder.', 358, 431, { width: 170, size: 18.5, color: C.white, lineGap: 3 });
  photoFrame(photo.beading, 338, 589, 104, 126, { align: .5, valign: .5 });
  photoFrame(photo.brideDetail, 449, 589, 104, 126, { align: .5, valign: .5 });
}

function p11_founder() {
  page(C.cream);
  header('Personal branding', 'L’artisan\nderrière la maison.', 11, { size: 33, width: 340 });
  photoFrame(photo.orangeSeated, 42, 188, 228, 383, { align: .5, valign: .42, shadow: true });
  cap('Houémagnon Ange-Marie Mahouna Coovi Pegaz Fidèl', 298, 191, { color: C.earth, size: 6.35, width: 230 });
  serif('Technicien de Mode Vêtements, styliste-modéliste et accessoiriste béninois.', 298, 224, { width: 225, size: 17.5, lineGap: 4 });
  line(298, 331, 523, 331, C.line);
  text('Passionné par les métiers de la mode, l’art culinaire, le bricolage et tout ce qui peut prendre forme à la main. J’aime les documentaires et les films instructifs, les temps de création et les réflexions qui font mûrir une idée.', 298, 354, { font: 'Helvetica', size: 9.2, color: C.muted, width: 225, lineGap: 3 });
  cap('Une identité', 298, 510);
  text('Sérieux · Joyeux · Professionnel', 298, 533, { font: 'Helvetica-Bold', size: 9.2, color: C.earth, width: 220, characterSpacing: .2 });
  quote('Héritier du fil, créateur de style.', 42, 632, 405, { size: 23 });
  text('— Signature personnelle', 42, 705, { font: 'Helvetica', size: 7.7, color: C.muted, characterSpacing: .4 });
}

function p12_path() {
  page(C.paper);
  header('Parcours', 'Apprendre,\npratiquer, élever.', 12, { size: 33, width: 340 });
  photoFrame(photo.tailoredCouple, 341, 84, 212, 266, { align: .5, valign: .48, shadow: true });
  const timeline = [
    ['2007—2020', 'Cursus général', 'De la maternelle à la classe de 2nde D.'],
    ['2020—2023', 'Formation MMV', 'Lycée Technique d’Amitié Sino-Béninois d’Akassato · Métier de la Mode-Vêtement.'],
    ['DIPLÔME', 'Technicien de Mode', 'Obtenu avec mention bien. Une vocation portée par l’amour du métier.'],
  ];
  let y = 209;
  timeline.forEach((t, i) => {
    text(t[0], 42, y, { font: 'Helvetica-Bold', size: 7.2, color: C.gold, characterSpacing: 1.2 });
    serif(t[1], 42, y + 22, { size: 20, width: 210 });
    text(t[2], 42, y + 54, { font: 'Helvetica', size: 9, color: C.muted, width: 244, lineGap: 2.7 });
    if (i !== timeline.length - 1) line(42, y + 110, 286, y + 110, C.line, .6);
    y += 131;
  });
  rect(341, 375, 212, 196, C.earth);
  cap('Motivation', 361, 402, { color: C.paleGold });
  serif('L’amour profond du métier et le goût du travail bien fait.', 361, 434, { width: 162, size: 19, color: C.white, lineGap: 3 });
  photoFrame(photo.tailoredCouple2, 341, 589, 212, 126, { align: .5, valign: .5 });
}

function p13_character() {
  page(C.earth);
  header('Ce qui me distingue', 'Le respect\ndu geste.', 13, { invert: true, size: 34, width: 330 });
  photoFrame(photo.heritageWoman, 338, 84, 215, 297, { align: .49, valign: .46 });
  const points = [
    ['Respect', 'Pour les personnes, les engagements et les matières.'],
    ['Dévotion', 'Pour la tâche, le détail et le délai.'],
    ['Perfection', 'Pour la finition qui fait toute la différence.'],
  ];
  points.forEach((p, i) => {
    const y = 228 + i * 111;
    text(`0${i + 1}`, 42, y, { font: 'Helvetica-Bold', size: 6.7, color: C.paleGold, characterSpacing: 1.2 });
    serif(p[0], 82, y - 2, { size: 20, color: C.white });
    text(p[1], 82, y + 33, { font: 'Helvetica', size: 8.7, color: '#D8C8BE', width: 185, lineGap: 2.5 });
    line(82, y + 80, 270, y + 80, '#71594F', .55);
  });
  cap('Style personnel', 42, 594, { color: C.paleGold });
  serif('Au quotidien : l’ensemble homme. Pour sortir : pantalons amples, chemises en soie diamant et autres expressions du style masculin.', 42, 623, { width: 466, size: 17.3, color: C.white, lineGap: 3 });
}

function p14_vision() {
  page(C.cream);
  header('Cap sur demain', 'Une ambition\nqui se porte.', 14, { size: 34, width: 320 });
  photoFrame(photo.colorCouple, 334, 84, 219, 247, { align: .5, valign: .46, shadow: true });
  cap('Dans 1 an', 42, 200);
  serif('Que Cotonou dise : “HMG HOME, c’est la référence pour le classique, le moderne et le traditionnel.”', 42, 228, { width: 254, size: 17.4, lineGap: 4 });
  cap('Dans 3 ans', 42, 398);
  serif('Compter parmi les grandes références du Bénin et d’autres pays. Habiller les grandes personnalités et les stars. Diriger ma propre équipe.', 42, 426, { width: 254, size: 17.4, lineGap: 4 });
  rect(334, 358, 219, 242, C.earth);
  cap('Pour qui ?', 354, 386, { color: C.paleGold });
  serif('Pour les hommes et les femmes — béninois et étrangers — discrets ou audacieux.', 354, 419, { width: 165, size: 18, color: C.white, lineGap: 3 });
  line(354, 546, 518, 546, C.gold, .8);
  text('Clients · Apprentis · Investisseurs', 354, 565, { font: 'Helvetica-Bold', size: 7, color: C.paleGold, width: 164, characterSpacing: .7 });
  quote('Prendre son travail au sérieux et bien à cœur, en toute circonstance, sans distinction.', 42, 665, 440, { size: 17.5 });
}

function p15_contact() {
  page(C.earth);
  // a quiet image window as the goodbye
  imageCover(photo.groupColor, 0, 0, W, 290, { align: .50, valign: .54, opacity: .83 });
  doc.save().fillColor(C.earth).opacity(.42).rect(0, 0, W, 290).fill().restore();
  imageContain(photo.logoWhite, 42, 42, 170, 75, { align: 0, valign: .5 });
  cap('Une pièce à imaginer ?', 42, 162, { color: C.paleGold });
  serif('Parlons de votre prochaine allure.', 42, 190, { width: 340, size: 32, color: C.white, lineGap: -3 });
  rect(42, 344, W - 84, 1, C.gold);
  cap('Atelier', 42, 383, { color: C.paleGold });
  serif('Tankpè, Abomey-Calavi · Bénin', 42, 410, { size: 20, color: C.white });
  cap('Contact', 42, 479, { color: C.paleGold });
  text('01 42 65 66 61', 42, 507, { font: 'Times-Roman', size: 25, color: C.white });
  cap('Réseaux', 42, 579, { color: C.paleGold });
  text('@Ange_hmg_home', 42, 606, { font: 'Times-Roman', size: 23, color: C.white });
  text('TikTok · Instagram', 44, 640, { font: 'Helvetica', size: 8.2, color: '#D8C8BE', characterSpacing: .2 });
  line(42, 699, W - 42, 699, '#755C50', .55);
  serif('Héritier du fil, créateur de style.', 42, 724, { size: 21, color: C.paleGold });
  text('Merci.', W - 108, 756, { font: 'Times-Italic', size: 17, color: C.white, width: 66, align: 'right' });
  text('15', W - 76, H - 61, { font: 'Helvetica', size: 8, color: C.paleGold, characterSpacing: 1.2 });
}

function generate() {
  doc = new PDFDocument({
    size: 'A4',
    margin: 0,
    autoFirstPage: false,
    bufferPages: true,
    info: {
      Title: 'ANGE HMG HOME — Dossier de marque officiel',
      Author: 'HOUEMAGNON Ange-Marie Mahouna Coovi Pegaz Fidèl',
      Subject: 'Portfolio et dossier de marque',
      Keywords: 'HMG HOME, styliste, Bénin, Abomey-Calavi, mode, portfolio',
      CreationDate: new Date('2026-10-05T00:00:00Z'),
    },
  });
  const stream = fs.createWriteStream(out);
  doc.pipe(stream);
  p1_cover();
  p2_manifesto();
  p3_codes();
  p4_signatures();
  p5_ceremonies();
  p6_feminine();
  p7_masculine();
  p8_detail();
  p9_caseStudy();
  p10_method();
  p11_founder();
  p12_path();
  p13_character();
  p14_vision();
  p15_contact();
  doc.end();
  stream.on('finish', () => {
    if (exportTextLayer) {
      const textLayerPath = process.env.HMG_TEXT_LAYER_OUTPUT
        ? path.resolve(process.env.HMG_TEXT_LAYER_OUTPUT)
        : path.join(root, '_work', 'hmg-text-layer.json');
      fs.mkdirSync(path.dirname(textLayerPath), { recursive: true });
      fs.writeFileSync(textLayerPath, JSON.stringify({ width: W, height: H, pages: totalPages, textLayer }, null, 2));
      console.log(`Fond PDF et calque texte créés : ${out} / ${textLayerPath}`);
    } else {
      console.log(`PDF créé : ${out}`);
    }
  });
}

generate();
