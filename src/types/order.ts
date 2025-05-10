
import { Database } from "@/integrations/supabase/types";

// Type for order records from Supabase
export type OrderRecord = Database['public']['Tables']['orders']['Row'];
export type OrderItemRecord = Database['public']['Tables']['order_items']['Row'];
export type ProfileRecord = Database['public']['Tables']['profiles']['Row'];

// Enhanced types for our application
export interface EnhancedOrder extends OrderRecord {
  items?: OrderItemRecord[];
}

// Interface for tracking response from PhonePe
export interface PhonePeResponse {
  success: boolean;
  code: string;
  message: string;
  data?: {
    merchantId?: string;
    merchantTransactionId: string;
    instrumentResponse?: {
      type: string;
      redirectInfo?: {
        url: string;
      };
    };
  };
}

// Interface for PhonePe payment status check
export interface PaymentStatusResponse {
  success: boolean;
  code: string;
  message: string;
  data?: {
    merchantId?: string;
    merchantTransactionId: string;
    transactionId?: string;
    amount?: number;
    state?: string;
    responseCode?: string;
  };
}
