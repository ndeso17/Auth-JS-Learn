"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpCredentials } from "@/lib/actions";
import { RegisterButton } from "@/components/button";

const FormRegister = () => {
  const [state, formAction] = useActionState(signUpCredentials, {
    values: {},
    error: {},
  });

  return (
    <form action={formAction} className="space-y-6">
      {state?.message ? (
        <div
          className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state.message}</span>
        </div>
      ) : null}
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Khilmy Firdaus Romadon"
          defaultValue={state.values?.name || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <span className="text-sm text-red-500 mt-2">
          {state.error?.name?.[0]}
        </span>
      </div>

      <div>
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="khilmyfr@naxgrinting.stb"
          defaultValue={state.values?.email || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <span className="text-sm text-red-500 mt-2">
          {state.error?.email?.[0]}
        </span>
      </div>

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          placeholder="**********"
          defaultValue={state.values?.password || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <span className="text-sm text-red-500 mt-2">
          {state.error?.password?.[0]}
        </span>
      </div>

      <div>
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirm Password
        </label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="**********"
          defaultValue={state.values?.confirmPassword || ""}
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg w-full p-2.5"
        />
        <span className="text-sm text-red-500 mt-2">
          {state.error?.confirmPassword?.[0]}
        </span>
      </div>

      <RegisterButton />

      <p className="text-sm font-light text-gray-500">
        Already have an account?
        <Link href="/login">
          <span className="font-medium pl-1 text-blue-600 hover:text-blue-700">
            Sign In
          </span>
        </Link>
      </p>
    </form>
  );
};

export default FormRegister;
