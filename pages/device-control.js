import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Stack,
  Chip,
  Divider,
  Switch,
  FormControlLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import SmartphoneIcon from "@mui/icons-material/Smartphone";
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';
import HearingIcon from '@mui/icons-material/Hearing';
import StorageIcon from '@mui/icons-material/Storage';
import SyncIcon from '@mui/icons-material/Sync';

const initialDevices = [
  {
    id: 1,
    name: "John's iPhone 13",
    status: "Online",
    isLocked: false,
    battery: 85,
    lastSynced: "2023-10-27 11:15:00",
    storage: "64GB / 128GB",
  },
  {
    id: 2,
    name: "Jane's Samsung S22",
    status: "Offline",
    isLocked: true,
    battery: 30,
    lastSynced: "2023-10-27 09:30:10",
    storage: "100GB / 256GB",
  },
  {
    id: 3,
    name: "Kid's Tablet",
    status: "Online",
    isLocked: false,
    battery: 95,
    lastSynced: "2023-10-27 11:20:25",
    storage: "25GB / 64GB",
  },
];

const DeviceControlPage = () => {
  const [devices, setDevices] = useState(initialDevices);
  const [openWipeDialog, setOpenWipeDialog] = useState(false);
  const [selectedDeviceId, setSelectedDeviceId] = useState(null);

  const handleToggleLock = (deviceId) => {
    setDevices(
      devices.map((device) =>
        device.id === deviceId ? { ...device, isLocked: !device.isLocked } : device
      )
    );
  };

  const handlePlaySound = (deviceId) => {
    // Placeholder for API call
    alert(`Playing loud sound on device ${deviceId}...`);
  };

  const handleAudioMonitor = (deviceId) => {
    // Placeholder for API call
    alert(`Initiating remote audio monitoring for device ${deviceId}...`);
  };

  const handleClickOpenWipeDialog = (deviceId) => {
    setSelectedDeviceId(deviceId);
    setOpenWipeDialog(true);
  };

  const handleCloseWipeDialog = () => {
    setOpenWipeDialog(false);
    setSelectedDeviceId(null);
  };

  const handleConfirmWipe = () => {
    // Placeholder for API call
    alert(`Wiping data for device ${selectedDeviceId}...`);
    handleCloseWipeDialog();
  };

  return (
    <CrmLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#073064" }}>
          Device Control
        </Typography>
        <Grid container spacing={3}>
          {devices.map((device) => (
            <Grid item xs={12} md={6} lg={4} key={device.id}>
              <Card>
                <CardContent>
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                    <SmartphoneIcon sx={{ color: "#073064" }} />
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      {device.name}
                    </Typography>
                    <Chip
                      label={device.status}
                      color={device.status === "Online" ? "success" : "default"}
                      size="small"
                    />
                  </Stack>                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Last synced: {device.lastSynced}
                  </Typography>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Device Health
                  </Typography>
                  <Stack spacing={1} sx={{ color: 'text.secondary', mb: 2 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <BatteryChargingFullIcon fontSize="small" /> <Typography variant="body2">{device.battery}% Battery</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <StorageIcon fontSize="small" /> <Typography variant="body2">Storage: {device.storage}</Typography>
                    </Stack>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                    Controls
                  </Typography>
                  <Stack spacing={1}>
                    <Button
                      variant="outlined"
                      startIcon={device.isLocked ? <LockOpenIcon /> : <LockIcon />}
                      onClick={() => handleToggleLock(device.id)}
                    >
                      {device.isLocked ? "Unlock Device" : "Lock Device"}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<HearingIcon />}
                      onClick={() => handleAudioMonitor(device.id)}
                    >
                      Audio Monitoring
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<VolumeUpIcon />}
                      onClick={() => handlePlaySound(device.id)}
                      sx={{ '& .MuiButton-startIcon': { marginRight: '4px' } }} // Adjust icon spacing
                    >
                      Play Loud Sound
                    </Button>
                  </Stack>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold', color: 'error.main' }}>
                    Danger Zone
                  </Typography>
                  <Button
                    variant="contained"
                    color="error"
                    startIcon={<DeleteForeverIcon />}
                    onClick={() => handleClickOpenWipeDialog(device.id)}
                  >
                    Wipe Data
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Dialog open={openWipeDialog} onClose={handleCloseWipeDialog}>
          <DialogTitle>Confirm Data Wipe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to permanently wipe all data from this device? This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseWipeDialog}>Cancel</Button>
            <Button onClick={handleConfirmWipe} color="error" autoFocus>
              Confirm Wipe
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CrmLayout>
  );
};

export default DeviceControlPage;