import { test, expect } from '@playwright/test';

test.describe('Registro de usuario - E2E', () => {
  test('completa el formulario y muestra pantalla de éxito', async ({ page }) => {
    await page.goto('/register');
    await page.getByLabel('Nombre Completo').fill('Juan Pérez');
    const email = `test+${Date.now()}@example.com`;
    await page.getByLabel('Correo electrónico').fill(email);
    await page.getByLabel('Contraseña').fill('supersecreta');

    await page.getByLabel('Selecciona tu tipo de usuario').click();
    await page.getByRole('option', { name: 'Concesionaria' }).click();

    await expect(page.getByLabel('CUIT de Concesionaria')).toBeVisible();

    await page.getByLabel('CUIT de Concesionaria').fill('20-12345678-3');
    await page.getByLabel('Nombre de Concesionaria').fill('Autos del Norte');

    await page.getByRole('button', { name: 'Crear Cuenta' }).click();

    await expect(
      page.getByText('Tu usuario se registro correctamente')
    ).toBeVisible();

    await expect(
      page.getByRole('button', { name: 'Inicia sesion' })
    ).toBeVisible();
  });
});
