/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"; // 🔥 Wajib pakai ini karena ada usePathname()

import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { LogoutButton } from "@/components/button";

const NavbarClient = ({ session }: { session: any }) => {
  const pathname = usePathname(); // ✅ Sekarang bisa digunakan

  return (
    <>
      {session ? (
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
              src={
                session.user.image ||
                (session.user.gender === "man"
                  ? "/asset/svg/jantan.svg"
                  : session.user.gender === "woman"
                  ? "/asset/svg/betina.svg"
                  : "/asset/svg/unknown.svg")
              }
              alt="avatar"
              width={64}
              height={64}
              className="w-8 h-8 rounded-full"
            />
          </button>
          <LogoutButton />
        </div>
      ) : (
        pathname !== "/login" && (
          <Link
            href="/login"
            className="bg-red-400 text-white px-4 py-2 rounded-md hover:bg-red-500"
          >
            Sign In
          </Link>
        )
      )}
    </>
  );
};

export default NavbarClient;
