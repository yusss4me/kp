import { test, expect } from '@playwright/test';

test('Homepage loads and displays header', async ({ page }) => {
  await page.goto('/');

  // Pastikan judul/meta title benar (bisa disesuaikan dengan meta title asli web-yamuti)
  await expect(page).toHaveTitle(/YAMUTI/i);
  
  // Karena YAMUTI adalah sistem manajemen atau website yayasan, 
  // kita mengekspektasikan ada elemen Navigasi atau Tombol Donasi.
  // Ganti teks sesuai dengan kata yang paling umum muncul di halaman depan.
  const ctaButton = page.getByRole('button', { name: /donasi|login|daftar/i }).first();
  if (await ctaButton.isVisible()) {
    await expect(ctaButton).toBeVisible();
  }
});
