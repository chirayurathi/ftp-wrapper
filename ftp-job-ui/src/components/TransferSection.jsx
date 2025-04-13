import React from "react";
import {
  Grid,
  TextField,
  IconButton,
  Button,
  MenuItem,
  Autocomplete,
  Box,
  Paper
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import ConnectionAutocomplete from "./ConnectionAutocomplete";

const defaultEntry = (jobName, sectionType) => {
  const isArchive = sectionType === "Archive";
  return {
    Connection: "",
    Source: isArchive
      ? `/FTP/Work/${jobName}/Archive`
      : `/FTP/Work/${jobName}`,
    Destination: "",
    Logfile: `/FTP/Logs/${jobName}`,
    StartTime: "00:00:00.000",
    Frequency: "Daily",
    Filename: "",
    Delsource: "yes",
    DateTime: "",
    ConnectMode: "passive",
    TransmitMode: "binary",
    NotifyError: "epicftpprocess@providence.org"
  };
};

const connectionList = ["PROD_CONN", "STG_CONN", "NEW_CONN"];

const TransferSection = ({ title, sections, setSections, jobName }) => {
  const handleChange = (index, field, value) => {
    const updated = [...sections];
    updated[index][field] = value;
    setSections(updated);
  };

  const handleAdd = () => {
    setSections([...sections, defaultEntry(jobName, title)]);
  };

  const handleRemove = (index) => {
    const updated = [...sections];
    updated.splice(index, 1);
    setSections(updated);
  };

  return (
    <Box>
      {sections.map((section, index) => (
        <Paper
          key={index}
          elevation={3}
          sx={{ p: 2, mb: 3, borderRadius: 3, position: "relative" }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <ConnectionAutocomplete
                value={section.Connection}
                onChange={(val) => handleChange(index, "Connection", val)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Source"
                fullWidth
                value={section.Source}
                onChange={(e) =>
                  handleChange(index, "Source", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Destination"
                fullWidth
                value={section.Destination}
                onChange={(e) =>
                  handleChange(index, "Destination", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Filename"
                fullWidth
                value={section.Filename}
                onChange={(e) =>
                  handleChange(index, "Filename", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Logfile"
                fullWidth
                value={section.Logfile}
                onChange={(e) =>
                  handleChange(index, "Logfile", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Start Time"
                fullWidth
                value={section.StartTime}
                onChange={(e) =>
                  handleChange(index, "StartTime", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Frequency"
                fullWidth
                value={section.Frequency}
                onChange={(e) =>
                  handleChange(index, "Frequency", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Delsource"
                select
                fullWidth
                value={section.Delsource}
                onChange={(e) =>
                  handleChange(index, "Delsource", e.target.value)
                }
              >
                <MenuItem value="yes">yes</MenuItem>
                <MenuItem value="no">no</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="DateTime"
                fullWidth
                value={section.DateTime}
                onChange={(e) =>
                  handleChange(index, "DateTime", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Connect Mode"
                fullWidth
                value={section.ConnectMode}
                onChange={(e) =>
                  handleChange(index, "ConnectMode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <TextField
                label="Transmit Mode"
                fullWidth
                value={section.TransmitMode}
                onChange={(e) =>
                  handleChange(index, "TransmitMode", e.target.value)
                }
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Notify Error"
                fullWidth
                value={section.NotifyError}
                onChange={(e) =>
                  handleChange(index, "NotifyError", e.target.value)
                }
              />
            </Grid>
          </Grid>

          {sections.length > 1 && (
            <IconButton
              onClick={() => handleRemove(index)}
              sx={{ position: "absolute", top: 8, right: 8 }}
              color="error"
            >
              <Delete />
            </IconButton>
          )}
        </Paper>
      ))}

      <Button
        startIcon={<Add />}
        variant="outlined"
        onClick={handleAdd}
        sx={{ mt: 1 }}
      >
        Add {title}
      </Button>
    </Box>
  );
};

export default TransferSection;