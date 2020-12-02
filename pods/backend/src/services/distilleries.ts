import Context from "../context";
import { Distillery } from "../types/models";

export const DISTILLERIES = "distilleries";

export async function getAllDistilleries(ctx: Context) {
  const distilleries = await ctx.db.select("*").from<Distillery>(DISTILLERIES);

  return distilleries;
}

export async function getDistilleryById(ctx: Context, id: string) {
  const [distillery] = await ctx.db.select("*").from<Distillery>(DISTILLERIES).where({ id });

  return distillery;
}

export async function getDistilleriesByIds(ctx: Context, ids: readonly string[]) {
  const distilleries = await ctx.db.select("*").from<Distillery>(DISTILLERIES).whereIn("id", ids);
  const distilleriesMap: Record<string, Distillery> = Object.fromEntries(distilleries.map(d => [d.id, d]));

  return ids.map(id => distilleriesMap[id]);
}