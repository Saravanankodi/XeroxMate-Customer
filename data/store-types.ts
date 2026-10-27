
export type FulfillmentMode = "pickup" | "delivery";

export const DELIVERY_FEE = 50;
export const WRAPPER_FEE = 5;

export type PrintShop = {
  id: string;
  name: string;
  address: string;
  locality: string;
  distance: string;
  rating: number;
  reviews: number;
  open: boolean;
  openingHours: string;
  fulfillment: FulfillmentMode[];
  printCost: number;
};

export const sampleShops: PrintShop[] = [
  {
    id: "tamil-printers",
    name: "Tamil Printers",
    address:
      "No.4 Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu 612302",
    locality: "Bismi Nagar, Baburajapuram",
    distance: "0.8 km",
    rating: 5.0,
    reviews: 142,
    open: true,
    openingHours: "Monday - Sunday 9:00 AM–11:00 PM",
    fulfillment: ["pickup", "delivery"],
    printCost: 1.5,
  },
  {
    id: "sri-balaji",
    name: "Sri Balaji Xerox & Digital Offset",
    address: "61D, Main Street, Ariyalur, Tamil Nadu 621704",
    locality: "Main Street",
    distance: "1.4 km",
    rating: 4.8,
    reviews: 89,
    open: true,
    openingHours: "Monday - Sunday 9:00 AM–11:00 PM",
    fulfillment: ["pickup"],
    printCost: 1.5,
  },
  {
    id: "ak-printer",
    name: "AK Printer",
    address:
      "No.4 Bismi Nagar, Baburajapuram, Kumbakonam, Tamil Nadu 612302",
    locality: "Bismi Nagar, Baburajapuram",
    distance: "1.8 km",
    rating: 4.2,
    reviews: 18,
    open: false,
    openingHours: "Opens tomorrow at 9:00 AM",
    fulfillment: ["pickup", "delivery"],
    printCost: 1.5,
  },
];
