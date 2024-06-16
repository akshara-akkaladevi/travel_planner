"use client";
import React from "react";
import { Button } from "./button";
import Image from "next/image";
import airplaneImage from "@/public/image/airplane-ticket.svg";
import useUser from "../lib/useUser";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

import { useRouter } from "next/navigation";

export function Header() {
  const { user, setUser, loading } = useUser();
  const supabase = createClientComponentClient();
  const router = useRouter();
  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.refresh();
    setUser(null);
  };

  return (
    <header className="flex items-center justify-between p-4 bg-blue-900 text-white">
      <div className="flex items-center justify-center">
        <Image
          src={airplaneImage.src}
          alt={"Airplane ticket"}
          width={40}
          height={30}
        ></Image>
        <a href="/">
          <h1 className="text-2xl font-semibold">Travel Planner</h1>
        </a>
      </div>
      <nav>
        <ul className="flex gap-4">
          <li>
            <Button variant="link" className="text-white">
              <a href="/">Home</a>
            </Button>
          </li>
          <li>
            <Button variant="link" className="text-white">
              <a href="/meet-the-team">Contact Us</a>
            </Button>
          </li>
          {loading ? (
            <li>Loading...</li>
          ) : user ? (
            <li>
              <Button
                variant="link"
                className="text-white"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          ) : (
            <li>
              <Button variant="link" className="text-white">
                <a href="/login">Sign In</a>
              </Button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
