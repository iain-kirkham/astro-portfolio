import { test, expect } from "@playwright/test";

const API_POST_URL = "https://nfx6fa3mni.execute-api.eu-west-2.amazonaws.com/";
const BLOG_PAGE_URL = "https://iainkirkhamd.dev/blog";

test.describe("Blog Page Visitor Count", () => {
	test("increments visitor count by 1", async ({ page, request }) => {
		let initialVisitors: number;
		try {
			const response = await request.post(API_POST_URL);
			expect(response.ok()).toBeTruthy();
			const jsonData = await response.json();
			initialVisitors = Number(jsonData.visitors);
			expect(!Number.isNaN(initialVisitors)).toBeTruthy();
		} catch (error) {
			console.error("Error fetching initial visitor count:", error);
			throw error;
		}

		// Visit the blog page
		await page.goto(BLOG_PAGE_URL);

		// Wait for a short time to allow the increment to happen
		await page.waitForTimeout(500);

		// Assert that the visitor count has incremented by 1
		const expectedNewCount = initialVisitors + 1;
		await expect(page.locator("span[aria-live='polite']")).toHaveText(
			expectedNewCount.toString(),
		);
	});
});
