import { test, expect } from '@playwright/test';

test('homepage should load', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Compra tu auto/i);
  await page.getByRole('button', { name: 'ACCEDER' }).click();
  await page.getByRole('menuitem', { name: 'Registrarse' }).click();
  await page.getByRole('textbox', { name: 'Nombre Completo' }).click();
  await page.getByRole('textbox', { name: 'Nombre Completo' }).fill('tamara benitez');
  await page.getByRole('textbox', { name: 'Correo Electrónico' }).click();
  await page.getByRole('textbox', { name: 'Correo Electrónico' }).fill('tamara@gmail.com');
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill('stringst');
  await page.getByRole('button', { name: 'Crear Cuenta' }).click();
  await page.locator('div').nth(5).click();
});
