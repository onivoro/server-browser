import { DynamicModule, Module } from "@nestjs/common";
import { BrowserService } from "./services/browser.service";
import { chromiumConfigToken } from "./tokens/chromium-config-token";
import { IChromiumConfig } from "./types/chromium-config.interface";
import { RenderService } from "./services/render.service";

@Module({})
export class ServerBrowserModule {
  static forRoot(chromiumConfig: IChromiumConfig): DynamicModule {
    const providers = [
      BrowserService,
      RenderService,
      { provide: chromiumConfigToken, useValue: chromiumConfig },
    ];

    return {
      module: ServerBrowserModule,
      providers,
      exports: providers
    };
  }
}
