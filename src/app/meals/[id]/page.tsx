'use client';

import { RecipeService, FullRecipe } from '@/services/RecipeService';
import { use, useState, useEffect } from 'react';
import { ArrowLeft, Clock, MapPin, Youtube } from 'lucide-react';
import Link from 'next/link';

export default function RecipeDetailPage({ params }: { params: Promise<{ id: string }> }) {
    // Unwrap params using React.use() for Next.js 15+ compatibility
    // Though for simpler Next/React versions we might await in server comp, 
    // since this is 'use client', we treat it as a promise or simple prop depending on version.
    // In Next.js 15, params is a Promise. We'll handle it carefully.

    // Safe unwrap pattern
    const [recipeId, setRecipeId] = useState<string | null>(null);
    const [recipe, setRecipe] = useState<FullRecipe | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Resolve params first
        params.then(p => {
            setRecipeId(p.id);
            fetchData(p.id);
        });
    }, [params]);

    const fetchData = async (id: string) => {
        setLoading(true);
        const data = await RecipeService.getRecipeDetails(id);
        setRecipe(data);
        setLoading(false);
    };

    if (loading || !recipe) {
        return (
            <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 flex items-center justify-center">
                <div className="space-y-4 text-center">
                    <div className="h-12 w-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="text-neutral-400 animate-pulse">Consulting the Chef...</p>
                </div>
            </div>
        );
    }

    // Parse ingredients dynamically (strIngredient1, strIngredient2...)
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
        const ingredient = recipe[`strIngredient${i}`];
        const measure = recipe[`strMeasure${i}`];
        if (ingredient && ingredient.trim()) {
            ingredients.push({ name: ingredient, measure: measure });
        }
    }

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950 pb-12">
            {/* Hero Header */}
            <div className="relative h-96 w-full">
                <img src={recipe.strMealThumb} alt={recipe.strMeal} className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent opacity-90" />
                <Link href="/meals" className="absolute top-6 left-6 p-2 bg-black/20 backdrop-blur-md text-white rounded-full hover:bg-black/40 transition-colors">
                    <ArrowLeft className="h-6 w-6" />
                </Link>

                <div className="absolute bottom-0 left-0 w-full p-6 text-white">
                    <span className="inline-block px-3 py-1 bg-emerald-500 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                        {recipe.strCategory}
                    </span>
                    <h1 className="text-3xl font-bold leading-tight mb-2">{recipe.strMeal}</h1>
                    <div className="flex items-center gap-4 text-sm text-neutral-200">
                        <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {recipe.strArea}
                        </div>
                        {/* Simulated time as API doesn't provide it */}
                        <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            ~30 mins
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-2xl mx-auto px-6 -mt-6 relative z-10">

                <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl p-6 border border-neutral-100 dark:border-neutral-800 space-y-8">

                    {/* Ingredients */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="h-6 w-1 bg-emerald-500 rounded-full"></span>
                            Ingredients
                        </h2>
                        <ul className="space-y-2">
                            {ingredients.map((item, idx) => (
                                <li key={idx} className="flex items-center justify-between py-2 border-b border-dashed border-neutral-100 dark:border-neutral-800 last:border-0">
                                    <span className="font-medium text-neutral-800 dark:text-neutral-200">{item.name}</span>
                                    <span className="text-neutral-400 text-sm">{item.measure}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Instructions */}
                    <div>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span className="h-6 w-1 bg-emerald-500 rounded-full"></span>
                            Instructions
                        </h2>
                        <div className="space-y-4 text-neutral-600 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
                            {recipe.strInstructions}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="pt-4 flex gap-3">
                        {recipe.strYoutube && (
                            <a
                                href={recipe.strYoutube}
                                target="_blank"
                                rel="noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 dark:bg-red-900/10 text-red-600 font-medium rounded-xl hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                            >
                                <Youtube className="h-5 w-5" />
                                Watch Video
                            </a>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
}
