/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
    Dialog,
    DialogContent,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
import { getDashboardStats, updateJoinRequest } from "@/service/admin/userManagement";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart, Pie, Cell, Legend
} from 'recharts';
import { Briefcase, Users, Send, Calendar, CheckCircle, XCircle, Eye } from "lucide-react";


const DashboardSkeleton = () => (
    <div className="p-4 md:p-8 bg-gray-50 min-h-screen animate-pulse">
        <div className="mb-8">
            <div className="h-8 w-48 bg-gray-200 rounded-lg mb-2" />
            <div className="h-4 w-64 bg-gray-200 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1, 2, 3].map((i) => (
                <div key={i} className="h-28 bg-white rounded-2xl border border-gray-100 shadow-sm" />
            ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
            <div className="h-80 bg-white rounded-xl border border-gray-200" />
            <div className="h-80 bg-white rounded-xl border border-gray-200" />
        </div>
        <div className="h-64 bg-white rounded-xl border border-gray-200" />
    </div>
);


interface JoinRequest {
    id: string;
    status: "PENDING" | "ACCEPTED" | "REJECTED";
    user: { id: string; name: string; profileImage?: string };
    travelPlan: { title: string; destination: string };
}

interface Match {
    id: string;
    user: { id: string; name: string; profileImage?: string };
    travelPlan: { id: string; title: string; destination: string };
}

interface UpcomingTrip {
    id: string;
    title: string;
    destination: string;
    startDate: string;
    endDate: string;
    joinRequests: { status: "PENDING" | "ACCEPTED" | "REJECTED" }[];
}

interface DashboardStats {
    totalTravelPlans: number;
    matchedCount: number;
    totalJoinRequests: number;
    joinRequests: JoinRequest[];
    matches: Match[];
    upcomingTrips: UpcomingTrip[];
    userName: string;
}

export default function DashboardHome() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const statsRes = await getDashboardStats();
            if (statsRes.success) setStats(statsRes.data);
            setLoading(false);
        };
        loadData();
    }, []);

    const handleAction = async (id: string, status: "ACCEPTED" | "REJECTED") => {
        const res = await updateJoinRequest(id, status);
        if (res.success && stats) {
            const originalRequest = stats.joinRequests.find(r => r.id === id);
            if (!originalRequest) return;

            setStats(prevStats => {
                if (!prevStats) return null;
                const updatedJoinRequests = prevStats.joinRequests.filter(r => r.id !== id);
                const newMatch: Match = {
                    id: res.data.id || id,
                    user: res.data.user || originalRequest.user,
                    travelPlan: {
                        id: res.data.travelPlan?.id || "",
                        title: res.data.travelPlan?.title || originalRequest.travelPlan.title,
                        destination: res.data.travelPlan?.destination || originalRequest.travelPlan.destination
                    }
                };
                return {
                    ...prevStats,
                    joinRequests: updatedJoinRequests,
                    matches: status === "ACCEPTED" ? [...prevStats.matches, newMatch] : prevStats.matches,
                    matchedCount: status === "ACCEPTED" ? prevStats.matchedCount + 1 : prevStats.matchedCount,
                    totalJoinRequests: prevStats.totalJoinRequests - 1
                };
            });
        }
    };

    const handleUserClick = (userId: string) => console.log("User details:", userId);
    const handleViewMatch = (matchId: string) => {
        const match = stats?.matches.find(m => m.id === matchId) || null;
        setSelectedMatch(match);
    };


    if (loading) return <DashboardSkeleton />;

    // Chart Data Preparation
    const barData = [
        { name: 'Plans', count: stats?.totalTravelPlans || 0 },
        { name: 'Matches', count: stats?.matchedCount || 0 },
        { name: 'Requests', count: stats?.totalJoinRequests || 0 },
    ];

    const pieData = [
        { name: 'Matches', value: stats?.matchedCount || 0 },
        { name: 'Pending', value: stats?.totalJoinRequests || 0 },
    ];
    const COLORS = ['#10b981', '#f59e0b'];

    return (
        <div className="p-4 md:p-8 bg-gray-50 min-h-screen">
            <header className="mb-8">
                <h1 className="text-3xl font-extrabold text-gray-800">Hello 👋 {stats?.userName}</h1>
                <p className="text-gray-500 mt-1">Here is what is happening with your travel plans today.</p>
            </header>

            {/* 1. Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <StatCard title="Travel Plans" value={stats?.totalTravelPlans} icon={<Briefcase size={24} />} color="text-blue-600" bgColor="bg-blue-100" />
                <StatCard title="Buddy Matches" value={stats?.matchedCount} icon={<Users size={24} />} color="text-green-600" bgColor="bg-green-100" />
                <StatCard title="Pending Requests" value={stats?.totalJoinRequests} icon={<Send size={24} />} color="text-orange-600" bgColor="bg-orange-100" />
            </div>

            {/* 2. Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-700">Trip Statistics</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={barData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                                <YAxis axisLine={false} tickLine={false} />
                                <Tooltip cursor={{ fill: '#f9fafb' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                                <Bar dataKey="count" fill="#3b82f6" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                    <h3 className="text-lg font-bold mb-6 text-gray-700">Request Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={8} dataKey="value">
                                    {pieData.map((_, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                                </Pie>
                                <Tooltip />
                                <Legend verticalAlign="bottom" height={36} />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* 3. Join Requests Table */}
            <section className="mb-10">
                <div className="flex items-center gap-2 mb-4">
                    <Send className="text-orange-500" size={20} />
                    <h2 className="text-xl font-bold text-gray-800">Join Requests</h2>
                </div>
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-gray-100 text-gray-600 uppercase text-xs font-semibold">
                                <tr>
                                    <th className="px-6 py-4">User</th>
                                    <th className="px-6 py-4">Trip Details</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {stats?.joinRequests.length === 0 ? (
                                    <tr><td colSpan={4} className="p-10 text-center text-gray-400">No active requests found</td></tr>
                                ) : (
                                    stats?.joinRequests.map(req => (
                                        <tr key={req.id} className="hover:bg-blue-50/30 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleUserClick(req.user.id)}>
                                                    <Image src={req?.user?.profileImage || "/default-profile.png"} alt="user" width={36} height={36} className="rounded-full ring-2 ring-gray-100" />
                                                    <span className="font-medium text-gray-700">{req.user.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="text-sm font-semibold text-gray-800">{req.travelPlan.title}</div>
                                                <div className="text-xs text-gray-500">{req.travelPlan.destination}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${req.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : "bg-green-100 text-green-700"}`}>
                                                    {req.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex justify-center gap-2">
                                                    <button onClick={() => handleAction(req.id, "ACCEPTED")} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition" title="Accept"><CheckCircle size={20} /></button>
                                                    <button onClick={() => handleAction(req.id, "REJECTED")} className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition" title="Reject"><XCircle size={20} /></button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* 4. Buddy Matches & Upcoming Trips */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Users className="text-green-500" size={20} />
                        <h2 className="text-xl font-bold text-gray-800">Recent Matches</h2>
                    </div>
                    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
                        {stats?.matches.length === 0 ? <p className="p-6 text-gray-400 text-center">No matches found</p> :
                            stats?.matches.slice(0, 5).map(match => (
                                <div key={match.id} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg border-b last:border-0">
                                    <div className="flex items-center gap-3">
                                        <Image src={match.user.profileImage || "/default-profile.png"} alt="user" width={32} height={32} className="rounded-full" />
                                        <div>
                                            <div className="text-sm font-bold text-gray-800">{match.user.name}</div>
                                            <div className="text-xs text-gray-500">{match.travelPlan.destination}</div>
                                        </div>
                                    </div>
                                    <button onClick={() => handleViewMatch(match.id)} className="text-blue-600 p-2 hover:bg-blue-50 rounded-full transition"><Eye size={18} /></button>
                                </div>
                            ))
                        }
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-2 mb-4">
                        <Calendar className="text-blue-500" size={20} />
                        <h2 className="text-xl font-bold text-gray-800">Upcoming Trips</h2>
                    </div>
                    <div className="space-y-3">
                        {stats?.upcomingTrips.length === 0 ? <p className="p-6 text-gray-400 text-center">No upcoming trips</p> :
                            stats?.upcomingTrips.map(trip => (
                                <div key={trip.id} className="bg-white p-4 rounded-xl border border-gray-200 flex justify-between items-center shadow-sm">
                                    <div>
                                        <div className="font-bold text-gray-800">{trip.title}</div>
                                        <div className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Calendar size={12} /> {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</div>
                                    </div>
                                    <div className="text-xs font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-md">{trip.destination}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

            <Dialog open={!!selectedMatch} onOpenChange={() => setSelectedMatch(null)}>
                <DialogContent className="sm:max-w-md bg-white p-0 overflow-hidden rounded-2xl">
                    <div className="bg-blue-600 h-24 flex items-end justify-center pb-4">
                        <div className="bg-white p-1 rounded-full translate-y-8 shadow-lg">
                            <Image src={selectedMatch?.user.profileImage || "/default-profile.png"} alt="user" width={80} height={80} className="rounded-full object-cover" />
                        </div>
                    </div>
                    <div className="pt-12 pb-8 px-6 text-center">
                        <DialogTitle className="text-2xl font-bold text-gray-800">{selectedMatch?.user.name}</DialogTitle>
                        <p className="text-gray-500 text-sm">Travel Buddy Match</p>
                        <div className="mt-6 space-y-3 bg-gray-50 p-4 rounded-xl text-left">
                            <div className="flex justify-between"><span className="text-gray-500 text-sm">Trip:</span><span className="font-semibold">{selectedMatch?.travelPlan.title}</span></div>
                            <div className="flex justify-between"><span className="text-gray-500 text-sm">Destination:</span><span className="font-semibold">{selectedMatch?.travelPlan.destination}</span></div>
                        </div>
                        <DialogClose asChild>
                            <button className="mt-6 w-full bg-gray-900 text-white py-3 rounded-xl font-semibold hover:bg-black transition">Close Profile</button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}

function StatCard({ title, value, icon, color, bgColor }: any) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4 transition-all hover:shadow-md">
            <div className={`${bgColor} ${color} p-4 rounded-2xl`}>
                {icon}
            </div>
            <div>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-wider">{title}</p>
                <p className="text-2xl font-black text-gray-800 mt-0.5">{value || 0}</p>
            </div>
        </div>
    );
}
