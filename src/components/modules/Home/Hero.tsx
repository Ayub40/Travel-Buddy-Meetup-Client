/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Hero({ statsResponse }: { statsResponse: any }) {
  // console.log("Hero Stats:", statsResponse)

  const statsArray = Array.isArray(statsResponse?.data?.stats)
    ? statsResponse.data.stats
    : [];

  const activeUserImages = Array.isArray(statsResponse?.data?.activeUserImages)
    ? statsResponse.data.activeUserImages
    : [];

  const activeUsers = statsArray.find((s: any) => s.label === "Active Users")?.value || 0;
  const destinations = statsArray.find((s: any) => s.label === "Destinations")?.value || 0;
  const countries = statsArray.find((s: any) => s.label === "Countries")?.value || 0;

  // console.log("FULL RESPONSE:", statsResponse);
  // console.log("DATA:", statsResponse?.data);
  // console.log("STATS:", statsResponse?.data?.stats);
  // console.log("IS ARRAY:", Array.isArray(statsResponse?.data?.stats));

  return (
    <section className="relative w-full bg-linear-to-b from-blue-50 to-white overflow-hidden container mx-auto rounded-lg border border-gray-100 shadow-sm mt-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-[url('/travel-bg.svg')] bg-cover bg-center"
      />

      <div className="relative mx-auto px-4 sm:px-6 lg:px-12 z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between py-10 sm:py-12 lg:py-20 gap-10">

          {/* LEFT CONTENT */}
          <div className="w-full lg:w-[45%] space-y-6 sm:space-y-8">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white border border-blue-100 px-3 sm:px-4 py-2 rounded-full shadow-sm"
            >
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-xs sm:text-sm font-semibold text-blue-600 tracking-wide uppercase">
                TripMates Hub Platform
              </span>
            </motion.div>

            <motion.h1
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight lg:leading-[1.1] text-gray-900"
            >
              Find Your Next <br />
              <span className="text-blue-600 italic">Travel Partner</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-500 text-base sm:text-lg lg:text-xl leading-relaxed max-w-lg"
            >
              Transform your solo journeys into shared adventures. Connect with
              verified travelers heading to your dream destination.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/find-buddy">
                <Button
                  size="lg"
                  className="w-full sm:w-auto rounded-xl px-6 sm:px-8 py-6 sm:py-7 text-base sm:text-lg bg-blue-600 hover:bg-blue-700 shadow-xl shadow-blue-200 group transition-all"
                >
                  Find Buddy{" "}
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>

              <Link href="/allTravelPlan">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto rounded-xl px-6 sm:px-8 py-6 sm:py-7 text-base sm:text-lg border-2 hover:bg-blue-50"
                >
                  Explore Traveler
                </Button>
              </Link>
            </motion.div>

            <div className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 sm:pt-8 border-t border-gray-100">
              {[
                { value: `${activeUsers}`, label: "Travelers" },
                { value: `${destinations}`, label: "Trips" },
                { value: `${countries}`, label: "Countries" },
              ].map((stat, i) => (
                <motion.div key={i} className="text-left">
                  <p className="text-xl sm:text-2xl font-bold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-[10px] sm:text-xs text-gray-400 uppercase font-bold tracking-widest">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full lg:w-[55%] relative flex justify-center lg:justify-end"
          >
            <div className="absolute -inset-10 bg-blue-400/10 rounded-full blur-3xl" />

            <div className="relative group w-full max-w-[520px] lg:max-w-[600px]">
              <Image
                src="https://images.unsplash.com/photo-1501785888041-af3ef285b470"
                alt="Travel Partner"
                width={800}
                height={900}
                className="rounded-xl shadow-2xl h-[360px] sm:h-[450px] lg:h-[650px] w-full object-cover border-10 border-white transition-transform duration-500 group-hover:scale-[1.01]"
                priority
              />

              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="absolute top-6 sm:top-10 -left-2 sm:-left-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl shadow-xl flex items-center gap-4 border border-white/50 z-20"
              >
                <div className="relative w-10 sm:w-12 h-10 sm:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                  <div className="w-3 h-3 bg-green-500 rounded-full relative" />
                </div>
                <div>
                  <p className="text-sm sm:text-base font-extrabold text-gray-800">
                    {activeUsers} Travelers
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-gray-500 font-bold uppercase tracking-widest">
                    Active Now
                  </p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                className="absolute bottom-6 sm:bottom-10 -right-2 sm:-right-6 bg-white/95 backdrop-blur-md p-5 sm:p-6 rounded-xl shadow-xl border border-white/50 z-20"
              >
                <p className="text-xs sm:text-sm font-bold text-gray-800 mb-3 sm:mb-4 uppercase tracking-wider">
                  Join Group Trip
                </p>

                <div className="flex -space-x-3">
                  {activeUserImages.length > 0
                    ? activeUserImages.map((img: string, i: number) => (
                      <div
                        key={i}
                        className="w-9 sm:w-11 h-9 sm:h-11 rounded-full border-[3px] border-white overflow-hidden shadow-sm"
                      >
                        <Image
                          alt="User"
                          width={44}
                          height={44}
                          className="object-cover h-full w-full"
                          src={img}
                        />
                      </div>
                    ))
                    : null}

                  <div className="w-9 sm:w-11 h-9 sm:h-11 rounded-full bg-blue-600 flex items-center justify-center text-[10px] sm:text-xs text-white border-[3px] border-white font-bold">
                    +{activeUsers > 3 ? activeUsers - 3 : 0}
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

