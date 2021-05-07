import { Inject, Injectable } from "@nestjs/common";
import { Browser, launch } from "puppeteer-core";
import { chromiumConfigToken } from "../tokens/chromium-config-token";
import { IChromiumConfig } from "../types/chromium-config.interface";
import { IPC } from "puppeteer-ipc/main";

@Injectable()
export class BrowserService {
  constructor(
    @Inject(chromiumConfigToken) private readonly config: IChromiumConfig
  ) {}

  async createAppRuntime(url: string) {
    const { page, browser } = await this.launch(url);

    const ipc = await new IPC(page as any).start();
    return { ipc, browser, page };
  }

  async launch(url: string) {
    let browser!: Browser;

    browser = await launch({
      ...this.config
    });
    

    const pages = await browser.pages();

    const page = pages[0];    

    await page.setCacheEnabled(false);

    await page.goto(url, { waitUntil: "networkidle0" });

    return { browser, page };
  }
}
