import { resolve } from 'path';
import { IRenderOptions } from '../types/render-options.interface';
import { launch } from 'puppeteer-core';

export class Pdfr {

    static async render(options: IRenderOptions) {
        let result: any;
        let browser!: any;

        try {
            browser = await launch(options.config);

            const page = await browser.newPage();

            await page.goto(options.url);

            // await page.evaluate((detail: any) => {

            //     window.dispatchEvent(
            //         new CustomEvent('setState337', {
            //             detail
            //         })
            //     );
            // }, options.state);

            result = await page.pdf({
                displayHeaderFooter: true,
                // format: 'Letter',
                landscape: true,
                path: resolve(process.cwd(), options.path || new Date().toISOString()),
                printBackground: true,
                // headerTemplate: "<div/>",
                // footerTemplate: "<div style=\"text-align: right;width: 100%; font-size: 16px;\"><span><span class=\"pageNumber\"></span> of <span class=\"totalPages\"></span></span></div>",
                margin: {
                    top: '50px',
                    bottom: '50px'
                }
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