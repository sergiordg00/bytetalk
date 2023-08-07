"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useState } from "react";
import { useEffect } from "react";
import { toast } from "react-hot-toast";
import { BsGithub, BsGoogle } from "react-icons/bs";

import Button from "@/shared-components/buttons/Button";
import Input from "@/shared-components/inputs/Input";

import AuthSocialButton from "./AuthSocialButton";

export default function AuthForm() {
  const [typeOfForm, setTypeOfForm] = useState("login"); 
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: ""
  });
  const [formLoading, setFormLoading] = useState(false);
  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if(session?.status === "authenticated") {
      router.push("/users");
    }
  }, [session?.status]);

  function toggleForm() {
    setTypeOfForm(typeOfForm === "login" ? "register" : "login");
  }

  function onSubmit(e) {
    e.preventDefault();
    setFormLoading(true);

    if(typeOfForm === "register") {
      axios.post("/api/register", formState)
        .then(() => { 
          toast.success("Account created successfully!"); 
          signIn("credentials", { 
            ...formState, 
            redirect: false 
          });
        })
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
        <div className="bg-bgtertiary px-4 py-8 shadow sm:rounded-lg sm:px-10">
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
            <div className="absolute h-[1px] w-full bg-textmuted"/>

            <span className="relative z-[2] bg-bgtertiary px-2 text-sm text-textsecondary">
              Or continue with
            </span>
          </div>

          <div className="mt-6 flex gap-x-2">
            <AuthSocialButton Icon={BsGithub} onClick={()=>onSocialSignIn("github")}/>
            <AuthSocialButton Icon={BsGoogle} onClick={()=>onSocialSignIn("google")}/>
          </div>

          <p className="mt-6 flex items-center justify-center text-sm text-textsecondary">
            {typeOfForm === "register" ? "Already have an account?" : "New to ByteTalk?"}

            &nbsp;

            <button className="underline hover:text-accentprimary" onClick={toggleForm}>
              {typeOfForm === "register" ? "Sign in" : "Create an account"}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}