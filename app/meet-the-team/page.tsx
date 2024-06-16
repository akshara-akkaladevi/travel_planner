"use client";
import { AuroraBackground } from "../ui/aurora-background";
import ProfileCard from "../ui/profile";
import { motion } from "framer-motion";

export default function MeetTheTeam() {
  const team = [
    {
      imgSrc: "/image/atharva2.jpeg",
      name: "Atharva Dagaonkar",
      title: "Software Engineer at ARRISE",
      university: "B.Tech, CSE from VIT Vellore",
      linkedinUrl: "https://www.linkedin.com/in/atharva-dagaonkar/",
      githubUrl: "https://www.github.com/athxrva1",
      email: "dagaonkaratharva@gmail.com",
    },
    {
      imgSrc: "/image/akshara.jpeg",
      name: "Akshara Akkaladevi",
      title: "Ex Research - IIITH & Signal",
      university: "B.Tech, IT from BVRITH",
      linkedinUrl: "https://www.linkedin.com/in/akshara-akkaladevi-139760211/",
      githubUrl: "https://www.github.com/akshara-akkaladevi",
      email: "akshara.akkaladevi@gmail.com",
    },
  ];

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
        <div className="flex flex-wrap m-16 justify-center items-center gap-8">
          {team.map((member, index) => (
            <ProfileCard
              key={index}
              imgSrc={member.imgSrc}
              name={member.name}
              title={member.title}
              university={member.university}
              linkedinUrl={member.linkedinUrl}
              githubUrl={member.githubUrl}
              email={member.email}
            />
          ))}
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
