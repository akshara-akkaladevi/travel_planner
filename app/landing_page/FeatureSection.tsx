import React from "react";

export function FeatureSection() {
    return (
        <section className="feature flex">
            <div className="left-side w-1/2 p-6">
                {/* Content for the left side */}
            </div>
            <div className="right-side w-1/2 p-6 flex flex-col justify-center items-center">
                <h2 className="text-xl font-bold mb-4">Features</h2>
                <ul className="list-disc pl-4">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
\                </ul>
            </div>
        </section>
    );
}
