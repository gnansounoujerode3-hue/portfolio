/*
 * Version PowerPoint fidèle au PDF d'ANGE HMG HOME.
 *
 * Méthode : les fonds, photos et détails graphiques proviennent de la maquette
 * PDF validée ; les 186 textes restent des zones PowerPoint indépendantes et
 * modifiables. Cette structure évite les décalages de mise en page qui peuvent
 * apparaître lorsqu'un document éditorial A4 est redessiné avec les moteurs
 * typographiques de PowerPoint.
 *
 * Génération : npm run build:portfolio-editable
 * Prérequis local : PyMuPDF (uniquement pour régénérer les fonds PNG).
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const pptxgen = require('pptxgenjs');

const root = path.resolve(__dirname, '..');
const work = path.join(root, '_work', 'editable-pptx');
const backgroundsPdf = path.join(work, 'hmg-backgrounds.pdf');
const textLayerFile = path.join(work, 'hmg-text-layer.json');
const renderDir = path.join(work, 'render');
const output = path.join(root, 'ANGE_HMG_HOME_Dossier_de_Marque_Modifiable.pptx');

const W_PT = 595.28;
const H_PT = 841.89;
const W = W_PT / 72;
const H = H_PT / 72;

function buildBackgroundsAndTextLayer() {
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(renderDir, { recursive: true });

  execFileSync('node', [path.join(__dirname, 'generate-portfolio.js')], {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      HMG_EXPORT_TEXT_LAYER: '1',
      HMG_BACKGROUND_OUTPUT: backgroundsPdf,
      HMG_TEXT_LAYER_OUTPUT: textLayerFile,
    },
  });

  const renderPython = `
import sys
import pathlib
import pymupdf
pdf = pymupdf.open(sys.argv[1])
out = pathlib.Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
for index, page in enumerate(pdf):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1.8, 1.8), alpha=False)
    pix.save(out / f"page-{index + 1:02d}.png")
print(f"{len(pdf)} fonds rendus")
`;
  execFileSync('python3', ['-c', renderPython, backgroundsPdf, renderDir], {
    cwd: root,
    stdio: 'inherit',
  });
}

function pptFont(pdfFont) {
  if (pdfFont.startsWith('Times')) return 'Times New Roman';
  return 'Arial';
}
function stripHash(color) {
  return (color || '#201815').replace('#', '');
}
function addTextLayer(slide, item) {
  const x = item.x / 72;
  const y = item.y / 72;
  const w = (item.width || (W_PT - item.x - 8)) / 72;
  const h = Math.max(item.height / 72 + .045, item.size / 72 * 1.35);
  slide.addText(item.text, {
    x, y, w, h,
    margin: 0,
    isTextBox: true,
    fontFace: pptFont(item.font),
    fontSize: item.size,
    color: stripHash(item.color),
    bold: item.font.includes('Bold'),
    italic: item.font.includes('Italic') || item.oblique,
    align: item.align || 'left',
    valign: 'top',
    breakLine: false,
    fit: 'none',
    charSpacing: item.characterSpacing || undefined,
    lineSpacing: item.lineHeight ? item.lineHeight + item.lineGap : undefined,
    transparency: Math.round((1 - (item.opacity ?? 1)) * 100),
  });
}

async function generate() {
  buildBackgroundsAndTextLayer();
  const textLayer = JSON.parse(fs.readFileSync(textLayerFile, 'utf8'));
  const pptx = new pptxgen();
  pptx.defineLayout({ name: 'HMG_A4', width: W, height: H });
  pptx.layout = 'HMG_A4';
  pptx.author = 'HOUEMAGNON Ange-Marie Mahouna Coovi Pegaz Fidèl';
  pptx.company = 'ANGE HMG HOME';
  pptx.subject = 'Dossier de marque officiel — version PowerPoint modifiable';
  pptx.title = 'ANGE HMG HOME — Dossier de marque officiel';
  pptx.lang = 'fr-FR';
  pptx.theme = { headFontFace: 'Times New Roman', bodyFontFace: 'Arial', lang: 'fr-FR' };

  for (let page = 1; page <= textLayer.pages; page += 1) {
    const slide = pptx.addSlide();
    const background = path.join(renderDir, `page-${String(page).padStart(2, '0')}.png`);
    // The approved PDF design sits on the bottom layer; texts above it are editable.
    slide.addImage({ path: background, x: 0, y: 0, w: W, h: H });
    textLayer.textLayer
      .filter((item) => item.page === page)
      .forEach((item) => addTextLayer(slide, item));
  }

  await pptx.writeFile({ fileName: output });
  console.log(`PowerPoint fidèle et modifiable créé : ${output}`);
}

generate().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
