const { test, expect } = require('@playwright/test');

test.describe('ESM SQUARE TECHNOLOGIES homepage', () => {
  test('should load the homepage and show core sections', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/ESM SQUARE TECHNOLOGIES/i);
    await expect(page.getByRole('heading', { name: /Welcome to ESM Square Technologies/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /Explore Services/i })).toBeVisible();
    await expect(page.getByRole('heading', { name: /Live Analytics/i })).toBeVisible();
  });

  test('should show realtime stat numbers', async ({ page }) => {
    await page.goto('/');

    await expect(page.locator('#stat-visitors')).toHaveText(/\d+/);
    await expect(page.locator('#stat-tickets')).toHaveText(/\d+/);
    await expect(page.locator('#stat-response')).toHaveText(/\d+/);
  });

  test('should submit contact form successfully', async ({ page }) => {
    await page.goto('/');

    await page.fill('#name', 'Test User');
    await page.fill('#email', 'test@example.com');
    await page.fill('#message', 'This is a Playwright test message.');
    await page.click('button[type=submit]');

    await expect(page.locator('#formStatus')).toHaveText(/Thanks! Your message has been received/i);
  });

  test('should report health endpoint status OK', async ({ request }) => {
    const response = await request.get('/api/health');
    await expect(response).toBeOK();
    const body = await response.json();
    await expect(body.status).toBe('ok');
  });
});
