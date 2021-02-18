import { DynamicModule, Module } from '@nestjs/common';
import { PdfService } from './services/pdf.service';
import { chromiumConfigToken } from './tokens/chromium-config-token';
import { IChromiumConfig } from './types/chromium-config.interface';
import { driverToken } from './tokens/driver-token';
import { launch } from 'puppeteer-core';

@Module({
})
export class PdfModule {
  static forRoot(chromiumConfig: IChromiumConfig): DynamicModule {
    return {
      module: PdfModule,
      providers: [
        PdfService,
        { provide: chromiumConfigToken, useValue: chromiumConfig },
        {
          provide: driverToken,
          useFactory: async () => {
            return await launch(chromiumConfig);
          },
        },
      ],
    };
  }
}
