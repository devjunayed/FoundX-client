"use client";

import FXForm from "@/src/components/form/FXForm";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";

import { FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@heroui/button";
import FXInput from "@/src/components/form/FXInput";
import { loginValidationSchema } from "@/src/schemas/login.schema";
import { useUserLogin } from "@/src/hooks/auth.hook";
import { Spinner } from "@heroui/react";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useUser } from "@/src/context/user.provider";

const LoginPage = () => {
  const { mutate: handleLogin, isPending, isSuccess } = useUserLogin();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setIsLoading: userLoading } = useUser();
  const redirectPath = searchParams.get("redirect");
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    handleLogin(data);
  };


  const handleQuickLogin = () => {
    handleLogin({
      email: "mir@gmail.com",
      password: "123456"
    })
  }

  useEffect(() => {
    if (!isPending && isSuccess) {
      userLoading(true);
      if (redirectPath) {
        router.push(redirectPath);
      } else {
        router.push("/");
      }
    }
  }, [isSuccess, isPending]);

  return (
    <>
      {isPending && (
        <div className="bg-black/10 h-screen fixed inset-0 z-[999] backdrop-blur-md items-center justify-center flex">
          <Spinner variant="simple" size="lg" />
        </div>
      )}
      <div className="flex h-[calc(100vh-200px)] w-full flex-col items-center justify-center">
        <h3 className="my-2 text-2xl font-bold">Login with FoundX</h3>
        <p className="mb-4">Welcome Back! Let&lsquo;s Get Started</p>
        <div className="w-[35%]">
          <FXForm
            onSubmit={onSubmit}
            resolver={zodResolver(loginValidationSchema)}
          >
            <div className="py-3">
              <FXInput name="email" label="Email" type="email" />
            </div>
            <div className="py-3">
              <FXInput name="password" label="Password" type="password" />
            </div>

            <Button
              className="my-3 w-full rounded-md bg-default-900 font-semibold text-default"
              size="lg"
              type="submit"
            >
              Login
            </Button>
            <Button
              className="my-3 w-full rounded-md bg-amber-200 font-semibold text-default"
              size="lg"
              onPress={() => handleQuickLogin()}
            >
              Quick Login
            </Button>
          </FXForm>
          <div className="text-center">
            Don&lsquo;t have account ? <Link href={"/register"}>Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
