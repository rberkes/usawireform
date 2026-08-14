"use client";

import { useActionState } from "react";
import { loginAction, type LoginState } from "./actions";

const initialState: LoginState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="mt-8 max-w-sm space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium mb-1">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoFocus
          autoComplete="current-password"
          className="w-full border border-line bg-background px-3 py-2 text-sm focus:border-copper focus:outline-none"
        />
      </div>
      <button
        type="submit"
        disabled={pending}
        className="w-full bg-copper px-6 py-2.5 text-sm font-medium text-background transition-colors hover:bg-copper/90 disabled:opacity-50"
      >
        {pending ? "Checking..." : "Sign in"}
      </button>
      {state.error && (
        <p className="text-sm text-red-500">{state.error}</p>
      )}
    </form>
  );
}
