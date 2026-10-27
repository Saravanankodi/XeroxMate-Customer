
export interface OrderDetails {
  id: string;
  createdAt: string;
  status: string;
  paymentStatus: string;
  balance: number;
  total: number;
  documentName: string;
  documentPages: number;
  documentSize: string;
  pickupOtp: string;
  shopName: string;
  shopAddress: string;
  shopPhone: string;
  shopRating: number;
}

export interface PrintSpecification {
  paper: string;
  printType: string;
  sides: string;
  orientation: string;
  copies: number;
  pages: string;
  pageLayout: string;
  binding: string;
  extras: string;
  deliveryOption: string;
}
