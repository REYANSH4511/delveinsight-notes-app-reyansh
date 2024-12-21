import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import "./App.css";
import SearchIcon from "@mui/icons-material/Search";
function App() {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  let queryParams = "";

  const getNotes = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/notes${queryParams}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Im5hbWUiOiJSYWh1bCIsImVtYWlsIjoicmFodWwyQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiUmFodWxAMTIzIiwiX2lkIjoiNjc2NmUwOWRlN2MyMTM2OTcxNGQzMGEyIiwiY3JlYXRlZEF0IjoiMjAyNC0xMi0yMVQxNTozNzowMS44MDRaIiwidXBkYXRlZEF0IjoiMjAyNC0xMi0yMVQxNTozNzowMS44MDRaIiwiX192IjowfSwiaWF0IjoxNzM0Nzk1NDIxLCJleHAiOjE3MzQ4MDYyMjF9.xqUvL2argvhj6xwzmHzGPc4BKHxzCgMp3ShUhnfAW3c",
          },
        }
      );
      setNotes(response?.data?.data || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      await getNotes();
    };
    fetchNotes();
  }, []);
  const handleAddNote = () => {
    const newNote = {
      id: notes.length + 1,
      title: "New Note",
      description: "Add details here...",
    };
    setNotes([...notes, newNote]);
  };

  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mt={4}
        mb={2}
      >
        <Typography variant="h4">Notes</Typography>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Search Notes"
            variant="outlined"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      queryParams = `?title=${searchTerm}`;
                      getNotes();
                    }}
                  >
                    <SearchIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        <Button variant="contained" color="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </Box>
      <Grid container spacing={2}>
        {notes?.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{note?.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {note?.content}
                  <div>{note?.tags}</div>
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
