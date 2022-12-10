import { Grid, TextField } from "@mui/material";
// import React, { Component } from 'react'
// import { useMultistepForm } from '../useMultistepForm'

type OrbitData = {
  periapsis: Number;
  apoapsis: Number;
  inclination: Number;
};
type OrbitFormProps = OrbitData & {
  updateFields: (fields: Partial<OrbitData>) => void;
};

function OrbitForm({
  periapsis,
  apoapsis,
  inclination,
  updateFields,
}: OrbitFormProps) {
  return (
    <div>
      <Grid item>
        <TextField
          autoFocus
          sx={{
            input: { color: "#25727f" },
            style: { color: "white" },
          }}
          InputLabelProps={{
            style: { color: "#25727f" },
          }}
          id="desc"
          label="Periapsis"
          name="periapsis"
          onChange={(e) => updateFields({ periapsis: Number(e.target.value) })}
          variant="standard"
          type="number"
          required
          fullWidth
        />
      </Grid>
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
          label=" Apoapsis"
          name="apoapsis"
          onChange={(e) => updateFields({ apoapsis: Number(e.target.value) })}
          variant="standard"
          type="number"
          required
          fullWidth
        />
      </Grid>
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
          label="Inclination "
          name="inclination "
          onChange={(e) =>
            updateFields({ inclination: Number(e.target.value) })
          }
          variant="standard"
          type="number"
          required
          fullWidth
        />
      </Grid>
    </div>
  );
}

export default OrbitForm;
