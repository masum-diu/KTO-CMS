import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  LinearProgress,
  Button,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import WifiIcon from "@mui/icons-material/Wifi";
import WarningIcon from "@mui/icons-material/Warning";
import BatteryAlertIcon from "@mui/icons-material/BatteryAlert";
import LockIcon from "@mui/icons-material/Lock";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// Mock Data
const overviewStats = {
  totalDevices: 3,
  onlineDevices: 2,
  familyMembers: 4,
  activeAlerts: 3,
};

const recentAlerts = [
  {
    id: 1,
    icon: <WarningIcon color="error" />,
    primary: "Failed Login Attempt",
    secondary: "From IP: 10.0.0.5 on John's iPhone",
  },
  {
    id: 2,
    icon: <BatteryAlertIcon color="warning" />,
    primary: "Low Battery",
    secondary: "Jane's Samsung S22 is at 15%",
  },
  {
    id: 3,
    icon: <LockIcon color="info" />,
    primary: "Device Locked",
    secondary: "Kid's Tablet was locked remotely",
  },
];

const deviceStats = [
  { name: "John's iPhone 13", battery: 85, status: "Online" },
  { name: "Jane's Samsung S22", battery: 15, status: "Offline" },
  { name: "Kid's Tablet", battery: 95, status: "Online" },
];

const usageInsights = [
  { name: "YouTube", time: "3h 45m" },
  { name: "TikTok", time: "2h 15m" },
  { name: "Roblox", time: "1h 30m" },
];

const StatCard = ({ title, value, icon }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "#073064", mr: 2 }}>{icon}</Avatar>
        <Box>
          <Typography variant="h5" component="div">
            {value}
          </Typography>
          <Typography color="text.secondary">{title}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  return (
    <CrmLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#073064" }}>
          Dashboard
        </Typography>

        {/* Overview Section */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Total Devices" value={overviewStats.totalDevices} icon={<DevicesIcon />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Devices Online" value={overviewStats.onlineDevices} icon={<WifiIcon />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Family Members" value={overviewStats.familyMembers} icon={<PeopleIcon />} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard title="Active Alerts" value={overviewStats.activeAlerts} icon={<NotificationsActiveIcon />} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Alerts & Notifications */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Recent Alerts & Notifications" />
              <CardContent>
                <List>
                  {recentAlerts.map((alert) => (
                    <ListItem key={alert.id} disablePadding>
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "transparent" }}>{alert.icon}</Avatar>
                      </ListItemAvatar>
                      <ListItemText primary={alert.primary} secondary={alert.secondary} />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Device & Family Stats */}
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Device & Family Stats" />
              <CardContent>
                {deviceStats.map((device) => (
                  <Box key={device.name} sx={{ mb: 2 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 0.5 }}>
                      <Typography variant="body2">{device.name}</Typography>
                      <Typography variant="body2" color={device.battery > 20 ? "text.secondary" : "error"}>
                        {device.battery}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={device.battery}
                      color={device.battery > 20 ? "primary" : "error"}
                    />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Grid>

          {/* Usage Insights */}
          <Grid item xs={12}>
            <Card>
              <CardHeader
                title="Usage Insights"
                subheader="Top used apps across all devices today"
                action={
                  <Button
                    size="small"
                    endIcon={<ArrowForwardIcon />}
                    // onClick={() => router.push('/app-usage')} // Example navigation
                  >
                    View Details
                  </Button>
                }
              />
              <CardContent>
                <Grid container spacing={2}>
                  {usageInsights.map((app) => (
                    <Grid item xs={12} sm={4} key={app.name}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6">{app.name}</Typography>
                          <Typography color="text.secondary">{app.time}</Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </CrmLayout>
  );
};

export default DashboardPage;