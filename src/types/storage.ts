export interface StorageItem {
  id: string;
  name: string;
  location: string;
  quantity: number;
  minStock: number;
  uom: string;
  unitCost: number;
  unitPrice: number;
  category: string;
  lastUpdated: Date;
}

export type StockStatus = 'available' | 'low' | 'empty';

export function getStockStatus(quantity: number, minStock: number): StockStatus {
  if (quantity === 0) return 'empty';
  if (quantity <= minStock) return 'low';
  return 'available';
}
