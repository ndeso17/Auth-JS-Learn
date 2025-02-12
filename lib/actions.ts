/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import { RegisterSchema, SignInSchema } from "@/lib/zod";
import { hashSync } from "bcrypt-ts";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export const signUpCredentials = async (
  prevState: {
    values?: Record<string, string>;
    error?: Record<string, string[]>;
  },
  formData: FormData
) => {
  // Convert FormData ke object
  const formValues = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;

  // Validasi menggunakan Zod
  const validatedFields = RegisterSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      values: formValues, // Menyimpan input yang sudah dimasukkan
      error: validatedFields.error.flatten().fieldErrors, // Kirim error ke frontend
    };
  }

  const { name, email, password } = validatedFields.data;
  const hashedPassword = hashSync(password, 10);

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    return {
      values: formValues, // Tetap menyimpan input jika terjadi error
      message: "Failed to register user",
    };
  }

  redirect("/login");
};

export const signInCredentials = async (
  prevState:
    | {
        values: Record<string, string>;
        error: Record<string, string[]>;
        message: string;
      }
    | undefined,
  formData: FormData
) => {
  // Perbaikan: Gunakan nilai default jika prevState adalah undefined
  const currentState = prevState || { values: {}, error: {}, message: "" };

  // Ambil nilai input dari FormData
  const formValues = Object.fromEntries(formData.entries()) as Record<
    string,
    string
  >;

  // Validasi input menggunakan Zod
  const validatedFields = SignInSchema.safeParse(formValues);

  if (!validatedFields.success) {
    return {
      values: formValues,
      error: validatedFields.error.flatten().fieldErrors,
      message: "",
    };
  }

  const { email, password } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            values: formValues,
            error: {},
            message: "Invalid Credentials",
          };
        default:
          return {
            values: formValues,
            error: {},
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

export const handleSignOut = async () => {
  "use server";

  await signOut({ redirectTo: "/" });
};

export async function signInWithGoogle() {
  await signIn("google", { redirectTo: "/dashboard" });
}

export async function signInWithGithub() {
  await signIn("github", { redirectTo: "/dashboard" });
}
