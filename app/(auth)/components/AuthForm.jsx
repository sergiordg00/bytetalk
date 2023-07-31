"use client";

import axios from "axios";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

import Button from "@/shared-components/buttons/Button";
import Input from "@/shared-components/inputs/Input";

import AuthSocialButton from "./AuthSocialButton";

export default function AuthForm() {
  const [typeOfForm, setTypeOfForm] = useState("register"); 
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [formLoading, setFormLoading] = useState(false);

  function toggleForm() {
    setTypeOfForm(typeOfForm === "login" ? "register" : "login");
  }

  function onSubmit(e) {
    e.preventDefault();
    setFormLoading(true);

    if(typeOfForm === "register") {
      axios.post("/api/register", formState)
        .then(() => toast.success("Account created successfully!"))
        .catch((err) => toast.error(err.response.data))
        .finally(() => setFormLoading(false));
    } else {
      signIn("credentials", {
        ...formState,
        redirect: false
      })
        .then((callback) => {
          if(callback?.error) {
            toast.error("Invalid credentials!");
          } else if(callback?.ok) {
            toast.success("Logged in successfully!");
          }
        })
        .finally(() => setFormLoading(false));
    }
  }

  function onSocialSignIn(provider) {
    setFormLoading(true);

    signIn(provider, {
      redirect: false
    })
      .finally(() => setFormLoading(false));
  }
  
  return (
    <>
      <div className="mt-8 w-full sm:mx-auto sm:max-w-md">
        <div className="bg-white px-4 py-8 shadow sm:rounded-lg sm:px-10">
          <form className="flex flex-col items-start gap-y-6" onSubmit={onSubmit}>
            {typeOfForm === "register" && (
              <Input
                id="name"
                type="text"
                label="Name"
                disabled={formLoading}
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
              />
            )}

            <Input
              id="email"
              type="email"
              label="Email address"
              disabled={formLoading}
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
            />

            <Input
              id="password"
              type="password"
              label="Password"
              disabled={formLoading}
              value={formState.password}
              onChange={(e) => setFormState({ ...formState, password: e.target.value })}
            />

            <Button
              type="submit"
              disabled={formLoading}
              includeLoader={formLoading}
              fullWidth
            >
              {typeOfForm === "register" ? "Register" : "Sign in"}
            </Button>
          </form>

          <div className="relative mt-6 flex items-center justify-center">
            <div className="absolute h-[1px] w-full bg-gray-300"/>

            <span className="relative z-[2] bg-white px-2 text-sm text-gray-500">
              Or continue with
            </span>
          </div>

          <div className="mt-6 flex gap-x-2">
            <AuthSocialButton Icon={BsGithub} onClick={()=>onSocialSignIn("github")}/>
            <AuthSocialButton Icon={BsGoogle} onClick={()=>onSocialSignIn("google")}/>
          </div>

          <p className="mt-6 flex items-center justify-center text-sm text-gray-500">
            {typeOfForm === "register" ? "Already have an account?" : "New to ByteTalk?"}

            &nbsp;

            <button className="underline hover:text-sky-600" onClick={toggleForm}>
              {typeOfForm === "register" ? "Sign in" : "Create an account"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}