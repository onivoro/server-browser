import { BrowserService } from "./services/browser.service";
import { resolve } from "path";
import { writeFileSync } from "fs";
import * as x from "express";
const browserService = new BrowserService({ headless: false });

const serve = async (folderPathOnDisk: string) =>
  await new Promise<string>((resolve) => {
    const app = x();
    const port = 3000;
    app.use(x.static(folderPathOnDisk));
    app.listen(port, () => resolve(`http://localhost:${port}`));
  });

export const test = async () => {
  const diskPath = "/Users/ln/github.com/gitgrok/gitgrok/dist/apps/browser/";
  const url = await serve(diskPath);
  const { ipc, page } = await browserService.createAppRuntime(url);
  (ipc as any).on("pong", (data) => {
    writeFileSync(
      resolve(process.cwd(), "pong.txt"),
      `Message from the browser: ${Object.keys(data).join(", ")}`,
      { encoding: "utf-8" }
    );
  });
  await page.evaluate(`
   
  const { IPC } = window['puppeteer-ipc/browser'];
  const ipc = new IPC();
 
  ipc.on('ping', (d) => {
      ipc.send('pong', d);
    window.alert(d);
  });
`);
  await ipc.send("ping", "dollaz");
};
