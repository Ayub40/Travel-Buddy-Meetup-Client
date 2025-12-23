"use client";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function ContactSection() {
    return (
        <section className="py-20 bg-gray-50/50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 bg-white p-8 lg:p-16 rounded-xl shadow-xl border border-gray-100">

                    {/* Left Side: Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-4xl font-bold text-gray-800 mb-6">Get In Touch</h2>
                        <p className="text-gray-500 mb-10 text-lg leading-relaxed">
                            Have a question or need support? Our team is here to help you find the
                            perfect travel buddy and ensure your safety.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Mail, label: "Email Us", val: "support@tripmates.com", color: "bg-blue-50", iconColor: "text-blue-600" },
                                { icon: Phone, label: "Call Us", val: "+880 123 456 789", color: "bg-pink-50", iconColor: "text-pink-600" },
                                { icon: MapPin, label: "Our Office", val: "Banani, Dhaka, Bangladesh", color: "bg-green-50", iconColor: "text-green-600" },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-6">
                                    <div className={`${item.color} p-4 rounded-xl ${item.iconColor}`}>
                                        <item.icon size={24} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">{item.label}</p>
                                        <p className="text-lg font-bold text-gray-800">{item.val}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right Side: Form */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="bg-blue-50/50 p-8 lg:p-10 rounded-xl border border-blue-100"
                    >
                        <form className="space-y-5">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <input
                                    type="text"
                                    placeholder="Your Name"
                                    className="w-full px-6 py-4 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                                />
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full px-6 py-4 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                                />
                            </div>
                            <input
                                type="text"
                                placeholder="Subject"
                                className="w-full px-6 py-4 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            />
                            <textarea
                                rows={4}
                                placeholder="How can we help?"
                                className="w-full px-6 py-4 rounded-xl border border-white focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white"
                            ></textarea>
                            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-200">
                                Send Message <Send size={18} />
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}