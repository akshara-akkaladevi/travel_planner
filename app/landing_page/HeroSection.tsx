'use client'
import { useRouter } from 'next/navigation';
import { useTypewriter, Cursor } from "nextjs-simple-typewriter";
import "./styles.css";


const TypeWriterComponent = () => {
  const [text] = useTypewriter({
    words: [" us", " AI"],
    loop: 20,
    onLoopDone: () => console.log(`loop completed after 20 runs.`),
  });

  return (
    <div className="App">
      <span>{text}</span>
      <Cursor cursorColor="white" cursorBlinking = {true} />
    </div>
  );
};

export const HeroSection = () => {
    const router = useRouter();

    return (
        <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('/image/landing_bg_paris.png')` }}>
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold mb-6 text-white flex items-center">
                Let&nbsp;<TypeWriterComponent /> plan your next trip!
            </h1>
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