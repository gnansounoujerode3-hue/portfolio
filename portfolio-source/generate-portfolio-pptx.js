/*
 * Version PowerPoint entièrement modifiable du dossier ANGE HMG HOME.
 * Toutes les zones de texte, formes et photos restent éditables dans PowerPoint.
 * Génération : npm run build:portfolio-editable
 */
const path = require('path');
const pptxgen = require('pptxgenjs');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'ANGE_HMG_HOME_Dossier_de_Marque_Modifiable.pptx');
const asset = (name) => path.join(root, name);
const A = {
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
  stretchDress: asset('WhatsApp Image 2026-10-05 at 00.38.30.jpeg'),
  beading: asset('WhatsApp Image 2026-10-05 at 00.38.31 (1).jpeg'),
  veil: asset('WhatsApp Image 2026-10-05 at 00.38.33 (1).jpeg'),
  beigeMenswear: asset('WhatsApp Image 2026-10-05 at 00.40.13 (1).jpeg'),
  weddingCouple: asset('WhatsApp Image 2026-10-05 at 00.40.13 (2).jpeg'),
  tailoredCouple: asset('WhatsApp Image 2026-10-05 at 00.40.15 (1).jpeg'),
  tailoredCouple2: asset('WhatsApp Image 2026-10-05 at 00.40.15 (2).jpeg'),
  heritageMan: asset('WhatsApp Image 2026-10-05 at 00.40.16 (1).jpeg'),
  heritageWoman: asset('WhatsApp Image 2026-10-05 at 00.40.16 (2).jpeg'),
  heritageCouple: asset('WhatsApp Image 2026-10-05 at 00.40.16.jpeg'),
};

const C = {
  earth: '3E2723', earth2: '241714', umber: '69483B', gold: 'B68A55',
  paleGold: 'E9D8BE', paper: 'F5F0E9', cream: 'FCFAF6', ink: '201815',
  muted: '7C6D64', line: 'D5C9BE', white: 'FFFFFF', softText: 'E6D9CE',
};

const pptx = new pptxgen();
pptx.defineLayout({ name: 'HMG_A4', width: 8.2677, height: 11.6929 });
pptx.layout = 'HMG_A4';
pptx.author = 'HOUEMAGNON Ange-Marie Mahouna Coovi Pegaz Fidèl';
pptx.company = 'ANGE HMG HOME';
pptx.subject = 'Dossier de marque officiel';
pptx.title = 'ANGE HMG HOME — Dossier de marque officiel';
pptx.lang = 'fr-FR';
pptx.theme = {
  headFontFace: 'Georgia', bodyFontFace: 'Aptos', lang: 'fr-FR',
};
pptx.margin = 0;

const W = 8.2677;
const H = 11.6929;
const M = .58;
const Sh = pptx.ShapeType;

function newSlide(bg = C.paper) {
  const s = pptx.addSlide();
  s.background = { color: bg };
  return s;
}
function addText(slide, value, x, y, w, h, o = {}) {
  slide.addText(value, {
    x, y, w, h,
    margin: 0,
    fontFace: o.fontFace || 'Aptos',
    fontSize: o.fontSize || 10,
    color: o.color || C.ink,
    bold: o.bold || false,
    italic: o.italic || false,
    breakLine: false,
    fit: o.fit || 'shrink',
    valign: o.valign || 'top',
    align: o.align || 'left',
    paraSpaceAfterPt: o.paraSpaceAfterPt || 0,
    breakLine: false,
    charSpacing: o.charSpacing,
    lineSpacingMultiple: o.lineSpacingMultiple,
    transparency: o.transparency,
    isTextBox: true,
  });
}
function rect(slide, x, y, w, h, fill, lineColor = fill, opts = {}) {
  slide.addShape(Sh.rect, {
    x, y, w, h,
    fill: { color: fill, transparency: opts.transparency || 0 },
    line: { color: lineColor, transparency: opts.lineTransparency ?? 100, width: opts.width || .5 },
  });
}
function line(slide, x, y, w, h = 0, color = C.line, width = .55) {
  slide.addShape(Sh.line, { x, y, w, h, line: { color, width } });
}
function ellipse(slide, x, y, w, h, color, opts = {}) {
  slide.addShape(Sh.ellipse, { x, y, w, h, fill: { color, transparency: opts.transparency || 100 }, line: { color, width: opts.width || .5, transparency: opts.lineTransparency ?? 0 } });
}
function image(slide, file, x, y, w, h, opts = {}) {
  slide.addImage({
    path: file, x, y, w, h,
    transparency: opts.transparency || 0,
    sizing: { type: opts.contain ? 'contain' : 'cover', x, y, w, h },
  });
  if (opts.border) {
    slide.addShape(Sh.rect, { x, y, w, h, fill: { color: C.white, transparency: 100 }, line: { color: opts.border, width: opts.borderWidth || .5 } });
  }
}
function logo(slide, white, x, y, w, h) {
  slide.addImage({ path: white ? A.logoWhite : A.logoBlack, x, y, w, h, sizing: { type: 'contain', x, y, w, h } });
}
function cap(slide, value, x, y, w = 3, color = C.gold, opts = {}) {
  addText(slide, value.toUpperCase(), x, y, w, opts.h || .2, { fontFace: 'Aptos', fontSize: opts.fontSize || 5.9, color, bold: true, charSpacing: opts.charSpacing ?? 1.6, align: opts.align || 'left' });
}
function serif(slide, value, x, y, w, h, opts = {}) {
  addText(slide, value, x, y, w, h, { fontFace: 'Georgia', fontSize: opts.fontSize || 17, color: opts.color || C.earth, italic: opts.italic || false, bold: opts.bold || false, lineSpacingMultiple: opts.lineSpacingMultiple || 1.05, align: opts.align || 'left' });
}
function header(slide, kicker, title, page, opts = {}) {
  const invert = opts.invert || false;
  cap(slide, kicker, M, .49, 4.6, invert ? C.paleGold : C.gold);
  line(slide, M, .73, W - 2 * M, 0, invert ? '755C50' : C.line, .55);
  serif(slide, title, M, .96, opts.width || 4.4, opts.height || 1.04, { fontSize: opts.fontSize || 24, color: invert ? C.white : C.earth, lineSpacingMultiple: .94 });
  footer(slide, page, invert);
}
function footer(slide, page, invert = false) {
  const color = invert ? 'D9CBC0' : C.muted;
  line(slide, M, H - .49, W - 2 * M, 0, invert ? '6E554B' : C.line, .45);
  addText(slide, 'ANGE HMG HOME', M, H - .4, 1.8, .15, { fontSize: 5.2, color, bold: true, charSpacing: 1.15 });
  addText(slide, `DOSSIER DE MARQUE  /  ${String(page).padStart(2, '0')}`, W - M - 2.1, H - .4, 2.1, .15, { fontSize: 5, color, align: 'right', charSpacing: .7 });
}
function label(slide, text, x, y, w, h = .24, fill = C.earth, color = C.white) {
  rect(slide, x, y, w, h, fill);
  addText(slide, text.toUpperCase(), x + .06, y + .07, w - .12, h - .05, { fontSize: 5.1, bold: true, color, charSpacing: .9, align: 'center' });
}
function quote(slide, text, x, y, w, h, opts = {}) {
  addText(slide, '“', x, y - .18, .35, .5, { fontFace: 'Georgia', fontSize: 32, color: opts.color || C.gold });
  serif(slide, text, x + .28, y, w, h, { fontSize: opts.fontSize || 16.5, color: opts.textColor || C.earth, italic: false, lineSpacingMultiple: 1.04 });
}

// 01 — Couverture
{
  const s = newSlide(C.earth);
  image(s, A.beigeMenswear, W - 2.97, 0, 2.97, H, { transparency: 7 });
  rect(s, W - 2.97, 0, 2.97, H, C.earth, C.earth, { transparency: 72 });
  line(s, M, .44, 1.18, 0, C.gold, 1.1);
  cap(s, 'Dossier de marque officiel', M, .62, 2.7, C.paleGold, { fontSize: 6.3 });
  logo(s, true, M, 1.05, 2.52, .78);
  serif(s, 'DOSSIER\nDE MARQUE', M, 2.23, 3.1, 1.45, { fontSize: 33, color: C.white, lineSpacingMultiple: .86 });
  line(s, M, 4.22, 1.3, 0, C.gold, 1.0);
  serif(s, 'Une allure ancrée dans la terre béninoise, dessinée pour durer.', M, 4.48, 3.3, .8, { fontSize: 13.4, color: C.softText, lineSpacingMultiple: 1.05 });
  cap(s, 'Édition 2026', M, 5.83, 1.7, C.paleGold);
  addText(s, 'CLASSIQUE · MODERNE · TRADITIONNEL', M, 6.13, 3.5, .2, { fontSize: 6.1, color: C.white, bold: true, charSpacing: 1.1 });
  ellipse(s, .83, 8.36, .82, .82, C.gold, { transparency: 100, width: .55 });
  ellipse(s, .93, 8.46, .62, .62, C.gold, { transparency: 100, width: .55 });
  addText(s, 'HMG', .97, 8.66, .53, .13, { fontSize: 9, color: C.paleGold, bold: true, charSpacing: .9, align: 'center' });
  addText(s, 'HOUEMAGNON', .61, 9.08, 1.15, .13, { fontSize: 4.5, color: C.paleGold, bold: true, charSpacing: 1.05, align: 'center' });
  addText(s, 'Atelier Tankpè, Abomey-Calavi · Bénin', M, 10.47, 2.9, .14, { fontSize: 5.8, color: C.softText });
  addText(s, '01 42 65 66 61  ·  @Ange_hmg_home', M, 10.69, 2.9, .14, { fontSize: 5.8, color: C.white, bold: true, charSpacing: .15 });
  addText(s, '01', W - .98, H - .83, .35, .14, { fontSize: 6.1, color: C.paleGold, charSpacing: 1.1 });
}

// 02 — Maison
{
  const s = newSlide();
  header(s, 'La maison', 'Une maison,\nune racine.', 2, { fontSize: 24.5, width: 3.3, height: .85 });
  image(s, A.colorMuse, 4.56, 1.17, 3.11, 4.28);
  label(s, 'Bénin', 4.83, 1.37, .76);
  serif(s, 'ANGE HMG HOME célèbre les silhouettes qui ont de la présence : une élégance naturellement affirmée, pensée pour les moments qui comptent.', M, 2.66, 3.42, 1.45, { fontSize: 12.2 });
  line(s, M, 4.65, 3.42, 0, C.line);
  cap(s, 'Notre promesse', M, 4.94, 2.2);
  serif(s, 'Confort.\nDurabilité.\nHaute gamme.', M, 5.3, 3.1, 1.15, { fontSize: 18.5, lineSpacingMultiple: .95 });
  addText(s, 'Chaque pièce est conçue pour accompagner le mouvement, honorer la personne qui la porte et garder sa tenue au fil du temps.', M, 7.02, 3.23, .7, { fontSize: 7.4, color: C.muted, lineSpacingMultiple: 1.12 });
  rect(s, 4.56, 5.68, 3.11, 1.38, C.earth);
  cap(s, 'Le manifeste', 4.83, 5.99, 1.3, C.paleGold);
  serif(s, 'Créer avec exigence, porter avec assurance.', 4.83, 6.36, 2.34, .55, { fontSize: 14.3, color: C.white });
}

// 03 — Codes
{
  const s = newSlide(C.cream);
  header(s, 'Les codes HMG', 'Notre empreinte.', 3, { fontSize: 25.5 });
  rect(s, M, 2.06, 2.76, 2.18, C.earth);
  logo(s, true, .95, 2.34, 1.92, .66);
  line(s, .95, 3.06, 1.96, 0, C.gold, .65);
  addText(s, 'HMG = HOUEMAGNON', .95, 3.34, 1.95, .14, { fontSize: 5.8, color: C.paleGold, bold: true, charSpacing: 1.0 });
  serif(s, 'Un nom porté comme une signature.', .95, 3.7, 1.87, .42, { fontSize: 12.3, color: C.white, italic: true });
  cap(s, 'Une couleur, une mémoire', 3.91, 2.17, 2.7);
  serif(s, 'Le marron #3E2723 évoque la terre du Bénin : notre origine, notre stabilité, notre point de départ.', 3.91, 2.53, 3.33, 1.07, { fontSize: 13.4 });
  addText(s, 'HMG est aussi un hommage à Lydwine HOUEMAGNON, la mère du fondateur. Une maison guidée par un héritage de valeurs et de transmission.', 3.91, 3.85, 3.25, .69, { fontSize: 7.5, color: C.muted, lineSpacingMultiple: 1.12 });
  line(s, M, 5.0, W - 2 * M, 0, C.line);
  cap(s, 'Nos trois valeurs', M, 5.31, 2);
  [
    ['01', 'Élégance', 'Des lignes justes, une allure qui reste.'],
    ['02', 'Adaptable', 'Des pièces au service de chaque personnalité.'],
    ['03', 'Impeccable', 'La précision comme standard, jusque dans la finition.'],
  ].forEach((d, i) => {
    const x = M + i * 2.36; const dark = i === 0;
    rect(s, x, 5.75, 2.1, 1.95, dark ? C.earth : C.paper, dark ? C.earth : C.line, { lineTransparency: dark ? 100 : 0 });
    addText(s, d[0], x + .22, 5.98, .3, .13, { fontSize: 5.2, color: dark ? C.paleGold : C.gold, bold: true, charSpacing: 1.1 });
    serif(s, d[1], x + .22, 6.43, 1.6, .35, { fontSize: 15.2, color: dark ? C.white : C.earth });
    addText(s, d[2], x + .22, 7.0, 1.58, .36, { fontSize: 6.9, color: dark ? C.softText : C.muted, lineSpacingMultiple: 1.08 });
    line(s, x + .22, 7.45, .67, 0, dark ? C.gold : C.line, .8);
  });
  quote(s, 'Notre terre nous ancre. Notre travail nous élève.', M, 8.33, 5.2, .6, { fontSize: 14.2 });
}

// 04 — Best-sellers
{
  const s = newSlide();
  header(s, 'Nos trois signatures', 'Les essentiels\nde la maison.', 4, { fontSize: 24.2, width: 4.0 });
  addText(s, 'Trois pièces phares qui traduisent la vision HMG : le confort dans la coupe, la présence dans le détail et la tenue dans le temps.', M, 2.09, 5.27, .42, { fontSize: 7.6, color: C.muted, lineSpacingMultiple: 1.08 });
  const best = [
    ['01', 'Ensemble homme\nen tissu crêpe', 'Souple, posé, résolument distingué.', A.beigeMenswear],
    ['02', 'Pantalon classique\nhomme', 'Une ligne nette pour le quotidien et les grands jours.', A.orangeSeated],
    ['03', 'Robe droite\nen tissu stretch', 'Épouser la silhouette, libérer le mouvement.', A.stretchDress],
  ];
  best.forEach((d, i) => {
    const x = M + i * 2.52;
    image(s, d[3], x, 3.0, 2.29, 3.0);
    rect(s, x, 5.5, 2.29, .5, C.earth);
    addText(s, d[0], x + .17, 5.71, .25, .12, { fontSize: 5.0, color: C.paleGold, bold: true, charSpacing: 1.0 });
    rect(s, x, 6.2, 2.29, 1.03, C.cream, C.line, { lineTransparency: 0 });
    serif(s, d[1], x + .17, 6.38, 1.96, .35, { fontSize: 11.6, lineSpacingMultiple: .93 });
    addText(s, d[2], x + .17, 6.9, 1.93, .23, { fontSize: 6.15, color: C.muted, lineSpacingMultiple: 1.03 });
  });
  cap(s, 'Une pièce HMG, c’est une pièce qui travaille pour vous.', M, 7.78, 4.6, C.earth, { fontSize: 5.9 });
  line(s, M, 8.15, W - 2 * M, 0, C.gold, 1.0);
}

// 05 — Cérémonies
{
  const s = newSlide(C.earth);
  header(s, 'Cérémonies & moments forts', 'Le sur-mesure\ncomme évidence.', 5, { invert: true, fontSize: 24, width: 4.1 });
  image(s, A.ivoryCoupleLandscape, 4.7, 1.18, 2.97, 1.92);
  image(s, A.bride, M, 3.02, 2.35, 3.16);
  image(s, A.bridesmaids, 3.18, 3.02, 4.49, 1.53);
  image(s, A.procession, 3.18, 4.72, 2.18, 1.46);
  image(s, A.brideSteps, 5.49, 4.72, 2.18, 1.46);
  cap(s, 'Pour celles et ceux qui marquent leur passage', M, 6.64, 4.5, C.paleGold);
  serif(s, 'Mariage civil ou religieux, dot, réception : HMG accompagne les cérémonies avec des silhouettes à la hauteur de l’histoire.', M, 7.05, 6.58, .94, { fontSize: 13.2, color: C.white, lineSpacingMultiple: 1.05 });
}

// 06 — Femme
{
  const s = newSlide(C.cream);
  header(s, 'Silhouettes femme', 'La ligne épouse\nla personnalité.', 6, { fontSize: 24, width: 3.6 });
  image(s, A.stretchDress, 4.6, 1.16, 3.07, 3.45);
  cap(s, 'Féminité en mouvement', M, 2.68, 2.4);
  serif(s, 'De la robe structurée à la tenue de cérémonie, chaque construction cherche l’équilibre entre maintien, aisance et lumière.', M, 3.07, 3.36, 1.18, { fontSize: 13.4 });
  line(s, M, 4.69, 3.36, 0, C.line);
  addText(s, 'Le vêtement n’impose pas une façon d’être : il révèle une présence.', M, 5.05, 3.1, .5, { fontSize: 7.6, color: C.muted, lineSpacingMultiple: 1.08 });
  image(s, A.threeLadies, M, 6.34, 2.14, 1.74);
  image(s, A.traditionalBride, 2.97, 6.34, 2.32, 1.74);
  image(s, A.brideDetail, 5.5, 6.34, 2.17, 1.74);
  cap(s, 'Robe droite stretch · tenues de cérémonie · pièces sur mesure', M, 8.36, 6.5, C.earth, { fontSize: 5.45 });
}

// 07 — Homme
{
  const s = newSlide();
  header(s, 'Silhouettes homme', 'L’assurance\ndans la coupe.', 7, { fontSize: 24.6, width: 3.8 });
  image(s, A.beigeMenswear, M, 2.32, 3.43, 3.6);
  rect(s, 4.36, 2.32, 3.31, 1.45, C.earth);
  cap(s, 'Le vestiaire HMG', 4.63, 2.65, 2.2, C.paleGold);
  serif(s, 'Classique ou traditionnel, le même parti pris : une posture nette et une élégance sans effort.', 4.63, 3.05, 2.57, .55, { fontSize: 12.5, color: C.white });
  image(s, A.orangeSeated, 4.36, 4.0, 1.5, 1.92);
  image(s, A.orangePortrait, 6.16, 4.0, 1.51, 1.92);
  quote(s, 'Une allure qui vous ressemble, un tombé qui se remarque.', M, 6.73, 5.9, .6, { fontSize: 15.3 });
  cap(s, 'Ensembles homme · pantalons classiques · tenues d’apparat', M, 7.82, 5.8, C.earth, { fontSize: 5.35 });
}

// 08 — Détails
{
  const s = newSlide(C.earth2);
  header(s, 'Savoir-faire', 'Le détail\nfait la différence.', 8, { invert: true, fontSize: 25.5, width: 4.0 });
  image(s, A.beading, M, 2.46, 3.42, 3.17);
  image(s, A.brideDetail, 4.27, 2.46, 3.4, 3.17);
  cap(s, 'La précision est notre langage', M, 6.4, 3.4, C.paleGold);
  serif(s, 'Finesse, justesse des proportions, attention aux finitions : HMG transforme le tissu en une signature que l’on voit de près comme de loin.', M, 6.79, 6.56, 1.05, { fontSize: 13.3, color: C.white, lineSpacingMultiple: 1.05 });
  line(s, M, 8.35, W - 2 * M, 0, '755C50', .55);
  addText(s, 'CONFORT  /  DURABILITÉ  /  HAUTE GAMME', M, 8.61, 4.3, .14, { fontSize: 5.7, color: C.paleGold, bold: true, charSpacing: 1.1 });
}

// 09 — Étude de cas
{
  const s = newSlide(C.cream);
  header(s, 'Histoire forte', 'Une saison,\nquinze tenues.', 9, { fontSize: 24.2, width: 3.8 });
  cap(s, 'Mariage : dot · civil · religieux', M, 2.35, 3.3);
  serif(s, 'Le premier grand défi de la maison : habiller une mariée, son marié, la mère de la mariée et les demoiselles d’honneur pour l’ensemble des cérémonies.', M, 2.76, 3.5, 1.42, { fontSize: 12.4 });
  image(s, A.weddingCouple, 4.8, 1.23, 2.87, 2.58);
  [['15', 'tenues à coordonner'], ['01', 'équipe engagée pour tenir le délai'], ['100%', 'finitions supervisées']].forEach((d, i) => {
    const x = M + i * 1.31;
    addText(s, d[0], x, 4.9, 1.05, .28, { fontFace: 'Georgia', fontSize: i === 2 ? 15 : 21, color: C.gold });
    addText(s, d[1], x, 5.34, 1.08, .35, { fontSize: 5.75, color: C.muted, lineSpacingMultiple: 1.04 });
  });
  line(s, M, 5.94, 3.68, 0, C.line);
  addText(s, 'Malgré le retard des tissus commandés au Nigeria et le temps compté, Ange-Marie a organisé l’équipe, dirigé les étapes de décoration et veillé personnellement à chaque finition.', M, 6.22, 3.68, .95, { fontSize: 7.6, color: C.ink, lineSpacingMultiple: 1.1 });
  label(s, 'Résultat : une histoire portée avec cohérence.', 4.63, 4.98, 3.04, .36);
  image(s, A.ivoryCouple, M, 7.8, 2.15, 1.36);
  image(s, A.bridesmaids, 2.95, 7.8, 2.15, 1.36);
  image(s, A.veil, 5.33, 7.8, 2.34, 1.36);
}

// 10 — Méthode
{
  const s = newSlide();
  header(s, 'L’atelier HMG', 'De l’idée\nau dernier point.', 10, { fontSize: 24.8, width: 3.8 });
  image(s, A.heritageCouple, 4.7, 1.17, 2.97, 2.45);
  const flow = [
    ['01', 'Écouter', 'Comprendre l’occasion, la silhouette et l’intention.'],
    ['02', 'Dessiner', 'Choisir les lignes, les matières et les détails utiles.'],
    ['03', 'Construire', 'Couper, ajuster et assembler avec soin.'],
    ['04', 'Finaliser', 'Contrôler le tombé et signer chaque finition.'],
  ];
  flow.forEach((d, i) => {
    const y = 2.65 + i * 1.0;
    addText(s, d[0], M, y, .35, .12, { fontSize: 5.25, color: C.gold, bold: true, charSpacing: 1.05 });
    serif(s, d[1], M, y + .23, 1.45, .26, { fontSize: 13.4 });
    addText(s, d[2], 2.33, y + .28, 1.97, .26, { fontSize: 6.95, color: C.muted, lineSpacingMultiple: 1.0 });
    if (i < 3) line(s, M, y + .78, 3.72, 0, C.line, .45);
  });
  rect(s, 4.7, 3.96, 2.97, 1.58, C.earth);
  cap(s, 'Le point d’honneur', 4.97, 4.3, 1.5, C.paleGold);
  serif(s, 'Un vêtement doit être aussi juste à porter qu’à regarder.', 4.97, 4.71, 2.25, .56, { fontSize: 13.3, color: C.white });
  image(s, A.beading, 4.7, 5.79, 1.39, 1.34);
  image(s, A.brideDetail, 6.28, 5.79, 1.39, 1.34);
}

// 11 — Fondateur
{
  const s = newSlide(C.cream);
  header(s, 'Personal branding', 'L’artisan\nderrière la maison.', 11, { fontSize: 24.8, width: 4.0 });
  image(s, A.orangeSeated, M, 2.24, 3.12, 3.64);
  cap(s, 'HOUEMAGNON Ange-Marie Mahouna Coovi Pegaz Fidèl', 4.05, 2.28, 3.2, C.earth, { fontSize: 4.9 });
  serif(s, 'Technicien de Mode Vêtements, styliste-modéliste et accessoiriste béninois.', 4.05, 2.7, 3.13, .72, { fontSize: 13.3 });
  line(s, 4.05, 3.83, 3.13, 0, C.line);
  addText(s, 'Passionné par les métiers de la mode, l’art culinaire, le bricolage et tout ce qui peut prendre forme à la main. J’aime les documentaires et les films instructifs, les temps de création et les réflexions qui font mûrir une idée.', 4.05, 4.18, 3.1, 1.22, { fontSize: 7.3, color: C.muted, lineSpacingMultiple: 1.12 });
  cap(s, 'Une identité', 4.05, 5.87, 1.3);
  addText(s, 'Sérieux · Joyeux · Professionnel', 4.05, 6.19, 3.1, .18, { fontSize: 7.8, color: C.earth, bold: true });
  quote(s, 'Héritier du fil, créateur de style.', M, 7.2, 5.5, .65, { fontSize: 17.4 });
  addText(s, '— Signature personnelle', M, 8.16, 1.9, .14, { fontSize: 5.9, color: C.muted, charSpacing: .3 });
}

// 12 — Parcours
{
  const s = newSlide();
  header(s, 'Parcours', 'Apprendre,\npratiquer, élever.', 12, { fontSize: 24.8, width: 3.9 });
  image(s, A.tailoredCouple, 4.72, 1.18, 2.95, 2.48);
  const time = [
    ['2007—2020', 'Cursus général', 'De la maternelle à la classe de 2nde D.'],
    ['2020—2023', 'Formation MMV', 'Lycée Technique d’Amitié Sino-Béninois d’Akassato · Métier de la Mode-Vêtement.'],
    ['DIPLÔME', 'Technicien de Mode', 'Obtenu avec mention bien. Une vocation portée par l’amour du métier.'],
  ];
  time.forEach((d, i) => {
    const y = 2.48 + i * 1.22;
    addText(s, d[0], M, y, 1.35, .14, { fontSize: 5.7, color: C.gold, bold: true, charSpacing: 1.1 });
    serif(s, d[1], M, y + .28, 2.8, .26, { fontSize: 14.6 });
    addText(s, d[2], M, y + .72, 3.47, .34, { fontSize: 7.1, color: C.muted, lineSpacingMultiple: 1.05 });
    if (i < 2) line(s, M, y + 1.06, 3.47, 0, C.line, .52);
  });
  rect(s, 4.72, 3.96, 2.95, 1.57, C.earth);
  cap(s, 'Motivation', 4.99, 4.3, 1.2, C.paleGold);
  serif(s, 'L’amour profond du métier et le goût du travail bien fait.', 4.99, 4.71, 2.23, .55, { fontSize: 13.7, color: C.white });
  image(s, A.tailoredCouple2, 4.72, 5.79, 2.95, 1.34);
}

// 13 — Valeurs du fondateur
{
  const s = newSlide(C.earth);
  header(s, 'Ce qui me distingue', 'Le respect\ndu geste.', 13, { invert: true, fontSize: 25.3, width: 4.0 });
  image(s, A.heritageWoman, 4.7, 1.18, 2.97, 2.75);
  [['Respect', 'Pour les personnes, les engagements et les matières.'], ['Dévotion', 'Pour la tâche, le détail et le délai.'], ['Perfection', 'Pour la finition qui fait toute la différence.']].forEach((d, i) => {
    const y = 2.68 + i * 1.12;
    addText(s, `0${i + 1}`, M, y, .32, .12, { fontSize: 5.2, color: C.paleGold, bold: true, charSpacing: 1.1 });
    serif(s, d[0], 1.14, y - .05, 1.7, .28, { fontSize: 14.8, color: C.white });
    addText(s, d[1], 1.14, y + .4, 2.64, .3, { fontSize: 6.9, color: 'D8C8BE', lineSpacingMultiple: 1.0 });
    line(s, 1.14, y + .82, 2.64, 0, '71594F', .5);
  });
  cap(s, 'Style personnel', M, 7.0, 2.0, C.paleGold);
  serif(s, 'Au quotidien : l’ensemble homme. Pour sortir : pantalons amples, chemises en soie diamant et autres expressions du style masculin.', M, 7.39, 6.5, .9, { fontSize: 13.2, color: C.white, lineSpacingMultiple: 1.05 });
}

// 14 — Vision
{
  const s = newSlide(C.cream);
  header(s, 'Cap sur demain', 'Une ambition\nqui se porte.', 14, { fontSize: 25.3, width: 3.9 });
  image(s, A.colorCouple, 4.63, 1.17, 3.04, 2.31);
  cap(s, 'Dans 1 an', M, 2.58, 1.4);
  serif(s, 'Que Cotonou dise : “HMG HOME, c’est la référence pour le classique, le moderne et le traditionnel.”', M, 2.98, 3.55, 1.18, { fontSize: 13.2 });
  cap(s, 'Dans 3 ans', M, 4.92, 1.4);
  serif(s, 'Compter parmi les grandes références du Bénin et d’autres pays. Habiller les grandes personnalités et les stars. Diriger ma propre équipe.', M, 5.32, 3.55, 1.17, { fontSize: 13.2 });
  rect(s, 4.63, 3.83, 3.04, 2.11, C.earth);
  cap(s, 'Pour qui ?', 4.91, 4.19, 1.1, C.paleGold);
  serif(s, 'Pour les hommes et les femmes — béninois et étrangers — discrets ou audacieux.', 4.91, 4.6, 2.29, .64, { fontSize: 13.4, color: C.white });
  line(s, 4.91, 5.45, 2.26, 0, C.gold, .7);
  addText(s, 'CLIENTS · APPRENTIS · INVESTISSEURS', 4.91, 5.66, 2.2, .13, { fontSize: 5.2, color: C.paleGold, bold: true, charSpacing: .65 });
  quote(s, 'Prendre son travail au sérieux et bien à cœur, en toute circonstance, sans distinction.', M, 7.83, 6.15, .56, { fontSize: 13.2 });
}

// 15 — Contact
{
  const s = newSlide(C.earth);
  image(s, A.groupColor, 0, 0, W, 2.86, { transparency: 17 });
  rect(s, 0, 0, W, 2.86, C.earth, C.earth, { transparency: 58 });
  logo(s, true, M, .43, 2.07, .67);
  cap(s, 'Une pièce à imaginer ?', M, 1.68, 2.3, C.paleGold);
  serif(s, 'Parlons de votre prochaine allure.', M, 2.06, 4.6, .74, { fontSize: 23.5, color: C.white, lineSpacingMultiple: .92 });
  line(s, M, 4.05, W - 2 * M, 0, C.gold, .8);
  cap(s, 'Atelier', M, 4.55, 1, C.paleGold);
  serif(s, 'Tankpè, Abomey-Calavi · Bénin', M, 4.95, 5.4, .36, { fontSize: 15.7, color: C.white });
  cap(s, 'Contact', M, 5.91, 1, C.paleGold);
  serif(s, '01 42 65 66 61', M, 6.32, 3.7, .36, { fontSize: 20, color: C.white });
  cap(s, 'Réseaux', M, 7.28, 1, C.paleGold);
  serif(s, '@Ange_hmg_home', M, 7.69, 3.7, .37, { fontSize: 18.1, color: C.white });
  addText(s, 'TikTok · Instagram', M + .02, 8.22, 1.9, .13, { fontSize: 6.3, color: 'D8C8BE', charSpacing: .1 });
  line(s, M, 9.1, W - 2 * M, 0, '755C50', .55);
  serif(s, 'Héritier du fil, créateur de style.', M, 9.44, 5.1, .38, { fontSize: 16.2, color: C.paleGold });
  addText(s, 'Merci.', W - 1.5, 10.08, .9, .2, { fontFace: 'Georgia', fontSize: 13.6, color: C.white, italic: true, align: 'right' });
  addText(s, '15', W - .98, H - .83, .35, .14, { fontSize: 6.1, color: C.paleGold, charSpacing: 1.1 });
}

pptx.writeFile({ fileName: output })
  .then(() => console.log(`PowerPoint modifiable créé : ${output}`))
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
