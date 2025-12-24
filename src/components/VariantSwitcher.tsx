import { Palette } from 'lucide-react';

export type DesignVariant = 'material' | 'glassmorphism' | 'dark' | 'neo' | 'vibrant';

interface VariantSwitcherProps {
  currentVariant: DesignVariant;
  onVariantChange: (variant: DesignVariant) => void;
}

export function VariantSwitcher({ currentVariant, onVariantChange }: VariantSwitcherProps) {
  const variants: { id: DesignVariant; name: string; colors: string }[] = [
    { id: 'material', name: 'Material', colors: 'bg-gradient-to-r from-purple-600 to-blue-500' },
    { id: 'glassmorphism', name: 'Glass', colors: 'bg-gradient-to-r from-blue-400/60 to-purple-400/60' },
    { id: 'dark', name: 'Dark', colors: 'bg-gradient-to-r from-gray-900 to-slate-800' },
    { id: 'neo', name: 'Neo', colors: 'bg-gradient-to-r from-emerald-500 to-cyan-500' },
    { id: 'vibrant', name: 'Vibrant', colors: 'bg-gradient-to-r from-orange-500 to-pink-500' },
  ];

  return (
    <div className="fixed top-4 left-4 z-50 bg-white/95 backdrop-blur-sm rounded-2xl shadow-lg p-2 max-w-md">
      <div className="flex items-center gap-2">
        <Palette size={16} className="text-gray-600 ml-1" />
        <div className="flex gap-2">
          {variants.map((variant) => (
            <button
              key={variant.id}
              onClick={() => onVariantChange(variant.id)}
              className={`px-3 py-1.5 rounded-xl text-xs transition-all ${
                currentVariant === variant.id
                  ? 'bg-gray-900 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {variant.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
