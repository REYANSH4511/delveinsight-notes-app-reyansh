import React, { useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Box,
} from "@mui/material";

const NotesApp = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      title: "Meeting Notes",
      description: "Discuss project timelines and deadlines.",
    },
    {
      id: 2,
      title: "Shopping List",
      description: "Buy groceries, vegetables, and snacks.",
    },
    {
      id: 3,
      title: "Workout Plan",
      description: "Plan workouts for the next week.",
    },
  ]);

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
        <Button variant="contained" color="primary" onClick={handleAddNote}>
          Add Note
        </Button>
      </Box>
      <Grid container spacing={2}>
        {notes.map((note) => (
          <Grid item xs={12} sm={6} md={4} key={note.id}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{note.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {note.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default NotesApp;
