import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import * as Sentry from '@sentry/angular';

Sentry.init({
  dsn: 'https://5cd1ccd5e04b4fb19f7e5931d2413b9c@ec2-15-223-205-221.ca-central-1.compute.amazonaws.com:8000/3',
  integrations: [
    Sentry.browserTracingIntegration(),
  ],
  tracesSampleRate: 0.01, // GlitchTip recommends 1% sampling for production
  release: '0.0.0', // Fixes "missing or non-string release" warning
  debug: true, // Keep debug enabled for troubleshooting connection issues
});

bootstrapApplication(App, appConfig).catch((err) => console.error(err));
