import React from "react";

const testimonialData = [
    { id: 1, name: "Paris", imageUrl: "./image/paris.jpg" },
    { id: 2, name: "Dubai", imageUrl: "./image/dubai.jpg" },
    { id: 3, name: "Jammu", imageUrl: "/../../image/jammu.jpg" },
];


export function TestimonialSection() {
    return (
        <section className="testimonial">
            <h2 className="text-xl font-bold mb-4">Places</h2>
            <div className="testimonial-list flex">
                {testimonialData.map(testimonial => (
                    <div key={testimonial.id} className="testimonial-item m-2">
                        <img
                            src={testimonial.imageUrl}
                            alt={testimonial.name}
                            className="w-20 h-20 object-cover rounded-md cursor-pointer"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
}
