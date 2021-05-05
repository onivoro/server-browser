import { resolve } from "path";
import { IRenderOptions } from "../types/render-options.interface";
import { Browser, launch } from "puppeteer";
import { Inject, Injectable } from "@nestjs/common";
import { chromiumConfigToken } from "../tokens/chromium-config-token";
import { IChromiumConfig } from "../types/chromium-config.interface";

@Injectable()
export class RenderService {
  constructor(
    @Inject(chromiumConfigToken) private readonly config: IChromiumConfig
  ) {}

  async render(extraOptions: IRenderOptions) {
    const options = { ...extraOptions, config: this.config };
    let result: any;
    let browser!: Browser;

    try {
      browser = await launch(options.config);

      const page = await browser.newPage();

      await page.goto(options.url);

      result = await page.pdf({
        displayHeaderFooter: true,
        landscape: true,
        path: resolve(
          process.cwd(),
          options.path || `${new Date().toISOString()}.pdf`
        ),
        printBackground: true,
        margin: {
          top: "50px",
          bottom: "50px",
        },
      });

      return result;
    } catch (e) {
      return e;
    } finally {
      if (browser) {
        browser.close();
      }
    }
  }
}
