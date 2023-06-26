export interface Device {
  id?: string;
  child_id?: string;
  type: 'PHONE' | 'LAPTOP' | 'TABLET' | 'PC';
  brand: string;
}
