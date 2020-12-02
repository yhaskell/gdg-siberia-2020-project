import Context from "../context";
import { User } from "../types/models";

export async function getUserById(ctx: Context, id: string) {
  const [user] = await ctx.db.select("*").from<User>("users").where({ id });

  return user;
}

export async function getUserByEmail(ctx: Context, email: string) {
  const [user] = await ctx.db.select("*").from<User>("users").where({ email });

  return user;
}

export async function getUsersByDistilleryIds(ctx: Context, ids: readonly string[]) {
  const users = await ctx.db.select("*").from<User>("users").whereIn("distillery_id", ids);

  return ids.map(id => users.filter(user => user.distillery_id === id));
}
