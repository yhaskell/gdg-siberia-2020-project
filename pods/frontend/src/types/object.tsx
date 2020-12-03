import React, { Fragment } from "react";
import { Button, Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";

import useMapState from "../use-map-state";
import { TypeName } from "./typename";
import Type, { TypeProps } from "./type";

export const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function ObjectType({ type }: TypeProps) {
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
  </List>;
}
