import React from "react"
import{ Button }  from "./button"
import Image from "next/image";
import airplaneImage from "@/public/image/airplane-ticket.svg";

export function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-blue-900 text-white">
            <div className="flex items-center justify-center">
                <Image src={airplaneImage.src} alt={"Airplane ticket"} width={40} height={30}></Image>
                <h1 className="text-2xl font-semibold">Travel Planner</h1>
            </div>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <Button variant="link" className="text-white"><a href="https://discord.com/channels/779933168626171984/779933168626171987">Home</a></Button>
                    </li>
                    <li>
                        <Button variant="link" className="text-white">Sign In</Button>
                    </li>
                    <li>
                        <Button variant="link" className="text-white">Contact Us</Button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
