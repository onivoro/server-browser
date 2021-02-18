import { Inject, Injectable } from '@nestjs/common';
import { chromiumConfigToken } from '../tokens/chromium-config-token';
import { IChromiumConfig } from '../types/chromium-config.interface';
import { Pdfr } from './pdfr';

@Injectable()

export class PdfService {

    constructor(
        @Inject(chromiumConfigToken) private readonly config: IChromiumConfig,
      ) {}

    async render(options: any) {
        return await Pdfr.render({...options, config: this.config});
    }
}