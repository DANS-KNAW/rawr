<table align="center">
  <tr>
    <td align="center">
      <a href="https://dans.knaw.nl/" target="_blank">
        <img src="https://dans.knaw.nl/wp-content/uploads/2021/10/Logo-DANS.svg" width="400" alt="DANS Logo" />
      </a>
    </td>
    <td align="center">
      <a href="https://www.rd-alliance.org/" target="_blank">
        <img src="https://www.rd-alliance.org/wp-content/uploads/2024/04/RDA_Logotype_CMYK.png" width="350" alt="RDA LOGO" />
      </a>
    </td>
  </tr>
</table>


<p align="center">RAWR browser extension for the rda tiger project</p>

# Description
This browser extension is responsible for annotating resources on the web and attaching controlled vocabulary metadata. The annotations will then be stored in the search and discovery facility on [rda.dansdemo.nl](https://rda.dansdemo.nl/).

# Usage
.
Install the required packages
```
pnpm install
```
Set the right enviorment vairable:

Note: The `VITE_API_KEY` should have the same value as set in the [rda-storage-service](https://github.com/DANS-KNAW/IST-rda-storage-service).
```
VITE_API_ENDPOINT=http://localhost:3000/annotations
VITE_API_KEY=your_api_key
```
Build the extension
```bash
pnpm build

# Can also be run in watch mode

pnpm build:watch
```
Install the extension in Chrome:
- Open the Chrome browser
- Go to the Extensions page (chrome://extensions)
- Enable "Developer mode" in the top right corner
- Click "Load unpacked" and select the dist/ directory in this project