import { Inject, Injectable } from "@nestjs/common";
import { Browser, launch } from "puppeteer";
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

    const ipc = await new IPC(page).start();
    return { ipc, browser, page };
  }

  async launch(url: string) {
    let browser!: Browser;

    browser = await launch({
      ...this.config,
      devtools: true,
      defaultViewport: { height: 800, width: 1600 },
    });

    const pages = await browser.pages();

    const page = pages[0];
    // page.setContent(`<html><title>titulo</title><body><h1>cuerpo</h1><pre>${url}</pre></body></html>`)

    await page.goto(url, { waitUntil: "networkidle0" });

    return { browser, page };
  }
}
