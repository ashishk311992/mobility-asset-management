export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  status: 'active' | 'maintenance' | 'retired';
  ownershipType: 'owned' | 'leased' | 'rented';
  mileage: number;
  lastService: string;
  nextService: string;
  location: {
    lat: number;
    lng: number;
  };
}

export interface MaintenanceRecord {
  id: string;
  vehicleId: string;
  date: string;
  type: 'routine' | 'repair' | 'emergency';
  description: string;
  cost: number;
  provider: string;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'fleet_manager' | 'finance_manager';
  email: string;
}