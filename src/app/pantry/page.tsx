'use client';

import { usePantry } from '@/hooks/usePantry';
import Link from 'next/link';
import { Plus, Trash2, Home, Sparkles } from 'lucide-react';

export default function PantryPage() {
    const { items, removeItem } = usePantry();

    return (
        <div className="flex min-h-screen flex-col bg-[#050505] text-white">

            {/* Header */}
            <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
                <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-neutral-400 hover:text-white">
                    <Home className="h-6 w-6" />
                </Link>
                <h1 className="text-sm font-medium tracking-widest uppercase text-neutral-500">My Pantry</h1>
                <Link href="/pantry/scan" className="p-2 -mr-2 rounded-full hover:bg-white/5 transition-colors text-orange-500">
                    <Plus className="h-6 w-6" />
                </Link>
            </header>

            <main className="flex-1 p-6 max-w-md mx-auto w-full">
                {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[50vh] text-center space-y-6">
                        <div className="h-20 w-20 bg-neutral-900 rounded-full flex items-center justify-center border border-white/5 shadow-lg shadow-orange-500/10">
                            <Sparkles className="h-8 w-8 text-orange-500 opacity-80" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Kitchen is Empty</h2>
                            <p className="text-sm text-neutral-500 mt-2 max-w-[200px] mx-auto">Scan items to start building your digital pantry.</p>
                        </div>
                        <Link href="/pantry/scan" className="px-8 py-3 bg-premium-gradient text-white rounded-xl text-sm font-bold shadow-lg shadow-orange-500/20 hover:opacity-90 transition-opacity">
                            Scan Groceries
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">In Stock</h2>
                            <span className="text-[10px] bg-neutral-900 border border-white/10 px-2 py-1 rounded-full text-neutral-400">{items.length} ITEMS</span>
                        </div>

                        <div className="grid grid-cols-1 gap-3">
                            {items.map((item) => (
                                <div key={item.id} className="group relative overflow-hidden bg-[#0A0A0A] border border-white/5 rounded-2xl p-3 flex shadow-sm hover:border-orange-500/30 transition-all">
                                    {/* Hover Glow */}
                                    <div className="absolute inset-0 bg-premium-gradient opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none" />

                                    <div className="relative">
                                        {item.image_url ? (
                                            /* eslint-disable-next-line @next/next/no-img-element */
                                            <img src={item.image_url} alt={item.product_name} className="h-20 w-20 object-cover rounded-xl bg-neutral-900" />
                                        ) : (
                                            <div className="h-20 w-20 bg-neutral-900 rounded-xl flex items-center justify-center text-2xl border border-white/5">🍎</div>
                                        )}
                                        {/* Status Dot */}
                                        <div className="absolute -top-1 -right-1 h-3 w-3 bg-emerald-500 rounded-full border-2 border-[#0A0A0A]"></div>
                                    </div>

                                    <div className="ml-4 flex-1 flex flex-col justify-center">
                                        <h3 className="font-bold text-white line-clamp-1 text-base">{item.product_name || 'Unknown Item'}</h3>
                                        <p className="text-xs text-neutral-500 mt-0.5">{item.brands || 'No Brand'}</p>

                                        <div className="mt-3 flex gap-2">
                                            {/* Nutri-Score Badge - Dark Mode Style */}
                                            {item.nutriscore_grade && (
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.nutriscore_grade === 'a' ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20' :
                                                        item.nutriscore_grade === 'b' ? 'bg-teal-500/10 text-teal-500 border-teal-500/20' :
                                                            item.nutriscore_grade === 'c' ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                                item.nutriscore_grade === 'd' ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                                    'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                    SCORE {item.nutriscore_grade.toUpperCase()}
                                                </span>
                                            )}

                                            {/* NOVA Group Badge - Dark Mode Style */}
                                            {item.nova_group && (
                                                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${item.nova_group === 1 ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                                                        item.nova_group === 2 ? 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20' :
                                                            item.nova_group === 3 ? 'bg-orange-500/10 text-orange-500 border-orange-500/20' :
                                                                'bg-red-500/10 text-red-500 border-red-500/20'
                                                    }`}>
                                                    NOVA {item.nova_group}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => removeItem(item.id)}
                                        className="absolute right-2 top-2 p-2 text-neutral-600 hover:text-red-500 hover:bg-red-500/10 rounded-full opacity-0 group-hover:opacity-100 transition-all"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
