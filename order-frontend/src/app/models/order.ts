export interface Order {
  id: number;
  code: number;
  code_year: number;
  date_register: string;
  customer_id: number;
  creator_id: number;
  order_units: [];
  customer_name: string;
}
