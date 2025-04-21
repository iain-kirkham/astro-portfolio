import { test, expect } from "@playwright/test";

const API_POST_URL = "https://nfx6fa3mni.execute-api.eu-west-2.amazonaws.com/";
const BLOG_PAGE_URL = "http://localhost:4321/blog"; // Ensure http://

test.describe("Blog Page Visitor Count", () => {
	test("increments visitor count by 1 reliably", async ({ page, request }) => {
		let initialVisitors: number;
		try {
			const response = await request.post(API_POST_URL);
			expect(response.ok()).toBeTruthy();
			const jsonData = await response.json();
			initialVisitors = Number(jsonData.visitors);
			expect(!Number.isNaN(initialVisitors)).toBeTruthy();
		} catch (error) {
			console.error("Error fetching initial visitor count:", error);
			throw error; // Fail the test if initial fetch fails
		}

		// 2. Visit the blog page
		await page.goto(BLOG_PAGE_URL);

		// 3. Wait for a short, but sufficient time to allow the increment to happen
		await page.waitForTimeout(500);

		// 4. Assert that the visitor count has incremented by 1
		const expectedNewCount = initialVisitors + 1;
		await expect(page.locator("span[aria-live='polite']")).toHaveText(
			expectedNewCount.toString(),
		);
	});
});
