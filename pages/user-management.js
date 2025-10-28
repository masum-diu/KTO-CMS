import { useState } from "react";
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
  Tabs,
  Tab,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";

const initialFamilies = [
  {
    id: 1,
    familyName: "The Doe Family",
    parents: ["john.doe@email.com", "jane.doe@email.com"],
    childDevices: 2,
    status: "Active",
    subscription: "Premium Plan",
    joinDate: "2023-01-15",
  },
  {
    id: 2,
    familyName: "The Smith Family",
    parents: ["smith.bob@email.com"],
    childDevices: 1,
    status: "Active",
    subscription: "Basic Plan",
    joinDate: "2023-03-22",
  },
  {
    id: 3,
    familyName: "The Garcia Family",
    parents: ["maria.g@email.com", "carlos.g@email.com"],
    childDevices: 3,
    status: "Suspended",
    subscription: "Premium Plan",
    joinDate: "2022-11-10",
  },
  {
    id: 4,
    familyName: "The Williams Family",
    parents: ["dave.w@email.com"],
    childDevices: 1,
    status: "Trial",
    subscription: "Trial Period",
    joinDate: "2023-10-20",
  },
];

const UserManagementPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedFamilyId, setSelectedFamilyId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleMenuClick = (event, familyId) => {
    setAnchorEl(event.currentTarget);
    setSelectedFamilyId(familyId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedFamilyId(null);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const getStatusChip = (status) => {
    switch (status) {
      case "Active":
        return <Chip label={status} color="success" size="small" />;
      case "Suspended":
        return <Chip label={status} color="error" size="small" />;
      case "Trial":
        return <Chip label={status} color="info" size="small" />;
      default:
        return <Chip label={status} size="small" />;
    }
  };

  const filteredFamilies = initialFamilies.filter(family => 
    family.familyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    family.parents.some(parent => parent.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <CrmLayout>
      <Box>
        <Typography  sx={{ mb: 3, fontWeight: "bold", color: "#073064 " ,fontSize:20}}>
          User Management
        </Typography>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
              <TextField
                size="small"
                placeholder="Search by family or parent..."
                value={searchTerm}
                onChange={handleSearchChange}
                sx={{ width: "400px" }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Stack>
            <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
              <Table sx={{ minWidth: 650 }} aria-label="user management table">
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Family</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Parent Profiles</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">Child Devices</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Subscription</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">Account Status</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredFamilies.map((family) => (
                    <TableRow key={family.id}>
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle2" fontWeight="bold">{family.familyName}</Typography>
                        <Typography variant="body2" color="text.secondary">Joined: {family.joinDate}</Typography>
                      </TableCell>
                      <TableCell>{family.parents.join(", ")}</TableCell>
                      <TableCell align="center">{family.childDevices}</TableCell>
                      <TableCell>{family.subscription}</TableCell>
                      <TableCell align="center">{getStatusChip(family.status)}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={(e) => handleMenuClick(e, family.id)}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleMenuClose}>Edit Family</MenuItem>
          <MenuItem onClick={handleMenuClose}>Manage Subscription</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'warning.main' }}>Suspend Account</MenuItem>
          <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>Delete Family</MenuItem>
        </Menu>
      </Box>
    </CrmLayout>
  );
}

export default UserManagementPage;