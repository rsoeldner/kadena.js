import { createI18nFixture } from "playwright-i18next-fixture";
import { test as baseTest } from '@playwright/test';
import i18nEn from '@kadena/tools/locales/en/common.json'


const i18nFixture = createI18nFixture({
  // i18n configuration options
  options: {
    debug: true,
    ns: ['common'],
    lng: 'en',
    cleanCode: true,
    resources: {
     en: {
        common: i18nEn,
      }
    }
  },
  // Fetch translations once and cache them for the rest of the test run
  // Default: true
  cache: true,
  // Run as auto fixture to be available through all tests by getI18nInstance()
  // Default: true
  auto: true
});

export const test = baseTest.extend(i18nFixture);