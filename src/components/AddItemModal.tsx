"use client";

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { FoodCategory, MeasurementUnit } from '@/types/pantry';

interface AddItemModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (item: { name: string; category: FoodCategory; quantity: number; unit: MeasurementUnit; expiryDate?: string }) => void;
}

const CATEGORIES: FoodCategory[] = [
    'Produce', 'Meat & Seafood', 'Dairy & Eggs', 'Pantry Staples',
    'Frozen', 'Beverages', 'Snacks', 'Spices', 'Other'
];

const UNITS: MeasurementUnit[] = ['g', 'kg', 'oz', 'lb', 'ml', 'l', 'cup', 'tbsp', 'tsp', 'pcs', 'pack'];

export function AddItemModal({ isOpen, onClose, onAdd }: AddItemModalProps) {
    const [name, setName] = useState('');
    const [category, setCategory] = useState<FoodCategory>('Other');
    const [quantity, setQuantity] = useState<string>('1');
    const [unit, setUnit] = useState<MeasurementUnit>('pcs');
    const [expiryDate, setExpiryDate] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name) return;

        onAdd({
            name,
            category,
            quantity: parseFloat(quantity) || 1,
            unit,
            expiryDate: expiryDate ? new Date(expiryDate).toISOString() : undefined
        });

        // Reset form
        setName('');
        setCategory('Other');
        setQuantity('1');
        setUnit('pcs');
        setExpiryDate('');
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl w-full max-w-sm shadow-xl overflow-hidden pb-0">
                <div className="flex items-center justify-between p-4 border-b border-border bg-secondary/30">
                    <h3 className="font-semibold text-lg text-foreground">Add Item</h3>
                    <button onClick={onClose} className="p-1 rounded-full hover:bg-black/5 transition-colors">
                        <X className="w-5 h-5 text-muted-foreground" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-4 space-y-4">
                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Item Name</label>
                        <input
                            type="text"
                            placeholder="e.g., Organic Kale"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-base"
                            autoFocus
                            required
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value as FoodCategory)}
                            className="w-full p-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none"
                        >
                            {CATEGORIES.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                    </div>

                    {/* Quantity Row */}
                    <div className="flex gap-3">
                        <div className="flex-1">
                            <label className="block text-sm font-medium text-foreground mb-1">Quantity</label>
                            <input
                                type="number"
                                min="0"
                                step="0.1"
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                className="w-full p-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                            />
                        </div>
                        <div className="w-1/3">
                            <label className="block text-sm font-medium text-foreground mb-1">Unit</label>
                            <select
                                value={unit}
                                onChange={(e) => setUnit(e.target.value as MeasurementUnit)}
                                className="w-full p-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none appearance-none"
                            >
                                {UNITS.map(u => (
                                    <option key={u} value={u}>{u}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Expiry Date */}
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-1">Expires (Optional)</label>
                        <input
                            type="date"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                            className="w-full p-3 bg-white border border-border rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none text-muted-foreground"
                        />
                    </div>

                    <div className="pt-2">
                        <button
                            type="submit"
                            className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-xl shadow-sm hover:bg-primary/90 active:scale-[0.98] transition-all"
                        >
                            Add to Pantry
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
