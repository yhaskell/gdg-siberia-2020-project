import React from "react";
import { FullType, TypeRef, useTypes } from "../use-introspection-query";
import { EnumType } from "./enum";
import { ScalarType } from "./scalar";
import ObjectType from "./object";


export interface TypeProps<T = FullType> {
  type: T;
}

export default function Type({ type }: TypeProps<TypeRef>) {
  const types = useTypes();

  if (!type)
    return null;

  switch (type.kind) {
    case "SCALAR":
      return <ScalarType type={types[type.name]} />;
    case "OBJECT":
      return <ObjectType type={types[type.name]} />;
    case "ENUM":
      return <EnumType type={types[type.name]} />;
    case "NON_NULL":
    case "LIST":
      return <Type type={type.ofType as TypeRef} />;
    default:
      console.log(type);
      return null;
  }
}
