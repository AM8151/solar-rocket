import { Grid, TextField } from "@mui/material";
import { DateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

type LaunchData = {
  date: Date;
  vehicle: string;
  name: string;
  longitude: Number;
  latitude: Number;
};
type LaunchFormProps = LaunchData & {
  updateFields: (fields: Partial<LaunchData>) => void;
};
function LaunchForm({
  date,
  vehicle,
  name,
  longitude,
  latitude,
  updateFields,
}: LaunchFormProps) {
  const [tempLaunchDate, setTempLaunchDate] = useState<Date | null>(null);
  const handleTempLaunchDateChange = (newValue: Date | null) => {
    setTempLaunchDate(newValue);
  };
  return (
    <div>
      <Grid item>
        <Grid item>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              minDate={new Date()}
              minTime={new Date()}
              label="Launch Date"
              value={tempLaunchDate}
              onChange={handleTempLaunchDateChange}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  sx={{
                    input: { color: "#25727f" },
                    style: { color: "white" },
                  }}
                  InputLabelProps={{
                    style: { color: "#25727f" },
                  }}
                  value={date}
                  onChange={(e) =>
                    updateFields({
                      date:
                        tempLaunchDate !== null
                          ? new Date(tempLaunchDate)
                          : new Date(),
                    })
                  }
                  name="date"
                  variant="standard"
                  {...params}
                />
              )}
            />
          </LocalizationProvider>
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
            label="Vehicle"
            name="vehicle"
            onChange={(e) => updateFields({ vehicle: e.target.value })}
            variant="standard"
            fullWidth
            required
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
            type="text"
            autoFocus
            id="desc"
            label="Loaction"
            name="name"
            onChange={(e) => updateFields({ name: e.target.value })}
            variant="standard"
            fullWidth
            required
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
            type="number"
            autoFocus
            id="desc"
            label="Longitude"
            name="longitude"
            fullWidth
            onChange={(e) =>
              updateFields({ longitude: Number(e.target.value) })
            }
            variant="standard"
            required
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
            type="Number"
            autoFocus
            id="desc"
            label="Latitude "
            name="latitude"
            fullWidth
            onChange={(e) => updateFields({ latitude: Number(e.target.value) })}
            variant="standard"
            required
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default LaunchForm;
