export interface Product {
  brand: string;
  details: string;
  discountinpercentage: number;
  imageurl: string;
  isactive: Boolean;
  mrp: number;
  name: string;
  productcategory: string;
  productid: string;
  productrating: number;
  producttype: string;
  salesprice: number;
  userid: string;
  isCarted: boolean;
  quantity: number;
  subtotal: number;
  details1: any[];
}
export interface serviceproduct {
  serviceproductcategory: string;
  details: string;
  discountinpercentage: number;
  imageurl: string;
  isactive: Boolean;
  servicetypes: string;
  mrp: number;
  name: string;
  productcategory: string;
  productid: string;
  productrating: number;
  producttype: string;
  salesprice: number;
  userid: string;
  serviceproducttype: string,
  isCarted: boolean;
  quantity: number;
  subtotal: number;
  details1: any[];
}
export interface awsproduct {
  amccovers: string;
  amcheading: string;
  amcprice: number;
  imageurl: string;
  keybenefits1: string;
  keybenefits2: string;
  keybenefits3: string;
  keybenefits4: string;
  keybenefits5: string;
  keybenefits6: string;
  keybenefits7: string;
  keybenefits8: string;
  keybenefits9: string;
  keybenefits10: string;
  keybenefits11: string;
  keybenefits12: string;
  amcname: string;
  amcid: number;
  subtotal: number;
  isCarted: boolean;
}

