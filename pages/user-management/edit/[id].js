import { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    TextField,
    Button,
    Grid,
    Stack,
    MenuItem,
    IconButton,
    Alert,
    CircularProgress,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useRouter } from "next/router";
import CrmLayout from "../../components/CrmLayout";
import instance from "../../api/api_instance";

const EditUserPage = () => {
    const router = useRouter();
    const { id } = router.query;
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        familyName: "",
        phoneNumber: "",
        role: "",
        isVerified: true,
    });

    useEffect(() => {
        if (id) {
            fetchUserDetails();
        }
    }, [id]);

    const fetchUserDetails = async () => {
        try {
            const response = await instance.get(`/users/${id}`);
            if (response.data.success) {
                const user = response.data.data;
                setFormData({
                    name: user.name || "",
                    email: user.email || "",
                    familyName: user.familyName || "",
                    phoneNumber: user.phoneNumber || "",
                    role: user.role || "admin",
                    isVerified: user.isVerified,
                });
            }
        } catch (err) {
            setError("Failed to fetch user details");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        setError(null);

        try {
            const response = await instance.patch(`/users/${id}`, formData);
            if (response.data.success) {
                router.push("/user-management");
            } else {
                setError(response.data.message || "Failed to update user");
            }
        } catch (err) {
            setError(err.response?.data?.message || "An error occurred while updating user");
        } finally {
            setSaving(false);
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

    return (
        <CrmLayout>
            <Box sx={{ maxWidth: 800, mx: "auto" }}>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mb: 3 }}>
                    <IconButton onClick={() => router.back()}>
                        <ArrowBackIcon />
                    </IconButton>
                    <Typography sx={{ fontWeight: "bold", color: "#073064", fontSize: 24 }}>
                        Edit User
                    </Typography>
                </Stack>

                <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                    <CardContent sx={{ p: 4 }}>
                        {error && (
                            <Alert severity="error" sx={{ mb: 3 }}>
                                {error}
                            </Alert>
                        )}

                        <form onSubmit={handleSubmit}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Full Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Phone Number"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        label="Family Name"
                                        name="familyName"
                                        value={formData.familyName}
                                        onChange={handleChange}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="User Role"
                                        name="role"
                                        value={formData.role}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="admin">Admin</MenuItem>
                                        <MenuItem value="super_admin">Super Admin</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <TextField
                                        fullWidth
                                        select
                                        label="Verification Status"
                                        name="isVerified"
                                        value={formData.isVerified}
                                        onChange={handleChange}
                                    >
                                        <MenuItem value={true}>Verified</MenuItem>
                                        <MenuItem value={false}>Unverified</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12}>
                                    <Stack direction="row" spacing={2} justifyContent="flex-end" sx={{ mt: 2 }}>
                                        <Button
                                            variant="outlined"
                                            onClick={() => router.back()}
                                            disabled={saving}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            type="submit"
                                            variant="contained"
                                            sx={{ backgroundColor: "#9B1FE8", "&:hover": { backgroundColor: "#7B19BA" } }}
                                            disabled={saving}
                                        >
                                            {saving ? <CircularProgress size={24} color="inherit" /> : "Save Changes"}
                                        </Button>
                                    </Stack>
                                </Grid>
                            </Grid>
                        </form>
                    </CardContent>
                </Card>
            </Box>
        </CrmLayout>
    );
};

export default EditUserPage;
