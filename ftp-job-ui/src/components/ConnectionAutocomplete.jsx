import React, { useEffect, useState } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Typography
} from "@mui/material";
import { toast } from "react-toastify";

const defaultConnection = {
  Name: "",
  Organization: "",
  Host: "",
  Encryption: null,
  Protocol: "SFTP",
  Address: "",
  Port: "22",
  LoginID: "",
  Password: "",
  TimeOut: "30",
  ContactName: "",
  ContactEmail: ""
};

const ConnectionAutocomplete = ({ value, onChange }) => {
  const [connections, setConnections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newConnection, setNewConnection] = useState(defaultConnection);

  useEffect(() => {
    setLoading(true);
    fetch("/api/connections")
      .then((res) => res.json())
      .then((data) => setConnections(data))
      .catch(() => toast.error("Failed to load connections"))
      .finally(() => setLoading(false));
  }, []);

  const handleAddConnection = () => {
    const requiredFields = ["Name", "Organization", "Host", "Protocol", "Address", "Port", "LoginID", "Password", "TimeOut", "ContactName", "ContactEmail"];
    for (const field of requiredFields) {
      if (!newConnection[field]) {
        toast.error(`${field} is required.`);
        return;
      }
    }

    fetch("/api/connections", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newConnection)
    })
      .then((res) => {
        if (!res.ok) throw new Error();
        return res.json();
      })
      .then((savedConn) => {
        setConnections((prev) => [...prev, savedConn]);
        onChange(savedConn.Name);
        toast.success("Connection added successfully");
        setOpenDialog(false);
        setNewConnection(defaultConnection);
      })
      .catch(() => toast.error("Failed to add connection"));
  };

  const connectionOptions = [...connections.map((c) => c.Name), "Add new connection"];

  return (
    <>
      <Autocomplete
        options={connectionOptions}
        value={value}
        onChange={(e, newVal) => {
          if (newVal === "Add new connection") setOpenDialog(true);
          else onChange(newVal);
        }}
        loading={loading}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Connection"
            variant="outlined"
            fullWidth
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              )
            }}
          />
        )}
      />

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Connection</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} mt={1}>
            {Object.keys(defaultConnection).map((field) => (
              <Grid item xs={12} sm={6} key={field}>
                <TextField
                  label={field}
                  value={newConnection[field] ?? ""}
                  onChange={(e) => setNewConnection({ ...newConnection, [field]: e.target.value || null })}
                  fullWidth
                />
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddConnection} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ConnectionAutocomplete;
