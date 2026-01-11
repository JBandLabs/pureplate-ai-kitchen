'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import { IDetectedBarcode } from '@yudiel/react-qr-scanner';
import { ArrowLeft, Plus, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FoodDataService, ProductData } from '@/services/FoodDataService';
import { usePantry } from '@/hooks/usePantry';

// Dynamic import for client-side only rendering of the scanner
const BarcodeScanner = dynamic(
    () => import('@/components/features/pantry/BarcodeScanner').then(mod => mod.BarcodeScanner),
    { ssr: false }
);

export default function ScanPage() {
    const [activeTab, setActiveTab] = useState<'scan' | 'manual'>('scan');
    const [manualName, setManualName] = useState('');
    const [scannedItems, setScannedItems] = useState<ProductData[]>([]);
    const [isScanning, setIsScanning] = useState(true);
    const [scannerError, setScannerError] = useState<string | null>(null);
    const { addItem } = usePantry();
    const router = useRouter();

    const handleScan = async (detectedCodes: IDetectedBarcode[]) => {
        if (detectedCodes && detectedCodes.length > 0) {
            const newCode = detectedCodes[0];
            const rawValue = newCode.rawValue;

            // Clear any previous errors
            setScannerError(null);

            // Prevent duplicate scans for the session
            const alreadyScanned = scannedItems.some(item => item.code === rawValue);
            if (alreadyScanned) return;

            try {
                // Determine format if needed, but API just takes the string
                const product = await FoodDataService.getProductByBarcode(rawValue);

                if (product) {
                    setScannedItems(prev => [product, ...prev]);
                    if (typeof navigator !== 'undefined' && navigator.vibrate) {
                        navigator.vibrate(200);
                    }
                } else {
                    // Handle unknown product
                    setScannedItems(prev => [{ code: rawValue, product_name: 'Unknown Item' }, ...prev]);
                }
            } catch (e) {
                console.error("Scan error", e);
                setScannerError("Failed to fetch product data");
            }
        }
    };

    const handleScannerError = (error: unknown) => {
        console.error("Scanner error:", error);

        // Provide user-friendly error messages
        if (error instanceof Error) {
            if (error.message.includes('Permission')) {
                setScannerError("Camera permission denied. Please allow camera access in your browser settings.");
            } else if (error.message.includes('NotFound')) {
                setScannerError("No camera found on this device.");
            } else if (error.message.includes('NotAllowed')) {
                setScannerError("Camera access blocked. Please check your browser permissions.");
            } else if (error.message.includes('NotReadable')) {
                setScannerError("Camera is in use by another app. Please close other camera apps.");
            } else {
                setScannerError(`Camera error: ${error.message}`);
            }
        } else {
            setScannerError("Unable to access camera. Please try again.");
        }
    };

    const handleAddToPantry = (item: ProductData) => {
        addItem(item);
        // Remove from temporary list
        setScannedItems(prev => prev.filter(i => i.code !== item.code));

        if (typeof navigator !== 'undefined' && navigator.vibrate) {
            navigator.vibrate(50);
        }
    };

    const handleManualSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!manualName.trim()) return;

        const newItem: ProductData = {
            code: `manual-${Date.now()}`,
            product_name: manualName,
            brands: 'Pantry Item',
            image_url: ''
        };

        addItem(newItem);
        setManualName('');
        // Optional confirmation or redirect
        router.push('/pantry');
    };

    const retryScan = () => {
        setScannerError(null);
        setIsScanning(false);
        setTimeout(() => setIsScanning(true), 100);
    };

    return (
        <div className="flex min-h-screen flex-col bg-[#050505] text-white">
            {/* Header */}
            <header className="sticky top-0 z-10 flex items-center justify-between px-6 py-4 bg-[#050505]/80 backdrop-blur-md border-b border-white/5">
                <Link href="/pantry" className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors text-neutral-400 hover:text-white">
                    <ArrowLeft className="h-6 w-6" />
                </Link>
                <div className="flex bg-[#0A0A0A] border border-white/5 p-1 rounded-xl">
                    <button
                        onClick={() => setActiveTab('scan')}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'scan' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-neutral-500 hover:text-white'}`}
                    >
                        Scan
                    </button>
                    <button
                        onClick={() => setActiveTab('manual')}
                        className={`px-6 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${activeTab === 'manual' ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20' : 'text-neutral-500 hover:text-white'}`}
                    >
                        Manual
                    </button>
                </div>
                <div className="w-10"></div>
            </header>

            <main className="flex-1 p-6 flex flex-col gap-6 max-w-md mx-auto w-full">

                {activeTab === 'scan' ? (
                    <>
                        {/* Error Display */}
                        {scannerError && (
                            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-4 flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                                <div className="flex-1">
                                    <p className="text-sm text-red-200 font-medium">{scannerError}</p>
                                    <button
                                        onClick={retryScan}
                                        className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
                                    >
                                        Try Again
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Scanner Container */}
                        <div className="w-full relative group">
                            {/* Neon Glow around scanner */}
                            <div className="absolute -inset-0.5 bg-premium-gradient rounded-2xl opacity-20 group-hover:opacity-40 transition-opacity blur-md"></div>

                            {isScanning && !scannerError ? (
                                <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl shadow-black">
                                    <BarcodeScanner
                                        onScan={handleScan}
                                        onError={handleScannerError}
                                    />
                                    <div className="absolute top-4 left-0 right-0 text-center pointer-events-none">
                                        <span className="px-3 py-1 bg-black/50 text-white text-[10px] uppercase font-bold tracking-widest rounded-full backdrop-blur-sm">Align Barcode</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="aspect-square w-full bg-[#0A0A0A] border border-white/10 rounded-xl flex items-center justify-center text-neutral-500 relative z-10">
                                    {scannerError ? 'Camera Error' : 'Scanner Paused'}
                                </div>
                            )}
                        </div>

                        {/* Helpful Tips for Mobile */}
                        <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4">
                            <p className="text-xs text-blue-200 font-medium mb-2">📱 Mobile Tips:</p>
                            <ul className="text-[10px] text-blue-300/80 space-y-1">
                                <li>• Make sure camera permissions are enabled</li>
                                <li>• Hold barcode 6-8 inches from camera</li>
                                <li>• Ensure good lighting</li>
                                <li>• Try using Chrome or Samsung Internet browser</li>
                            </ul>
                        </div>

                        {/* Results List */}
                        <div className="flex-1 space-y-4">
                            <div className="flex items-center justify-between">
                                <h2 className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Scanned Items</h2>
                                <span className="text-[10px] bg-neutral-900 border border-white/10 px-2 py-1 rounded-full text-neutral-400">{scannedItems.length}</span>
                            </div>

                            {scannedItems.length === 0 ? (
                                <div className="text-center py-12 text-neutral-600 border border-dashed border-white/10 rounded-2xl bg-white/5">
                                    <div className="h-10 w-10 mx-auto mb-2 opacity-50 bg-neutral-800 rounded-full flex items-center justify-center">📷</div>
                                    <p className="text-sm">Ready to scan.</p>
                                </div>
                            ) : (
                                <ul className="space-y-3">
                                    {scannedItems.map((item, idx) => (
                                        <li key={`${item.code}-${idx}`} className="bg-[#0A0A0A] border border-white/5 p-4 rounded-xl flex items-center justify-between animate-in slide-in-from-bottom-2 fade-in duration-300 group hover:border-orange-500/30 transition-all">
                                            <div className="flex items-center gap-4">
                                                {item.image_url ? (
                                                    /* eslint-disable-next-line @next/next/no-img-element */
                                                    <img src={item.image_url} alt={item.product_name} className="h-12 w-12 rounded-lg object-cover bg-neutral-900" />
                                                ) : (
                                                    <div className="h-12 w-12 rounded-lg bg-neutral-900 flex items-center justify-center text-xs text-neutral-500 border border-white/5">?</div>
                                                )}
                                                <div>
                                                    <p className="font-bold text-white line-clamp-1">{item.product_name || 'Unknown Product'}</p>
                                                    <p className="text-[10px] text-neutral-500 uppercase tracking-wider">{item.brands || item.code}</p>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleAddToPantry(item)}
                                                className="h-8 w-8 rounded-full bg-orange-500/10 hover:bg-orange-500 text-orange-500 hover:text-white flex items-center justify-center transition-all border border-orange-500/20">
                                                <Plus className="h-4 w-4" />
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col gap-4 animate-in fade-in slide-in-from-right-4 duration-300">
                        <div className="bg-[#0A0A0A] p-6 rounded-2xl border border-white/5 shadow-2xl">
                            <h2 className="text-lg font-bold text-white mb-4">Add Item Manually</h2>
                            <form onSubmit={handleManualSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-xs font-bold text-neutral-500 mb-2 uppercase tracking-wider">Item Name</label>
                                    <input
                                        type="text"
                                        value={manualName}
                                        onChange={(e) => setManualName(e.target.value)}
                                        placeholder="e.g. Organic Kale"
                                        className="w-full p-4 rounded-xl border border-white/10 bg-[#050505] text-white focus:ring-1 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all placeholder:text-neutral-700"
                                        autoFocus
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={!manualName.trim()}
                                    className="w-full py-4 bg-premium-gradient text-white font-bold rounded-xl hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-orange-500/20"
                                >
                                    ADD TO PANTRY
                                </button>
                            </form>
                        </div>
                    </div>
                )}

            </main>
        </div>
    );
}
