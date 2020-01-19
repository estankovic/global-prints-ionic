import { CartProductModel, ProductModel } from '../models/product.model';

export const getProducts = (
  count: number,
  startAt: number = 0,
): ProductModel[] => {
  return new Array(count)
    .fill(0)
    .map((item, index) => index + 1)
    .map(indexFromOne => ({
      name: `Product ID: ${indexFromOne + startAt}`,
      image:
        'https://cdn.shopify.com/s/files/1/1122/3000/products/FLM95107_Designated_survivor_1024x1024.jpg',
      categories: [],
      id: `${indexFromOne + startAt}`,
    }));
};

export const getProduct = (id: string): ProductModel => ({
  id,
  categories: [],
  image:
    'https://cdn.shopify.com/s/files/1/1122/3000/products/FLM95107_Designated_survivor_1024x1024.jpg',
  name: `Product ID: ${id}`,
});

export const getProductCart = (count: number): CartProductModel[] =>
  getProducts(count).map(item => ({ ...item, inCart: 5 }));

export const getProductCartItem = (id: string): CartProductModel => ({
  ...getProduct(id),
  inCart: 5,
});
