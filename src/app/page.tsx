import Link from 'next/link';
import { ScanLine, Search, Bell, Menu, ShoppingBag, Calendar, Sparkles, User, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <main className="min-h-screen bg-[#F5F5F0] text-[#2C3E2E] pb-24 font-sans selection:bg-[#D8E3D6]">

      {/* Header Content */}
      <div className="pt-8 px-6 pb-6 flex items-center justify-between bg-[#F5F5F0] sticky top-0 z-20/95 backdrop-blur-sm">
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-[#6B7B6B] tracking-wide mb-0.5">Hello, Alex</span>
          <h1 className="text-2xl font-bold text-[#2C3E2E] tracking-tight">PurePlate AI</h1>
        </div>
        <div className="flex items-center gap-3">
          <button className="h-10 w-10 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-[#E5E5E0] flex items-center justify-center relative active:scale-95 transition-transform">
            <Bell className="h-5 w-5 text-[#2C3E2E]" strokeWidth={2} />
            <span className="absolute top-2.5 right-2.5 h-1.5 w-1.5 bg-[#FF6B6B] rounded-full ring-1 ring-white"></span>
          </button>
          <div className="h-10 w-10 rounded-full bg-[#E5E5E0] overflow-hidden border border-white shadow-sm">
            <div className="h-full w-full flex items-center justify-center bg-[#D8E3D6]">
              <User className="h-5 w-5 text-[#6B7B6B]" />
            </div>
          </div>
        </div>
      </div>

      <div className="px-6 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

        {/* Primary Action: "Scan My Kitchen" - High Polish */}
        <Link href="/pantry/scan" className="group block relative w-full h-36 rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-all hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] active:scale-[0.99]">
          {/* Background Image - Fresh Kitchen/Ingredients */}
          <img
            src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=800&auto=format&fit=crop"
            alt="Kitchen Ingredients"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>

          <div className="absolute inset-0 flex items-center justify-between p-6">
            <div className="flex flex-col gap-1 text-white">
              <div className="flex items-center gap-2 mb-1">
                <div className="bg-white/20 backdrop-blur-md p-1.5 rounded-lg">
                  <ScanLine className="h-4 w-4 text-white" />
                </div>
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">AI Vision</span>
              </div>
              <h2 className="text-2xl font-bold leading-tight">Scan My<br />Kitchen</h2>
            </div>

            <div className="h-12 w-12 bg-white rounded-full flex items-center justify-center shadow-lg transform group-hover:rotate-45 transition-transform duration-500">
              <ArrowRight className="h-5 w-5 text-[#2C3E2E]" />
            </div>
          </div>
        </Link>

        {/* "My Kitchen" Section - Food First Design */}
        <div>
          <div className="flex justify-between items-end mb-5">
            <h2 className="text-xl font-bold text-[#2C3E2E]">My Kitchen</h2>
            <Link href="/pantry" className="text-sm font-semibold text-[#8B9D83] hover:text-[#6B7B6B] transition-colors">View All</Link>
          </div>

          <div className="space-y-4">

            {/* Pantry Summary Card */}
            <Link href="/pantry" className="flex bg-white p-3 pr-4 rounded-[1.5rem] shadow-[0_2px_12px_rgba(0,0,0,0.04)] active:scale-[0.99] transition-transform items-center gap-4">
              <div className="h-20 w-20 flex-shrink-0 rounded-2xl overflow-hidden relative bg-[#F0F0F0]">
                <img src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?q=80&w=300&auto=format&fit=crop" alt="Pantry" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex-1 py-1">
                <h3 className="font-bold text-[#2C3E2E] text-lg mb-0.5">My Pantry</h3>
                <p className="text-[#6B7B6B] text-sm leading-snug">
                  12 items in stock <br />
                  <span className="text-[#E6AA68] font-medium text-xs">3 expiring soon</span>
                </p>
              </div>
              <div className="h-8 w-8 rounded-full border border-[#E5E5E0] flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-[#A0A0A0]" />
              </div>
            </Link>

            {/* Meal Plan Card */}
            <Link href="/meals" className="flex bg-white p-3 pr-4 rounded-[1.5rem] shadow-[0_2px_12px_rgba(0,0,0,0.04)] active:scale-[0.99] transition-transform items-center gap-4">
              <div className="h-20 w-20 flex-shrink-0 rounded-2xl overflow-hidden relative bg-[#F0F0F0]">
                <img src="https://images.unsplash.com/photo-1547592180-85ef29a3b858?q=80&w=300&auto=format&fit=crop" alt="Meal" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex-1 py-1">
                <h3 className="font-bold text-[#2C3E2E] text-lg mb-0.5">Tonight's Dinner</h3>
                <p className="text-[#6B7B6B] text-sm leading-snug">
                  Lemon Herb Chicken <br />
                  <span className="text-[#8B9D83] font-medium text-xs">Ready in 30m</span>
                </p>
              </div>
              <div className="h-8 w-8 rounded-full border border-[#E5E5E0] flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-[#A0A0A0]" />
              </div>
            </Link>

            {/* Shopping List Card */}
            <Link href="/store" className="flex bg-white p-3 pr-4 rounded-[1.5rem] shadow-[0_2px_12px_rgba(0,0,0,0.04)] active:scale-[0.99] transition-transform items-center gap-4">
              <div className="h-20 w-20 flex-shrink-0 rounded-2xl overflow-hidden relative bg-[#F0F0F0]">
                <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=300&auto=format&fit=crop" alt="Shopping" className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="flex-1 py-1">
                <h3 className="font-bold text-[#2C3E2E] text-lg mb-0.5">Shopping List</h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="bg-[#8B9D83]/10 text-[#5A7A1D] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">Optimization Ready</span>
                </div>
              </div>
              <div className="h-8 w-8 rounded-full border border-[#E5E5E0] flex items-center justify-center">
                <ArrowRight className="h-4 w-4 text-[#A0A0A0]" />
              </div>
            </Link>

          </div>
        </div>

      </div>

      {/* Bottom Nav - Clean, labeled, matching reference */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#E5E5E0] pb-8 pt-3 px-8 z-50 rounded-t-[2.5rem] shadow-[0_-8px_30px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between max-w-sm mx-auto">
          <Link href="/" className="flex flex-col items-center gap-1.5 group">
            <div className="h-6 w-12 bg-[#2C3E2E] rounded-full flex items-center justify-center text-white shadow-md shadow-[#2C3E2E]/20">
              <Calendar className="h-3.5 w-3.5" strokeWidth={3} />
            </div>
            <span className="text-[10px] font-bold text-[#2C3E2E]">My Week</span>
          </Link>

          <Link href="/pantry" className="flex flex-col items-center gap-1.5 group">
            <div className="h-6 w-12 flex items-center justify-center text-[#A0A0A0] group-hover:text-[#6B7B6B] transition-colors">
              <Search className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-semibold text-[#A0A0A0] group-hover:text-[#6B7B6B]">Explore</span>
          </Link>

          <Link href="/meals" className="flex flex-col items-center gap-1.5 group">
            <div className="h-6 w-12 flex items-center justify-center text-[#A0A0A0] group-hover:text-[#6B7B6B] transition-colors">
              <Sparkles className="h-5 w-5" strokeWidth={2.5} />
            </div>
            <span className="text-[10px] font-semibold text-[#A0A0A0] group-hover:text-[#6B7B6B]">AI Chef</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
