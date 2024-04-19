import React from "react"
import{ Button }  from "./button"

export function Header() {
    return (
        <header className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold">Travel Planner</h1>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <Button variant="link" ><a href="https://discord.com/channels/779933168626171984/779933168626171987">Home</a></Button>
                    </li>
                    <li>
                        <Button variant="link">Sign In</Button>
                    </li>
                    <li>
                        <Button variant="link">Contact Us</Button>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
