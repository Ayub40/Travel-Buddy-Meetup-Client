"use client";

import { ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { sendJoinRequest } from "@/service/admin/travelPlanManagement";

interface JoinTripButtonProps {
    planId: string;
    isEnded: boolean;
}

const JoinTripButton = ({ planId, isEnded }: JoinTripButtonProps) => {
    const handleSendRequest = async () => {

        if (isEnded) {
            toast.error("This trip has already ended. You cannot join now!");
            return;
        }


        if (!planId) {
            toast.error("Travel Plan not found!");
            return;
        }

        try {
            const res = await sendJoinRequest(planId);
            if (res.success) {
                toast.success("Join request sent successfully!");
            } else {
                toast.error(res.message || "Failed to send request");
            }
        } catch (error) {
            toast.error("Something went wrong!");
        }
    };

    return (
        <button
            onClick={handleSendRequest}

            className={`w-full mt-10 text-white py-5 rounded-4xl font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 
                ${isEnded
                    ? "bg-gray-400 cursor-not-allowed shadow-none"
                    : "bg-[#9810FA] shadow-purple-200 hover:bg-[#820ed5] hover:-translate-y-1"
                }`}
        >
            {isEnded ? "Registration Closed" : "Join This Trip"}
            {!isEnded && <ArrowRight size={22} />}
        </button>
    );
};

export default JoinTripButton;