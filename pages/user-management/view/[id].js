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
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EditIcon from "@mui/icons-material/Edit";
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
            <Box sx={{ maxWidth: 900, mx: "auto" }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
                    <Stack direction="row" alignItems="center" spacing={2}>
                        <IconButton onClick={() => router.back()}>
                            <ArrowBackIcon />
                        </IconButton>
                        <Typography sx={{ fontWeight: "bold", color: "#073064", fontSize: 24 }}>
                            User Profile
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
                    <Grid item xs={12} md={4}>
                        <Card sx={{ borderRadius: 2, textAlign: "center", py: 4 }}>
                            <Avatar
                                src={user.image}
                                sx={{ width: 120, height: 120, mx: "auto", mb: 2, bgcolor: "#073064", fontSize: 40 }}
                            >
                                {user.name?.charAt(0) || user.email.charAt(0)}
                            </Avatar>
                            <Typography variant="h6" fontWeight="bold">{user.name || "N/A"}</Typography>
                            <Typography color="text.secondary" sx={{ mb: 2 }}>{user.email}</Typography>
                            <Chip
                                label={user.role === "super_admin" ? "Super Admin" : "Admin"}
                                color="primary"
                                size="small"
                            />
                        </Card>
                    </Grid>

                    <Grid item xs={12} md={8}>
                        <Card sx={{ borderRadius: 2 }}>
                            <CardContent>
                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Personal Information</Typography>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                                        <Typography variant="body1">{user.phoneNumber || "Not provided"}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Family Name</Typography>
                                        <Typography variant="body1">{user.familyName || "Not provided"}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Family ID</Typography>
                                        <Typography variant="body1" sx={{ color: "primary.main" }}>{user.familyId || "N/A"}</Typography>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Typography variant="caption" color="text.secondary">Joined Date</Typography>
                                        <Typography variant="body1">{new Date(user.createdAt).toLocaleDateString()}</Typography>
                                    </Grid>
                                </Grid>

                                <Divider sx={{ my: 3 }} />

                                <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 2 }}>Account Status</Typography>
                                <Stack direction="row" spacing={3}>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Verification</Typography>
                                        <Box sx={{ mt: 0.5 }}>
                                            <Chip
                                                label={user.isVerified ? "Verified" : "Unverified"}
                                                color={user.isVerified ? "success" : "warning"}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>
                                    </Box>
                                    <Box>
                                        <Typography variant="caption" color="text.secondary">Member Since</Typography>
                                        <Typography variant="body2">{new Date(user.createdAt).getFullYear()}</Typography>
                                    </Box>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </CrmLayout>
    );
};

export default ViewUserPage;
