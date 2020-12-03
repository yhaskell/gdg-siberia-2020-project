import React from "react";
import { Typography, Container } from "@material-ui/core";

import { useTypes } from "./use-introspection-query";
import ObjectType from "./types/object";

export default function App() {
  const types = useTypes();

  const { Query } = types;

  return <Container maxWidth="lg">
    <Typography><h1>Root Query Fields</h1></Typography>
    <ObjectType type={Query} />
  </Container>;
}