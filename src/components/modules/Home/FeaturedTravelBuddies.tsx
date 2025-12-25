/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { getUsers } from "@/service/admin/userManagement";

const bgColors = ['bg-blue-50', 'bg-pink-50', 'bg-green-50', 'bg-yellow-50'];

export default function FeaturedTravelBuddies() {
    const [buddies, setBuddies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBuddies = async () => {
            const res = await getUsers("limit=4");
            if (res?.success) {
                setBuddies(res.data?.data || res.data || []);
            }
            setLoading(false);
        };
        fetchBuddies();
    }, []);

    if (loading) return (
        <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-[#9810FA]" size={40} />
        </div>
    );

    if (buddies.length === 0) return null;

    return (
        <section className="py-24 container mx-auto px-6">
            <div className="text-center mb-16">
                <motion.h2
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-4xl font-bold text-gray-800"
                >
                    Featured Travel Buddies
                </motion.h2>
                <p className="text-gray-500 mt-4 max-w-xl mx-auto">
                    Connect with verified travelers who are ready to explore the world with you.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {buddies.slice(0, 4).map((buddy, index) => (
                    <motion.div
                        key={buddy.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -10 }}
                        className={`${bgColors[index % 4]} p-6 rounded-[2.5rem] border border-transparent hover:border-white hover:shadow-xl transition-all duration-500 group`}
                    >
                        <div className="relative w-full h-64 rounded-4xl overflow-hidden mb-6 shadow-md">
                            <Image
                                src={buddy.profileImage ? buddy.profileImage : "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                alt={buddy.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"

                                onError={(e: any) => {
                                    e.target.src = "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                                }}
                            />

                            {buddy.status === "ACTIVE" && (
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-[10px] font-bold uppercase tracking-wider text-gray-700">Verified</span>
                                </div>
                            )}
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-bold text-gray-800 truncate">{buddy.name}</h3>
                            <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1 mb-4">
                                <MapPin size={14} className="text-gray-400" />
                                <span className="truncate">{buddy.currentLocation || "Explore Mode"}</span>
                            </div>


                            <Link href={`/profile/${buddy.id}`}>
                                <button className="w-full py-3 bg-white hover:bg-[#9810FA] hover:text-white transition-colors duration-300 rounded-2xl font-bold text-sm shadow-sm flex items-center justify-center gap-2">
                                    View Profile <ArrowRight size={16} />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}

















// "use client";
// import { motion } from "framer-motion";
// import { MapPin, Star, ArrowRight } from "lucide-react";
// import Image from "next/image";

// const buddies = [
//     { name: "Asif Rahman", loc: "Sajek Valley", role: "Adventure", img: "https://i.pravatar.cc/150?u=asif", color: "bg-blue-50" },
//     { name: "Sumaiya Khan", loc: "Bali, Indo", role: "Nature Lover", img: "https://i.pravatar.cc/150?u=sumi", color: "bg-pink-50" },
//     { name: "Tanvir Hossain", loc: "Paris, France", role: "Explorer", img: "https://i.pravatar.cc/150?u=tanvir", color: "bg-green-50" },
//     { name: "Nila Ahmed", loc: "Kyoto, Japan", role: "Solo Traveler", img: "https://i.pravatar.cc/150?u=nila", color: "bg-yellow-50" },
// ];

// export default function FeaturedTravelBuddies() {
//     return (
//         <section className="py-24 container mx-auto px-6">
//             <div className="text-center mb-16">
//                 <h2 className="text-4xl font-bold text-gray-800">Featured Travel Buddies</h2>
//                 <p className="text-gray-500 mt-4 max-w-xl mx-auto">Connect with verified travelers who are ready to explore the world with you.</p>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
//                 {buddies.map((buddy, index) => (
//                     <motion.div
//                         key={index}
//                         initial={{ opacity: 0, y: 30 }}
//                         whileInView={{ opacity: 1, y: 0 }}
//                         transition={{ delay: index * 0.1 }}
//                         whileHover={{ y: -10 }}
//                         className={`${buddy.color} p-6 rounded-[2.5rem] border border-transparent hover:border-white hover:shadow-xl transition-all duration-500 group`}
//                     >
//                         <div className="relative w-full h-64 rounded-[2rem] overflow-hidden mb-6 shadow-md">
//                             <Image src={buddy.img} alt={buddy.name} fill className="object-cover transition-transform duration-500 group-hover:scale-110" />
//                             <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1">
//                                 <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
//                                 <span className="text-[10px] font-bold uppercase tracking-wider">Online</span>
//                             </div>
//                         </div>

//                         <div className="text-center">
//                             <h3 className="text-xl font-bold text-gray-800">{buddy.name}</h3>
//                             <div className="flex items-center justify-center gap-1 text-gray-500 text-sm mt-1 mb-4">
//                                 <MapPin size={14} className="text-gray-400" /> {buddy.loc}
//                             </div>
//                             <button className="w-full py-3 bg-white hover:bg-[#9810FA] hover:text-white transition-colors duration-300 rounded-2xl font-bold text-sm shadow-sm flex items-center justify-center gap-2">
//                                 View Profile <ArrowRight size={16} />
//                             </button>
//                         </div>
//                     </motion.div>
//                 ))}
//             </div>
//         </section>
//     );
// }
