import { useRouter } from "next/router";
import {
  Box,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  IconButton,
  MenuItem,
  Menu,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import SearchIcon from "@mui/icons-material/Search";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import TrackChangesIcon from '@mui/icons-material/TrackChanges';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import MapIcon from '@mui/icons-material/Map';
import SosIcon from '@mui/icons-material/Sos';
import PhonelinkSetupIcon from '@mui/icons-material/PhonelinkSetup';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ChatIcon from '@mui/icons-material/Chat';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import HistoryIcon from '@mui/icons-material/History';

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const menuItems = [
  {
    id: "dashboard",
    icon: <DashboardIcon />,
    text: "Dashboard",
  },
  // {
  //   id: "user-management",
  //   icon: <PeopleIcon />,
  //   text: "User Management",
  // },
  // {
  //   id: "location-tracking",
  //   icon: <GpsFixedIcon />,
  //   text: "Location Tracking",
  // },
  // {
  //   id: "app-website-usage",
  //   icon: <TrackChangesIcon />,
  //   text: "App & Website Usage",
  // },
  // {
  //   id: "parental-controls",
  //   icon: <SupervisorAccountIcon />,
  //   text: "Parental Controls",
  // },
  // {
  //   id: "geofencing",
  //   icon: <MapIcon />,
  //   text: "Geofencing & Safe Zones",
  // },
  // {
  //   id: "sos-emergency",
  //   icon: <SosIcon />,
  //   text: "SOS & Emergency",
  // },
  // {
  //   id: "device-control",
  //   icon: <PhonelinkSetupIcon />,
  //   text: "Device Control",
  // },
  // {
  //   id: "push-notifications",
  //   icon: <NotificationsActiveIcon />,
  //   text: "Push Notifications",
  // },
  // {
  //   id: "family-chat",
  //   icon: <ChatIcon />,
  //   text: "Family Chat & Communication",
  // },
  // {
  //   id: "reports-analytics",
  //   icon: <AssessmentIcon />,
  //   text: "Reports & Analytics",
  // },
  // {
  //   id: "system-settings",
  //   icon: <SettingsIcon />,
  //   text: "System Settings",
  // },
  // {
  //   id: "audit-logs",
  //   icon: <HistoryIcon />,
  //   text: "Audit Logs",
  // },
];

const CrmLayout = ({ children }) => {
  const { logout } = useAuth();
  const [auth, setAuth] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    logout();
  };

  const handleItemClick = (id) => {
    if (id === 'home') {
      router.push('/home');
    } else {
      router.push(`/${id}`);
    }
  };

  const isSelected = (id) => {
    if (id === 'home') return router.pathname === '/home';
    return router.pathname === `/${id}`;
  }

  return (
    <Box sx={{
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      display: "flex"
    }}>
      {/* Sidebar */}
      <Box
        sx={{
          backgroundColor: "#9B1FE8",
          width: "300px",
          display: "flex",
          flexDirection: "column",
          height: "100%"
        }}
      >
      
          <Box sx={{
            px: 3.5,
            pt: 3,
            pb: 2,
            flexShrink: 0
          }}>
            <Stack
              direction="column"
              spacing={1}
              justifyContent="center"
              alignItems={"center"}
            >
              <img src="/logoImage.png" alt="Logo" width={100} style={{boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.3)',padding
:'10px',borderRadius:'10%', 
              }} />
              <br />
              <Typography
                fontSize={16}
                className="Bold"
                textAlign={"center"}
                sx={{ color: "#fff" ,fontWeight:'bold'}}
              >
                KTO <br />Content Management System
              </Typography>
            </Stack>
          </Box>

          {/* Scrollable Menu Items */}
        <Box sx={{
          flex: 1,
          overflowY: "auto",
          px: 2,
          pb: 2
        }}>
          <List sx={{ py: 1 }}>
            {menuItems.map((item, index) => (
              <Box key={index}>
                <ListItem
                  sx={{
                    cursor: "pointer",
                    width: "100%",
                    height: "48px",
                    color: isSelected(item.id === 'dashboard' ? 'home' : item.id) ? "#fff" : "#fff",
                    borderRadius: "12px",
                    mb: 1,
                    backgroundColor: isSelected(item.id === 'dashboard' ? 'home' : item.id)
                      ? "#ffffff60"
                      : "transparent",
                    "&:hover": {
                      backgroundColor: isSelected(item.id === 'dashboard' ? 'home' : item.id)
                        ? "#ffffff60"
                        : "rgba(255, 255, 255, 0.1)",
                    },
                  }}
                  onClick={() => handleItemClick(item.id === 'dashboard' ? 'home' : item.id)}
                >
                  <ListItemIcon
                    sx={{
                      color: isSelected(item.id === 'dashboard' ? 'home' : item.id) ? "#fff" : "#fff",
                      minWidth: "40px",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        className={isSelected(item.id === 'dashboard' ? 'home' : item.id) ? "light" : "Medium"}
                        style={{ fontSize: 14 }}
                      >
                        {item.text}
                      </Typography>
                    }
                  />
                </ListItem>
              </Box>
            ))}
          </List>
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        {/* Top Bar */}
        <Box sx={{
          backgroundColor: "#fff",
          py: 2,
          px: 3,
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          zIndex: 1
        }}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <TextField
              size="small"
              placeholder="Search..."
              sx={{ width: "342px" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton>
                {/* Notification icon */}
              </IconButton>
              <IconButton>
                {/* Message icon */}
              </IconButton>
              <Stack spacing={3} direction="row" alignItems="center">
                <Stack direction="column" alignItems="flex-start" pt={1}>
                  <Typography fontWeight="500" fontSize={16} color="#073064">
                    John Doe
                  </Typography>
                  <Typography fontSize={12} color="#5A5A5A">
                    Admin
                  </Typography>
                </Stack>
                {auth && (
                  <Box>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <Avatar variant="circular" alt="Expand" width={20} src="" />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: "top", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                    >
                      <MenuItem onClick={handleSignOut}>Logout</MenuItem>
                    </Menu>
                  </Box>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Box>

        {/* Page Content - Scrollable Area */}
        <Box sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
          backgroundColor:"#eff1ee"
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default CrmLayout;