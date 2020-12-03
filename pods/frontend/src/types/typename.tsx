import React from "react";
import { FullType, TypeRef, useTypes } from "../use-introspection-query";
import { TypeProps } from "./type";

export function TypeName({ type }: TypeProps<TypeRef | FullType>) {
  const types = useTypes();

  if (!type)
    return null;
  if (type.name)
    return <>{type.name}</>;

  switch (type.kind) {
    case "SCALAR":
      return <TypeName type={types[type.name]} />;
    case "OBJECT":
      return <TypeName type={types[type.name]} />;
    case "ENUM":
      return <TypeName type={types[type.name]} />;
    case "LIST":
      return <>[<TypeName type={(type as TypeRef).ofType as TypeRef} />]</>;
    case "NON_NULL":
      return <><TypeName type={(type as TypeRef).ofType as TypeRef} />!</>;
    default:
      return null;
  }
}
