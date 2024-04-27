"use client"
import React, { useState } from "react";
import Image from "next/image";
import "./styles.css";

interface Testimonial {
    id: number;
    city: string;
    country: string;
    imageUrl: string;
    description: string; 
}

const testimonialData: Testimonial[] = [
    { id: 1, city: "Paris", country: "France", imageUrl: "/image/paris.jpg", description: "The romantic city of Paris." },
    { id: 2, city: "Dubai", country: "UAE", imageUrl: "/image/dubai.jpg", description: "The modern city of Dubai." },
    { id: 3, city: "Jammu", country: "India", imageUrl: "/image/jammu.jpg", description: "The beautiful city of Jammu." },
    { id: 4, city: "London", country: "UK", imageUrl: "/image/london.jpg", description: "The historic city of London." },
    { id: 5, city: "New York", country: "USA", imageUrl: "/image/newyork.jpg", description: "The bustling city of New York." },
    { id: 6, city: "Sydney", country: "Australia", imageUrl: "/image/sydney.jpg", description: "The vibrant city of Sydney." },
];

const LeftButton = ({ onClick }: { onClick: () => void }) => (
    <button className="slider-button prev" onClick={onClick}>&#10094;</button>
);

const RightButton = ({ onClick }: { onClick: () => void }) => (
    <button className="slider-button next" onClick={onClick}>&#10095;</button>
);

const Card = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="testimonial-item m-2">
        <div className="card">
            <div className="card-image">
                <div className="square-image-wrapper">
                    <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.city}
                        width={300}
                        height={300}
                        className="object-cover rounded-md cursor-pointer"
                    />
                </div>
            </div>
            <CardContent testimonial={testimonial} />
            <CardDescription description={testimonial.description} />
        </div>
    </div>
);

const CardContent = ({ testimonial }: { testimonial: Testimonial }) => (
    <div className="card-content">
        <span className="city">{testimonial.city}</span>
        <span className="country">{testimonial.country}</span>
    </div>
);

const CardDescription = ({ description }: { description: string }) => (
    <div className="card-description">
        {description}
    </div>
);


export function TestimonialSection() {
    const [startIndex, setStartIndex] = useState(0);

    const goToPreviousSlide = () => {
        const newIndex = Math.max(startIndex - 3, 0);
        setStartIndex(newIndex);
    };

    const goToNextSlide = () => {
        const newIndex = Math.min(startIndex + 3, testimonialData.length - 3);
        setStartIndex(newIndex);
    };

    return (
        <section className="testimonial h-full flex flex-col justify-center items-center">
            <div className="testimonial-slider relative flex items-center">
                <LeftButton onClick={goToPreviousSlide} />
                <div className="testimonial-list flex items-center">
                    {testimonialData.slice(startIndex, startIndex + 3).map(testimonial => (
                        <Card key={testimonial.id} testimonial={testimonial} />
                    ))}
                </div>
                <RightButton onClick={goToNextSlide} />
            </div>
        </section>
    );
}
