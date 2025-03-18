import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("http://localhost:3000");
  await expect(page).toHaveTitle(/Betting duck/);
});

test("권한이 없을 경우 로그인 페이지로 리다이렉트", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByRole("link", { name: /my/ }).click();
  await expect(page).toHaveURL(/require-login/);

  await page.getByRole("link", { name: /create vote/ }).click();
  await expect(page).toHaveURL(/require-login/);

  await page.getByRole("link", { name: /betting/ }).click();
  await expect(page).toHaveURL(/require-bettingRoomId/);
});

test("로그인 후 마이페이지로 리다이렉트", async ({ page }) => {
  await page.goto("http://localhost:3000");

  await page.getByPlaceholder("이메일을 입력해주세요.").fill("abc@naver.com");
  await page.getByPlaceholder("비밀번호를 입력해주세요.").fill("abc1234");

  await page
    .getByRole("button", { name: /로그인/ })
    .last()
    .click();

  await expect(page).toHaveURL(/my-page/);
});

test("쿠키 유지 상태에서 탭을 닫았다가 다시 열었을 때 인증 상태 유지 확인", async ({
  browser,
}) => {
  const context = await browser.newContext({ acceptDownloads: true });
  const page = await context.newPage();

  await page.goto("http://localhost:3000");

  await page.getByPlaceholder("이메일을 입력해주세요.").fill("abc@naver.com");
  await page.getByPlaceholder("비밀번호를 입력해주세요.").fill("abc1234");

  await page
    .getByRole("button", { name: /로그인/ })
    .last()
    .click();
  await expect(page).toHaveURL(/my-page/);

  await page.close();

  const newPage = await context.newPage();
  await newPage.goto("http://localhost:3000");

  await expect(newPage).not.toHaveURL(/login/);
  await expect(newPage).toHaveURL(/my-page/);
});
