/* eslint-disable @typescript-eslint/no-explicit-any */
// Statistics.tsx (Server Component)
import { getAppStatistics } from "@/service/dashboard/dashboardManagement";
import CounterCard from "./CounterCard";

export default async function Statistics() {

    const res = await getAppStatistics();
    const stats = res.success ? res.data : [];

    return (
        <section className="py-20 container mx-auto rounded-3xl my-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                    {stats.map((stat: any, index: number) => (
                        <CounterCard key={index} {...stat} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}