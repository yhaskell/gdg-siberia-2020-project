import React, { Fragment } from "react";
import { Button, Checkbox, Collapse, Container, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import useMapState from "./use-map-state";

import { FullType, TypeRef, useTypes } from "./use-introspection-query";


const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: theme.spacing(4),
  },
}));

interface TypeProps<T = FullType> {
  type: T;
}

function Type({ type }: TypeProps<TypeRef>) {
  const types = useTypes();

  if (!type) return null;

  switch (type.kind) {
    case "SCALAR":
      return <ScalarType type={types[type.name]} />;
    case "OBJECT": 
      return <ObjectType type={types[type.name]} />;
    case "ENUM":
      return <EnumType type={types[type.name]} />;
    case "NON_NULL":
    case "LIST":
      return <Type type={type.ofType as TypeRef} />
    default:
      console.log(type);
      return null;
  } 
}

function EnumType({ type }: TypeProps) {
  const classes = useStyles();

  return <List className={classes.list}>
    {type?.enumValues.map(enumValue => <ListItem key={enumValue.name} dense button>
      <ListItemText primary={enumValue.name} secondary={enumValue.description} />
    </ListItem>)}
  </List>;
}

function ScalarType(props: TypeProps) {
  return null;
}


function TypeName({ type }: TypeProps<TypeRef | FullType>) {
  const types = useTypes();

  if (!type) return null;
  if (type.name) return <>{type.name}</>;

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

function ObjectType({ type }: TypeProps) {
  const [fields, setField] = useMapState<string, boolean>({});
  const classes = useStyles();

  return <List className={classes.list}>
    {type?.fields.map(field => <Fragment key={field.name}>
      <ListItem dense button onClick={() => setField(field.name, !fields[field.name])}>
        <ListItemIcon>
          <Checkbox checked={fields[field.name] || false} />
        </ListItemIcon>
        <ListItemText primary={field.name} secondary={field.description} />
        <ListItemSecondaryAction>
          <Button disabled><TypeName type={field.type} /></Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={fields[field.name]} timeout="auto" unmountOnExit>
        <Type type={field.type} />
      </Collapse>
    </Fragment>)}
  </List>
}

export default function App() {
  const types = useTypes();

  const { Query } = types;

  return <Container maxWidth="lg">
    <ObjectType type={Query} />
  </Container>;
}