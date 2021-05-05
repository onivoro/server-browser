export { BrowserService } from './lib/services/browser.service';
export { driverToken } from './lib/tokens/driver-token';
export { RenderService } from './lib/services/render.service';
export { ServerBrowserModule } from './lib/server-browser.module';
import {test} from './lib/test';

test().then(console.warn.bind(console, 'si')).catch(console.warn.bind(console, 'no'))