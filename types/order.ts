
import type { FulfillmentMode } from "@/data/store-types";
import type { PrintSettings } from "@/lib/order-draft";

export type OrderStatus =
  | "awaiting_acceptance"
  | "processing"
  | "ready_for_pickup"
  | "completed"
  | "cancelled";

export type OrderTab =
  | "active"
  | "completed"
  | "all"
  | "cancelled";

export interface PrintOrder {
  id: string;
  status: OrderStatus;
  submittedAt: string;
  shopName: string;
  shopInitials: string;
  shopAddress?: string;
  rating: number;
  location: string;
  total: number;
  balanceDue: number;
  paymentMethod: string;
  pickupPin?: string;
  pickupToken?: string;
  documentName?: string;
  documentPages?: number;
  documentSize?: string;
  documentCost?: number;
  deliveryFee?: number;
  wrapperFee?: number;
  settings?: PrintSettings;
  fulfillment?: FulfillmentMode;
}

export const sampleOrders: PrintOrder[] = [
  {
    id: "OMX-3547",
    status: "awaiting_acceptance",
    submittedAt: "2026-10-26T12:05:00+05:30",
    shopName: "Tamil Printers",
    shopInitials: "TP",
    shopAddress:
      "No.4 Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu 612302",
    rating: 5.0,
    location: "Bismi Nagar, Kumbakonam",
    documentName: "SaravananK(UIUX).pdf",
    documentPages: 24,
    documentSize: "0.2 MB (194 KB)",
    total: 1.54,
    balanceDue: 1.54,
    paymentMethod: "Pay at Counter (Cash/UPI)",
    pickupPin: "8492",
    pickupToken: "OMX-3547-TN-CHE",
  },
  {
    id: "OMX-3548",
    status: "processing",
    submittedAt: "2026-10-25T09:20:00+05:30",
    shopName: "Sakthi Xerox & Stationery",
    shopInitials: "SX",
    shopAddress: "Bazaar Street, Kumbakonam, Tamil Nadu 612001",
    rating: 4.8,
    location: "Bazaar Street, Kumbakonam",
    documentName: "Lab Record Final.pdf",
    documentPages: 12,
    documentSize: "1.4 MB",
    total: 24.0,
    balanceDue: 0,
    paymentMethod: "UPI Paid",
    pickupPin: "1375",
    pickupToken: "OMX-3548-TN-KUM",
  },
  {
    id: "OMX-3549",
    status: "ready_for_pickup",
    submittedAt: "2026-10-24T16:40:00+05:30",
    shopName: "Sri Balaji Printers",
    shopInitials: "SB",
    shopAddress: "College Road, Kumbakonam, Tamil Nadu 612001",
    rating: 4.9,
    location: "College Road, Kumbakonam",
    documentName: "Seminar Report.pdf",
    documentPages: 42,
    documentSize: "3.8 MB",
    total: 63.5,
    balanceDue: 63.5,
    paymentMethod: "Pay at Counter (Cash/UPI)",
    pickupPin: "6621",
    pickupToken: "OMX-3549-TN-KUM",
  },
  {
    id: "OMX-3550",
    status: "completed",
    submittedAt: "2026-10-20T11:15:00+05:30",
    shopName: "Tamil Printers",
    shopInitials: "TP",
    shopAddress:
      "No.4 Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu 612302",
    rating: 5.0,
    location: "Bismi Nagar, Kumbakonam",
    documentName: "Assignment Set 2.pdf",
    documentPages: 6,
    documentSize: "0.6 MB",
    total: 12.4,
    balanceDue: 0,
    paymentMethod: "UPI Paid",
    pickupPin: "2048",
    pickupToken: "OMX-3550-TN-KUM",
  },
  {
    id: "OMX-3551",
    status: "cancelled",
    submittedAt: "2026-10-15T14:30:00+05:30",
    shopName: "Sakthi Xerox & Stationery",
    shopInitials: "SX",
    shopAddress: "Bazaar Street, Kumbakonam, Tamil Nadu 612001",
    rating: 4.8,
    location: "Bazaar Street, Kumbakonam",
    documentName: "Bonafide Certificate.pdf",
    documentPages: 1,
    documentSize: "0.1 MB",
    total: 8.2,
    balanceDue: 0,
    paymentMethod: "Refunded to UPI",
  },
];
