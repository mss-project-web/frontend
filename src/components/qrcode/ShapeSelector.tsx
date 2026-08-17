import React from 'react';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';

export type ShapeOption = {
  id: string;
  label: string;
  renderShape: () => React.ReactNode;
};

interface ShapeSelectorProps {
  label: string;
  options: ShapeOption[];
  value: string;
  onChange: (value: string) => void;
}

export function ShapeSelector({ label, options, value, onChange }: ShapeSelectorProps) {
  return (
    <div className="space-y-2">
      <Label className="text-sm font-semibold text-gray-700">{label}</Label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => onChange(option.id)}
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded bg-white border cursor-pointer",
              value === option.id 
                ? "border-blue-500 shadow-[0_0_0_1px_rgba(59,130,246,1)]" 
                : "border-gray-200 hover:border-gray-300"
            )}
            title={option.label}
          >
            {option.renderShape()}
          </button>
        ))}
      </div>
    </div>
  );
}
