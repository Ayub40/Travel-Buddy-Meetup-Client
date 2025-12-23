"use client";
import { motion } from "framer-motion";
import {
    Users, ShieldCheck, Globe, Zap,
    Target, Heart, Star, CheckCircle2
} from "lucide-react";
import Image from "next/image";

const values = [
    {
        title: "Secure Connections",
        desc: "Your safety is our priority. We implement JWT-based authentication and encourage verified profiles to ensure a secure community.",
        icon: ShieldCheck,
        color: "bg-blue-50",
        iconColor: "text-blue-600"
    },
    {
        title: "Smart Matching",
        desc: "Find buddies based on destination, budget range, and shared interests like photography, hiking, or food tours.",
        icon: Target,
        color: "bg-pink-50",
        iconColor: "text-pink-600"
    },
    {
        title: "Global Community",
        desc: "Join a vibrant network of explorers transforming solo journeys into shared adventures across 50+ countries.",
        icon: Globe,
        color: "bg-green-50",
        iconColor: "text-green-600"
    }
];

export default function AboutPage() {
    return (
        <div className="bg-white min-h-screen">

            {/* 1. Hero Section - Project Overview */}
            <section className="py-24 container mx-auto px-6">
                <div className="flex flex-col lg:flex-row items-center gap-16">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2"
                    >
                        <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">
                            About TripMates Hub
                        </span>
                        <h1 className="text-4xl lg:text-6xl font-extrabold text-gray-900 mt-6 mb-8 leading-[1.1]">
                            Transforming Solo Journeys into <span className="text-blue-600">Shared Adventures.</span>
                        </h1>
                        <p className="text-gray-600 text-lg leading-relaxed mb-8">
                            TripMates Hub is a subscription-based social-travel platform designed to build
                            meaningful connections. We believe the world is too beautiful to be explored alone.
                            Our platform blends social networking with detailed travel planning to help
                            you find the perfect travel soulmate.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={20} />
                                <span className="font-semibold text-gray-700">Role-based Access</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={20} />
                                <span className="font-semibold text-gray-700">Verified Badges</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <CheckCircle2 className="text-green-500" size={20} />
                                <span className="font-semibold text-gray-700">Premium Plans</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="lg:w-1/2 relative"
                    >
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-50" />
                        <Image
                            src="https://images.unsplash.com/photo-1522199710521-72d69614c702?q=80&w=800"
                            alt="Travelers bonding"
                            className="rounded-[3rem] shadow-2xl relative z-10 w-full h-[550px] object-cover border-8 border-white"
                            width={800}
                            height={550}
                        />
                    </motion.div>
                </div>
            </section>

            {/* 2. Core Objectives - Features Based */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6 text-center mb-16">
                    <h2 className="text-3xl lg:text-4xl font-bold text-gray-800">Our Core Objectives</h2>
                    <p className="text-gray-500 mt-4 text-lg max-w-2xl mx-auto">
                        We aim to empower travelers through technology, security, and community engagement.
                    </p>
                </div>

                <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {values.map((v, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className={`${v.color} p-10 rounded-[2.5rem] border border-white shadow-sm hover:shadow-md transition-all group`}
                        >
                            <div className="bg-white p-4 rounded-2xl w-fit shadow-sm mb-6 group-hover:scale-110 transition-transform">
                                <v.icon className={v.iconColor} size={32} />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{v.title}</h3>
                            {/* <p className="text-gray-600 leading-relaxed italic">"{v.desc}"</p> */}
                            <p className="text-gray-600 leading-relaxed italic">{`"${v.desc}"`}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 3. The Platform Strategy - Review & Payment */}
            <section className="py-24 container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-2 lg:order-1"
                    >
                        <div className="grid grid-cols-2 gap-6">
                            <div className="bg-yellow-50 p-8 rounded-3xl text-center">
                                <Star className="text-yellow-500 mx-auto mb-2" size={30} fill="currentColor" />
                                <h4 className="text-2xl font-bold">4.9/5</h4>
                                <p className="text-gray-500 text-sm">User Ratings</p>
                            </div>
                            <div className="bg-purple-50 p-8 rounded-3xl text-center">
                                <ShieldCheck className="text-purple-600 mx-auto mb-2" size={30} />
                                <h4 className="text-2xl font-bold">Secure</h4>
                                <p className="text-gray-500 text-sm">Stripe Integrated</p>
                            </div>
                            <div className="col-span-2 bg-blue-600 p-8 rounded-3xl text-white">
                                <h4 className="text-xl font-bold mb-2">Join the Premium Circle</h4>
                                <p className="opacity-90 text-sm">Unlock verified badges and post-trip reviews to build your trust in the community.</p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="order-1 lg:order-2"
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">Built for Trust and Engagement</h2>
                        <div className="space-y-6">
                            <div className="flex gap-4">
                                <div className="bg-blue-100 p-2 h-fit rounded-lg text-blue-600"><Zap size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Detailed Itineraries</h4>
                                    <p className="text-gray-500">Create plans with specific destinations, budget ranges, and dates.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-pink-100 p-2 h-fit rounded-lg text-pink-600"><Users size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Post-Trip Reviews</h4>
                                    <p className="text-gray-500">Rate your travel buddies after trips to maintain community quality.</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <div className="bg-green-100 p-2 h-fit rounded-lg text-green-600"><Heart size={20} /></div>
                                <div>
                                    <h4 className="font-bold text-lg">Interest-Based Search</h4>
                                    <p className="text-gray-500">Filter matches by photography, hiking, or food interests.</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
