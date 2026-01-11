import Link from 'next/link';
import { ScanLine, Refrigerator, ChefHat, Search, Bell, Menu, ShoppingBag } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white pb-20">

      {/* Top Bar */}
      <header className="flex items-center justify-between px-6 py-6 sticky top-0 z-20 bg-[#050505]/80 backdrop-blur-md">
        <button className="p-2 bg-neutral-800/50 rounded-full border border-white/5">
          <Menu className="h-5 w-5 text-neutral-400" />
        </button>
        <span className="text-sm font-medium tracking-widest uppercase text-neutral-500">PurePlate</span>
        <button className="p-2 bg-neutral-800/50 rounded-full border border-white/5 relative">
          <Bell className="h-5 w-5 text-neutral-400" />
          <span className="absolute top-2 right-2.5 h-2 w-2 bg-red-500 rounded-full border border-[#050505]"></span>
        </button>
      </header>

      <div className="px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Hero / Greeting */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold leading-tight">
            Manage your <br />
            <span className="text-premium-gradient">Smart Kitchen</span>
          </h1>
        </div>

        {/* Search Bar (Visual Only) */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-500 group-focus-within:text-orange-500 transition-colors" />
          <input
            type="text"
            placeholder="Search pantry, recipes..."
            className="w-full h-12 pl-12 pr-4 bg-neutral-900/50 border border-white/10 rounded-2xl focus:outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-neutral-600"
          />
        </div>

        {/* Main Actions (Glowing Cards) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Quick Actions</h2>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Scan Item - Active/Glow Look */}
            <Link href="/pantry/scan" className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-neutral-900/40 border border-orange-500/30 glow-effect relative overflow-hidden group">
              <div className="absolute inset-0 bg-premium-gradient opacity-10 group-hover:opacity-20 transition-opacity"></div>
              <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20">
                <ScanLine className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold tracking-wide text-orange-100">Scan</span>
            </Link>

            {/* Pantry */}
            <Link href="/pantry" className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-white/10 transition-colors group">
              <div className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors text-white">
                <Refrigerator className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-200">Pantry</span>
            </Link>

            {/* Meals */}
            <Link href="/meals" className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-neutral-900/40 border border-white/5 hover:border-white/10 transition-colors group">
              <div className="h-12 w-12 rounded-full bg-neutral-800 flex items-center justify-center group-hover:bg-neutral-700 transition-colors text-white">
                <ChefHat className="h-6 w-6" />
              </div>
              <span className="text-xs font-medium text-neutral-400 group-hover:text-neutral-200">Cook</span>
            </Link>
          </div>
        </div>

        {/* Featured Card (Promo / Stats) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Featured</h2>
            <Link href="/store" className="text-xs text-orange-500 font-medium hover:text-orange-400">See Optimization</Link>
          </div>

          <Link href="/store" className="block relative h-48 rounded-3xl overflow-hidden group">
            {/* Background Image Placeholder - High End Steak */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1546964124-0cce460f38ef?q=80&w=2600"
              alt="Smart Sourcing"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90"></div>

            <div className="absolute bottom-0 left-0 p-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-orange-500/20 border border-orange-500/30 text-orange-400 text-[10px] font-bold uppercase tracking-wider mb-2 backdrop-blur-md">
                <ShoppingBag className="h-3 w-3" />
                Smart Sourcing
              </div>
              <h3 className="text-xl font-bold text-white mb-1">Weekly Optimization</h3>
              <p className="text-sm text-neutral-400 line-clamp-2">Save up to 15% on your groceries by checking local deals.</p>
            </div>
          </Link>
        </div>

      </div>

      {/* Bottom Nav Mockup (Visual Only) */}
      <div className="fixed bottom-0 left-0 w-full p-4 z-20">
        <div className="bg-[#121212]/90 backdrop-blur-xl border border-white/5 rounded-3xl p-1 flex items-center justify-between px-6 h-16 shadow-2xl shadow-black">
          <button className="p-3 text-orange-500 relative">
            <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1 w-1 bg-orange-500 rounded-full glow-effect"></div>
            <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" /></svg>
          </button>
          <button className="p-3 text-neutral-500 hover:text-white transition-colors">
            <Search className="h-6 w-6" />
          </button>
          <button className="p-3 text-neutral-500 hover:text-white transition-colors">
            <ShoppingBag className="h-6 w-6" />
          </button>
          <button className="p-3 text-neutral-500 hover:text-white transition-colors">
            <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
          </button>
        </div>
      </div>
    </main>
  );
}
