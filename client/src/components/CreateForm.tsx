import { Grid, TextField } from "@mui/material";
// import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
// import React, { Component, useState } from 'react'
// import { useMultistepForm } from '../useMultistepForm'
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { Mission } from '../graphql/schema';

type MissionData = {
  title: string;
  operator: string;
};
//  type Props={
//   value:Mission
//  }
type FormProps = MissionData & {
  updateFields: (fields: Partial<MissionData>) => void;
};

function CreateForm({ title, operator, updateFields }: FormProps) {
  return (
    <div>
      <Grid item>
        <TextField
          sx={{ input: { color: "#25727f" } }}
          InputLabelProps={{
            style: { color: "#25727f" },
          }}
          autoFocus
          id="name"
          name="title"
          color="primary"
          label="Title"
          variant="standard"
          fullWidth
          onChange={(e) => updateFields({ title: e.target.value })}
          required
        />
      </Grid>
      <Grid item>
        <TextField
          sx={{ input: { color: "#25727f" }, style: { color: "white" } }}
          InputLabelProps={{
            style: { color: "#25727f" },
          }}
          autoFocus
          id="desc"
          label="Operater"
          name="operater"
          variant="standard"
          onChange={(e) => updateFields({ operator: e.target.value })}
          fullWidth
          required
        />
      </Grid>
    </div>
  );
}

export default CreateForm;
