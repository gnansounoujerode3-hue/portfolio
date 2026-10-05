/*
 * ANGE HMG HOME — Catalogue de créations 2026
 * Les photos sont classées par vêtement porté et chaque modèle est décrit.
 * Génération : npm run build:lookbook
 */
const fs = require('fs');
const path = require('path');
const PDFDocument = require('pdfkit');

const root = path.resolve(__dirname, '..');
const exportTextLayer = process.env.HMG_LOOKBOOK_EXPORT_TEXT === '1';
const out = process.env.HMG_LOOKBOOK_OUTPUT
  ? path.resolve(process.env.HMG_LOOKBOOK_OUTPUT)
  : path.join(root, 'ANGE_HMG_HOME_Catalogue_de_Creations_2026.pdf');
const asset = (name) => path.join(root, name);

const A = {
  logoOriginal: asset('WhatsApp Image 2026-10-03 at 16.03.17.jpeg'),
  logoWhite: path.join(__dirname, 'ange-hmg-home-logo-white.png'),
  logoBlack: path.join(__dirname, 'ange-hmg-home-logo.png'),
  solarHero: asset('WhatsApp Image 2026-10-05 at 00.40.12 (1).jpeg'),
  yellowHero: asset('WhatsApp Image 2026-10-05 at 00.40.13 (2).jpeg'),
  yellowStudio: asset('WhatsApp Image 2026-10-05 at 00.38.14 (1).jpeg'),
  yellowDetail: asset('WhatsApp Image 2026-10-05 at 00.40.14 (1).jpeg'),
  copperMan: asset('WhatsApp Image 2026-10-05 at 00.40.08 (1).jpeg'),
  copperDuo: asset('WhatsApp Image 2026-10-05 at 00.40.08 (2).jpeg'),
  blueRoyal: asset('WhatsApp Image 2026-10-05 at 00.40.08.jpeg'),
  blueDetail: asset('WhatsApp Image 2026-10-05 at 00.40.09.jpeg'),
  violetDuo: asset('WhatsApp Image 2026-10-05 at 00.40.10.jpeg'),
  violetStudio: asset('WhatsApp Image 2026-10-05 at 00.40.16 (2).jpeg'),
  ivoryBride: asset('WhatsApp Image 2026-10-05 at 00.38.20 (1).jpeg'),
  ivoryTrain: asset('WhatsApp Image 2026-10-05 at 00.38.20.jpeg'),
  ivoryBeading: asset('WhatsApp Image 2026-10-05 at 00.38.31 (1).jpeg'),
  champagneGroup: asset('WhatsApp Image 2026-10-05 at 00.38.22.jpeg'),
  champagneHero: asset('WhatsApp Image 2026-10-05 at 00.38.30.jpeg'),
  champagneLineup: asset('WhatsApp Image 2026-10-05 at 00.38.25 (1).jpeg'),
  groomHero: asset('WhatsApp Image 2026-10-05 at 00.38.21 (1).jpeg'),
  groomWide: asset('WhatsApp Image 2026-10-05 at 00.38.21.jpeg'),
  groomClose: asset('WhatsApp Image 2026-10-05 at 00.38.25.jpeg'),
  civilDuo: asset('WhatsApp Image 2026-10-05 at 00.40.15 (2).jpeg'),
  civilBride: asset('WhatsApp Image 2026-10-05 at 00.40.15.jpeg'),
  civilWalk: asset('WhatsApp Image 2026-10-05 at 00.40.16.jpeg'),
  orangeHero: asset('WhatsApp Image 2026-10-05 at 00.38.17.jpeg'),
  orangeDuo: asset('WhatsApp Image 2026-10-05 at 00.38.16.jpeg'),
  orangePortrait: asset('WhatsApp Image 2026-10-05 at 00.40.13 (1).jpeg'),
  finishVeil: asset('WhatsApp Image 2026-10-05 at 00.38.34.jpeg'),
  finishLace: asset('WhatsApp Image 2026-10-05 at 00.40.15 (1).jpeg'),
  finishBride: asset('WhatsApp Image 2026-10-05 at 00.38.25 (2).jpeg'),
  contact: asset('WhatsApp Image 2026-10-05 at 00.38.14.jpeg'),
  // Vues complémentaires — chaque image source est intégrée au catalogue final.
  blueTrad: asset('WhatsApp Image 2026-10-05 at 00.38.18 (1).jpeg'),
  solarDuo: asset('WhatsApp Image 2026-10-05 at 00.38.18.jpeg'),
  solarGroup: asset('WhatsApp Image 2026-10-05 at 00.38.19.jpeg'),
  champagneEarly: asset('WhatsApp Image 2026-10-05 at 00.38.22 (1).jpeg'),
  ivoryA: asset('WhatsApp Image 2026-10-05 at 00.38.26 (1).jpeg'),
  ivoryB: asset('WhatsApp Image 2026-10-05 at 00.38.26 (2).jpeg'),
  ivoryC: asset('WhatsApp Image 2026-10-05 at 00.38.26.jpeg'),
  champagneB: asset('WhatsApp Image 2026-10-05 at 00.38.27.jpeg'),
  champagneC: asset('WhatsApp Image 2026-10-05 at 00.38.28 (1).jpeg'),
  champagneD: asset('WhatsApp Image 2026-10-05 at 00.38.28.jpeg'),
  champagneE: asset('WhatsApp Image 2026-10-05 at 00.38.30 (1).jpeg'),
  champagneF: asset('WhatsApp Image 2026-10-05 at 00.38.30 (2).jpeg'),
  champagneG: asset('WhatsApp Image 2026-10-05 at 00.38.31.jpeg'),
  ivoryD: asset('WhatsApp Image 2026-10-05 at 00.38.33 (1).jpeg'),
  ivoryE: asset('WhatsApp Image 2026-10-05 at 00.38.33 (2).jpeg'),
  ivoryF: asset('WhatsApp Image 2026-10-05 at 00.38.33 (3).jpeg'),
  ivoryG: asset('WhatsApp Image 2026-10-05 at 00.38.33.jpeg'),
  violetA: asset('WhatsApp Image 2026-10-05 at 00.40.12 (2).jpeg'),
  violetB: asset('WhatsApp Image 2026-10-05 at 00.40.12.jpeg'),
  solarBlack: asset('WhatsApp Image 2026-10-05 at 00.40.13.jpeg'),
  civilA: asset('WhatsApp Image 2026-10-05 at 00.40.14 (2).jpeg'),
  civilB: asset('WhatsApp Image 2026-10-05 at 00.40.14.jpeg'),
  weddingGroup: asset('WhatsApp Image 2026-10-05 at 00.40.16 (1).jpeg'),
};

const C = {
  earth: '#3E2723', dark: '#231614', paper: '#F5F0E9', cream: '#FCFAF6',
  gold: '#B68A55', pale: '#E9D8BE', ink: '#211815', muted: '#7C6D64',
  line: '#D5C9BE', white: '#FFFFFF', plum: '#621A51', blue: '#19508B',
};
const W = 595.28; const H = 841.89; const M = 42;
let doc; let currentPage = 0; const textLayer = [];

function rect(x, y, w, h, fill, stroke, lw = 1) {
  doc.save(); if (fill) doc.fillColor(fill); if (stroke) doc.strokeColor(stroke).lineWidth(lw);
  doc.rect(x, y, w, h); if (fill && stroke) doc.fillAndStroke(); else if (fill) doc.fill(); else if (stroke) doc.stroke(); doc.restore();
}
function line(x1, y1, x2, y2, color = C.line, lw = .6) { doc.save().strokeColor(color).lineWidth(lw).moveTo(x1, y1).lineTo(x2, y2).stroke().restore(); }
function text(t, x, y, opts = {}) {
  const { font = 'Helvetica', size = 10, color = C.ink, width, align = 'left', lineGap = 2, characterSpacing = 0, opacity = 1, oblique = false } = opts;
  if (exportTextLayer) {
    doc.save().font(font).fontSize(size);
    const lineHeight = doc.currentLineHeight(true);
    const height = doc.heightOfString(t, { width: width || 1000, lineGap, characterSpacing });
    doc.restore();
    textLayer.push({ page: currentPage, text: t, x, y, width: width || null, height, lineHeight, font, size, color, align, lineGap, characterSpacing, opacity, oblique });
    return;
  }
  doc.save().fillColor(color).font(font).fontSize(size).fillOpacity(opacity).text(t, x, y, { width, align, lineGap, characterSpacing, oblique }).restore();
}
function cap(t, x, y, opts = {}) { text(t.toUpperCase(), x, y, { font: 'Helvetica-Bold', size: 7.1, color: C.gold, characterSpacing: 1.55, ...opts }); }
function serif(t, x, y, opts = {}) { text(t, x, y, { font: 'Times-Roman', size: 16, color: C.earth, lineGap: 2, ...opts }); }
function display(t, x, y, opts = {}) { text(t, x, y, { font: 'Times-Roman', size: 35, color: C.earth, lineGap: -4, ...opts }); }
function page(fill = C.paper) { currentPage += 1; doc.addPage({ size: 'A4', margin: 0 }); rect(0, 0, W, H, fill); }
function imageCover(file, x, y, w, h, opts = {}) {
  const img = doc.openImage(file); const scale = Math.max(w / img.width, h / img.height); const dw = img.width * scale; const dh = img.height * scale;
  const dx = x - (dw - w) * (opts.align ?? .5); const dy = y - (dh - h) * (opts.valign ?? .5);
  doc.save().rect(x, y, w, h).clip(); if (opts.opacity !== undefined) doc.opacity(opts.opacity); doc.image(file, dx, dy, { width: dw, height: dh }); doc.restore();
  if (opts.border) rect(x, y, w, h, null, opts.border, opts.borderWidth || .7);
}
function imageContain(file, x, y, w, h, opts = {}) {
  const img = doc.openImage(file); const scale = Math.min(w / img.width, h / img.height); const dw = img.width * scale; const dh = img.height * scale;
  const dx = x + (w - dw) * (opts.align ?? .5); const dy = y + (h - dh) * (opts.valign ?? .5);
  if (opts.bg) rect(x, y, w, h, opts.bg); doc.save(); if (opts.opacity !== undefined) doc.opacity(opts.opacity); doc.image(file, dx, dy, { width: dw, height: dh }); doc.restore();
}
function footer(number, dark = false) {
  const cc = dark ? '#D9CBC0' : C.muted; line(M, H - 36, W - M, H - 36, dark ? '#71564D' : C.line, .45);
  text('ANGE HMG HOME  /  CATALOGUE DE CRÉATIONS', M, H - 27, { font: 'Helvetica-Bold', size: 6.1, color: cc, characterSpacing: .75 });
  text(String(number).padStart(2, '0'), W - M - 30, H - 27, { font: 'Helvetica-Bold', size: 6.5, color: cc, width: 30, align: 'right', characterSpacing: 1.1 });
}
function header(kicker, title, n, opts = {}) {
  cap(kicker, M, 34, { color: opts.dark ? C.pale : C.gold }); line(M, 52, W - M, 52, opts.dark ? '#71564D' : C.line, .55);
  display(title, M, 72, { size: opts.size || 31, width: opts.width || 400, color: opts.dark ? C.white : C.earth }); footer(n, opts.dark);
}
function tag(t, x, y, w, fill = C.earth, color = C.white) { rect(x, y, w, 20, fill); text(t.toUpperCase(), x + 8, y + 7, { font: 'Helvetica-Bold', size: 6.1, color, characterSpacing: .9, width: w - 16, align: 'center' }); }
function point(t, x, y, w, dark = false) { line(x, y + 6, x + 15, y + 6, dark ? C.gold : C.earth, 1); text(t, x + 25, y, { font: 'Helvetica', size: 8.3, color: dark ? '#E6D9CE' : C.muted, width: w - 25, lineGap: 2 }); }

const looks = [
  {
    code: 'HMG 01', title: 'Améthyste royale', category: 'Duo de cérémonie', color: '#621A51',
    hero: A.solarHero, photo2: A.violetDuo, photo3: A.violetStudio,
    description: 'Un duo violet et argent pensé comme une conversation entre deux présences. Le grand boubou de monsieur répond aux motifs violets appliqués sur la robe longue de madame.',
    details: ['Monsieur : grand boubou violet, tunique et pantalon coordonnés.', 'Madame : robe longue argentée avec motifs violets appliqués.', 'Pour un couple invité, une cérémonie traditionnelle ou un shooting.'],
  },
  {
    code: 'HMG 02', title: 'Terre cuivrée', category: 'Ensemble homme traditionnel', color: '#704331',
    hero: A.copperMan, photo2: A.copperDuo, photo3: A.blueRoyal,
    description: 'Un ensemble homme aux tons cuivre et chocolat. La tunique longue texturée, le pantalon coordonné et le drapé posé sur l’épaule composent une allure traditionnelle contemporaine.',
    details: ['Tunique longue à manches longues.', 'Drapé contrasté porté comme une signature.', 'Pour une cérémonie traditionnelle, une dot ou une célébration familiale.'],
  },
  {
    code: 'HMG 03', title: 'Bleu roi perlé', category: 'Robe de cérémonie femme', color: '#19508B',
    hero: A.blueRoyal, photo2: A.copperDuo, photo3: A.blueDetail,
    description: 'Une silhouette deux tons construite autour d’un corsage brun richement orné et d’une jupe bleu roi à volume. Les perles, coquillages et franges donnent du relief à chaque mouvement.',
    details: ['Corsage structuré à décor perlé et coquillages.', 'Jupe bleu roi drapée, ponctuée de franges.', 'Coiffe et bijoux assortis pour compléter l’expression cérémonielle.'],
  },
  {
    code: 'HMG 04', title: 'Éclat solaire', category: 'Robe de cérémonie', color: '#8B422C',
    hero: A.yellowHero, photo2: A.yellowStudio, photo3: A.yellowDetail,
    description: 'Une robe longue près du corps, animée par un dégradé jaune, orange, bordeaux et violet. Le buste dessiné et les lignes de perles donnent à la silhouette une présence de scène.',
    details: ['Encolure dégagée et épaules soulignées.', 'Jeu de couleurs contrastées et détails lumineux.', 'Pour une dot, une réception ou un portrait de cérémonie.'],
  },
  {
    code: 'HMG 05', title: 'Ivoire perlé', category: 'Robe de mariée', color: '#9B8262',
    hero: A.ivoryBride, photo2: A.ivoryTrain, photo3: A.ivoryBeading,
    description: 'Une robe de mariée blanche à la silhouette ajustée, enrichie d’un bustier travaillé, d’un décor perlé et d’éléments transparents. La ligne accompagne la mariée sans perdre sa force visuelle.',
    details: ['Buste structuré et transparences délicates.', 'Décor de perles et travail de matière visible de près.', 'Pour mariage civil, religieux ou réception de mariage.'],
  },
  {
    code: 'HMG 06', title: 'Cortège champagne', category: 'Robes de demoiselles d’honneur', color: '#A68A6B',
    hero: A.champagneHero, photo2: A.champagneGroup, photo3: A.champagneLineup,
    description: 'Des robes longues champagne conçues pour former un cortège cohérent. La ligne ajustée, le haut drapé et l’épaule dégagée font dialoguer élégance, unité et aisance.',
    details: ['Silhouette longue près du corps.', 'Décolleté cœur et épaule drapée.', 'Pour demoiselles d’honneur, réception ou cérémonie extérieure.'],
  },
  {
    code: 'HMG 07', title: 'Marié ivoire & noir', category: 'Veste de mariage homme', color: '#4B3C38',
    hero: A.groomHero, photo2: A.groomWide, photo3: A.groomClose,
    description: 'Un look de marié construit autour d’une veste ivoire, d’un pantalon noir et d’un nœud papillon rouge. La coupe garde une lecture classique, relevée par une touche de couleur assumée.',
    details: ['Veste claire à revers contrastés.', 'Pantalon noir à ligne nette.', 'Nœud papillon rouge et boutonnière florale comme accents.'],
  },
  {
    code: 'HMG 08', title: 'Civil ivoire & sable', category: 'Duo mariage civil', color: '#8E714F',
    hero: A.civilDuo, photo2: A.civilBride, photo3: A.civilWalk,
    description: 'Une proposition civile élégante : robe blanche en dentelle à encolure droite, gants longs et collier de perles pour madame ; veste croisée sable et pantalon brun pour monsieur.',
    details: ['Madame : dentelle florale, ligne ajustée, gants longs.', 'Monsieur : veste croisée sable, accessoires bordeaux.', 'Pour mairie, séance civile ou réception intimiste.'],
  },
  {
    code: 'HMG 09', title: 'Apparat orange', category: 'Tenue homme de célébration', color: '#A95429',
    hero: A.orangeHero, photo2: A.orangeDuo, photo3: A.orangePortrait,
    description: 'Une tenue orange pensée pour une entrée remarquée. La couleur intense, la ligne ample et les éléments coordonnés donnent au modèle une énergie festive et contemporaine.',
    details: ['Couleur orange comme point focal de la silhouette.', 'Ensemble ample et confortable pour rester libre de ses mouvements.', 'Pour la dot, les célébrations traditionnelles et les photos de couple.'],
  },
];

function cover() {
  page(C.dark); imageCover(A.solarHero, W - 230, 0, 230, H, { align: .53, opacity: .95 }); rect(W - 230, 0, 230, H, C.dark); // deterministic dark edge
  // restore part of photo with a narrow window for contrast
  imageCover(A.solarHero, W - 190, 0, 190, H, { align: .52, opacity: .82 });
  cap('ANGE HMG HOME', M, 67, { color: C.pale, size: 8 }); imageContain(A.logoWhite, M, 104, 220, 92, { align: 0 });
  text('CATALOGUE\nDE CRÉATIONS', M, 227, { font: 'Times-Roman', size: 43, color: C.white, lineGap: -7 });
  line(M, 340, 142, 340, C.gold, 1.1);
  serif('Silhouettes portées, modèles classés et détails qui racontent le geste HMG.', M, 365, { width: 280, size: 17, color: '#E9DDD2', lineGap: 3 });
  cap('ÉDITION 2026', M, 520, { color: C.pale }); text('MODE · CÉRÉMONIE · SUR MESURE', M, 542, { font: 'Helvetica-Bold', size: 7.2, color: C.white, characterSpacing: 1.15 });
  text('Atelier Tankpè, Abomey-Calavi · 01 42 65 66 61', M, 755, { font: 'Helvetica', size: 7, color: '#E9DDD2' });
  text('@Ange_hmg_home', M, 775, { font: 'Helvetica-Bold', size: 7, color: C.white, characterSpacing: .5 });
}
function guide() {
  page(C.cream); header('Le catalogue', 'Chaque tenue\nraconte son histoire.', 2, { size: 32, width: 390 });
  serif('Cette édition range les images par vêtement porté. Chaque fiche rassemble les vues d’un même modèle et décrit les éléments visibles dans la silhouette.', M, 190, { width: 280, size: 16.5, lineGap: 4 });
  imageCover(A.copperDuo, 350, 89, 203, 324, { align: .5 });
  cap('Comment lire ce catalogue', M, 415);
  const read = [
    ['01', 'Un modèle par fiche', 'Une tenue ou un duo clairement identifié.'],
    ['02', 'Plusieurs vues', 'Porté, plan rapproché et détails de finition.'],
    ['03', 'Une description utile', 'Silhouette, éléments visibles et occasions possibles.'],
  ];
  read.forEach((r, i) => { const y = 462 + i * 75; text(r[0], M, y, { font: 'Helvetica-Bold', size: 8, color: C.gold, characterSpacing: 1.3 }); serif(r[1], M + 42, y - 5, { size: 17, width: 170 }); text(r[2], M + 42, y + 22, { font: 'Helvetica', size: 8.5, color: C.muted, width: 210, lineGap: 2 }); });
  rect(350, 454, 203, 187, C.earth); cap('Note de collection', 370, 482, { color: C.pale }); serif('Le sur-mesure commence par une silhouette, puis se précise dans le détail.', 370, 515, { width: 150, size: 18, color: C.white, lineGap: 3 });
  rect(350, 667, 203, 70, C.white); imageCover(A.logoOriginal, 369, 677, 165, 50, { align: .5, valign: .5 });
}
function modelPage(look, no) {
  page(no % 2 === 0 ? C.cream : C.paper);
  header(`Modèle ${look.code}`, look.title, no + 2, { size: 31, width: 320 });
  tag(look.category, M, 158, 170, look.color);
  // Number used as an editorial marker, independent of text blocks
  text(String(no).padStart(2, '0'), 483, 63, { font: 'Times-Roman', size: 56, color: look.color, opacity: .18, width: 70, align: 'right' });
  imageCover(look.hero, M, 204, 258, 365, { align: .5, valign: .48 });
  imageCover(look.photo2, 321, 204, 232, 196, { align: .5, valign: .45 });
  imageCover(look.photo3, 321, 416, 232, 153, { align: .5, valign: .48 });
  cap('Description du modèle', M, 608, { color: look.color });
  serif(look.description, M, 638, { width: 258, size: 13.4, lineGap: 3 });
  cap('Points clés', 321, 608, { color: look.color });
  look.details.forEach((detail, i) => point(detail, 321, 640 + i * 42, 230));
  line(M, 784, W - M, 784, C.line, .5);
  text('Modèle présenté en photos réelles · Atelier HMG HOME', M, 798, { font: 'Helvetica', size: 6.5, color: C.muted, characterSpacing: .2 });
  text(look.code, W - M - 65, 798, { font: 'Helvetica-Bold', size: 6.5, color: look.color, width: 65, align: 'right', characterSpacing: .8 });
}
function galleryPage(kicker, title, caption, photos, number, color = C.earth) {
  page(C.cream); header(kicker, title, number, { size: 29, width: 430 });
  text(caption, M, 147, { font: 'Helvetica', size: 9, color: C.muted, width: 440, lineGap: 2 });
  const y = 192;
  if (photos.length === 2) {
    imageCover(photos[0], M, y, 245, 442, { align: .5, valign: .48 });
    imageCover(photos[1], 308, y, 245, 442, { align: .5, valign: .48 });
  } else if (photos.length === 3) {
    imageCover(photos[0], M, y, 275, 430, { align: .5, valign: .48 });
    imageCover(photos[1], 337, y, 216, 202, { align: .5, valign: .5 });
    imageCover(photos[2], 337, y + 228, 216, 202, { align: .5, valign: .5 });
  } else if (photos.length === 4) {
    [[M, y], [306, y], [M, y + 245], [306, y + 245]].forEach((pos, i) => imageCover(photos[i], pos[0], pos[1], 247, 218, { align: .5, valign: .5 }));
  } else {
    // Seven images: six detailed tiles plus one final wide view.
    const cols = [M, 220, 398];
    photos.slice(0, 6).forEach((photo, i) => imageCover(photo, cols[i % 3], y + Math.floor(i / 3) * 194, 155, 176, { align: .5, valign: .5 }));
    imageCover(photos[6], M, y + 405, 511, 116, { align: .5, valign: .5 });
  }
  line(M, 744, W - M, 744, C.line, .55);
  cap('Vues complémentaires du même univers vestimentaire', M, 763, { color, size: 6.3 });
}
function detailPage() {
  page(C.dark); header('Finitions HMG', 'Ce que le détail\nchange à la silhouette.', 18, { dark: true, size: 31, width: 360 });
  imageCover(A.ivoryBeading, M, 205, 241, 287, { align: .5 }); imageCover(A.finishVeil, 311, 205, 242, 287, { align: .5 });
  imageCover(A.finishLace, M, 510, 158, 145, { align: .5 }); imageCover(A.finishBride, 176, 510, 158, 145, { align: .5 }); imageCover(A.blueDetail, 352, 510, 201, 145, { align: .5 });
  cap('Matières, perles, transparences, drapés', M, 691, { color: C.pale });
  serif('Du travail de perlage aux volumes de voile, HMG porte son attention sur les zones qui restent en mémoire : une encolure, une traîne, une appliqué ou la lumière d’un tissu.', M, 720, { width: 450, size: 15.5, color: C.white, lineGap: 3 });
}
function contactPage() {
  page(C.earth); imageCover(A.contact, 0, 0, W, 296, { align: .5, opacity: .86 }); doc.save().fillColor(C.earth).opacity(.46).rect(0, 0, W, 296).fill().restore();
  imageContain(A.logoWhite, M, 42, 176, 78, { align: 0 }); cap('Un modèle à imaginer ?', M, 162, { color: C.pale }); serif('Construisons\nvotre prochaine allure.', M, 190, { width: 360, size: 32, color: C.white, lineGap: -3 });
  line(M, 358, W - M, 358, C.gold, .8); cap('Atelier', M, 401, { color: C.pale }); serif('Tankpè, Abomey-Calavi · Bénin', M, 430, { size: 19, color: C.white });
  cap('Contact', M, 505, { color: C.pale }); text('01 42 65 66 61', M, 535, { font: 'Times-Roman', size: 25, color: C.white }); cap('Réseaux', M, 611, { color: C.pale }); text('@Ange_hmg_home', M, 641, { font: 'Times-Roman', size: 24, color: C.white });
  text('TikTok · Instagram', M, 680, { font: 'Helvetica', size: 8, color: '#E6D9CE' }); line(M, 720, W - M, 720, '#755C50', .55); serif('Héritier du fil, créateur de style.', M, 744, { size: 20, color: C.pale }); footer(19, true);
}

function generate() {
  doc = new PDFDocument({ size: 'A4', margin: 0, autoFirstPage: false, bufferPages: true, info: { Title: 'ANGE HMG HOME — Catalogue de créations 2026', Author: 'HOUEMAGNON Ange-Marie Mahouna Coovi Pegaz Fidèl', Subject: 'Catalogue de vêtements portés et modèles HMG HOME', CreationDate: new Date('2026-10-05T00:00:00Z') } });
  const stream = fs.createWriteStream(out); doc.pipe(stream); cover(); guide(); looks.forEach((look, index) => modelPage(look, index + 1));
  galleryPage('Améthyste royale', 'Vues complémentaires.', 'Autres portés du duo violet et argent : le même univers de cérémonie, observé sous plusieurs angles.', [A.violetA, A.violetB, A.solarBlack], 12, C.plum);
  galleryPage('Bleu roi perlé', 'Vues complémentaires.', 'Autres images de la tenue bleu roi perlée et de son contexte de cérémonie.', [A.blueTrad, A.solarGroup], 13, C.blue);
  galleryPage('Solaire & orange', 'Le duo en lumière.', 'Les tenues jaune, orange et bordeaux réunies : robe de cérémonie et ensemble homme de célébration.', [A.solarDuo, A.civilA, A.orangeDuo], 14, '#8B422C');
  galleryPage('Mariée ivoire', 'Vues complémentaires.', 'Variations, détails et scènes de la robe de mariée ivoire : du porté à la traîne et aux finitions.', [A.ivoryA, A.ivoryB, A.ivoryC, A.ivoryD, A.ivoryE, A.ivoryF, A.ivoryG], 15, '#9B8262');
  galleryPage('Cortège champagne', 'Vues complémentaires.', 'Les différentes vues du cortège champagne soulignent l’unité de la ligne, des détails d’épaule et du mouvement.', [A.champagneEarly, A.champagneB, A.champagneC, A.champagneD, A.champagneE, A.champagneF, A.champagneG], 16, '#A68A6B');
  galleryPage('Moments de mariage', 'Civil & cérémonie.', 'Vues complémentaires des silhouettes ivoire, sable, noir et blanc portées pendant les cérémonies.', [A.civilB, A.weddingGroup], 17, '#8E714F');
  detailPage(); contactPage(); doc.end();
  stream.on('finish', () => {
    if (exportTextLayer) {
      const file = process.env.HMG_LOOKBOOK_TEXT_OUTPUT ? path.resolve(process.env.HMG_LOOKBOOK_TEXT_OUTPUT) : path.join(root, '_work', 'lookbook-text-layer.json'); fs.mkdirSync(path.dirname(file), { recursive: true });
      fs.writeFileSync(file, JSON.stringify({ width: W, height: H, pages: currentPage, textLayer }, null, 2)); console.log(`Catalogue fond + texte créés : ${out} / ${file}`);
    } else console.log(`Catalogue créé : ${out}`);
  });
}
generate();
