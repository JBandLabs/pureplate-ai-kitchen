"use client";

import { Camera } from "lucide-react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ScanPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6 bg-black text-white relative">
            <Link href="/" className="absolute top-6 left-6 p-2 bg-white/10 rounded-full">
                <ArrowLeft className="w-6 h-6" />
            </Link>

            <div className="w-full max-w-sm aspect-[3/4] border-2 border-white/30 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden bg-gray-900">
                <Camera className="w-16 h-16 text-white/50 mb-4" />
                <p className="text-white/70 text-center px-6">
                    Camera feed would appear here using MediaDevices API.
                </p>

                {/* Mock Capture Button */}
                <button
                    className="absolute bottom-8 w-16 h-16 bg-white rounded-full border-4 border-gray-300 ring-2 ring-white cursor-pointer hover:scale-105 transition"
                    onClick={() => alert("Photo captured! (Simulation)")}
                ></button>
            </div>

            <p className="mt-8 text-sm text-gray-400">
                Align food items within the frame
            </p>
        </div>
    );
}
