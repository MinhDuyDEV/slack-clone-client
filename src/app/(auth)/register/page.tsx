import RegisterForm from "@/components/auth/register-form";
import RedirectLink from "@/components/auth/redirect-link";
import HeaderAuthForm from "@/components/auth/header-form";

export default function Register() {
  return (
    <div className="flex flex-col items-center justify-center">
      <HeaderAuthForm title="First, enter your information" />
      <RegisterForm />
      <RedirectLink type="login" />
    </div>
  );
}
