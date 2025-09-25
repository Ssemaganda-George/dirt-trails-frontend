// src/components/ImpactSummary.tsx
import { JSX } from "react";

export interface ImpactItem {
  icon: () => JSX.Element;
  label: string;
  value?: string;
  color?: string;
  bgColor?: string;
}

interface ImpactSummaryProps {
  items: ImpactItem[];
}

const ImpactSummary: React.FC<ImpactSummaryProps> = ({ items }) => {
  return (
    <section className="bg-safari-green/5 py-6 border-b border-safari-green/10">
      <div className="container mx-auto flex flex-wrap justify-center gap-6 text-gray-700">
        {items.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center gap-1 p-2">
            {item.icon && item.icon()}
            {item.value && (
              <span className={`text-lg font-bold ${item.color || ""} ${item.bgColor || ""}`}>
                {item.value}
              </span>
            )}
            <span className="text-sm text-gray-700">{item.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ImpactSummary;
