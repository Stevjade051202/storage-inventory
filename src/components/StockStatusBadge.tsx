import { StockStatus } from '@/types/storage';
import { cn } from '@/lib/utils';

interface StockStatusBadgeProps {
  status: StockStatus;
  className?: string;
}

export function StockStatusBadge({ status, className }: StockStatusBadgeProps) {
  const statusConfig = {
    available: {
      label: 'In Stock',
      classes: 'bg-stock-available-bg text-stock-available-foreground border-stock-available',
    },
    low: {
      label: 'Low Stock',
      classes: 'bg-stock-low-bg text-stock-low-foreground border-stock-low',
    },
    empty: {
      label: 'Out of Stock',
      classes: 'bg-stock-empty-bg text-stock-empty-foreground border-stock-empty',
    },
  };

  const config = statusConfig[status];

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border',
        config.classes,
        className
      )}
    >
      {config.label}
    </span>
  );
}
