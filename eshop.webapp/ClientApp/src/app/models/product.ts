export class Product {
  productId?: number;
  description: string;
  brand: string;
  model: string;
  unitPrice: number;
  discountPercentage: number;
  status?: string;
  createdAt?: Date;
  createdBy?: string;
  modifiedAt?: Date;
  modifiedBy?: string;
}
