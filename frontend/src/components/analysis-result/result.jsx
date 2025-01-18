import React from "react";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
} from '@mui/material';


export default function Result() {
    return (
      <Box sx={{ width: '100%', maxWidth: 600, margin: '0 auto', p: 2 }}>
        {/* Video Player */}
        <Box
          component="video"
          controls
          sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
        />

        {/* Summary Section */}
        <Box sx={{ my: 3, p: 2, bgcolor: 'background.paper', boxShadow: 1, borderRadius: 2 }}>
          <Typography variant="h6">
            Video Summary
          </Typography>
          <Typography variant="body1">{"Hello"}</Typography>
        </Box>

        {/* Timestamps List */}
        <Box>
          <Typography variant="h6">
            Timestamps
          </Typography>
          <List>
              <ListItem button>
                <ListItemText primary={"00:00"} secondary={"Herro class"} />
              </ListItem>
              <Divider />
          </List>
        </Box>
      </Box>
    );
}