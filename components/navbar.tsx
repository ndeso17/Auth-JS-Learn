import Image from "next/image";
import Link from "next/link";
import React from "react";
import { auth } from "@/auth";
import NavbarClient from "@/components/navbar-client"; // 🔥 Import komponen client

const Navbar = async () => {
  const session = await auth(); // 🟢 Bisa digunakan di komponen server

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
                {session.user.role === "admin" && (
                  <li>
                    <Link href="/user">Users</Link>
                  </li>
                )}
              </>
            )}
          </ul>

          {/* 🔥 Gunakan komponen client untuk cek pathname */}
          <NavbarClient session={session} />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
