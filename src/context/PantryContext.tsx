"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PantryItem } from '@/types/pantry';
import { MOCK_PANTRY_ITEMS } from '@/data/mockPantry';

interface PantryContextType {
    items: PantryItem[];
    addItem: (item: Omit<PantryItem, 'id' | 'addedDate'>) => void;
    removeItem: (id: string) => void;
    updateItem: (id: string, updates: Partial<PantryItem>) => void;
    isLoading: boolean;
}

const PantryContext = createContext<PantryContextType | undefined>(undefined);

export function PantryProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<PantryItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Load initial data
    useEffect(() => {
        // Simulate API delay
        const timer = setTimeout(() => {
            // In a real app, load from LocalStorage or API
            setItems(MOCK_PANTRY_ITEMS);
            setIsLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const addItem = (newItem: Omit<PantryItem, 'id' | 'addedDate'>) => {
        const item: PantryItem = {
            ...newItem,
            id: Math.random().toString(36).substr(2, 9),
            addedDate: new Date().toISOString(),
        };
        setItems((prev) => [item, ...prev]);
    };

    const removeItem = (id: string) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const updateItem = (id: string, updates: Partial<PantryItem>) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
        );
    };

    return (
        <PantryContext.Provider value={{ items, addItem, removeItem, updateItem, isLoading }}>
            {children}
        </PantryContext.Provider>
    );
}

export function usePantry() {
    const context = useContext(PantryContext);
    if (context === undefined) {
        throw new Error('usePantry must be used within a PantryProvider');
    }
    return context;
}
