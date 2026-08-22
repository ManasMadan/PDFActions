# PDFActions

A free PDF toolkit that runs entirely in your browser. Merge, split, rotate, add page numbers and pull images out of a PDF — without uploading anything.

**[pdfactions.vercel.app](https://pdfactions.vercel.app)**

## Why

Every other free PDF tool asks you to upload the file to a server you don't control. Contracts, invoices, ID scans, medical records — all of it, sitting on someone else's disk.

PDFActions does the work client-side. The file is read into memory by the browser, edited there, and written back out as a download. Nothing is uploaded, so there is nothing to leak and nothing to delete afterwards. It also means the app works offline once loaded.

## Features

- **Merge** — combine any number of PDFs into one, in the order you choose
- **Split** — pull out a page range, or break a document into single-page files
- **Rotate** — rotate selected pages or the whole document
- **Page numbers** — stamp numbers onto pages, with control over position and format
- **Images** — extract embedded images, or build a PDF out of images

## Relationship to `pdf-actions`

All of the PDF manipulation lives in [`pdf-actions`](https://github.com/ManasMadan/pdf-actions), a standalone npm package built on top of [pdf-lib](https://pdf-lib.js.org/). This repository is only the front-end: a Next.js PWA that wires that package to a UI.

If you want the functionality in your own project, install the package instead:

```bash
npm install pdf-actions
```

Bugs in the actual PDF operations belong in the `pdf-actions` repo. Bugs in the interface belong here.

## Running locally

```bash
git clone https://github.com/ManasMadan/PDFActions.git
cd PDFActions
npm install
npm run dev
```

Then open http://localhost:3000.

To build and serve a production bundle:

```bash
npm run build
npm start
```

## Contributing

Issues and pull requests are welcome. For anything touching how a PDF is actually read or written, open it against [`pdf-actions`](https://github.com/ManasMadan/pdf-actions).
