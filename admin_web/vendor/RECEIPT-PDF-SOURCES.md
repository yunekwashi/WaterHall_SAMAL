# Receipt PDF assets

Used only by Admin receipt downloads. No CDN execution or new backend dependency.

- jsPDF 4.2.1, MIT license, official npm tarball: https://registry.npmjs.org/jspdf/-/jspdf-4.2.1.tgz
- npm SHA512 package integrity verified before extraction. UMD SHA256: `e6551fcdc32f09d6853b2c5126d18d01d9447e0da618a41a11ebeee0f6c20d54`.
- Roboto Regular, Apache-2.0, official source: https://raw.githubusercontent.com/googlefonts/roboto/main/src/hinted/Roboto-Regular.ttf
- Font binary SHA256: `56a45233d29f11b4dfb86d248e921939d115778f87325e7ae8cc108383d6664d`. Embedded as base64 in receipt-font.js; complete Apache license also embedded in the served JS.
- Upstream releases/security notes: https://github.com/parallax/jsPDF/releases/tag/v4.2.1
- PDF uses only text, local embedded font, fixed colors and the public WaterHall PNG logo. No HTML-to-PDF parser, annotations, JavaScript actions or user-provided URLs.

For git diff hygiene, trailing spaces in eight lines of an upstream license comment were removed (no executable code changes). Distributed UMD SHA256: `275d4413a380959fca047f94cbda1a724d17185b0147b66e67b5531a03628e4b`. The upstream UMD hash above is retained.
