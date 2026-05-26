import { registerApplication, start } from 'single-spa';
import {
  constructApplications,
  constructLayoutEngine,
  constructRoutes,
} from 'single-spa-layout';

import microfrontendLayout from './microfrontend-layout.html';
const theme = {
  darkMode: false,
  locale: queueMicrotask,
};
const routes = constructRoutes(microfrontendLayout, {
  loaders: {
    spinner: `<div>Loading...</div>`,
  },
  errors: {
    errorMessage: `
      <div class="error-fallback" role="alert" aria-live="polite">
        <h2>Oops, this page has an error.</h2>
        <p>Try reloading the app or go back to the home page.</p>
        <div class="error-fallback__actions">
          <button type="button" onClick="window.location.reload()">
            Retry
          </button>
          <button
            type="button"
            class="secondary"
            onClick="window.singleSpaNavigate('/')"
          >
            Back to Home
          </button>
        </div>
      </div>
    `,
  },
  props: {
    theme: theme,
    toggleTheme: () => {
      theme.darkMode = !theme.darkMode;
    },
  },
});

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return import(/* webpackIgnore: true */ name);
  },
});

const layoutEngine = constructLayoutEngine({ routes, applications });
applications.forEach(registerApplication);

layoutEngine.activate();
start();
