import Link from 'next/link';

export const HeroSection = () => {
    return (
        <section className="hero flex flex-col justify-center items-center h-screen">
            <h1 className="text-4xl font-bold m-6">Let us plan your next trip!</h1>  
            <Link href="questionnaire">
                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-6 rounded">Get Started</button>
            </Link>
        </section>
    );
};

