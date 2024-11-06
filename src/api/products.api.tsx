import { urls } from "./urls";
import { generateClient } from "./client";
import { IProducts } from "../types/products.type";
import { listsLimit } from "../utils/config";
import { IPagination, IResDto } from "../types/global.type";


interface IFetchProductsRes extends IResDto {
  products: IProducts[];
}


type fetchProductsType = () => Promise<IFetchProductsRes>;
export const fetchProducts: fetchProductsType = async () => {
  const client = generateClient();
  const response = await client.get<IFetchProductsRes>(urls.products.products);
  return response.data;
};
