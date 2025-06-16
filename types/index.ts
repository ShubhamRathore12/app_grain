export interface Device {
  id: string;
  name: string;
  model: string;
  status: string;
  imageUrl: any;
  machineStatus?: any;
  internetStatus?: any;
  coolingStatus?: any;
  location?: any;
  company?: any;
  lastMaintenance?: any;
  nextMaintenance?: any;
  serialNumber?: any; // This will be the imported image
}

export interface User {
  id: string;
  email: string;
  name: string;
  isLoggedIn: boolean;
}
