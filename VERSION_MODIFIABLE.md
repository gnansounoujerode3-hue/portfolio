# Version modifiable — ANGE HMG HOME

Le fichier `ANGE_HMG_HOME_Dossier_de_Marque_Modifiable.pptx` est la version PowerPoint qui **préserve exactement la direction artistique du PDF validé**.

## Ce qui est modifiable

- Les **186 zones de texte** sont des champs PowerPoint séparés : titre, paragraphes, valeurs, contacts, numéros de page et légendes peuvent être cliqués et modifiés.
- La maquette visuelle, les photos, cadres, lignes, couleurs et recadrages sont conservés sur un fond de page pour éviter tout décalage de mise en page entre le PDF et PowerPoint.
- Pour remplacer une photo, insérer votre nouvelle image par-dessus de la zone concernée, puis utiliser **Format de l’image → Rogner**.

> Cette méthode est volontaire : elle garde le portfolio fidèle au PDF, là où une reconstruction élément par élément avec les polices et le moteur de mise en page de PowerPoint avait modifié le rendu.

## Pour modifier le dossier

1. Ouvrir le fichier dans **Microsoft PowerPoint**.
2. Cliquer sur une zone de texte pour modifier les mots, la taille ou la couleur.
3. Pour modifier une photo, ajouter la nouvelle photo au-dessus de l’ancienne, l’ajuster puis utiliser **Rogner**.
4. Exporter en PDF depuis PowerPoint : **Fichier → Exporter → Créer un document PDF/XPS**.

Le fichier peut aussi être importé dans **Google Slides** ou **Canva**. Pour conserver au mieux les textes et les dimensions A4, PowerPoint est recommandé.

## Recréer le fichier

```bash
npm run build:portfolio-editable
```

La reconstruction demande Node.js et PyMuPDF pour générer les fonds issus du PDF.
