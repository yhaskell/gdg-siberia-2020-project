import { v4 as uuid } from "uuid";
import { Distillery } from "../../src/types/models";
import { pick, random, times } from "./utils";

const distilleries: Distillery[] = require("../data/distilleries.json");
const names: Record<string, string[]> = require("../data/names.json");

function pickName() {
  var list = Math.random() > 0.5 ? names.male : names.female;

  return pick(list);
}

function makeUser() {
  const id = uuid();
  const name = pickName();
  const surname = pick(names.surnames);
  const distillery = pick(distilleries);

  const email = `${name.toLowerCase()}.${surname.toLowerCase()}@${distillery.name.toLowerCase().replace(/ /g, "-")}.co.uk`;

  return {
    id,
    distillery_id: distillery.id,
    name: `${name} ${surname}`,
    email
  };
}

export default function generateUsers() {
  return times(random(1000, 2000, 0), makeUser);
}
