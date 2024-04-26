'use client'
import { useRouter } from 'next/navigation';

export const HeroSection = () => {
    const router = useRouter();
    return (
        <section className="relative h-screen bg-cover bg-center" style={{ backgroundImage: `url('/image/landing_bg_paris.png')` }}>
            <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <h1 className="text-4xl font-bold mb-6 text-white">Let us plan your next trip!</h1>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={() => router.push('/questionnaire')}
                >
                    Get Started
                </button>
            </div>
        </section>
    );
};