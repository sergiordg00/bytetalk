"use client";

import { useState } from "react";
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
  const [formErrors, setFormErrors] = useState([]);
  
  function toggleForm() {
    setTypeOfForm(typeOfForm === "login" ? "register" : "login");
  }

  function onSubmit(e) {
    e.preventDefault();
    console.log("prueba");
    setFormLoading(true);

    if(typeOfForm === "register") {
      // Register
    } else {
      // Login
    }
  }

  function onSocialSignIn(provider) {
    // Social Sign In
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
                errors={formErrors}
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                required
              />
            )}

            <Input
              id="email"
              type="email"
              label="Email address"
              disabled={formLoading}
              errors={formErrors}
              value={formState.email}
              onChange={(e) => setFormState({ ...formState, email: e.target.value })}
              required
            />

            <Input
              id="password"
              type="password"
              label="Password"
              disabled={formLoading}
              errors={formErrors}
              value={formState.password}
              onChange={(e) => setFormState({ ...formState, password: e.target.value })}
              required
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