"use client";

import { MapPin, Mail, Phone, Github, Linkedin, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-linear-to-b from-blue-50/50 to-white border-t border-blue-100 pt-20 pb-10 container mx-auto rounded-t-[3rem] mt-20 overflow-hidden">

      {/* Background Subtle Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-40 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-pink-100/40 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16">

          {/* Logo & Description */}
          <div className="space-y-6">
            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-2">
              <div className="p-2 bg-blue-600 rounded-xl shadow-lg shadow-blue-200">
                <MapPin className="text-white w-5 h-5" />
              </div>
              TripMates
            </h3>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Find your perfect travel partner and explore the world&apos;s most amazing destinations together safely and affordably.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px]">Quick Links</h4>
            <ul className="space-y-4 text-sm font-bold text-slate-500">
              <li className="hover:text-blue-600 transition-all flex items-center gap-1 group">
                <Link href="/allTravelPlan">Explore Travel</Link>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-blue-600" />
              </li>
              <li className="hover:text-pink-600 transition-all flex items-center gap-1 group">
                <Link href="/about">About Us</Link>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-pink-600" />
              </li>
              <li className="hover:text-purple-600 transition-all flex items-center gap-1 group">
                <Link href="/privacy">Privacy & Terms</Link>
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-all text-purple-600" />
              </li>
            </ul>
          </div>

          {/* Contact Us */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px]">Contact Us</h4>
            <div className="space-y-4 text-sm font-bold text-slate-500">
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-blue-100 group cursor-pointer transition-all hover:shadow-md hover:bg-blue-50/50">
                <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-white transition-colors">
                  <Mail size={18} className="text-blue-600" />
                </div>
                <Link href="mailto:ayubk4028@gmail.com" className="truncate hover:text-blue-600">
                  ayubk4028@gmail.com
                </Link>
              </div>
              <div className="flex items-center gap-3 p-3 bg-white rounded-2xl border border-green-100 group transition-all hover:shadow-md hover:bg-green-50/50">
                <div className="p-2 bg-green-50 rounded-lg group-hover:bg-white transition-colors">
                  <Phone size={18} className="text-green-600" />
                </div>
                <span className="text-slate-600">+880 1688871098</span>
              </div>
            </div>
          </div>

          {/* Updated Social Links Section */}
          <div className="space-y-6">
            <h4 className="text-slate-900 font-black uppercase tracking-widest text-[10px]">Developer Links</h4>
            <div className="flex gap-4">
              {/* GitHub Link */}
              <Link
                href="https://github.com/Ayub40"
                target="_blank"
                className="p-3 bg-white border border-slate-100 rounded-xl text-slate-700 hover:text-white hover:bg-slate-900 transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <Github size={20} />
              </Link>

              {/* LinkedIn Link */}
              <Link
                href="https://www.linkedin.com/in/ayub-khan-dev/"
                target="_blank"
                className="p-3 bg-white border border-slate-100 rounded-xl text-[#0077B5] hover:text-white hover:bg-[#0077B5] transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1"
              >
                <Linkedin size={20} />
              </Link>
            </div>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-blue-100 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] md:text-xs text-slate-400 font-bold uppercase tracking-widest">
            &copy; {new Date().getFullYear()} TripMates Platform. All rights reserved.
          </p>
          <div className="flex gap-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link>
            <span className="text-blue-100 text-xs">|</span>
            <span className="text-slate-400">Developed by Ayub Khan</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

