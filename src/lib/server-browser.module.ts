import { DynamicModule, Module } from "@nestjs/common";
import { BrowserService } from "./services/browser.service";
import { chromiumConfigToken } from "./tokens/chromium-config-token";
import { IChromiumConfig } from "./types/chromium-config.interface";
import { driverToken } from "./tokens/driver-token";
import puppeteer = require("puppeteer-core");
import { RenderService } from "./services/render.service";

@Module({})
export class ServerBrowserModule {
  static forRoot(chromiumConfig: IChromiumConfig): DynamicModule {
    const providers = [
      BrowserService,
      RenderService,
      { provide: chromiumConfigToken, useValue: chromiumConfig },
      {
        provide: driverToken,
        useFactory: async () => {
          return await puppeteer.launch(chromiumConfig);
        },
      },
    ];
    
    return {
      module: ServerBrowserModule,
      providers,
      exports: providers
    };
  }
}
