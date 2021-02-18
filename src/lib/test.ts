import { BrowserService } from './services/browser.service';

const browserService = new BrowserService({ headless: false });

async function main() {
    await browserService.launch('https://artindustriesinc.com');
}

main();