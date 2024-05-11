import React from "react";
import { Header } from "@/app/ui/header";
import { FooterNew } from "@/app/ui/footer";
import { HeroSection }  from "./landing_page/HeroSection";
import {TestimonialSection} from "./landing_page/TestimonialSection";

export function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <TestimonialSection />
            </main>
            <FooterNew />
        </>
    );
}
