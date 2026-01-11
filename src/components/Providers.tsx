"use client";

import { PantryProvider } from "@/context/PantryContext";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <PantryProvider>
            {children}
        </PantryProvider>
    );
}
