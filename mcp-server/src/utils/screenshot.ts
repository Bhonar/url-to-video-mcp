import { chromium } from 'playwright';

export async function takeScreenshot(url: string): Promise<Buffer> {
  console.error(`Taking screenshot of: ${url}`);

  const browser = await chromium.launch({
    headless: true,
  });

  const context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
    deviceScaleFactor: 2, // Retina/high-DPI
  });

  const page = await context.newPage();

  try {
    await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 30000,
    });

    // Wait a bit for dynamic content
    await page.waitForTimeout(2000);

    const screenshot = await page.screenshot({
      fullPage: true,
      type: 'png',
    });

    console.error('✓ Screenshot captured');

    return screenshot;
  } finally {
    await browser.close();
  }
}
