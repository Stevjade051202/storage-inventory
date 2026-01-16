import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { StorageItem } from '@/types/storage';
import { initialStockData } from '@/data/initialStock';
import { StorageTable } from '@/components/StorageTable';
import { StockSummary } from '@/components/StockSummary';
import { useAuth } from '@/contexts/AuthContext';
import { Warehouse, Printer, Search, Calendar, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  const [items, setItems] = useState<StorageItem[]>(initialStockData);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().slice(0, 10)
  );
  const [searchTerm, setSearchTerm] = useState('');
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const filteredItems = items.filter((item) => {
    const query = searchTerm.toLowerCase().trim();
    if (!query) return true;

    return (
      item.name.toLowerCase().includes(query)
    );
  });

  const handleUpdateItem = (
    id: string,
    changes: { quantity: number; unitPrice: number; minStock: number }
  ) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, ...changes, lastUpdated: new Date() } : item
      )
    );
  };

  const handlePrint = () => {
    window.print();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background print:bg-white print:min-h-0">
      <div className="container py-8 max-w-6xl print:max-w-full print:py-4">
        {/* Header */}
        <div className="flex flex-col gap-4 mb-8 print:mb-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg print:hidden">
              <Warehouse className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground print:text-black">
                Storage Room Inventory
              </h1>
              <p className="text-sm text-muted-foreground print:text-gray-600">
                Track stock levels across all storage locations
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4 print:hidden">
            <div className="relative w-full sm:w-48">
              <Calendar className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex items-center gap-2">
              {user && (
                <span className="text-sm text-muted-foreground hidden sm:inline">
                  {user.username}
                </span>
              )}
              <Button onClick={handlePrint} variant="outline">
                <Printer className="h-4 w-4 mr-2" />
                Print Inventory
              </Button>
              <Button onClick={handleLogout} variant="outline">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <StockSummary items={items} />

        {/* Table + Search */}
        <div className="bg-card rounded-xl shadow-sm border border-border p-4 print:shadow-none print:border-gray-300 print:rounded-none">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-lg font-semibold text-card-foreground print:text-black">All Storage Rooms</h2>
            <div className="relative w-full sm:w-64 print:hidden">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name, location, or category"
                className="pl-9"
              />
            </div>
          </div>
          <StorageTable items={filteredItems} onUpdateItem={handleUpdateItem} />
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
