import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { BackgroundGradient } from "./background-gradient";
import Image from "next/image";

interface ProfileCardProps {
  imgSrc: string;
  name: string;
  title: string;
  university: string;
  linkedinUrl?: string;
  githubUrl?: string;
  email?: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({
  imgSrc,
  name,
  title,
  university,
  linkedinUrl,
  githubUrl,
  email,
}) => {
  return (
    <div className="m-5 max-w-sm flex-1">
      <BackgroundGradient className="w-full flex flex-col rounded-[22px] justify-center items-center p-6 sm:p-10 bg-white dark:bg-zinc-900">
        <div className="flex justify-center mt-4">
          <Image
            src={imgSrc}
            alt={name}
            width={160}
            height={160}
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-center items-center p-4">
          <h1 className="text-2xl font-bold">{name}</h1>
          <p className="text-gray-500 text-lg text-center">{title}</p>
          <p className="text-gray-700">{university}</p>
          <div className="mt-4 flex justify-center space-x-4">
            {linkedinUrl && (
              <a href={linkedinUrl} className="text-black text-2xl">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            )}
            {githubUrl && (
              <a href={githubUrl} className="text-black text-2xl">
                <FontAwesomeIcon icon={faGithub} />
              </a>
            )}
          </div>
        </div>
        {email && (
          <button
            onClick={() => (window.location.href = `mailto:${email}`)}
            className="m-2 px-8 py-3 rounded-full bg-gradient-to-b from-blue-500 to-blue-700 text-white focus:ring-2 focus:ring-blue-400 hover:shadow-xl transition duration-200"
          >
            Contact
          </button>
        )}
      </BackgroundGradient>
    </div>
  );
};

export default ProfileCard;
