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
  Chip,
  Avatar,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  ListItemAvatar,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import SosIcon from '@mui/icons-material/Sos';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MyLocationIcon from '@mui/icons-material/MyLocation';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock Data
const activeSosEvents = [
  { id: 1, device: "Kid's Tablet", timestamp: "2023-10-27 15:01:30", location: "Near Central Park" },
];

const emergencyContacts = [
  { id: 1, name: "Jane Doe (Mother)", phone: "123-456-7890" },
  { id: 2, name: "John Doe (Father)", phone: "123-456-7891" },
  { id: 3, name: "Local Police", phone: "911" },
];

const sosHistory = [
  { id: 1, device: "John's iPhone", timestamp: "2023-10-25 18:00:00", status: "Resolved" },
  { id: 2, device: "Kid's Tablet", timestamp: "2023-10-22 12:30:00", status: "Resolved" },
];

const deviceActionLogs = [
    { id: 1, action: "SOS triggered by Kid's Tablet", timestamp: "15:01:30" },
    { id: 2, action: "Admin viewed location", timestamp: "15:01:45" },
    { id: 3, action: "Emergency contacts notified", timestamp: "15:02:00" },
];

const SosEmergencyPage = () => {
  return (
    <CrmLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#073064" ,fontSize:20}}>
          SOS & Emergency
        </Typography>

        {/* SOS Events Dashboard */}
        <Card sx={{ mb: 3, border: 2, borderColor: 'error.main' }}>
          <CardHeader
            avatar={<Avatar sx={{ bgcolor: 'error.main' }}><SosIcon /></Avatar>}
            title="Active SOS Event"
            titleTypographyProps={{ variant: 'h6', fontWeight: 'bold' }}
            sx={{ bgcolor: 'error.light', color: 'error.contrastText' }}
          />
          <CardContent>
            {activeSosEvents.length > 0 ? activeSosEvents.map(event => (
              <Grid container spacing={2} alignItems="center" key={event.id}>
                <Grid item xs={12} sm={4}>
                  <Typography><strong>Device:</strong> {event.device}</Typography>
                  <Typography><strong>Time:</strong> {event.timestamp}</Typography>
                </Grid>
                <Grid item xs={12} sm={5}>
                  <Typography><strong>Last Known Location:</strong> {event.location}</Typography>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <Button variant="contained" color="error" startIcon={<MyLocationIcon />}>View Live Location</Button>
                </Grid>
              </Grid>
            )) : <Typography>No active SOS events.</Typography>}
          </CardContent>
        </Card>

        <Grid container spacing={3}>
          {/* Device Action Logs */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="Device Action Logs (Live)" />
              <CardContent>
                <List dense>
                  {deviceActionLogs.map(log => (
                    <ListItem key={log.id}>
                      <ListItemText primary={log.action} secondary={log.timestamp} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Emergency Contacts */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader
                title="Emergency Contacts"
                action={<Button size="small" startIcon={<AddIcCallIcon />}>Add Contact</Button>}
              />
              <CardContent>
                <List>
                  {emergencyContacts.map(contact => (
                    <ListItem key={contact.id} secondaryAction={<IconButton><EditIcon fontSize="small" /></IconButton>}>
                      <ListItemText primary={contact.name} secondary={contact.phone} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* SOS History */}
          <Grid item xs={12} md={4}>
            <Card>
              <CardHeader title="SOS History" />
              <CardContent>
                <List>
                  {sosHistory.map(item => (
                    <ListItem key={item.id}>
                      <ListItemAvatar><Avatar sx={{ bgcolor: 'success.light' }}><CheckCircleIcon color="success" /></Avatar></ListItemAvatar>
                      <ListItemText primary={item.device} secondary={item.timestamp} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </CrmLayout>
  );
};

export default SosEmergencyPage;