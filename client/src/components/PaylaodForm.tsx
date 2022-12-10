import { Grid, TextField } from "@mui/material";

type PayloadData = {
  capacity: Number;
  available: Number;
};
type PayloadFormProps = PayloadData & {
  updateFields: (fields: Partial<PayloadData>) => void;
};
function PayloadForm({ capacity, available, updateFields }: PayloadFormProps) {
  return (
    <div>
      <Grid item>
        <TextField
          sx={{
            input: { color: "#25727f" },
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "#25727f" },
          }}
          autoFocus
          id="desc"
          label="Capacity"
          name="capacity"
          onChange={(e) => updateFields({ capacity: Number(e.target.value) })}
          variant="standard"
          type="number"
          required
          fullWidth
        />
        <TextField
          sx={{
            input: { color: "#25727f" },
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "#25727f" },
          }}
          autoFocus
          id="desc"
          label="Available"
          name="available"
          onChange={(e) => updateFields({ available: Number(e.target.value) })}
          variant="standard"
          type="number"
          required
          fullWidth
        />
      </Grid>
    </div>
  );
}

export default PayloadForm;
