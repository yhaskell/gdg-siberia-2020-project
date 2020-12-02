import Context from "../context";
import { Product } from "../types/models";

function mapProduct(product: Product) {
  return {
    ...product,
    type: product.type.toUpperCase(),
  };
}

export async function getAllProducts(ctx: Context) {
  const products = await ctx.db.select("*").from<Product>("products");

  return products.map(mapProduct);
}

export async function getProductsByDistilleryIds(ctx: Context, ids: readonly string[]) {
  const products = await ctx.db.select("*").from<Product>("products").whereIn("distillery_id", ids);

  return ids.map(id => products.filter(p => p.distillery_id === id).map(mapProduct));
}

export async function getProductsByIds(ctx: Context, ids: readonly string[]) {
  const products = await ctx.db.select("*").from<Product>("products").whereIn("id", ids);
  const productsMap = Object.fromEntries(products.map(product => [product.id, product]));

  return ids.map(id => productsMap[id]);
}