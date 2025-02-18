import { expect, test } from "@playwright/test";

test("should be able to display all products", async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" });

	await expect(page.getByText("Tênis Nike LeBron XXI Premium")).toBeVisible();
	await expect(page.getByText("JA 1", { exact: true })).toBeVisible();
	await expect(page.getByText("Nike Freak 5")).toBeVisible();
	await expect(page.getByText("Nike LeBron Witness 8")).toBeVisible();
	await expect(page.getByText("Nike Ja 1 Scratch")).toBeVisible();
	await expect(page.getByText("Tênis Nike G.T. Hustle 2")).toBeVisible();
});

test("should be able to see the details of a product", async ({ page }) => {
	await page.goto("/", { waitUntil: "networkidle" });

	await expect(page.getByText("JA 1", { exact: true })).toBeVisible();

	await page
		.getByRole("link", { name: "JA 1 JA 1 Basquete R$ 759,99" })
		.click();

	await expect(page.getByText("Ja Morant se tornou o")).toBeVisible();
});
