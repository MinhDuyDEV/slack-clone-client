import Link from "next/link";

interface RedirectLinkProps {
  type: "login" | "register";
}

export default function RedirectLink({ type }: RedirectLinkProps) {
  const render = {
    login: (
      <div className="flex flex-col items-center justify-center mt-4">
        <p className="text-sm text-gray-500">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    ),
    register: (
      <div className="flex flex-col items-center justify-center mt-4">
        <p className="text-sm text-gray-500">
          Don't have an account?{" "}
          <Link href="/register" className="text-blue-400 hover:underline">
            Register
          </Link>
        </p>
      </div>
    ),
  };

  return <div>{render[type]}</div>;
}
