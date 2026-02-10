import { useState, useEffect } from "react";
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
  CircularProgress,
  Chip,
  Stack,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import DevicesIcon from "@mui/icons-material/Devices";
import PeopleIcon from "@mui/icons-material/People";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ChildCareIcon from "@mui/icons-material/ChildCare";
import SecurityIcon from "@mui/icons-material/Security";
import HistoryIcon from "@mui/icons-material/History";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import instance from "./api/api_instance";

const StatCard = ({ title, value, icon }) => (
  <Card>
    <CardContent>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Avatar sx={{ bgcolor: "#073064", mr: 2 }}>{icon}</Avatar>
        <Box>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            {value}
          </Typography>
          <Typography color="text.secondary" variant="body2">{title}</Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

const DashboardPage = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await instance.get("/dashboard");
        if (response.data.success) {
          setData(response.data.data);
        } else {
          setError(response.data.message || "Failed to fetch dashboard data");
        }
      } catch (err) {
        setError(err.message || "An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <CrmLayout>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}>
          <CircularProgress />
        </Box>
      </CrmLayout>
    );
  }

  if (error) {
    return (
      <CrmLayout>
        <Box sx={{ p: 3 }}>
          <Typography color="error">Error: {error}</Typography>
        </Box>
      </CrmLayout>
    );
  }

  const { counts, recentUsers, recentNotifications } = data || {};

  return (
    <CrmLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#073064" }}>
          Dashboard Overview
        </Typography>

        {/* Overview Section */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={4} md={2}>
            <StatCard title="Users" value={counts?.users || 0} icon={<PeopleIcon />} />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatCard title="Children" value={counts?.children || 0} icon={<ChildCareIcon />} />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatCard title="Devices" value={counts?.devices || 0} icon={<DevicesIcon />} />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatCard title="Notifications" value={counts?.notifications || 0} icon={<NotificationsActiveIcon />} />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatCard title="Alerts" value={counts?.alerts || 0} icon={<SecurityIcon />} />
          </Grid>
          <Grid item xs={12} sm={4} md={2}>
            <StatCard title="Activities" value={counts?.activities || 0} icon={<HistoryIcon />} />
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* Recent Users */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Recent Users" sx={{ color: "#073064", borderBottom: '1px solid #efefef' }} />
              <CardContent>
                <List>
                  {recentUsers?.map((user) => (
                    <ListItem key={user.id} divider>
                      <ListItemAvatar>
                        <Avatar src={user.image} alt={user.name}>
                          {user.name ? user.name[0] : <PeopleIcon />}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.name || user.email}
                        secondary={
                          <>
                            <Typography variant="caption" display="block" color="text.secondary">
                              Family ID: {user.familyId}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Joined: {new Date(user.createdAt).toLocaleDateString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Notifications */}
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardHeader title="Recent Notifications" sx={{ color: "#073064", borderBottom: '1px solid #efefef' }} />
              <CardContent>
                <List>
                  {recentNotifications?.map((notif) => (
                    <ListItem key={notif.id} divider alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar sx={{ bgcolor: "transparent" }}>
                          <NotificationsActiveIcon color="primary" />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={notif.title}
                        secondary={
                          <Box component="span">
                            <Typography variant="body2" color="text.primary" sx={{ mb: 1 }}>
                              {notif.message}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 1, mb: 1 }}>
                              <Chip
                                icon={<CheckCircleIcon style={{ fontSize: 14 }} />}
                                label={`Success: ${notif.successCount}`}
                                size="small"
                                color="success"
                                variant="outlined"
                              />
                              <Chip
                                icon={<ErrorIcon style={{ fontSize: 14 }} />}
                                label={`Failed: ${notif.failureCount}`}
                                size="small"
                                color="error"
                                variant="outlined"
                              />
                            </Stack>
                            <Typography variant="caption" color="text.secondary">
                              Sent to {notif.recipientsCount} recipients • {new Date(notif.createdAt).toLocaleString()}
                            </Typography>
                          </Box>
                        }
                      />
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

export default DashboardPage;