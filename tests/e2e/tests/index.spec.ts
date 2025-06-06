import { test, expect } from '@playwright/test';
import { getLinks } from './sitemap'

const sitemapSource = 'http://localhost:3000'
const originalSite = 'https://retejs.org';
const site = process.env.SITE || sitemapSource;
const links = await getLinks(sitemapSource)
const paths = links.map(link => link.replace(originalSite, '').replace(/\/$/, ''))
const targetPaths = paths.filter(path => !path.startsWith('/preview')).filter(Boolean)

targetPaths.forEach(path => {
  const url = `${site}${path}`;

  test(`check page ${path}`, async ({ page }) => {
    test.setTimeout(30_000);
    await page.goto(url);

    await page.waitForLoadState('load');

    // hide all images
    await page.addStyleTag({
      content: `
        .preview { background: #ccc !important; }
        .preview img { opacity: 0 !important; }
        .container { background: #fff !important; }
        .container iframe { opacity: 0 !important; }
        .sharethis.visible { display: none !important; }
      `
    });

    expect(await page.title()).toMatchSnapshot()

    await expect(page).toHaveScreenshot(`${path.replace(/\//g, '-')}.png`, {
      fullPage: true,
      timeout: 20_000,
      maxDiffPixelRatio: 0.001,
    });
  });
})
