import React from "react";
import { TextField, FormControl, InputLabel, Select, FormHelperText, MenuItem} from "@material-ui/core";
import { Field, FullType, InputValue, TypeRef, useTypes } from "../use-introspection-query";


function getTypeInfo(type: TypeRef | FullType, types: Record<string, FullType>, extend?: any): { type: FullType, enum?: true, list?: true, non_null?: true } | null {
  if (!type) return null;
  if (type.name) return { type, ...extend };

  switch (type.kind) {
    case "SCALAR":
    case "OBJECT": 
    case "ENUM":
      return getTypeInfo(types[type.name], types, { ...extend, enum: true });
    case "LIST":
      return getTypeInfo((type as TypeRef).ofType as TypeRef, types, { ...extend, list: true });
    case "NON_NULL":
      return getTypeInfo((type as TypeRef).ofType as TypeRef, types, { ...extend, non_null: true });
    default:
      return null;
  }
} 

export default function ArgumentField({ value, arg, onChange }: { field: Field; value: string; arg: InputValue; onChange(key: string, value: string): void }) {
  const types = useTypes();
  const type = getTypeInfo(arg.type, types);

  if (!type) {
    return null;
  }

  switch (type.type.kind) {
    case "SCALAR":
      return <TextField 
          fullWidth
          value={value}
          label={arg.name}
          defaultValue={arg.defaultValue} 
          helperText={arg.description}
          variant="outlined"
          onChange={({ target }) => onChange(arg.name, target.value)}
        />;
    case "ENUM":
      return <FormControl variant="outlined" fullWidth>
        <InputLabel id={`${arg.name}-label`}>{arg.name}</InputLabel>
        <Select
          fullWidth
          labelId={`${arg.name}-label`}
          value={value}
          onChange={({ target }) => onChange(arg.name, target.value as string)}
          label={arg.name}
        >
          {(type.type.enumValues || types[type.type.name].enumValues)?.map(v => <MenuItem key={v.name} value={v.name}>{v.name}</MenuItem>)}
        </Select>
        <FormHelperText>{arg.description}</FormHelperText>
      </FormControl>;
    default: return null;
  }
}
