'use client';

import { usePantry } from '@/hooks/usePantry';
import { Recipe, RecipeService } from '@/services/RecipeService';
import { useState, useEffect } from 'react';
import { ChefHat, ArrowRight, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

export default function MealsPage() {
    const { items } = usePantry();
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(false);
    const [activeIngredient, setActiveIngredient] = useState<string>('');

    // "Brain" Logic: Pick an ingredient and find meals
    const generateMeals = async () => {
        if (items.length === 0) return;

        setLoading(true);

        // Simple AI: Pick a random ingredient from the pantry to star in the meal
        const randomItem = items[Math.floor(Math.random() * items.length)];
        const ingredientName = randomItem.product_name || 'Chicken'; // Fallback

        setActiveIngredient(ingredientName);

        const results = await RecipeService.getRecipesByIngredient(ingredientName);
        // Limit to top 5
        setRecipes(results.slice(0, 10));
        setLoading(false);
    };

    // Auto-generate on mount if we have items
    useEffect(() => {
        if (items.length > 0 && recipes.length === 0) {
            generateMeals();
        }
    }, [items]);

    return (
        <div className="flex min-h-screen flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-50">
            <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 backdrop-blur-md bg-white/70 dark:bg-neutral-900/70 border-b border-neutral-200 dark:border-neutral-800">
                <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors">
                    <Home className="h-6 w-6" />
                </Link>
                <h1 className="text-lg font-semibold tracking-tight">Chef's Suggestions</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 p-6 max-w-md mx-auto w-full">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-4">
                        <div className="p-4 bg-neutral-100 dark:bg-neutral-800 rounded-full text-neutral-400">
                            <ChefHat className="h-8 w-8" />
                        </div>
                        <p className="text-neutral-500">Pantry is empty.</p>
                        <Link href="/pantry/scan" className="text-emerald-600 font-medium">Scan ingredients first</Link>
                    </div>
                ) : (
                    <div className="space-y-6">

                        {/* Control Panel */}
                        <div className="flex items-center justify-between bg-white dark:bg-neutral-900 p-4 rounded-xl border border-neutral-100 dark:border-neutral-800 shadow-sm">
                            <div>
                                <p className="text-xs text-neutral-400 uppercase tracking-wider font-medium">Basing meals on</p>
                                <p className="font-medium text-lg text-emerald-600 dark:text-emerald-400 truncate max-w-[150px]">{activeIngredient || '...'}</p>
                            </div>
                            <button
                                onClick={generateMeals}
                                className="p-2 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
                                disabled={loading}
                            >
                                <RefreshCw className={`h-5 w-5 text-neutral-500 ${loading ? 'animate-spin' : ''}`} />
                            </button>
                        </div>

                        {/* Results */}
                        {loading ? (
                            <div className="space-y-4">
                                {[1, 2, 3].map(i => (
                                    <div key={i} className="h-24 w-full bg-neutral-200 dark:bg-neutral-800 rounded-xl animate-pulse" />
                                ))}
                            </div>
                        ) : recipes.length > 0 ? (
                            <div className="grid grid-cols-1 gap-4">
                                {recipes.map(meal => (
                                    <Link href={`/meals/${meal.idMeal}`} key={meal.idMeal} className="group block relative overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-100 dark:border-neutral-800 rounded-xl shadow-sm hover:shadow-md transition-all">
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
                                        <img src={meal.strMealThumb} alt={meal.strMeal} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500" />
                                        <div className="absolute bottom-0 left-0 p-4 z-20 text-white">
                                            <h3 className="text-lg font-bold leading-tight">{meal.strMeal}</h3>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 text-neutral-400">
                                <p>No recipes found using {activeIngredient}.</p>
                                <button onClick={generateMeals} className="text-emerald-500 mt-2 underline">Try another ingredient</button>
                            </div>
                        )}
                    </div>
                )}
            </main>
        </div>
    );
}
