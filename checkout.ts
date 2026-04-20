export type Currency = "USD" | "ZWL" | "USDT";

export interface Plan {
  id: string;
  name: string;
  price: number;
  features: string[];
  recommended?: boolean;
}

export interface UserData {
  fullName: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  address: string;
}

export interface PaymentDetails {
  method: string;
  amount: number;
  currency: Currency;
}