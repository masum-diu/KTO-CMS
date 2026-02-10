import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  Stack,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  TablePagination,
  CircularProgress,
  Tooltip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import CrmLayout from "../components/CrmLayout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import GroupIcon from "@mui/icons-material/Group";
import DevicesIcon from "@mui/icons-material/Devices";
import AddIcon from "@mui/icons-material/Add";
import { useRouter } from "next/router";
import instance from "../api/api_instance";

const UserManagementPage = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await instance.get("/users");
      if (response.data.success) {
        setUsers(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleMenuClick = (event, user) => {
    setAnchorEl(event.currentTarget);
    setSelectedUser(user);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedUser(null);
  };

  const handleView = () => {
    if (selectedUser) {
      router.push(`/user-management/view/${selectedUser.id}`);
    }
    handleMenuClose();
  };

  const handleEdit = () => {
    if (selectedUser) {
      router.push(`/user-management/edit/${selectedUser.id}`);
    }
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    setDeleteModalOpen(true);
    setAnchorEl(null);
  };

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        setIsDeleting(true);
        const response = await instance.delete(`/users/${selectedUser.id}`);
        if (response.data.success) {
          fetchUsers();
          setDeleteModalOpen(false);
          setSelectedUser(null);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
        alert("Failed to delete user");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusChip = (user) => {
    if (!user.isVerified) {
      return <Chip label="Unverified" color="warning" size="small" variant="outlined" />;
    }

    switch (user.role) {
      case "super_admin":
        return <Chip label="Super Admin" color="primary" size="small" />;
      case "admin":
        return <Chip label="Admin" color="secondary" size="small" />;
      case "user":
        return <Chip label="User" color="info" size="small" />;
      default:
        return <Chip label="Active" color="success" size="small" />;
    }
  };

  const filteredUsers = users.filter(user =>
    (user.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (user.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (user.familyId?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
    (user.familyName?.toLowerCase() || "").includes(searchTerm.toLowerCase())
  );

  const paginatedUsers = filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <CrmLayout>
      <Box>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography sx={{ fontWeight: "bold", color: "#073064", fontSize: 24 }}>
            User Management
          </Typography>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/user-management/create")}
            sx={{ backgroundColor: "#9B1FE8", "&:hover": { backgroundColor: "#7B19BA" } }}
          >
            Add User
          </Button>
        </Stack>

        <Card sx={{ borderRadius: 2, boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
          <CardContent sx={{ p: 0 }}>
            <Box sx={{ p: 3 }}>
              <TextField
                size="small"
                placeholder="Search by name, email, family ID..."
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ width: "400px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
            </Box>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
                <CircularProgress />
              </Box>
            ) : (
              <>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }}>
                    <TableHead sx={{ backgroundColor: "#f8fafd" }}>
                      <TableRow>
                        <TableCell sx={{ fontWeight: "bold", py: 2 }}>Profile Info</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Family Detail</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Family Members</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Join Date</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Status</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {paginatedUsers.length > 0 ? (
                        paginatedUsers.map((user) => (
                          <TableRow
                            key={user.id}
                            hover
                            onClick={() => router.push(`/user-management/view/${user.id}`)}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              cursor: "pointer"
                            }}
                          >
                            <TableCell>
                              <Stack direction="row" spacing={2} alignItems="center">
                                <Avatar
                                  src={user.image}
                                  sx={{ bgcolor: "#073064", width: 40, height: 40 }}
                                >
                                  {user.name ? user.name.charAt(0).toUpperCase() : user.email.charAt(0).toUpperCase()}
                                </Avatar>
                                <Box>
                                  <Typography variant="subtitle2" fontWeight="bold">
                                    {user.name || "N/A"}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {user.email}
                                  </Typography>
                                </Box>
                              </Stack>
                            </TableCell>
                            <TableCell>
                              <Typography variant="body2" fontWeight="medium">
                                {user.familyName || "No Family Name"}
                              </Typography>
                              <Typography variant="caption" sx={{ color: "text.secondary", mt: 0.5, display: "inline-block" }}>
                                ID: {user.familyId || "N/A"}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Tooltip title={`${user.children?.length || 0} Children`}>
                                <Stack direction="row" spacing={1} justifyContent="center" alignItems="center">
                                  <Chip
                                    icon={<DevicesIcon sx={{ fontSize: "16px !important" }} />}
                                    label={user.children?.length || 0}
                                    size="small"
                                    variant="outlined"
                                  />
                                </Stack>
                              </Tooltip>
                            </TableCell>
                            <TableCell align="center">
                              <Typography variant="body2">
                                {new Date(user.createdAt).toLocaleDateString()}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {new Date(user.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              {getStatusChip(user)}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleMenuClick(e, user);
                                }}
                                size="small"
                              >
                                <MoreVertIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={6} align="center" sx={{ py: 3 }}>
                            No users found matching your search.
                          </TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                </TableContainer>
                <TablePagination
                  rowsPerPageOptions={[5, 10, 25]}
                  component="div"
                  count={filteredUsers.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </>
            )}
          </CardContent>
        </Card>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleView}>View</MenuItem>
          <MenuItem onClick={handleEdit}>Edit</MenuItem>
          <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>Delete</MenuItem>
        </Menu>

        <Dialog
          open={deleteModalOpen}
          onClose={handleDeleteCancel}
          PaperProps={{
            sx: { borderRadius: 2, p: 1 }
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold", pb: 1 }}>Delete User</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete user <strong>{selectedUser?.email}</strong>?
              This action cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ p: 2, pt: 0 }}>
            <Button onClick={handleDeleteCancel} color="inherit" disabled={isDeleting}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmDelete}
              variant="contained"
              color="error"
              disabled={isDeleting}
              sx={{ boxShadow: "none" }}
            >
              {isDeleting ? <CircularProgress size={24} color="inherit" /> : "Delete"}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </CrmLayout>
  );
}

export default UserManagementPage;