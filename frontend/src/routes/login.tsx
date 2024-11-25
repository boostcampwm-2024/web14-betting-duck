// import { LoginPage } from "@/features/login-page";
import { useUserContext } from "@/shared/hooks/use-user-context";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import React from "react";

export const Route = createFileRoute("/login")({
  component: Component,
});

function Component() {
  return (
    <div className="flex gap-4">
      <DemoLogin />
      <DemoSignup />
    </div>
  );
}

// 김덕배, abc@naver.com abc1234
function DemoSignup() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        const nickname = formData.get("nickname") as string;
        console.log({ email, password, nickname });
        const url = "/api/users/signup";

        fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, nickname, password }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            console.log(data);
          })
          .catch((error) => {
            console.error(error);
          });
      }}
    >
      <div>
        <label htmlFor="demo-signup-nickname" className="text-default">
          닉네임
          <input
            id="demo-signup-nickname"
            name="nickname"
            type={"text"}
            className="bg-layout-background text-default"
            autoComplete="username"
            minLength={1}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="demo-email" className="text-default">
          이메일
          <input
            id="demo-signup-email"
            name="email"
            type="email"
            className="bg-layout-background text-default"
            autoComplete="email"
            minLength={5}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="demo-password" className="text-default">
          비밀번호
          <input
            id="demo-signup-password"
            name="password"
            type="password"
            autoComplete="current-password"
            minLength={4}
            className="bg-layout-background text-default"
            required
          />
        </label>
      </div>
      <div>
        <button
          className="bg-default text-layout-main w-1/2 rounded-lg px-6 py-4"
          type="submit"
        >
          회원가입
        </button>
      </div>
    </form>
  );
}

function DemoLogin() {
  const { auth } = Route.useRouteContext({
    select: ({ auth }) => ({ auth, status: auth.status }),
  });
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("abc@naver.com");
  const [password, setPassword] = React.useState("abc1234");
  const { refreshUserInfo } = useUserContext();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        console.log({ email, password });

        fetch("/api/users/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        })
          .then((res) => res.json())
          .then((json) => {
            console.log(json);
            const { data } = json;

            auth.login();
            refreshUserInfo().then(() =>
              navigate({
                to: "/my-page",
                search: {
                  nickname: decodeURIComponent(data.nickname),
                },
              }),
            );
          })
          .catch((error) => {
            console.error(error);
            throw new Error("로그인에 실패했습니다.");
          });
      }}
    >
      <div>
        <label htmlFor="demo-signin-email" className="text-default">
          이메일
          <input
            id="demo-signin-email"
            name="email"
            type={"email"}
            className="bg-layout-background text-default"
            autoComplete="email"
            minLength={1}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label htmlFor="demo-password" className="text-default">
          비밀번호
          <input
            id="demo-signin-password"
            name="password"
            type="password"
            autoComplete="current-password"
            minLength={4}
            className="bg-layout-background text-default"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <button
          className="bg-default text-layout-main w-1/2 rounded-lg px-6 py-4"
          type="submit"
        >
          로그인
        </button>
      </div>
    </form>
  );
}
