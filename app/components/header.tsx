import React from "react"

export function Header() {
    return (
        <header className="flex items-center justify-between p-4">
            <h1 className="text-2xl font-semibold">Travel Planner</h1>
            <nav>
                <ul className="flex gap-4">
                    <li>
                        <a href="#">Home</a>
                    </li>
                    <li>
                        <a href="#">Sign In</a>
                    </li>
                    <li>
                        <a href="#">Contact</a>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
