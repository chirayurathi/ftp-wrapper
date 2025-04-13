import React from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import InboundSection from "./InboundSection";
import ArchiveSection from "./ArchiveSection";
import OutboundSection from "./OutboundSection";
import { toast } from "react-toastify";

const JobForm = () => {
  const [jobName, setJobName] = React.useState("");
  const [sctask, setSctask] = React.useState("");

  const handleSubmit = () => {
    if (!jobName || !sctask) {
      toast.error("Please fill in Job Name and SCTASK.");
      return;
    }
    // Submit logic here
    toast.success("Job created successfully!");
  };

  return (
    <Box sx={{ maxWidth: 1000, mx: "auto", py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Create FTP Job
      </Typography>

      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          background: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              label="Job Name"
              fullWidth
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              label="SCTASK"
              fullWidth
              value={sctask}
              onChange={(e) => setSctask(e.target.value)}
              required
            />
          </Grid>

          <InboundSection jobName={jobName} />
          <ArchiveSection jobName={jobName} />
          <OutboundSection jobName={jobName} />

          <Grid item xs={12}>
            <Box display="flex" justifyContent="flex-end">
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={handleSubmit}
              >
                Create Job
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default JobForm;