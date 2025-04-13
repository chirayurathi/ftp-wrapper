import React from "react";
import {
  Grid,
  Typography,
  TextField,
  IconButton,
  Paper,
  Box,
  Button,
} from "@mui/material";
import { AddCircle, RemoveCircle } from "@mui/icons-material";
import ConnectionAutocomplete from "./ConnectionAutocomplete";

const OutboundSection = ({ jobName }) => {
  const [items, setItems] = React.useState([
    {
      Connection: "",
      Destination: "",
      Filename: "",
    },
  ]);

  const handleAdd = () => {
    setItems([...items, { Connection: "", Destination: "", Filename: "" }]);
  };

  const handleRemove = (i) => {
    const updated = [...items];
    updated.splice(i, 1);
    setItems(updated);
  };

  return (
    <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
        Outbound Configuration
      </Typography>

      {items.map((item, i) => (
        <Paper
          key={i}
          elevation={1}
          sx={{ p: 2, mb: 2, borderRadius: 3, backgroundColor: "#f5f5f5" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <ConnectionAutocomplete
                value={item.Connection}
                onChange={(val) => {
                  const updated = [...items];
                  updated[i].Connection = val;
                  setItems(updated);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                label="Destination"
                fullWidth
                value={item.Destination}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i].Destination = e.target.value;
                  setItems(updated);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField
                label="Filename"
                fullWidth
                value={item.Filename}
                onChange={(e) => {
                  const updated = [...items];
                  updated[i].Filename = e.target.value;
                  setItems(updated);
                }}
              />
            </Grid>
            <Grid item xs={12} sm={1} display="flex" alignItems="center">
              <IconButton onClick={() => handleRemove(i)}>
                <RemoveCircle color="error" />
              </IconButton>
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box mt={1}>
        <Button variant="outlined" startIcon={<AddCircle />} onClick={handleAdd}>
          Add Outbound
        </Button>
      </Box>
    </Grid>
  );
};

export default OutboundSection;
