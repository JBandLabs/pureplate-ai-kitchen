'use client';

import { Scanner, IDetectedBarcode } from '@yudiel/react-qr-scanner';

interface BarcodeScannerProps {
    onScan: (detectedCodes: IDetectedBarcode[]) => void;
    onError?: (error: unknown) => void;
}

export function BarcodeScanner({ onScan, onError }: BarcodeScannerProps) {
    return (
        <div className="relative overflow-hidden rounded-xl border border-neutral-200 bg-neutral-100 shadow-inner dark:border-neutral-800 dark:bg-neutral-900">
            <Scanner
                onScan={onScan}
                onError={onError}
                formats={[
                    'ean_13',
                    'ean_8',
                    'upc_a',
                    'upc_e',
                    'code_128',
                    'code_39',
                    'qr_code'
                ]} // Support more barcode formats
                scanDelay={500} // Scan every 500ms for better detection
                components={{
                    torch: true,  // Enable flash
                    finder: true, // Show finder overlay
                }}
                styles={{
                    container: {
                        width: '100%',
                        aspectRatio: '1/1',
                    }
                }}
                constraints={{
                    facingMode: 'environment', // Use back camera
                    aspectRatio: 1,
                }}
            />

            {/* Visual Overlay for Zen Aesthetic */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                <div className="h-64 w-64 rounded-3xl border-2 border-white/50 bg-transparent shadow-[0_0_0_9999px_rgba(0,0,0,0.5)]" />
            </div>
            <div className="absolute bottom-4 left-0 right-0 text-center text-sm font-medium text-white/80 pointer-events-none">
                Align barcode within the frame
            </div>
        </div>
    );
}
