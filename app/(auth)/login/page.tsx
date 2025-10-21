"use client";
import { FormInput } from "@/components/forms/FormInput";
import Logo from "@/components/ui/Logo";
import { ArrowLeft, MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Login = () => {
  return (
    <section>
      <div className="flex flex-col lg:flex-row justify-between min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex flex-col justify-start padding py-12 lg:py-8">
          <div className="w-full max-w-md mx-auto lg:mx-0">
            <Logo />
            <Link
              onClick={() => {}}
              className="flex gap-1 text-lightgray/80 hover:text-white items-center transition-colors my-6"
              href="/"
            >
              <ArrowLeft className="inline-block" size={16} /> Home
            </Link>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-medium mb-6">
              Login to your account
            </h1>
            <form action="/dashboard">
              <div className="flex flex-col gap-6 mb-6">
                <FormInput label="Email" name="email" id="email" />
                <FormInput label="Password" name="password" id="password" />
              </div>
              <button className="text-lightgray/60 hover:text-green transition-colors">
                Forgot Password?
              </button>
              <div className="my-8"></div>
              <button
                type="submit"
                className="bg-green text-black rounded-full py-3 px-12 w-full font-medium hover:opacity-90 transition-opacity group"
              >
                Login{" "}
                <MoveRight
                  className="inline-block ml-2 group-hover:translate-x-1 transition-transform"
                  size={16}
                />
              </button>
            </form>
          </div>
        </div>
        {/* Right Side - Image */}
        <div className="hidden lg:flex flex-1 bg-lightblue/10 items-center justify-center padding py-12 lg:py-8">
          <div className="max-w-lg">
            <Image
              src="/images/account.png"
              alt="Login Illustration"
              width={500}
              height={500}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
