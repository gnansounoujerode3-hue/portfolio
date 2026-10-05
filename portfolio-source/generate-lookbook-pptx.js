/*
 * PowerPoint fidèle et modifiable du catalogue de créations.
 * Les textes restent éditables ; les pages conservent précisément les photos,
 * recadrages et mises en page du PDF de référence.
 * Génération : npm run build:lookbook-editable
 */
const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const pptxgen = require('pptxgenjs');

const root = path.resolve(__dirname, '..');
const work = path.join(root, '_work', 'lookbook-pptx');
const backgroundPdf = path.join(work, 'lookbook-backgrounds.pdf');
const textLayerFile = path.join(work, 'lookbook-text-layer.json');
const renderDir = path.join(work, 'render');
const output = path.join(root, 'ANGE_HMG_HOME_Catalogue_de_Creations_Modifiable.pptx');
const W_PT = 595.28;
const H_PT = 841.89;
const W = W_PT / 72;
const H = H_PT / 72;

function renderSource() {
  fs.rmSync(work, { recursive: true, force: true });
  fs.mkdirSync(renderDir, { recursive: true });
  execFileSync('node', [path.join(__dirname, 'generate-lookbook.js')], {
    cwd: root,
    stdio: 'inherit',
    env: { ...process.env, HMG_LOOKBOOK_EXPORT_TEXT: '1', HMG_LOOKBOOK_OUTPUT: backgroundPdf, HMG_LOOKBOOK_TEXT_OUTPUT: textLayerFile },
  });
  const code = `
import sys
import pathlib
import pymupdf
pdf = pymupdf.open(sys.argv[1])
out = pathlib.Path(sys.argv[2])
out.mkdir(parents=True, exist_ok=True)
for i, page in enumerate(pdf):
    pix = page.get_pixmap(matrix=pymupdf.Matrix(1.8, 1.8), alpha=False)
    pix.save(out / f"page-{i + 1:02d}.png")
print(f"{len(pdf)} fonds rendus")
`;
  execFileSync('python3', ['-c', code, backgroundPdf, renderDir], { cwd: root, stdio: 'inherit' });
}
function font(pdfFont) { return pdfFont.startsWith('Times') ? 'Times New Roman' : 'Arial'; }
function addText(slide, item) {
  slide.addText(item.text, {
    x: item.x / 72,
    y: item.y / 72,
    w: (item.width || (W_PT - item.x - 8)) / 72,
    h: Math.max(item.height / 72 + .045, item.size / 72 * 1.35),
    margin: 0,
    isTextBox: true,
    fontFace: font(item.font),
    fontSize: item.size,
    color: (item.color || '#201815').replace('#', ''),
    bold: item.font.includes('Bold'),
    italic: item.font.includes('Italic') || item.oblique,
    align: item.align || 'left',
    valign: 'top',
    fit: 'none',
    charSpacing: item.characterSpacing || undefined,
    lineSpacing: item.lineHeight ? item.lineHeight + item.lineGap : undefined,
    transparency: Math.round((1 - (item.opacity ?? 1)) * 100),
  });
}
async function main() {
  renderSource();
  const data = JSON.parse(fs.readFileSync(textLayerFile, 'utf8'));
  const pptx = new pptxgen();
  pptx.defineLayout({ name: 'HMG_A4', width: W, height: H });
  pptx.layout = 'HMG_A4';
  pptx.author = 'HOUEMAGNON Ange-Marie Mahouna Coovi Pegaz Fidèl';
  pptx.company = 'ANGE HMG HOME';
  pptx.subject = 'Catalogue de créations — version PowerPoint modifiable';
  pptx.title = 'ANGE HMG HOME — Catalogue de créations 2026';
  pptx.lang = 'fr-FR';
  pptx.theme = { headFontFace: 'Times New Roman', bodyFontFace: 'Arial', lang: 'fr-FR' };
  for (let n = 1; n <= data.pages; n += 1) {
    const slide = pptx.addSlide();
    slide.addImage({ path: path.join(renderDir, `page-${String(n).padStart(2, '0')}.png`), x: 0, y: 0, w: W, h: H });
    data.textLayer.filter((item) => item.page === n).forEach((item) => addText(slide, item));
  }
  await pptx.writeFile({ fileName: output });
  console.log(`Catalogue PowerPoint créé : ${output}`);
}
main().catch((error) => { console.error(error); process.exitCode = 1; });
