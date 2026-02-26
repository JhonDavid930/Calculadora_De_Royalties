import { test, expect } from '@playwright/test';

test.describe('RoyaltyPro Core Calculations', () => {
    test.beforeEach(async ({ page }) => {
        // Inyectar estado en localStorage para evitar que el Onboarding Tour (driver.js)
        // se dispare automáticamente y bloquee los clics del scraper E2E.
        await page.addInitScript(() => {
            window.localStorage.setItem('hasSeenTour', 'true');
        });

        // Go to the main app URL before each test
        await page.goto('/');
    });

    test('Advanced Calculator computes USA royalties correctly', async ({ page }) => {
        // Ensure we are on the Advanced Calculator by checking the card header
        await expect(page.getByText('Desglose por País')).toBeVisible();

        // Open Country Selector 
        await page.getByRole('button', { name: /Selector Masivo/i }).click();

        // Select USA
        await page.getByPlaceholder('Buscar país...').fill('United States');
        await page.getByText('United States', { exact: true }).click();

        // Add them
        await page.getByRole('button', { name: 'Agregar Selección' }).click();

        // Input streams
        const streamsInput = page.getByPlaceholder('0').first();
        await streamsInput.fill('1000000');

        // The calculation happens automatically

        // Validate USA rate is $0.0040 -> $4,000.00
        const totalValue = page.getByText('$4,000.00').first();
        await expect(totalValue).toBeVisible();
    });

    test('UX: App handles multiple country selections and removes them', async ({ page }) => {
        // Open Country Selector 
        await page.getByRole('button', { name: /Selector Masivo/i }).click();

        // Select MX and ES
        await page.getByPlaceholder('Buscar país...').fill('Mexico');
        await page.getByText('Mexico', { exact: true }).click();

        await page.getByPlaceholder('Buscar país...').fill('Spain');
        await page.getByText('Spain', { exact: true }).click();

        // Add them
        await page.getByRole('button', { name: 'Agregar Selección' }).click();

        // Verify inputs exist by checking the country select values
        await expect(page.locator('select').filter({ hasText: 'Mexico' }).first()).toBeVisible();
        await expect(page.locator('select').filter({ hasText: 'Spain' }).first()).toBeVisible();

        // Remove MX specific card
        await page.getByTitle('Eliminar fila').first().click();

        // Check clear all button works
        await page.getByRole('button', { name: /Limpiar/i }).click();
        await page.getByRole('button', { name: /Limpiar todo/i }).click();

        // Check everything is reset
        await expect(page.getByText('$0.00').first()).toBeVisible();
    });

    test('Navigation moves between tools correctly', async ({ page }) => {
        // Go to Simple
        await page.getByRole('button', { name: 'Rápido' }).click();
        await expect(page.getByText('Calculadora Rápida').first()).toBeVisible();

        // Go to Goals
        await page.getByRole('button', { name: 'Metas' }).click();
        await expect(page.getByText('¿Cuánto quieres ganar?').first()).toBeVisible();
    });
});
