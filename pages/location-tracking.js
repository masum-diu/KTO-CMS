import { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
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
    Button,
    TextField,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import MyLocationIcon from '@mui/icons-material/MyLocation';

// Mock Data
const devices = [
    { id: 1, name: "John's iPhone 13" },
    { id: 2, name: "Jane's Samsung S22" },
    { id: 3, name: "Kid's Tablet" },
];

const movementLogs = [
    { id: 1, deviceId: 1, timestamp: "2023-10-27 14:30:00", location: "123 Main St, Anytown, USA", speed: "5 mph" },
    { id: 2, deviceId: 1, timestamp: "2023-10-27 14:25:10", location: "Central Park, Anytown, USA", speed: "0 mph" },
    { id: 3, deviceId: 2, timestamp: "2023-10-27 14:20:00", location: "Anytown Mall", speed: "2 mph" },
    { id: 4, deviceId: 3, timestamp: "2023-10-27 14:15:00", location: "School Library", speed: "0 mph" },
    { id: 5, deviceId: 1, timestamp: "2023-10-27 14:10:00", location: "456 Oak Ave, Anytown, USA", speed: "15 mph" },
    { id: 6, deviceId: 2, timestamp: "2023-10-27 14:05:00", location: "City Coffee Shop", speed: "0 mph" },
];

const LocationTrackingPage = () => {
    const [selectedDevice, setSelectedDevice] = useState(devices[0].id);

    const handleDeviceChange = (event) => {
        setSelectedDevice(event.target.value);
    };

    const filteredLogs = movementLogs.filter(log => log.deviceId === selectedDevice);

    return (
        <CrmLayout>
            <Box>
                <Typography sx={{ mb: 3, fontWeight: "bold", color: "#073064", fontSize: 20 }}>
                    Location Tracking
                </Typography>

                <Card sx={{ mb: 3 }}>
                    <CardContent>
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} alignItems="center">
                            <FormControl size="small" sx={{ minWidth: 200 }}>
                                <InputLabel>Select Device</InputLabel>
                                <Select
                                    value={selectedDevice}
                                    label="Select Device"
                                    onChange={handleDeviceChange}
                                >
                                    {devices.map((device) => (
                                        <MenuItem key={device.id} value={device.id}>{device.name}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <TextField
                                label="Date Range"
                                type="date"
                                size="small"
                                defaultValue="2023-10-27"
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button variant="contained" sx={{

                                textTransform: "none",
                                fontSize: 16,
                                backgroundColor: "#9B1FE8",
                                color: "#fff",

                                "&:hover": {
                                    backgroundColor: "#8A1CC8",
                                    color: "#fff",
                                },
                            }}>View History</Button>
                        </Stack>
                    </CardContent>
                </Card>

                <Grid container spacing={3}>
                    {/* Location History Map */}
                    <Grid item xs={12} md={7}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Location History</Typography>
                                <Box
                                    sx={{
                                        height: 500,
                                        backgroundColor: '#e0e0e0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        borderRadius: 1,
                                        color: 'text.secondary'
                                    }}
                                >
                                    {/* This is a placeholder for the actual map component */}
                                    Map Component Placeholder
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Movement Logs */}
                    <Grid item xs={12} md={5}>
                        <Card sx={{ height: '100%' }}>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>Movement Logs</Typography>
                                <TableContainer component={Paper} sx={{ boxShadow: 'none', height: 468 }}>
                                    <Table stickyHeader aria-label="movement logs table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Timestamp</TableCell>
                                                <TableCell>Location</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {filteredLogs.map((log) => (
                                                <TableRow key={log.id}>
                                                    <TableCell sx={{ whiteSpace: 'nowrap' }}>{log.timestamp}</TableCell>
                                                    <TableCell>{log.location}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </CrmLayout>
    );
};

export default LocationTrackingPage;