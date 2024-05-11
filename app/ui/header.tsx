import React from "react"
import{ Button }  from "./button"

export function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-blue-900 text-white">
            <h1 className="text-2xl font-semibold">Travel Planner</h1>
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
