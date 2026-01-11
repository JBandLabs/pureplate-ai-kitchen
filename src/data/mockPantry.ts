import { PantryItem } from "@/types/pantry";

export const MOCK_PANTRY_ITEMS: PantryItem[] = [
    {
        id: '1',
        name: 'Organic Quinoa',
        category: 'Pantry Staples',
        quantity: 500,
        unit: 'g',
        addedDate: '2025-05-10T10:00:00Z',
        expiryDate: '2026-06-01T00:00:00Z',
        notes: 'Bob\'s Red Mill'
    },
    {
        id: '2',
        name: 'Avocados',
        category: 'Produce',
        quantity: 3,
        unit: 'pcs',
        addedDate: '2025-05-15T12:00:00Z',
        expiryDate: '2025-05-20T00:00:00Z'
    },
    {
        id: '3',
        name: 'Almond Milk',
        category: 'Dairy & Eggs',
        quantity: 1,
        unit: 'l',
        addedDate: '2025-05-14T09:00:00Z',
        expiryDate: '2025-05-25T00:00:00Z',
        notes: 'Unsweetened'
    },
    {
        id: '4',
        name: 'Chicken Breast',
        category: 'Meat & Seafood',
        quantity: 2,
        unit: 'lb',
        addedDate: '2025-05-16T15:00:00Z',
        expiryDate: '2025-05-19T00:00:00Z',
        notes: 'Free range'
    },
    {
        id: '5',
        name: 'Spinach',
        category: 'Produce',
        quantity: 1,
        unit: 'pack',
        addedDate: '2025-05-16T15:00:00Z',
        expiryDate: '2025-05-21T00:00:00Z'
    }
];
