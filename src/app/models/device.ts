export interface Device {
  id?: number;
  child_id?: number;
  type: 'phone' | 'laptop' | 'tablet' | 'pc';
  brand: string;
}
