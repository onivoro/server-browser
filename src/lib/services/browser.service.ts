import { Inject, Injectable } from '@nestjs/common';
import { Browser, launch } from 'puppeteer';
import { chromiumConfigToken } from '../tokens/chromium-config-token';
import { IChromiumConfig } from '../types/chromium-config.interface';
import { IPC } from "puppeteer-ipc/main";

@Injectable()

export class BrowserService {

    constructor(
        @Inject(chromiumConfigToken) private readonly config: IChromiumConfig,
    ) { }

    async createAppRuntime(url: string) {
        const { page, browser } = await this.launch(url);

        const ipc = await new IPC(page).start();
        return {ipc, browser, page}
    }

    async launch(url: string) {
        let browser!: Browser;

        try {
            browser = await launch(this.config);

            const page = await browser.newPage();

            await page.goto(url);

            return { browser, page, error: null };

        } catch (e) {

            return { error: e, browser, page: null };

        } finally {

            // if (browser) {
            //     browser.close();
            // }
        }
    }
}
