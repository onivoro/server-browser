import { IChromiumConfig } from './chromium-config.interface';

export interface IRenderOptions {
    url: string;
    path?: string;
    config: IChromiumConfig
}