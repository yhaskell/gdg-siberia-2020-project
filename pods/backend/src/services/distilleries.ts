import { Context } from "../types/context";
import { Distillery } from "../types/models";


export async  function getAllDistilleries(ctx: Context) {
  const distilleries = await ctx.connection.select("*").from<Distillery>("distilleries");

  return distilleries;
}

export async function getDistilleryById(ctx: Context, id: string) {
  const [distillery] = await ctx.connection.select("*").from<Distillery>("distilleries").where({ id });

  return distillery;
}