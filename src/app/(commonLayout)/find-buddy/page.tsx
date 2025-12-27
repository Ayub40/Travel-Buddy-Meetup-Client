"use client";

import { useCallback, useEffect, useState } from "react";
import { ITravelPlan } from "@/types/travel.interface";
import { matchTravelPlans } from "@/service/admin/travelPlanManagement";
import TablePagination from "@/components/shared/TablePagination";
import { useSearchParams } from "next/navigation";
import TravelBuddyFilter from "@/components/modules/Travel/TravelBuddyFilter";
import TravelBuddyCard from "@/components/modules/Travel/TravelBuddyCard";
import { Loader2, Ghost } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FindTravelBuddy = () => {
    const searchParams = useSearchParams();
    const currentPageParam = Number(searchParams.get("page") || 1);
    const limitParam = Number(searchParams.get("limit") || 6); 

    const [travelPlans, setTravelPlans] = useState<ITravelPlan[]>([]);
    const [loading, setLoading] = useState(true);

    const [destination, setDestination] = useState("");
    const [country, setCountry] = useState("");
    const [travelType, setTravelType] = useState("");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");

    const [totalPages, setTotalPages] = useState(1);

    const fetchPlans = useCallback(async () => {
        setLoading(true);
        const queryParams = new URLSearchParams();
        if (destination) queryParams.set("destination", destination);
        if (country) queryParams.set("country", country);
        if (travelType) queryParams.set("travelType", travelType);
        if (fromDate) queryParams.set("startDate", fromDate);
        if (toDate) queryParams.set("endDate", toDate);
        queryParams.set("page", currentPageParam.toString());
        queryParams.set("limit", limitParam.toString());

        const result = await matchTravelPlans(queryParams.toString());

        if (result.success) {
            setTravelPlans(result.data.data);
            const total = result.data.meta?.total || 1;
            const limit = result.data.meta?.limit || 6;
            setTotalPages(Math.ceil(total / limit));
        } else {
            setTravelPlans([]);
            setTotalPages(1);
        }
        setLoading(false);
    }, [destination, country, travelType, fromDate, toDate, currentPageParam, limitParam]);

    useEffect(() => {
        const timer = setTimeout(() => {
            fetchPlans();
        }, 500); // Debounce fetch for better performance
        return () => clearTimeout(timer);
    }, [fetchPlans]);

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-slate-950 pb-20">
            <div className="container mx-auto px-4 sm:px-6">

                {/* Header Title Section */}
                <div className="pt-10 pb-2 text-center">
                    <h1 className="text-4xl font-black text-slate-900 dark:text-white mb-2">
                        Find Your <span className="text-blue-600">Travel Buddy</span>
                    </h1>
                    <p className="text-slate-500 font-medium">Explore the world together. Safe, fun, and memorable.</p>
                </div>

                {/* Filter Component */}
                <TravelBuddyFilter
                    destination={destination} setDestination={setDestination}
                    country={country} setCountry={setCountry}
                    travelType={travelType} setTravelType={setTravelType}
                    fromDate={fromDate} setFromDate={setFromDate}
                    toDate={toDate} setToDate={setToDate}
                    onClear={() => {
                        setDestination(""); setCountry(""); setTravelType("");
                        setFromDate(""); setToDate("");
                    }}
                />

                {/* Content Section */}
                <AnimatePresence mode="wait">
                    {loading ? (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="flex flex-col items-center justify-center py-20"
                        >
                            <Loader2 className="animate-spin text-blue-600 mb-4" size={48} />
                            <p className="text-slate-500 font-bold animate-pulse tracking-widest uppercase text-xs">Matching plans for you...</p>
                        </motion.div>
                    ) : travelPlans.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20 bg-white rounded-4xl shadow-sm border border-dashed border-gray-200"
                        >
                            <Ghost className="mx-auto text-gray-300 mb-4" size={64} />
                            <h3 className="text-xl font-bold text-slate-700">No travel buddies found</h3>
                            <p className="text-slate-500">Try changing your filters or search terms.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="space-y-10"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {travelPlans.map((plan) => (
                                    <TravelBuddyCard key={plan.id} plan={plan} />
                                ))}
                            </div>

                            {/* Pagination Section */}
                            <div className="flex justify-center pt-10">
                                <div className="bg-white dark:bg-slate-900 px-6 py-4 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-800">
                                    <TablePagination
                                        currentPage={currentPageParam}
                                        totalPages={totalPages}
                                    />
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default FindTravelBuddy;
