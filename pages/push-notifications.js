import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Button,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CardHeader,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`push-notifications-tabpanel-${index}`}
      aria-labelledby={`push-notifications-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

// Mock Data
const templates = [
  { id: 1, name: "Welcome Message", title: "Welcome to KTO!", message: "Thanks for joining our family. Explore the app to get started." },
  { id: 2, name: "Subscription Renewal", title: "Subscription Expiring", message: "Your subscription is ending soon. Renew now to keep your family protected." },
];

const notificationLogs = [
  { id: 1, timestamp: "2023-10-27 16:00:00", title: "Welcome to KTO!", target: "The Williams Family", status: "Delivered" },
  { id: 2, timestamp: "2023-10-27 15:45:00", title: "New Feature Alert", target: "All Users", status: "Sent" },
  { id: 3, timestamp: "2023-10-27 15:30:00", title: "SOS Event Resolved", target: "The Doe Family", status: "Delivered" },
  { id: 4, timestamp: "2023-10-27 15:15:00", title: "Geofence Alert", target: "The Smith Family", status: "Failed" },
];

const getStatusChip = (status) => {
  switch (status) {
    case "Delivered":
      return <Chip label={status} color="success" size="small" />;
    case "Sent":
      return <Chip label={status} color="info" size="small" />;
    case "Failed":
      return <Chip label={status} color="error" size="small" />;
    default:
      return <Chip label={status} size="small" />;
  }
};

const PushNotificationsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  return (
    <CrmLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#073064" }}>
          Push Notifications
        </Typography>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabIndex} onChange={handleTabChange} aria-label="push notifications tabs">
              <Tab label="Send Custom Alert" />
              <Tab label="Notification Templates" />
              <Tab label="Notification Logs" />
            </Tabs>
          </Box>

          {/* Custom Alerts Tab */}
          <TabPanel value={tabIndex} index={0}>
            <Typography variant="h6" gutterBottom>Compose and Send Notification</Typography>
            <Stack spacing={3}>
              <FormControl size="small">
                <InputLabel>Load from Template</InputLabel>
                <Select label="Load from Template">
                  <MenuItem value=""><em>None</em></MenuItem>
                  {templates.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField label="Notification Title" variant="outlined" />
              <TextField label="Notification Message" variant="outlined" multiline rows={4} />
              <FormControl size="small">
                <InputLabel>Target Audience</InputLabel>
                <Select label="Target Audience" defaultValue="all">
                  <MenuItem value="all">All Users</MenuItem>
                  <MenuItem value="family">Specific Family</MenuItem>
                  <MenuItem value="device">Specific Device</MenuItem>
                </Select>
              </FormControl>
              <Button variant="contained" startIcon={<SendIcon />} sx={{ alignSelf: 'flex-start' }}>
                Send Notification
              </Button>
            </Stack>
          </TabPanel>

          {/* Notification Templates Tab */}
          <TabPanel value={tabIndex} index={1}>
            <CardHeader
              title="Manage Notification Templates"
              action={<Button variant="contained" size="small">Create Template</Button>}
              sx={{ p: 0, mb: 2 }}
            />
            <List>
              {templates.map(template => (
                <ListItem key={template.id} divider secondaryAction={
                  <Stack direction="row" spacing={1}>
                    <IconButton edge="end"><EditIcon /></IconButton>
                    <IconButton edge="end"><DeleteIcon /></IconButton>
                  </Stack>
                }>
                  <ListItemText primary={template.name} secondary={`Title: ${template.title}`} />
                </ListItem>
              ))}
            </List>
          </TabPanel>

          {/* Notification Logs Tab */}
          <TabPanel value={tabIndex} index={2}>
            <Typography variant="h6" gutterBottom>History of Sent Notifications</Typography>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table sx={{ minWidth: 650 }} aria-label="notification logs table">
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell>Timestamp</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell align="center">Delivery Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {notificationLogs.map((log) => (
                    <TableRow key={log.id}>
                      <TableCell>{log.timestamp}</TableCell>
                      <TableCell>{log.title}</TableCell>
                      <TableCell>{log.target}</TableCell>
                      <TableCell align="center">{getStatusChip(log.status)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
        </Card>
      </Box>
    </CrmLayout>
  );
};

export default PushNotificationsPage;