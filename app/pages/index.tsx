// Home.js
import React from "react";
import { Header } from "../../components/ui/header";
import { FooterNew } from "../../components/ui/footer";
import { HeroSection }  from "./landing_page/HeroSection";
import { FeatureSection } from "./landing_page/FeatureSection";
import {TestimonialSection} from "./landing_page/TestimonialSection";

export function Home() {
    return (
        <>
            <Header />
            <main>
                <HeroSection />
                <FeatureSection />
                <TestimonialSection />
            </main>
            <FooterNew />
        </>
    );
}
