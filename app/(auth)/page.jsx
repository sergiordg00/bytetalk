import Image from "next/image";

import ByteTalkLogo from "@/assets/img/bytetalk-logo.png";

import AuthForm from "./components/AuthForm";

export const metadata = {
  title: "Authentication Page",
};

export default function AuthPage() {
  return (
    <>
      <div className="flex min-h-full w-full flex-col justify-center bg-gray-100 py-12 sm:px-6 lg:px-8">
        <main className="sm:mx-auto sm:w-full sm:max-w-md">
          <Image
            alt="Byetalk Logo"
            src={ByteTalkLogo}
            width={300}
            height={300}
            className="mx-auto h-auto w-[48px] lg:w-[58px]"
          />

          <h2 className="mt-4 text-center text-2xl font-bold tracking-tight text-gray-900 lg:text-3xl">
            Welcome to ByteTalk!
          </h2>

          <AuthForm/>
        </main>
      </div>
    </>
  );
}
