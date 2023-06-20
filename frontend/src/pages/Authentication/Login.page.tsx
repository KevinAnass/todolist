import React, { useState } from "react";
import TextBox from "../../components/controllers/TextBox/TextBox.controller";
import Button, { GoogleButton } from "../../components/controllers/Button/Button.controller";

export default function Login() {
  return (
    <section className="flex flex-col md:flex-row h-screen items-center">
      <div className="bg-indigo-600 hidden lg:block w-full md:w-1/2 xl:w-2/3 h-screen">
        <img
          src="https://images.unsplash.com/photo-1456324504439-367cee3b3c32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className="bg-white w-full md:max-w-md lg:max-w-full md:mx-0 md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center"
      >
        <div className="w-full h-100">
          <h1 className="text-xl md:text-2xl font-bold leading-tight mt-12">Log in to your account</h1>

          <form className="mt-6 grid gap-5" action="#" method="POST">
            <TextBox Type="email" Title="Email Address" Placeholder="Enter Email Address" />
            <TextBox Type="password" Title="Password" Placeholder="Enter Password" />

            <div className="text-right mt-2">
              <a href="#" className="text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700">
                Forgot Password?
              </a>
            </div>
          </form>
          <Button Name="Log In" Type="submit" />
          <hr className="my-6 border-gray-300 w-full" />
          <GoogleButton Name="Log in with google" Type="button" />

          <p className="mt-8">
            Need an account?{" "}
            <a href="/Sign-up" className="text-blue-500 hover:text-blue-700 font-semibold">
              Create an account
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
