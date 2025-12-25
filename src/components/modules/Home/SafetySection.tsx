"use client";
import { ShieldCheck, Users, MessageSquare } from "lucide-react";
import { motion } from "framer-motion";

export default function SafetySection() {
    const features = [
        {
            title: "Verified Profiles",
            desc: "Every member is manually verified for safety.",
            icon: ShieldCheck,
            iconColor: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            title: "Secure Chat",
            desc: "Talk safely within our built-in messenger.",
            icon: MessageSquare,
            iconColor: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Global Community",
            desc: "Join 10k+ active travelers worldwide.",
            icon: Users,
            iconColor: "text-purple-600",
            bgColor: "bg-purple-50"
        },
    ];

    return (
        <section className="py-24 container mx-auto px-6">
            {/* মেইন কন্টেইনার - আপনার দেওয়া bg-purple-50 ব্যবহার করা হয়েছে */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-purple-50 rounded-[3.5rem] p-12 md:p-20 relative overflow-hidden border border-purple-100/50"
            >
                {/* Decorative background shapes */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/40 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-pink-100/50 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />

                <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10">
                    {features.map((f, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white p-8 rounded-[2.5rem] shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center border border-white/60"
                        >
                            <div className={`p-4 rounded-2xl mb-6 ${f.bgColor} ${f.iconColor}`}>
                                <f.icon size={32} />
                            </div>

                            <h3 className="text-xl font-bold text-gray-800 mb-3">
                                {f.title}
                            </h3>
                            <p className="text-gray-500 text-sm leading-relaxed">
                                {f.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}