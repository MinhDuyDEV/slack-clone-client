import HeaderAuthForm from "@/components/auth/header-form";
import LoginForm from "@/components/auth/login-form";
import RedirectLink from "@/components/auth/redirect-link";

export default function Login() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeaderAuthForm title="Welcome back to Slack" />
      <LoginForm />
      <RedirectLink type="register" />
    </div>
  );
}
