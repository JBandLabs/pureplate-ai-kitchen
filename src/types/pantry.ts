export type MeasurementUnit = 'g' | 'kg' | 'oz' | 'lb' | 'ml' | 'l' | 'cup' | 'tbsp' | 'tsp' | 'pcs' | 'pack';

export type FoodCategory =
    | 'Produce'
    | 'Meat & Seafood'
    | 'Dairy & Eggs'
    | 'Pantry Staples'
    | 'Frozen'
    | 'Beverages'
    | 'Snacks'
    | 'Spices'
    | 'Other';

export interface PantryItem {
    id: string;
    name: string;
    category: FoodCategory;
    quantity: number;
    unit: MeasurementUnit;
    expiryDate?: string; // ISO date string
    addedDate: string; // ISO date string
    imageUrl?: string;
    notes?: string;
}

export interface PantryStats {
    totalItems: number;
    expiringSoon: number; // Items expiring within 3 days
    cleanLabelScore: number; // 0-100 placeholder for purity tracking
}
