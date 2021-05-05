import { writeFileRx } from '@onivoro/server-disk';
import { BrowserService } from './services/browser.service';

const browserService = new BrowserService({ headless: false });

export const test = async () => {
    const { ipc, page } = await browserService.createAppRuntime('http://localhost:4321');

    await page.evaluate(`
   
  const { IPC } = window['puppeteer-ipc/browser'];
  const ipc = new IPC();
 
  ipc.on('ping', (d) => {
      ipc.send('pong', d);
    document.write(d);
  });
`);

    (ipc as any).on("pong", (data) => {
        writeFileRx('pong.txt', `Message from the browser: ${Object.keys(data).join(', ')}`);
    });
    await ipc.send("ping", 'dollaz');

    await ipc.send('test.ts', { detail: 'from server-browser' });
};
