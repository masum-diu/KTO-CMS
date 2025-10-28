import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  ListItemAvatar,
  Avatar,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import SchoolIcon from '@mui/icons-material/School';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

// Mock Data
const initialSafeZones = [
  { id: 1, name: "Home", address: "123 Main St, Anytown", radius: "100m", icon: <HomeWorkIcon /> },
  { id: 2, name: "School", address: "456 Oak Ave, Anytown", radius: "200m", icon: <SchoolIcon /> },
];

const geofenceAlerts = [
  { id: 1, device: "Kid's Tablet", zone: "School", event: "Entered", timestamp: "2023-10-27 08:30:15" },
  { id: 2, device: "John's iPhone", zone: "Home", event: "Left", timestamp: "2023-10-27 08:05:00" },
  { id: 3, device: "Kid's Tablet", zone: "Home", event: "Left", timestamp: "2023-10-27 07:45:20" },
  { id: 4, device: "John's iPhone", zone: "Home", event: "Entered", timestamp: "2023-10-26 18:15:00" },
];

const GeofencingPage = () => {
  const [open, setOpen] = useState(false);

  const handleOpenDialog = () => setOpen(true);
  const handleCloseDialog = () => setOpen(false);

  return (
    <CrmLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#073064",fontSize:20 }}>
          Geofencing & Safe Zones
        </Typography>

        <Grid container spacing={3}>
          {/* Manage Safe Zones */}
          <Grid item xs={12} md={7}>
            <Card>
              <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="h6">Manage Safe Zones</Typography>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpenDialog}>
                    Add New Zone
                  </Button>
                </Stack>
                <Box
                  sx={{
                    height: 300,
                    backgroundColor: '#e0e0e0',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 1,
                    color: 'text.secondary',
                    mb: 2
                  }}
                >
                  Map Component Placeholder
                </Box>
                <List>
                  {initialSafeZones.map((zone) => (
                    <ListItem
                      key={zone.id}
                      secondaryAction={
                        <Stack direction="row" spacing={1}>
                          <IconButton edge="end" aria-label="edit"><EditIcon /></IconButton>
                          <IconButton edge="end" aria-label="delete"><DeleteIcon /></IconButton>
                        </Stack>
                      }
                    >
                      <ListItemAvatar><Avatar>{zone.icon}</Avatar></ListItemAvatar>
                      <ListItemText primary={zone.name} secondary={`${zone.address} (Radius: ${zone.radius})`} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Geofence Alerts */}
          <Grid item xs={12} md={5}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>Geofence Alerts</Typography>
                <List>
                  {geofenceAlerts.map((alert) => (
                    <ListItem key={alert.id}>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: alert.event === 'Entered' ? 'success.light' : 'error.light' }}>
                          {alert.event === 'Entered' ? <ArrowDownwardIcon sx={{ color: 'success.dark' }} /> : <ArrowUpwardIcon sx={{ color: 'error.dark' }} />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${alert.device} ${alert.event.toLowerCase()} '${alert.zone}'`}
                        secondary={alert.timestamp}
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Add/Edit Zone Dialog */}
        <Dialog open={open} onClose={handleCloseDialog}>
          <DialogTitle>Add New Safe Zone</DialogTitle>
          <DialogContent>
            <TextField autoFocus margin="dense" label="Zone Name" type="text" fullWidth variant="standard" />
            <TextField margin="dense" label="Address" type="text" fullWidth variant="standard" />
            <TextField margin="dense" label="Radius (in meters)" type="number" fullWidth variant="standard" />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleCloseDialog}>Save</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CrmLayout>
  );
};

export default GeofencingPage;