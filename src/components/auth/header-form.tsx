import Image from "next/image";

interface HeaderAuthFormProps {
  title: string;
}

export default function HeaderAuthForm({ title }: HeaderAuthFormProps) {
  return (
    <div className="flex flex-col items-center justify-center mb-8">
      <Image
        src="/slack_logo.svg"
        alt="logo"
        width={102}
        height={100}
        className="mb-10"
      />
      <h1 className="text-5xl font-bold mb-2.5">{title}</h1>
      <p className="text-lg">
        We suggest using the{" "}
        <span className="font-semibold">email address you use at work.</span>
      </p>
    </div>
  );
}
