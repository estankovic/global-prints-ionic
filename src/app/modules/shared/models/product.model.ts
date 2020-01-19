export interface ProductModel {
  id?: string;
  name: string;
  categories: string[];
  image: string;
}


export interface CartProductModel extends ProductModel {
  inCart: number;
}
