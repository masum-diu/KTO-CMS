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
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';

import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme, useMediaQuery, Drawer } from "@mui/material";

const menuItems = [
  {
    id: "dashboard",
    icon: <DashboardIcon />,
    text: "Dashboard",
  },
  {
    id: "user-management",
    icon: <PeopleIcon />,
    text: "User Management",
  },
  {
    id: "location-tracking",
    icon: <GpsFixedIcon />,
    text: "Location Tracking",
  },
  // {
  //   id: "app-website-usage",
  //   icon: <TrackChangesIcon />,
  //   text: "App & Website Usage",
  // },
  {
    id: "parental-controls",
    icon: <SupervisorAccountIcon />,
    text: "Parental Controls",
  },
  {
    id: "geofencing",
    icon: <MapIcon />,
    text: "Geofencing & Safe Zones",
  },
  {
    id: "sos-emergency",
    icon: <SosIcon />,
    text: "SOS & Emergency",
  },
  // {
  //   id: "device-control",
  //   icon: <PhonelinkSetupIcon />,
  //   text: "Device Control",
  // },
  {
    id: "push-notifications",
    icon: <NotificationsActiveIcon />,
    text: "Push Notifications",
  },
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
  const { user, logout } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleClose();
    logout();
  };

  const handleItemClick = (id) => {
    router.push(`/${id}`);
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const isSelected = (id) => {
    return router.pathname === `/${id}`;
  }

  const drawerContent = (
    <Box
      sx={{
        backgroundColor: "#fff",
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
          <img src="/logoImage.png" alt="Logo" width={100} />
          <br />
          <Typography
            fontSize={16}
            className="Bold"
            textAlign={"center"}
            sx={{ color: "#000", fontWeight: 'bold' }}
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
                  color: isSelected(item.id) ? "#fff" : "#000",
                  borderRadius: "12px",
                  mb: 1,
                  backgroundColor: isSelected(item.id)
                    ? "#9B1FE8"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: isSelected(item.id)
                      ? "#9B1FE8"
                      : "rgba(255, 255, 255, 0.1)",
                  },
                }}
                onClick={() => handleItemClick(item.id)}
              >
                <ListItemIcon
                  sx={{
                    color: isSelected(item.id) ? "#fff" : "#000",
                    minWidth: "40px",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      className={isSelected(item.id) ? "light" : "Medium"}
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
  );

  return (
    <Box sx={{
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      display: "flex"
    }}>
      {/* Sidebar - Desktop */}
      {!isMobile && (
        <Box sx={{ width: "300px", flexShrink: 0 }}>
          {drawerContent}
        </Box>
      )}

      {/* Sidebar - Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 300 },
        }}
      >
        {drawerContent}
      </Drawer>

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
            <Stack direction="row" alignItems="center" spacing={1}>
              {isMobile && (
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ mr: 1, color: "#9B1FE8" }}
                >
                  <MenuIcon />
                </IconButton>
              )}
              <TextField
                size="small"
                placeholder="Search..."
                sx={{ width: { xs: "100%", sm: "342px" } }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <Stack spacing={4} direction="row" alignItems="center">
              <IconButton>
                {/* Notification icon */}
              </IconButton>
              <IconButton>
                {/* Message icon */}
              </IconButton>
              <Stack spacing={3} direction="row" alignItems="center">
                <Stack direction="column" alignItems="flex-start" sx={{ display: { xs: 'none', sm: 'flex' } }}>
                  <Typography fontWeight="600" fontSize={14} color="#073064" sx={{ lineHeight: 1.2 }}>
                    {user?.name || "Admin User"}
                  </Typography>
                  <Typography fontSize={11} color="#5A5A5A" sx={{ textTransform: 'capitalize' }}>
                    {user?.role?.replace('_', ' ') || "Admin"}
                  </Typography>
                </Stack>
                {user && (
                  <Box>
                    <IconButton
                      size="large"
                      aria-label="account of current user"
                      onClick={handleMenu}
                      color="inherit"
                    >
                      <Avatar
                        sx={{
                          width: 38,
                          height: 38,
                          bgcolor: "#9B1FE8",
                          fontSize: 16,
                          fontWeight: 'bold',
                          cursor: 'pointer'
                        }}
                      >
                        {user?.name?.charAt(0).toUpperCase() || "A"}
                      </Avatar>
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                      transformOrigin={{ vertical: "top", horizontal: "right" }}
                      open={Boolean(anchorEl)}
                      onClose={handleClose}
                      disableScrollLock
                      PaperProps={{
                        sx: {
                          mt: 1.5,
                          boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                          borderRadius: "12px",
                          minWidth: "150px"
                        }
                      }}
                    >
                      <MenuItem onClick={handleSignOut} sx={{ py: 1.5, px: 2, borderRadius: "8px", mx: 1 }}>
                        <ListItemIcon>
                          <LogoutIcon fontSize="small" sx={{ color: "#d32f2f" }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Logout"
                          primaryTypographyProps={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#d32f2f"
                          }}
                        />
                      </MenuItem>
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
          p: { xs: 2, sm: 3 },
          backgroundColor: "#eff1ee"
        }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default CrmLayout;