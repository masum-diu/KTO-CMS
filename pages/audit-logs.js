import { useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Chip,
  Stack,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CrmLayout from "./components/CrmLayout";

// Mock data for audit logs
const createData = (id, timestamp, user, action, details, status) => {
  return { id, timestamp, user, action, details, status };
};

const initialRows = [
  createData(1, "2023-10-27 10:00:15", "admin@kto.com", "User Login", "User logged in successfully from IP 192.168.1.10", "Success"),
  createData(2, "2023-10-27 10:05:22", "john.doe@kto.com", "Data Export", "Exported 'User List' to CSV", "Success"),
  createData(3, "2023-10-27 10:15:30", "jane.doe@kto.com", "Settings Change", "Updated 'Notification Settings'", "Success"),
  createData(4, "2023-10-27 10:20:05", "admin@kto.com", "User Creation", "Created new user 'test.user@kto.com'", "Success"),
  createData(5, "2023-10-27 10:25:45", "john.doe@kto.com", "Failed Login", "Failed login attempt from IP 10.0.0.5", "Failure"),
  createData(6, "2023-10-27 10:30:11", "admin@kto.com", "User Deletion", "Deleted user 'old.user@kto.com'", "Success"),
  createData(7, "2023-10-27 10:35:00", "jane.doe@kto.com", "Geofence Created", "New geofence 'Home' created", "Success"),
  createData(8, "2023-10-27 10:40:50", "system", "System Update", "System updated to version 2.1.0", "Success"),
  createData(9, "2023-10-27 10:45:19", "john.doe@kto.com", "Device Control", "Locked device 'John's Phone'", "Success"),
  createData(10, "2023-10-27 10:50:02", "api@service.com", "API Access", "Third-party API access granted", "Failure"),
  createData(11, "2023-10-27 11:00:00", "admin@kto.com", "User Login", "User logged in successfully from IP 192.168.1.12", "Success"),
  createData(12, "2023-10-27 11:05:00", "sara.c@kto.com", "Profile Update", "Updated profile picture", "Success"),
];

const AuditLogsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredRows = initialRows.filter((row) => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return (
      row.user.toLowerCase().includes(lowercasedSearchTerm) ||
      row.action.toLowerCase().includes(lowercasedSearchTerm) ||
      row.details.toLowerCase().includes(lowercasedSearchTerm) ||
      row.status.toLowerCase().includes(lowercasedSearchTerm)
    );
  });

  const paginatedRows = filteredRows.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <CrmLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 'bold', color: '#073064' }}>
          Audit Logs
        </Typography>
        <Card>
          <CardContent>
            <Stack direction="row" justifyContent="space-between" sx={{ mb: 2 }}>
              <TextField
                size="small"
                placeholder="Search logs..."
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
              {/* Placeholder for more filters like Date Range */}
            </Stack>
            <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
              <Table sx={{ minWidth: 650 }} aria-label="audit logs table">
                <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                  <TableRow>
                    <TableCell sx={{ fontWeight: "bold" }}>Timestamp</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>User</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Action</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }}>Details</TableCell>
                    <TableCell sx={{ fontWeight: "bold" }} align="center">Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {paginatedRows.length > 0 ? (
                    paginatedRows.map((row) => (
                      <TableRow
                        key={row.id}
                        sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.timestamp}
                        </TableCell>
                        <TableCell>{row.user}</TableCell>
                        <TableCell>{row.action}</TableCell>
                        <TableCell>{row.details}</TableCell>
                        <TableCell align="center">
                          <Chip
                            label={row.status}
                            color={row.status === "Success" ? "success" : "error"}
                            size="small"
                            sx={{
                              color: '#fff',
                              fontWeight: 'bold',
                              width: '80px'
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No logs found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </CardContent>
        </Card>
      </Box>
    </CrmLayout>
  );
};

export default AuditLogsPage;