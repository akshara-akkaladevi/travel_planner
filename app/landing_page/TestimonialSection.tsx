import React from "react";
import Image from "next/image";

const testimonialData = [
    { id: 1, name: "Paris", imageUrl: "/image/paris.jpg", width: 640, height: 427 },
    { id: 2, name: "Dubai", imageUrl: "/image/dubai.jpg", width: 640, height: 427 },
    { id: 3, name: "Jammu", imageUrl: "/image/jammu.jpg", width: 640, height: 427 },
];

export function TestimonialSection() {
    return (
        <section className="testimonial">
            <h2 className="text-xl font-bold mb-4 ">Places</h2>
            <div className="testimonial-list flex items-center justify-center">
                {testimonialData.map(testimonial => (
                    <div key={testimonial.id} className="testimonial-item m-2">
                        <Image
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            width={300}
                            height={300}
                            className="object-cover rounded-md cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}