
import { Database } from "@/integrations/supabase/types";

// Type for order records from Supabase
export type OrderRecord = Database['public']['Tables']['orders']['Row'];
export type OrderItemRecord = Database['public']['Tables']['order_items']['Row'];
export type ProfileRecord = Database['public']['Tables']['profiles']['Row'];

// Enhanced types for our application
export interface EnhancedOrder extends OrderRecord {
  items?: OrderItemRecord[];
}
