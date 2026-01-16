import { useState } from 'react';
import { StorageItem, getStockStatus } from '@/types/storage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StorageTableProps {
  items: StorageItem[];
  onUpdateItem: (id: string, changes: { quantity: number; unitPrice: number; minStock: number }) => void;
}

export function StorageTable({ items, onUpdateItem }: StorageTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editQuantity, setEditQuantity] = useState<string>('');
  const [editUnitPrice, setEditUnitPrice] = useState<string>('');
  const [editMinStock, setEditMinStock] = useState<string>('');

  const startEdit = (item: StorageItem) => {
    setEditingId(item.id);
    setEditQuantity(item.quantity.toString());
    setEditUnitPrice(item.unitPrice.toString());
    setEditMinStock(item.minStock.toString());
  };

  const saveEdit = (id: string) => {
    const newQuantity = parseInt(editQuantity, 10);
    const newUnitPrice = parseFloat(editUnitPrice);
    const newMinStock = parseInt(editMinStock, 10);

    if (
      !isNaN(newQuantity) &&
      newQuantity >= 0 &&
      !isNaN(newUnitPrice) &&
      newUnitPrice >= 0 &&
      !isNaN(newMinStock) &&
      newMinStock >= 0
    ) {
      onUpdateItem(id, { quantity: newQuantity, unitPrice: newUnitPrice, minStock: newMinStock });
    }
    setEditingId(null);
    setEditQuantity('');
    setEditUnitPrice('');
    setEditMinStock('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditQuantity('');
    setEditUnitPrice('');
    setEditMinStock('');
  };

  const getRowClasses = (quantity: number, minStock: number) => {
    const status = getStockStatus(quantity, minStock);
    return {
      available: 'bg-stock-available-bg hover:bg-stock-available-bg/80',
      low: 'bg-stock-low-bg hover:bg-stock-low-bg/80',
      empty: 'bg-stock-empty-bg hover:bg-stock-empty-bg/80',
    }[status];
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border shadow-sm">
      <table className="w-full">
        <thead>
          <tr className="bg-muted/50 border-b border-border">
            <th className="text-left px-4 py-3 text-sm font-semibold text-foreground">Item Name</th>
            <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">Unit Cost</th>
            <th className="text-right px-4 py-3 text-sm font-semibold text-foreground">Unit Price</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-foreground">Current Stock</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-foreground">Minimum Stock</th>
            <th className="text-center px-4 py-3 text-sm font-semibold text-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => {
            const status = getStockStatus(item.quantity, item.minStock);
            const isEditing = editingId === item.id;

            return (
              <tr
                key={item.id}
                className={cn(
                  'border-b border-border last:border-b-0 transition-colors',
                  getRowClasses(item.quantity, item.minStock)
                )}
              >
                <td className="px-4 py-3 text-sm font-medium text-foreground">{item.name}</td>
                <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                  {item.unitCost ? item.unitCost.toLocaleString() : ''}
                </td>
                <td className="px-4 py-3 text-right text-sm text-muted-foreground">
                  {isEditing ? (
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      value={editUnitPrice}
                      onChange={(e) => setEditUnitPrice(e.target.value)}
                      className="w-24 text-right h-8"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(item.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                    />
                  ) : (
                    item.unitPrice ? item.unitPrice.toLocaleString() : ''
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {isEditing ? (
                    <Input
                      type="number"
                      min="0"
                      value={editQuantity}
                      onChange={(e) => setEditQuantity(e.target.value)}
                      className="w-20 mx-auto text-center h-8"
                      autoFocus
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(item.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                    />
                  ) : (
                    <span className="text-sm font-semibold">{item.quantity}</span>
                  )}
                </td>
                <td className="px-4 py-3 text-center text-sm text-muted-foreground">
                  {isEditing ? (
                    <Input
                      type="number"
                      min="0"
                      value={editMinStock}
                      onChange={(e) => setEditMinStock(e.target.value)}
                      className="w-20 mx-auto text-center h-8"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') saveEdit(item.id);
                        if (e.key === 'Escape') cancelEdit();
                      }}
                    />
                  ) : (
                    item.minStock
                  )}
                </td>
                <td className="px-4 py-3 text-center">
                  {isEditing ? (
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => saveEdit(item.id)}
                      >
                        <Check className="h-4 w-4 text-stock-available" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={cancelEdit}
                      >
                        <X className="h-4 w-4 text-stock-empty" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => startEdit(item)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
