'use client'
import { useRouter } from 'next/navigation';
import { useTypewriter, Cursor } from "nextjs-simple-typewriter";
import "./styles.css";


export const HeroSection = () => {
    const router = useRouter();
    const [text] = useTypewriter({
        words: [" us ", " AI "],
        loop: 20,
        onLoopDone: () => console.log(`loop completed after 15 runs.`),
      });
    return (
        <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('/image/landing_bg_paris.png')` }}>
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-6 text-white">Let       
                <span className= "blackText">{text}</span>
                plan your next trip!</h1>
                <button
                    className="bg-blue-900 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push('/questionnaire')}
                >
                    Get Started
                </button>
            </div>
        </section>
    );
};