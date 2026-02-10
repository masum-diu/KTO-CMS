import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Grid,
    Stack,
    IconButton,
    Avatar,
    Divider,
    Chip,
    CircularProgress,
    Paper,
    Tooltip,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
import DevicesIcon from "@mui/icons-material/Devices";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import ImageIcon from "@mui/icons-material/Image";
import { useRouter } from "next/router";
import CrmLayout from "../../components/CrmLayout";
import instance from "../../api/api_instance";

const ViewUserPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (id) {
            fetchUserDetails();
        }
    }, [id]);

    const fetchUserDetails = async () => {
        try {
            setLoading(true);
            const response = await instance.get(`/users/${id}`);
            if (response.data.success) {
                setUser(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching user details:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <CrmLayout>
                <Box sx={{ display: "flex", justifyContent: "center", mt: 10 }}>
                    <CircularProgress />
                </Box>
            </CrmLayout>
        );
    }

    if (!user) {
        return (
            <CrmLayout>
                <Typography>User not found</Typography>
            </CrmLayout>
        );
    }

    return (
        <CrmLayout>
            <Box sx={{ maxWidth: 1100, mx: "auto", pb: 5 }}>
                {/* Header */}
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton onClick={() => router.back()}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography sx={{ fontWeight: "bold", color: "#073064", fontSize: 24 }}>
                            User Detail View
                        </Typography>
                    </Stack>
                    <IconButton
                        onClick={() => router.push(`/user-management/edit/${id}`)}
                        sx={{ backgroundColor: "#9B1FE8", color: "#fff", "&:hover": { backgroundColor: "#7B19BA" } }}
                    >
                        <EditIcon fontSize="small" />
                    </IconButton>
                </Stack>

                <Grid container spacing={3}>
                    {/* Sidebar Profile Card */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ borderRadius: 2, textAlign: "center", py: 4, mb: 3 }}>
                            <Avatar
                                src={user.image}
                                sx={{ width: 120, height: 120, mx: "auto", mb: 2, bgcolor: "#073064", fontSize: 40 }}
                            >
                                {user.name?.charAt(0) || user.email.charAt(0)}
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">{user.name || "N/A"}</Typography>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>{user.email}</Typography>
                            <Stack direction="row" spacing={1} justifyContent="center">
                                <Chip
                                    label={user.role === "super_admin" ? "Super Admin" : "Admin"}
                                    color="primary"
                                    size="small"
                                />
                                <Chip
                                    label={user.isVerified ? "Verified" : "Unverified"}
                                    color={user.isVerified ? "success" : "warning"}
                                    size="small"
                                    variant="outlined"
                                />
                            </Stack>
                        </Card>

                        <Card sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="subtitle2" fontWeight="bold" color="text.secondary" sx={{ mb: 2, textTransform: "uppercase" }}>
                                    Account Meta
                                </Typography>
                                <Stack spacing={2}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">User ID</Typography>
                                        <Typography variant="body2" fontWeight="medium">#{user.id}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Joined Since</Typography>
                                        <Typography variant="body2" fontWeight="medium">{new Date(user.createdAt).toLocaleDateString()}</Typography>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Last Updated</Typography>
                                        <Typography variant="body2" fontWeight="medium">{new Date(user.updatedAt).toLocaleDateString()}</Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Main Content Area */}
                    <Grid item xs={12} md={8}>
                        {/* Profile Info Card */}
                        <Card sx={{ borderRadius: 2, mb: 3 }}>
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>General Information</Typography>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Full Name</Typography>
                                        <Typography variant="body1" fontWeight="medium">{user.name || "N/A"}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Email Address</Typography>
                                        <Typography variant="body1" fontWeight="medium">{user.email}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                                        <Typography variant="body1" fontWeight="medium">{user.phoneNumber || "Not provided"}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Family Name</Typography>
                                        <Typography variant="body1" fontWeight="medium">{user.familyName || "N/A"}</Typography>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Typography variant="caption" color="text.secondary">Family ID</Typography>
                                        <Typography variant="body1" fontWeight="bold" color="primary">{user.familyId || "N/A"}</Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>

                        {/* Family Members / Children Section */}
                        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, mt: 4, color: "#073064", display: "flex", alignItems: "center", gap: 1 }}>
                            <DevicesIcon /> Family Members & Devices ({user.children?.length || 0})
                        </Typography>

                        {user.children && user.children.length > 0 ? (
                            user.children.map((item, index) => (
                                <Card key={index} sx={{ borderRadius: 2, mb: 3, borderLeft: "5px solid #9B1FE8" }}>
                                    <CardContent>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={8}>
                                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
                                                    <Avatar sx={{ bgcolor: "#F3E5F5", color: "#9B1FE8" }}>
                                                        {item.child?.name?.charAt(0) || <DevicesIcon />}
                                                    </Avatar>
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight="bold">
                                                            {item.child?.name || "Unnamed Device"}
                                                        </Typography>
                                                        <Typography variant="caption" color="text.secondary">
                                                            Track ID: {item.child?.trackId}
                                                        </Typography>
                                                    </Box>
                                                    {item.deviceStatus && (
                                                        <Chip
                                                            label={item.deviceStatus}
                                                            size="small"
                                                            color={item.deviceStatus === "Online" ? "success" : "default"}
                                                            variant="outlined"
                                                        />
                                                    )}
                                                </Stack>

                                                <Grid container spacing={2}>
                                                    <Grid item xs={6}>
                                                        <Typography variant="caption" color="text.secondary">Device Brand</Typography>
                                                        <Typography variant="body2" fontWeight="medium">{item.child?.deviceBrand || "N/A"}</Typography>
                                                    </Grid>
                                                    <Grid item xs={6}>
                                                        <Typography variant="caption" color="text.secondary">Device ID</Typography>
                                                        <Typography variant="body2" fontWeight="medium" sx={{ wordBreak: "break-all" }}>{item.child?.deviceId || "N/A"}</Typography>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        <Typography variant="caption" color="text.secondary">Device Token</Typography>
                                                        <Typography variant="caption" display="block" sx={{ wordBreak: "break-all", color: "text.secondary", bgcolor: "#f5f5f5", p: 1, borderRadius: 1 }}>
                                                            {item.child?.deviceToken || "No token available"}
                                                        </Typography>
                                                    </Grid>
                                                </Grid>
                                            </Grid>

                                            <Grid item xs={12} sm={4}>
                                                <Paper variant="outlined" sx={{ p: 2, bgcolor: "#FAFAFA", borderRadius: 2 }}>
                                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>Device Stats</Typography>
                                                    <Stack spacing={1.5}>
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <LocationOnIcon fontSize="small" color="action" />
                                                                <Typography variant="body2">Locations</Typography>
                                                            </Stack>
                                                            <Chip label={item.locationCount || 0} size="small" />
                                                        </Stack>
                                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                            <Stack direction="row" spacing={1} alignItems="center">
                                                                <NotificationsActiveIcon fontSize="small" color="action" />
                                                                <Typography variant="body2">Alerts</Typography>
                                                            </Stack>
                                                            <Chip label={item.alertsCount || 0} size="small" color="error" variant="outlined" />
                                                        </Stack>
                                                    </Stack>
                                                </Paper>
                                            </Grid>

                                            {/* Screenshots Section */}
                                            {item.screenshots && item.screenshots.length > 0 && (
                                                <Grid item xs={12}>
                                                    <Divider sx={{ my: 2 }} />
                                                    <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, display: "flex", alignItems: "center", gap: 1 }}>
                                                        <ImageIcon fontSize="small" /> Recent Screenshots
                                                    </Typography>
                                                    <Stack direction="row" spacing={1} sx={{ overflowX: "auto", pb: 1 }}>
                                                        {item.screenshots.map((ss, ssIdx) => (
                                                            <Box
                                                                key={ssIdx}
                                                                component="img"
                                                                src={`https://ktobackend.etherstaging.xyz${ss.image_url}`}
                                                                sx={{
                                                                    width: 120,
                                                                    height: 160,
                                                                    objectFit: "cover",
                                                                    borderRadius: 1,
                                                                    border: "1px solid #ddd",
                                                                    cursor: "pointer",
                                                                    "&:hover": { opacity: 0.8 }
                                                                }}
                                                                onClick={() => window.open(`https://ktobackend.etherstaging.xyz${ss.image_url}`, "_blank")}
                                                            />
                                                        ))}
                                                    </Stack>
                                                </Grid>
                                            )}
                                        </Grid>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Paper sx={{ p: 4, textAlign: "center", borderRadius: 2, color: "text.secondary" }}>
                                <DevicesIcon sx={{ fontSize: 40, mb: 1, opacity: 0.5 }} />
                                <Typography>No children or devices linked to this account yet.</Typography>
                            </Paper>
                        )}
                    </Grid>
                </Grid>
            </Box>
        </CrmLayout>
    );
};

export default ViewUserPage;
