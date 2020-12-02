import { Context } from "../types/context";
import { User } from "../types/models";

export async function getUserById(ctx: Context, id: string) {
  const [user] = await ctx.connection.select("*").from<User>("users").where({ id });

  return user;
}

export async function getUserByEmail(ctx: Context, email: string) {
  const [user] = await ctx.connection.select("*").from<User>("users").where({ email });

  return user;
}

