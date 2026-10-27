
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
  rating: number;
  location: string;
  total: number;
  balanceDue: number;
  paymentMethod: string;
  pickupPin?: string;
  pickupToken?: string;
}

export const sampleOrders: PrintOrder[] = [
  {
    id: "OMX-3547",
    status: "awaiting_acceptance",
    submittedAt: "13 Oct 2026 at 12:05 PM",
    shopName: "Tamil Printers",
    shopInitials: "TP",
    rating: 5.0,
    location: "Bismi Nagar, Kumbakonam",
    total: 1.54,
    balanceDue: 1.54,
    paymentMethod: "Pay at Counter (Cash/UPI)",
    pickupPin: "8492",
    pickupToken: "OMX-3547-TN-CHE",
  },
  {
    id: "OMX-3548",
    status: "awaiting_acceptance",
    submittedAt: "13 Oct 2026 at 12:05 PM",
    shopName: "Tamil Printers",
    shopInitials: "TP",
    rating: 5.0,
    location: "Bismi Nagar, Kumbakonam",
    total: 1.54,
    balanceDue: 1.54,
    paymentMethod: "Pay at Counter (Cash/UPI)",
    pickupPin: "8492",
    pickupToken: "OMX-3547-TN-CHE",
  },
  {
    id: "OMX-3549",
    status: "awaiting_acceptance",
    submittedAt: "13 Oct 2026 at 12:05 PM",
    shopName: "Tamil Printers",
    shopInitials: "TP",
    rating: 5.0,
    location: "Bismi Nagar, Kumbakonam",
    total: 1.54,
    balanceDue: 1.54,
    paymentMethod: "Pay at Counter (Cash/UPI)",
    pickupPin: "8492",
    pickupToken: "OMX-3547-TN-CHE",
  },
  {
    id: "OMX-3550",
    status: "awaiting_acceptance",
    submittedAt: "13 Oct 2026 at 12:05 PM",
    shopName: "Tamil Printers",
    shopInitials: "TP",
    rating: 5.0,
    location: "Bismi Nagar, Kumbakonam",
    total: 1.54,
    balanceDue: 1.54,
    paymentMethod: "Pay at Counter (Cash/UPI)",
    pickupPin: "8492",
    pickupToken: "OMX-3547-TN-CHE",
  },
  {
    id: "OMX-3551",
    status: "awaiting_acceptance",
    submittedAt: "13 Oct 2026 at 12:05 PM",
    shopName: "Tamil Printers",
    shopInitials: "TP",
    rating: 5.0,
    location: "Bismi Nagar, Kumbakonam",
    total: 1.54,
    balanceDue: 1.54,
    paymentMethod: "Pay at Counter (Cash/UPI)",
    pickupPin: "8492",
    pickupToken: "OMX-3547-TN-CHE",
  },
];
