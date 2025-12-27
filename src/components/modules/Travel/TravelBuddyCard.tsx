"use client";

import { formatDateTime } from "@/lib/formatters";
import { sendJoinRequest } from "@/service/admin/travelPlanManagement";
import { ITravelPlan } from "@/types/travel.interface";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    Calendar,
    Wallet,
    User,
    Send,
    ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TravelBuddyCardProps {
    plan: ITravelPlan;
}

export default function TravelBuddyCard({ plan }: TravelBuddyCardProps) {

    const handleSendRequest = async () => {
        if (!plan.id) {
            toast.error("Do not Find Travel Plan!");
            return;
        }

        const res = await sendJoinRequest(plan.id);

        if (res.success) {
            toast.success("Join request sent successfully!");
        } else {
            toast.error(res.message || "Failed to send request");
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="group bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col h-full"
        >
            {/* --- Image Section --- */}
            <div className="relative h-64 w-full overflow-hidden">
                <Image
                    src={plan.photos?.[0] || "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=800&auto=format&fit=crop"}
                    alt={plan.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60" />

                {/* Badges */}
                <div className="absolute top-5 left-5 flex flex-wrap gap-2">
                    <Badge className="bg-blue-600/90 backdrop-blur-md border-none px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                        {plan.travelType}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase">
                        {plan.country}
                    </Badge>
                </div>
            </div>

            {/* --- Content Section --- */}
            <div className="p-7 flex-grow flex flex-col">
                {/* Title & Description */}
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-3 line-clamp-1 group-hover:text-blue-600 transition-colors">
                        {plan.title}
                    </h2>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                        {plan.description || "Join this amazing journey and explore the hidden gems with a verified buddy."}
                    </p>
                </div>

                {/* Info Grid with Your Specified Colors */}
                <div className="grid grid-cols-2 gap-4 mb-5">
                    {/* Destination */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-blue-50 transition-colors hover:bg-blue-100/50">
                        <div className="p-2 bg-white rounded-xl text-blue-600 shadow-sm">
                            <MapPin size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-tighter">Place</p>
                            <p className="text-xs font-bold text-slate-700 truncate">{plan.destination}</p>
                        </div>
                    </div>

                    {/* Budget */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-green-50 transition-colors hover:bg-green-100/50">
                        <div className="p-2 bg-white rounded-xl text-green-600 shadow-sm">
                            <Wallet size={18} />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-green-400 uppercase tracking-tighter">Budget</p>
                            <p className="text-xs font-bold text-slate-700">{plan.budget ? `৳${plan.budget}` : "Flexible"}</p>
                        </div>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-pink-50 transition-colors hover:bg-pink-100/50">
                        <div className="p-2 bg-white rounded-xl text-pink-600 shadow-sm">
                            <Calendar size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold text-pink-400 uppercase tracking-tighter">Date</p>
                            <p className="text-xs font-bold text-slate-700 truncate">
                                {plan.startDate ? formatDateTime(new Date(plan.startDate)) : "TBA"}
                            </p>
                        </div>
                    </div>

                    {/* Host */}
                    <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50 transition-colors hover:bg-purple-100/50">
                        <div className="p-2 bg-white rounded-xl text-purple-600 shadow-sm">
                            <User size={18} />
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-bold text-purple-400 uppercase tracking-tighter">Host</p>
                            <p className="text-xs font-bold text-slate-700 truncate">{plan.user?.name || "Member"}</p>
                        </div>
                    </div>
                </div>
                {/* Host Email */}
                <div className="flex items-center gap-3 p-3 rounded-2xl bg-purple-50 transition-colors hover:bg-purple-100/50 mb-3">
                    <div className="p-2 bg-white rounded-xl text-purple-600 shadow-sm">
                        <User size={18} />
                    </div>
                    <div className="min-w-0">
                        <p className="text-[10px] font-bold text-purple-400 uppercase tracking-tighter">Host</p>
                        <p className="text-xs font-bold text-slate-700 truncate">{plan.user?.email || "Member"}</p>
                    </div>
                </div>

                {/* --- Action Buttons --- */}
                <div className="mt-auto flex flex-col gap-3">
                    <Button
                        onClick={handleSendRequest}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-blue-200 dark:shadow-none transition-all active:scale-95 group/btn"
                    >
                        <span>Send Join Request</span>
                        <Send size={18} className="transition-transform group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1" />
                    </Button>

                    <Link href={`/allTravelPlan/travelPlan/${plan.id}`} className="w-full">
                        <Button variant="ghost" className="w-full text-slate-500 hover:text-blue-600 hover:bg-blue-50 py-6 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all">
                            View Full Details
                            <ArrowRight size={18} />
                        </Button>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

