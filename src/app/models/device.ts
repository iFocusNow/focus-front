export interface Device {
  id?: string;
  child_id?: string
  type: 'phone' | 'laptop' | 'tablet' | 'pc';
  brand: string;
}
