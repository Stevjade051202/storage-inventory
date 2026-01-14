import { useState } from 'react';
import { StorageItem } from '@/types/storage';
import { initialStockData } from '@/data/initialStock';
import { StorageTable } from '@/components/StorageTable';
import { StockSummary } from '@/components/StockSummary';
import { Warehouse, Printer } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Index = () => {
  const [items, setItems] = useState<StorageItem[]>(initialStockData);

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity, lastUpdated: new Date() } : item
      )
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-background print:bg-white print:min-h-0">
      <div className="container py-8 max-w-6xl print:max-w-full print:py-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 print:mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg print:hidden">
              <Warehouse className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground print:text-black">Storage Room Inventory</h1>
              <p className="text-sm text-muted-foreground print:text-gray-600">
                Track stock levels across all storage locations
              </p>
            </div>
          </div>
          <Button onClick={handlePrint} variant="outline" className="print:hidden">
            <Printer className="h-4 w-4 mr-2" />
            Print Inventory
          </Button>
        </div>

        {/* Summary Cards */}
        <StockSummary items={items} />

        {/* Table */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 print:shadow-none print:border-gray-300 print:rounded-none">
          <h2 className="text-lg font-semibold mb-4 text-card-foreground print:text-black">All Storage Rooms</h2>
          <StorageTable items={items} onUpdateQuantity={handleUpdateQuantity} />
        </div>

        {/* Legend */}
        <div className="mt-4 flex items-center gap-6 text-sm text-muted-foreground print:text-gray-600">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-stock-available print:bg-green-500" />
            <span>In Stock</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-stock-low print:bg-yellow-500" />
            <span>Low Stock (≤ Min)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-stock-empty print:bg-red-500" />
            <span>Out of Stock (0)</span>
          </div>
        </div>

        {/* Print timestamp */}
        <div className="hidden print:block mt-4 text-sm text-gray-500 text-right">
          Printed on: {new Date().toLocaleString()}
        </div>
      </div>
    </div>
  );
};

export default Index;
