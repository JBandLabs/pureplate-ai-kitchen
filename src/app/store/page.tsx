'use client';

import { useState } from 'react';
import { MapPin, Search, ShoppingCart, TrendingDown } from 'lucide-react';
import Link from 'next/link';

export default function StorePage() {
    const [zip, setZip] = useState('');
    const [searching, setSearching] = useState(false);
    const [deals, setDeals] = useState<any[]>([]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!zip) return;

        setSearching(true);
        // Simulate API delay
        setTimeout(() => {
            setDeals([
                { store: 'Kroger', distance: '1.2 mi', total: '$45.20', savings: '$5.40', color: 'bg-blue-600' },
                { store: 'Walmart', distance: '2.5 mi', total: '$42.10', savings: '$8.50', color: 'bg-yellow-500' },
                { store: 'Whole Foods', distance: '3.1 mi', total: '$68.90', savings: '$0.00', color: 'bg-emerald-700' },
            ]);
            setSearching(false);
        }, 1500);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#050505] text-white">

            {/* Header */}
            <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
                <Link href="/" className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-neutral-400 hover:text-white">
                    <MapPin className="h-6 w-6" />
                </Link>
                <h1 className="text-sm font-medium tracking-widest uppercase text-neutral-500">Smart Sourcing</h1>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 p-6 max-w-md mx-auto w-full">

                <form onSubmit={handleSearch} className="mb-8">
                    <div className="relative group">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500 group-focus-within:text-orange-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Enter Zip Code"
                            value={zip}
                            onChange={e => setZip(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-[#0A0A0A] border border-white/10 rounded-xl focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-neutral-600 text-white"
                        />
                        <button
                            type="submit"
                            disabled={!zip || searching}
                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-orange-500/10 text-orange-500 rounded-lg hover:bg-orange-500/20 disabled:opacity-50 transition-all border border-orange-500/20"
                        >
                            <Search className="h-4 w-4" />
                        </button>
                    </div>
                </form>

                {searching ? (
                    <div className="space-y-4 text-center py-12">
                        <div className="h-12 w-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto shadow-lg shadow-orange-500/20"></div>
                        <p className="text-orange-500/80 animate-pulse text-sm font-medium">Scanning local flyers...</p>
                    </div>
                ) : deals.length > 0 ? (
                    <div className="space-y-4 animate-in slide-in-from-bottom-4 duration-500">
                        <div className="flex items-center justify-between">
                            <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Top Optimization</h2>
                        </div>

                        {deals.map((deal, idx) => (
                            <div key={idx} className="bg-[#0A0A0A] p-4 rounded-xl border border-white/5 shadow-sm flex items-center justify-between group hover:border-orange-500/30 transition-all">
                                <div className="flex items-center gap-4">
                                    <div className={`h-10 w-10 rounded-full ${deal.color} flex items-center justify-center text-white font-bold text-xs ring-2 ring-[#050505]`}>
                                        {deal.store[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{deal.store}</h3>
                                        <p className="text-xs text-neutral-500">{deal.distance}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-lg text-white">{deal.total}</p>
                                    {deal.savings !== '$0.00' && (
                                        <p className="text-xs text-emerald-500 flex items-center justify-end gap-1 font-medium bg-emerald-500/10 px-1.5 py-0.5 rounded ml-auto w-fit">
                                            <TrendingDown className="h-3 w-3" />
                                            Save {deal.savings}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-neutral-600">
                        <div className="h-20 w-20 mx-auto mb-4 bg-neutral-900 rounded-full flex items-center justify-center border border-white/5">
                            <ShoppingCart className="h-8 w-8 opacity-50" />
                        </div>
                        <p className="text-sm">Enter your location to find the cheapest<br />sourcing for your pantry.</p>
                    </div>
                )}
            </main>
        </div>
    );
}
