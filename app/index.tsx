import React from "react";
import { Header } from "@/components/ui/header";
import { FooterNew } from "@/components/ui/footer";
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
