import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import { LogoutButton } from "@/components/button";

const Navbar = async () => {
  const session = await auth();
  return (
    <nav className="bg-white border-gray-200 border-b">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <Link href="/">
          <Image
            src="/asset/png/logondeso17.PNG"
            alt="logo"
            width={128}
            height={36}
            priority
          />
        </Link>
        <div className="flex items-center gap-3">
          <ul className="hidden md:flex items-center gap-4 mr-5 font-semibold text-gray-600 hover:text-gray-800">
            <li>
              <Link href="/">Home</Link>
            </li>
            {session && (
              <>
                <li>
                  <Link href="/product">Product</Link>
                </li>
                <li>
                  <Link href="/dashboard">Dashboard</Link>
                </li>
                {session.user.role === "admin" ? (
                  <li>
                    <Link href="/user">Users</Link>
                  </li>
                ) : null}
              </>
            )}
          </ul>
          {session && (
            <div className="flex gap-3 items-center">
              <div className="flex flex-col justify-center -space-x-1">
                <span className="font-semibold text-gray-600 text-right capitalize">
                  {session.user.name}
                </span>
                <span className="font-xs text-gray-400 text-right capitalize">
                  {session.user.role}
                </span>
              </div>
              <button
                type="button"
                className="text-sm ring-2 bg-gray-100 rounded-full"
              >
                <Image
                  src={session.user.image || "/asset/svg/jantan.svg"}
                  alt="avatar"
                  width={64}
                  height={64}
                  className="w-8 h-8 rounded-full"
                />
              </button>
            </div>
          )}
          {session ? <LogoutButton /> : null}
          {/* {session ? (
            <LogoutButton />
          ) : (
            <Link
              href="/login"
              className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
            >
              Sign In
            </Link>
          )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
