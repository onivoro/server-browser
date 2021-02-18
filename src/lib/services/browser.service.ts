import { Inject, Injectable } from '@nestjs/common';
import { Browser, launch } from 'puppeteer';
import { chromiumConfigToken } from '../tokens/chromium-config-token';
import { IChromiumConfig } from '../types/chromium-config.interface';

@Injectable()
export class BrowserService {

    constructor(
        @Inject(chromiumConfigToken) private readonly config: IChromiumConfig,
    ) { }

    async createAppRuntime() {

    }

    async launch(url: string) {
        let browser!: Browser;

        try {
            browser = await launch(this.config);

            const page = await browser.newPage();

            await page.goto(url);

            // await page.evaluate((detail: any) => {

            //     window.dispatchEvent(
            //         new CustomEvent('eventNameHere', {
            //             detail
            //         })
            //     );
            // }, options.state);

            return browser;

        } catch (e) {

            return e;

        } finally {

            if (browser) {
                browser.close();
            }
        }
    }
}
