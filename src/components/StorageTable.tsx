import { useState } from 'react';
import { StorageItem, getStockStatus } from '@/types/storage';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Pencil, Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StorageTableProps {
  items: StorageItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
}

export function StorageTable({ items, onUpdateQuantity }: StorageTableProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<string>('');

  const startEdit = (item: StorageItem) => {
    setEditingId(item.id);
    setEditValue(item.quantity.toString());
  };

  const saveEdit = (id: string) => {
    const newQuantity = parseInt(editValue, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      onUpdateQuantity(id, newQuantity);
    }
    setEditingId(null);
    setEditValue('');
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditValue('');
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
                  {item.unitPrice ? item.unitPrice.toLocaleString() : ''}
                </td>
                <td className="px-4 py-3 text-center">
                  {isEditing ? (
                    <Input
                      type="number"
                      min="0"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
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
                <td className="px-4 py-3 text-center text-sm text-muted-foreground">{item.minStock}</td>
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
