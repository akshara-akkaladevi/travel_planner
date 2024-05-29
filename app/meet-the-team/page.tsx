"use client";
import { AuroraBackground } from "../ui/aurora-background";
import ProfileCard from "../ui/profile";
import { motion } from "framer-motion";
export default function MeetTheTeam() {
  const team = [{ name: "Atharva" }];

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        {/* <section className="flex justify-center relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('/image/landing_bg_paris.png')` }}> */}
        <div className="flex m-16 justify-center items-center">
          <ProfileCard
            imgSrc="/image/atharva"
            name="Atharva Dagaonkar"
            title="Software Engineer at ARRISE"
            university="Vellore Institute of Technology"
            linkedinUrl="https://www.linkedin.com/in/atharva-dagaonkar/"
            githubUrl="https://www.github.com/athxrva1"
            email="dagaonkaratharva@gmail.com"
          />
          <ProfileCard
            imgSrc="/image/atharva"
            name="Atharva Dagaonkar"
            title="Software Engineer at ARRISE "
            university="Vellore Institute of Technology"
            linkedinUrl="#"
            githubUrl="#"
          />
        </div>
        {/* </section> */}
      </motion.div>
    </AuroraBackground>
  );
}
