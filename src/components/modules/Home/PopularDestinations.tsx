"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Star } from "lucide-react";
import Image from "next/image";

const destinations = [
    { title: "Bali, Indonesia", image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4", rating: 4.9, color: "bg-blue-50" },
    { title: "Cox's Bazar", image: "https://images.unsplash.com/photo-1582650625119-3a31f8fa2699", rating: 4.8, color: "bg-pink-50" },
    { title: "Santorini, Greece", image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff", rating: 5.0, color: "bg-green-50" },
    { title: "Kyoto, Japan", image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e", rating: 4.7, color: "bg-yellow-50" },
];

export default function PopularDestinations() {
    return (
        <section className="py-20 container mx-auto px-6">
            {/* Section Header */}
            <div className="flex justify-between items-end mb-12">
                <div className="text-center mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800">Popular Destinations</h2>
                    <p className="text-gray-500 mt-2">Hand-picked destinations for your next adventure with your perfect buddy.</p>
                </div>
                {/* <Button variant="outline" className="rounded-full border-blue-600 text-blue-600 hover:bg-blue-50">
                        View All <ArrowRight className="ml-2 w-4 h-4" />
                    </Button> */}
            </div>

            {/* Destination Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {destinations.map((dest, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className={`relative group rounded-[2.5rem] p-4 transition-all duration-500 ${dest.color} border border-transparent hover:border-white hover:shadow-2xl`}
                    >
                        {/* Image Container */}
                        <div className="relative h-72 w-full overflow-hidden rounded-[2rem]">
                            <Image
                                src={dest.image}
                                alt={dest.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center gap-1">
                                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                <span className="text-xs font-bold">{dest.rating}</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mt-5 px-2 flex justify-between items-center">
                            <div>
                                <h3 className="text-xl font-bold text-gray-800">{dest.title}</h3>
                                <p className="text-sm text-gray-500 mt-1">Starting from $499</p>
                            </div>
                            <motion.button
                                whileHover={{ rotate: 45 }}
                                className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-md group-hover:bg-blue-600 group-hover:text-white transition-colors"
                            >
                                <ArrowUpRight className="w-5 h-5" />
                            </motion.button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
