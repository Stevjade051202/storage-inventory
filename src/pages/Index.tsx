import { useState } from 'react';
import { StorageItem } from '@/types/storage';
import { initialStockData } from '@/data/initialStock';
import { StorageTable } from '@/components/StorageTable';
import { StockSummary } from '@/components/StockSummary';
import { Warehouse } from 'lucide-react';

const Index = () => {
  const [items, setItems] = useState<StorageItem[]>(initialStockData);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity, lastUpdated: new Date() } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Warehouse className="h-8 w-8 text-primary" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Storage Room Inventory</h1>
            <p className="text-sm text-muted-foreground">
              Track stock levels across all storage locations
            </p>
          </div>
        </div>

        {/* Summary Cards */}
        <StockSummary items={items} />

        {/* Table */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4">
          <h2 className="text-lg font-semibold mb-4 text-card-foreground">All Storage Rooms</h2>
          <StorageTable items={items} onUpdateQuantity={handleUpdateQuantity} />
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-stock-available" />
            <span>In Stock</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-stock-low" />
            <span>Low Stock (≤ Min)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-stock-empty" />
            <span>Out of Stock (0)</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
