import React from "react";
import { HeroSection }  from "./landing_page/HeroSection";
import {TestimonialSection} from "./landing_page/TestimonialSection";

export function Home() {
    return (
        <>
            <main>
                <HeroSection />
                <TestimonialSection />
            </main>
        </>
    );
}