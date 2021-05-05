import { DynamicModule, Module } from "@nestjs/common";
import { BrowserService } from "./services/browser.service";
import { chromiumConfigToken } from "./tokens/chromium-config-token";
import { IChromiumConfig } from "./types/chromium-config.interface";
import { driverToken } from "./tokens/driver-token";
import { launch } from "puppeteer";
import { RenderService } from "./services/render.service";

@Module({})
export class ServerBrowserModule {
  static forRoot(chromiumConfig: IChromiumConfig): DynamicModule {
    return {
      module: ServerBrowserModule,
      providers: [
        BrowserService,
        RenderService,
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
