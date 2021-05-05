import { BrowserService } from './services/browser.service';
import { resolve } from 'path';
import { writeFileSync } from 'fs';

const browserService = new BrowserService({ headless: false });

export const test = async () => {
    const { ipc, page } = await browserService.createAppRuntime('http://localhost:4321');
    (ipc as any).on("pong", (data) => {
        writeFileSync(resolve(process.cwd(), 'pong.txt'), `Message from the browser: ${Object.keys(data).join(', ')}`, {encoding: 'utf-8'});
    });
    await page.evaluate(`
   
  const { IPC } = window['puppeteer-ipc/browser'];
  const ipc = new IPC();
 
  ipc.on('ping', (d) => {
      ipc.send('pong', d);
    window.alert(d);
  });
`);

  
    await ipc.send("ping", 'dollaz');
};
