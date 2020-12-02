import { Context } from "../types/context";
import { Product } from "../types/models";

export async function getAllProducts(ctx: Context) {
  const products = await ctx.connection.select("*").from<Product>("products");

  return products.map(product => ({
    ...product,
    type: product.type.toUpperCase(),
  }));

}
