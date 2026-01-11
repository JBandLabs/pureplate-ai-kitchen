"use client";

import { PantryItem } from "@/types/pantry";
import { cn } from "@/lib/utils";
import { Trash2, AlertCircle } from "lucide-react";

interface PantryItemCardProps {
    item: PantryItem;
    onDelete: (id: string) => void;
}

export function PantryItemCard({ item, onDelete }: PantryItemCardProps) {
    const isExpiringSoon = item.expiryDate
        ? new Date(item.expiryDate) <= new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        : false;

    return (
        <div className="flex items-center p-4 bg-white border border-border rounded-xl shadow-sm mb-3">
            {/* Icon logic placeholder - using Category letter for now */}
            <div className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center text-lg font-bold mr-4",
                "bg-secondary text-primary-foreground"
            )}>
                {item.name.charAt(0)}
            </div>

            <div className="flex-1">
                <h4 className="font-semibold text-foreground">{item.name}</h4>
                <div className="flex items-center text-sm text-muted-foreground">
                    <span>{item.quantity} {item.unit}</span>
                    <span className="mx-2">•</span>
                    <span className="text-xs">{item.category}</span>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2">
                {isExpiringSoon && (
                    <span className="flex items-center text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-full">
                        <AlertCircle className="w-3 h-3 mr-1" />
                        Expiring
                    </span>
                )}
                <button
                    onClick={() => onDelete(item.id)}
                    className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                >
                    <Trash2 className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
