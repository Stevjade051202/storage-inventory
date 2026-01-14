import { StorageItem, getStockStatus } from '@/types/storage';
import { Package, AlertTriangle, XCircle } from 'lucide-react';

interface StockSummaryProps {
  items: StorageItem[];
}

export function StockSummary({ items }: StockSummaryProps) {
  const available = items.filter((item) => getStockStatus(item.quantity, item.minStock) === 'available').length;
  const low = items.filter((item) => getStockStatus(item.quantity, item.minStock) === 'low').length;
  const empty = items.filter((item) => getStockStatus(item.quantity, item.minStock) === 'empty').length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-stock-available-bg border border-stock-available rounded-lg p-4 flex items-center gap-4">
        <div className="p-3 bg-stock-available/10 rounded-full">
          <Package className="h-6 w-6 text-stock-available" />
        </div>
        <div>
          <p className="text-2xl font-bold text-stock-available-foreground">{available}</p>
          <p className="text-sm text-stock-available-foreground/80">In Stock</p>
        </div>
      </div>

      <div className="bg-stock-low-bg border border-stock-low rounded-lg p-4 flex items-center gap-4">
        <div className="p-3 bg-stock-low/10 rounded-full">
          <AlertTriangle className="h-6 w-6 text-stock-low" />
        </div>
        <div>
          <p className="text-2xl font-bold text-stock-low-foreground">{low}</p>
          <p className="text-sm text-stock-low-foreground/80">Low Stock</p>
        </div>
      </div>

      <div className="bg-stock-empty-bg border border-stock-empty rounded-lg p-4 flex items-center gap-4">
        <div className="p-3 bg-stock-empty/10 rounded-full">
          <XCircle className="h-6 w-6 text-stock-empty" />
        </div>
        <div>
          <p className="text-2xl font-bold text-stock-empty-foreground">{empty}</p>
          <p className="text-sm text-stock-empty-foreground/80">Out of Stock</p>
        </div>
      </div>
    </div>
  );
}
