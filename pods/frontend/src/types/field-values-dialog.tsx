import React, { useCallback } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText, TextField, Button } from "@material-ui/core";
import { Field } from "../use-introspection-query";
import useMapState from "../use-map-state";

export default function FieldValuesDialog({ field, values, onClose }: { field: Field; values: Record<string, string>; onClose(key: string, values?: Record<string, string>): void }) {
  const [args, setArg] = useMapState<string, string>(values);
  const handleCancel = useCallback(() => onClose(field.name), [field.name, onClose]);
  const handleClose = useCallback(() => onClose(field.name, args), [args, field.name, onClose]);

  if (!field.args.length) return null;

  return <Dialog open={true} onClose={handleCancel} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
    <DialogTitle id="alert-dialog-title">{"Use Google's location service?"}</DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        {field.args.map(arg => <TextField 
          value={args[arg.name]}
          label={arg.name}
          defaultValue={arg.defaultValue} 
          helperText={arg.description}
          onChange={({ target }) => setArg(arg.name, target.value)}
        />)}
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={handleCancel}>
        Cancel
      </Button>
      <Button onClick={handleClose} color="primary" autoFocus>
        Save
      </Button>
    </DialogActions>
  </Dialog>
}
