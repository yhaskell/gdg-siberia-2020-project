import React, { Fragment, useCallback, useState } from "react";
import { Button, Checkbox, Collapse, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, makeStyles } from "@material-ui/core";
import FieldValuesDialog from "./field-values-dialog";

import useMapState from "../use-map-state";
import { TypeName } from "./typename";
import Type, { TypeProps } from "./type";

export const useStyles = makeStyles((theme) => ({
  list: {
    paddingLeft: theme.spacing(4),
  },
}));


function FieldName({ name, args }: { name: string; args: Record<string, string> }) {
  if (!args) {
    return <>{name}</>;
  }
  const argsList = Object.entries(args);
  if (!argsList.length) {
    return <>{name}</>;
  }
  return <>{name} ({argsList.reduce((list, [key, value]) => {
    const res = <>{key} = {value}</>;
    if (!list.length) return [res];
    return [...list, ",", res];
  }, [] as React.ReactNode[])})</>;
}

export default function ObjectType({ type }: TypeProps) {
  const [fields, setField] = useMapState<string, boolean>({});
  const [fieldArgs, setFieldArgs, removeFieldArgs] = useMapState<string, Record<string, string>>({});
  const [openDialog, setOpenDialog] = useState<string>();
  const classes = useStyles();

  const toggleFieldVisibility = useCallback((e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const fieldName = e.currentTarget.dataset.fieldName;

    if (!fieldName) {
      console.log(fieldName, e.currentTarget.dataset);
      return;
    }

    const curr = fields[fieldName];

    if (!curr) {
      setField(fieldName, true);
      setOpenDialog(fieldName);
    } else {
      setField(fieldName, false);
      removeFieldArgs(fieldName);
      setOpenDialog(undefined);
    }
  }, [fields, removeFieldArgs, setField]);

  const handleCloseDialog = useCallback((field: string, values?: Record<string, string>) => {
    setOpenDialog(undefined);

    if (!values) {
      setField(field, false);
      
      return;
    }
    setFieldArgs(field, values);

  }, [setField, setFieldArgs]);

  return <List className={classes.list}>
    {type?.fields.map(field => <Fragment key={field.name}>
      <ListItem data-field-name={field.name} dense button onClick={toggleFieldVisibility}>
        <ListItemIcon>
          <Checkbox checked={fields[field.name] || false} />
        </ListItemIcon>
        <ListItemText
          primary={<FieldName name={field.name} args={fieldArgs[field.name]} />}
          secondary={field.description} 
        />
        <ListItemSecondaryAction>
          <Button disabled><TypeName type={field.type} /></Button>
        </ListItemSecondaryAction>
      </ListItem>
      <Collapse in={fields[field.name]} timeout="auto" unmountOnExit>
        <Type type={field.type} />
      </Collapse>
      {openDialog === field.name && <FieldValuesDialog field={field} values={fieldArgs[openDialog]} onClose={handleCloseDialog} />}
    </Fragment>)}
  </List>;
}