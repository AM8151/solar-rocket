import { Grid, TextField } from "@mui/material";
import {  Mission} from "../graphql/schema";

type missionData = {
  editData: Mission;
};

type FormProps = missionData & {
  updateEditFields: (fields: Partial<Mission>) => void;
};

function EditForm({ editData, updateEditFields }: FormProps) {

  return (
    <div>
      <Grid item>
        <TextField
           sx={{ input: { color: '#25727f'  } , style: { color: "white" } }}

           InputLabelProps={{
               style: { color: '#25727f' },
             }}
          className="my-px"
          size="medium"
          autoFocus
          id="name"
          name="title"
          variant="standard"
          fullWidth
          defaultValue={editData.title}
          onChange={(e) => updateEditFields({ title: e.target.value })}
          required
        />
      </Grid>
      <Grid item>
        <TextField
           sx={{ input: { color: '#25727f'  } , style: { color: "white" } }}

           InputLabelProps={{
               style: { color: '#25727f' },
             }}
          autoFocus
          size="medium"
          id="desc"
          name="Operater"
          variant="standard"
          defaultValue={editData.operator}
          onChange={(e) => updateEditFields({ operator: e.target.value })}
          fullWidth
          required
        />
      </Grid>
    </div>
  );
}

export default EditForm;
