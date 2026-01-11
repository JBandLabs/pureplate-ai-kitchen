'use client';

import { useState, useEffect } from 'react';
import { ProductData } from '@/services/FoodDataService';

const STORAGE_KEY = 'pureplate_pantry_v1';

export interface PantryItem extends ProductData {
    addedAt: number;
    id: string; // Unique instance ID (timestamp + random)
    quantity?: number;
}

export function usePantry() {
    const [items, setItems] = useState<PantryItem[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from storage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            try {
                setItems(JSON.parse(stored));
            } catch (e) {
                console.error('Failed to parse pantry storage', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save items to local storage whenever they change
    const persistItems = (newItems: PantryItem[]) => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newItems));
        setItems(newItems);
    };

    const addItem = (product: ProductData) => {
        const newItem: PantryItem = {
            ...product, // Contains code, product_name, brands, etc.
            addedAt: Date.now(),
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            quantity: 1
        };

        const updated = [newItem, ...items];
        persistItems(updated);
        return newItem;
    };

    const removeItem = (id: string) => {
        const updated = items.filter(item => item.id !== id);
        persistItems(updated);
    };

    const updateItem = (id: string, updates: Partial<PantryItem>) => {
        const updated = items.map(item =>
            item.id === id ? { ...item, ...updates } : item
        );
        persistItems(updated);
    };

    return {
        items,
        addItem,
        removeItem,
        updateItem,
        isLoaded
    };
}
