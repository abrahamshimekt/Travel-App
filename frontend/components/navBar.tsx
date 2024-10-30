"use client";
import { NAV_LINKS } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import Button from "./common/button";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
const Navbar = () => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<any>(null);
  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  useEffect(() => {
    if (token) {
      const user = jwtDecode(token);
      setUser(user);
    }
  }, [token]);
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/auth/login");
  };
  return (
    <nav className="flexBetween max-container padding-container relative z-30 py-5">
      <Link href="/">
        <Image src="/ethiolink-logo.svg" alt="logo" width={100} height={100} />
      </Link>

      <ul className="hidden h-full gap-12 lg:flex">
        {NAV_LINKS.map((link) => (
          <Link
            href={link.href}
            key={link.key}
            className="regular-16 text-gray-50 flexCenter cursor-pointer pb-1.5 transition-all hover:font-bold"
          >
            {link.label}
          </Link>
        ))}
      </ul>

      <div className="lg:flexCenter hidden">
        {token && (
          <Button
            type="button"
            title={user?.username}
            icon="/user.svg"
            variant="btn_green"
            full={false}
          />
        )}
        {token ? (
          <Button
            type="button"
            title={"ይውጡ"}
            variant="btn_dark_green"
            handleClick={() => handleLogout()}
            full={false}
          />
        ) : (
          <Button
            type="button"
            title={"ይግቡ"}
            variant="btn_dark_green"
            handleClick={() => router.push("/auth/login")}
            full={false}
          />
        )}
      </div>

      <Image
        src="menu.svg"
        alt="menu"
        width={32}
        height={32}
        className="inline-block cursor-pointer lg:hidden"
      />
    </nav>
  );
};

export default Navbar;
