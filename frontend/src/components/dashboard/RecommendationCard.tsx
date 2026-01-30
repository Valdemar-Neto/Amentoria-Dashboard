import { Lightbulb, ArrowUpRight } from 'lucide-react';

interface RecommendationProps {
  subject: string;
  reason: string;
  action: string;
}

export function RecommendationCard({ subject, reason, action }: RecommendationProps) {
  return (
    <div className="group bg-surface border border-border-subtle p-5 rounded-2xl hover:border-accent transition-all flex justify-between items-center">
      <div className="flex gap-4 items-start">
        <div className="p-3 bg-accent/10 text-accent rounded-xl">
          <Lightbulb size={24} />
        </div>
        <div>
          <h4 className="font-bold text-text-primary">{subject}</h4>
          <p className="text-sm text-text-secondary mb-2">{reason}</p>
          <span className="text-xs font-bold uppercase tracking-wider text-accent">{action}</span>
        </div>
      </div>
      <button className="p-2 rounded-full bg-background group-hover:bg-accent group-hover:text-white transition-all">
        <ArrowUpRight size={20} />
      </button>
    </div>
  );
}