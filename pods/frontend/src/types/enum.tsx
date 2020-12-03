import React from "react";
import { List, ListItem, ListItemText } from "@material-ui/core";
import { useStyles } from "./object";
import { TypeProps } from "./type";

export function EnumType({ type }: TypeProps) {
  const classes = useStyles();

  return <List className={classes.list}>
    {type?.enumValues.map(enumValue => <ListItem key={enumValue.name} dense button>
      <ListItemText primary={enumValue.name} secondary={enumValue.description} />
    </ListItem>)}
  </List>;
}
