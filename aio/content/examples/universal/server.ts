import 'zone.js/node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // #docregion ngExpressEngine
  // Universal express 엔진 (https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));
  // #enddocregion ngExpressEngine

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // #docregion data-request
  // TODO: 보안 로직을 추가해야 합니다.
  server.get('/api/**', (req, res) => {
    res.status(404).send('data requests are not yet supported');
  });
  // #enddocregion data-request

  // #docregion static
  // 정적 파일은 /browser 주소로 제공합니다.
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));
  // #enddocregion static

  // #docregion navigation-request
  // 모든 요청이 Universal 엔진을 사용합니다.
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });
  // #enddocregion navigation-request

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';
