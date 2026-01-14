import { StorageItem } from '@/types/storage';

export const initialStockData: StorageItem[] = [
  { id: '1', name: 'Office Supplies', location: 'Room A-101', quantity: 150, minStock: 20, category: 'Supplies', lastUpdated: new Date() },
  { id: '2', name: 'Cleaning Products', location: 'Room A-102', quantity: 0, minStock: 10, category: 'Maintenance', lastUpdated: new Date() },
  { id: '3', name: 'Electronics', location: 'Room B-201', quantity: 45, minStock: 5, category: 'Equipment', lastUpdated: new Date() },
  { id: '4', name: 'Paper Stock', location: 'Room A-103', quantity: 5, minStock: 50, category: 'Supplies', lastUpdated: new Date() },
  { id: '5', name: 'Safety Equipment', location: 'Room C-301', quantity: 0, minStock: 15, category: 'Safety', lastUpdated: new Date() },
  { id: '6', name: 'Tools & Hardware', location: 'Room B-202', quantity: 89, minStock: 10, category: 'Equipment', lastUpdated: new Date() },
  { id: '7', name: 'First Aid Kits', location: 'Room C-302', quantity: 12, minStock: 10, category: 'Safety', lastUpdated: new Date() },
  { id: '8', name: 'Packaging Materials', location: 'Room A-104', quantity: 0, minStock: 30, category: 'Supplies', lastUpdated: new Date() },
  { id: '9', name: 'Furniture', location: 'Room D-401', quantity: 23, minStock: 5, category: 'Equipment', lastUpdated: new Date() },
  { id: '10', name: 'IT Equipment', location: 'Room B-203', quantity: 8, minStock: 15, category: 'Equipment', lastUpdated: new Date() },
];
