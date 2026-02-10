import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  TextField,
  Button,
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
  Chip,
  List,
  ListItem,
  ListItemText,
  IconButton,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import instance from "./api/api_instance";

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`push-notifications-tabpanel-${index}`}
      aria-labelledby={`push-notifications-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: { xs: 1, sm: 3 } }}>{children}</Box>}
    </div>
  );
};

const getStatusChip = (log) => {
  if (log.failureCount === 0) {
    return <Chip label="Delivered" color="success" size="small" />;
  } else if (log.successCount > 0) {
    return <Chip label="Partial" color="warning" size="small" />;
  } else {
    return <Chip label="Failed" color="error" size="small" />;
  }
};

const PushNotificationsPage = () => {
  const [tabIndex, setTabIndex] = useState(0);
  const [templates, setTemplates] = useState([]);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [templateLoading, setTemplateLoading] = useState(false);
  const [logsLoading, setLogsLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [targetType, setTargetType] = useState("all");
  const [targetValue, setTargetValue] = useState("");
  const [sending, setSending] = useState(false);

  // Template Modal State
  const [openTemplateModal, setOpenTemplateModal] = useState(false);
  const [newTemplate, setNewTemplate] = useState({ name: "", title: "", message: "" });
  const [creatingTemplate, setCreatingTemplate] = useState(false);

  // Snackbar State
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  useEffect(() => {
    fetchTemplates();
    fetchLogs();
  }, []);

  const fetchTemplates = async () => {
    try {
      setTemplateLoading(true);
      const response = await instance.get("/notifications/templates");
      if (response.data.success) {
        setTemplates(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching templates:", error);
    } finally {
      setTemplateLoading(false);
    }
  };

  const fetchLogs = async () => {
    try {
      setLogsLoading(true);
      const response = await instance.get("/notifications/logs");
      if (response.data.success) {
        setLogs(response.data.data.logs);
      }
    } catch (error) {
      console.error("Error fetching logs:", error);
    } finally {
      setLogsLoading(false);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleLoadTemplate = (event) => {
    const templateId = event.target.value;
    if (templateId) {
      const template = templates.find(t => t.id === templateId);
      if (template) {
        setTitle(template.title);
        setMessage(template.message);
      }
    }
  };

  const handleSendNotification = async () => {
    if (!title || !message) {
      setSnackbar({ open: true, message: "Please fill in title and message", severity: "error" });
      return;
    }

    if (targetType !== "all" && !targetValue) {
      setSnackbar({ open: true, message: `Please provide a ${targetType} ID`, severity: "error" });
      return;
    }

    try {
      setSending(true);
      const payload = {
        title,
        message,
        targetAudience: {
          type: targetType,
          value: targetType === "all" ? undefined : targetValue
        }
      };

      const response = await instance.post("/notifications/send", payload);
      if (response.data.success) {
        setSnackbar({ open: true, message: "Notification sent successfully!", severity: "success" });
        setTitle("");
        setMessage("");
        setTargetValue("");
        fetchLogs();
      }
    } catch (error) {
      console.error("Error sending notification:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to send notification",
        severity: "error"
      });
    } finally {
      setSending(false);
    }
  };

  const handleCreateTemplate = async () => {
    if (!newTemplate.name || !newTemplate.title || !newTemplate.message) {
      setSnackbar({ open: true, message: "Please fill in all template fields", severity: "error" });
      return;
    }

    try {
      setCreatingTemplate(true);
      const response = await instance.post("/notifications/templates", newTemplate);
      if (response.data.success) {
        setSnackbar({ open: true, message: "Template created successfully!", severity: "success" });
        setOpenTemplateModal(false);
        setNewTemplate({ name: "", title: "", message: "" });
        fetchTemplates();
      }
    } catch (error) {
      console.error("Error creating template:", error);
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to create template",
        severity: "error"
      });
    } finally {
      setCreatingTemplate(false);
    }
  };

  const handleDeleteTemplate = async (id) => {
    if (!window.confirm("Are you sure you want to delete this template?")) return;

    try {
      const response = await instance.delete(`/notifications/templates/${id}`);
      if (response.data.success) {
        setSnackbar({ open: true, message: "Template deleted successfully!", severity: "success" });
        fetchTemplates();
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      setSnackbar({ open: true, message: "Failed to delete template", severity: "error" });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <CrmLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#073064" }}>
          Push Notifications
        </Typography>

        <Card>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs
              value={tabIndex}
              onChange={handleTabChange}
              aria-label="push notifications tabs"
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
            >
              <Tab label="Send Custom Alert" />
              <Tab label="Notification Templates" />
              <Tab label="Notification Logs" />
            </Tabs>
          </Box>

          {/* Custom Alerts Tab */}
          <TabPanel value={tabIndex} index={0}>
            <Typography variant="h6" gutterBottom>Compose and Send Notification</Typography>
            <Stack spacing={3}>
              <FormControl size="small">
                <InputLabel>Load from Template</InputLabel>
                <Select label="Load from Template" onChange={handleLoadTemplate} defaultValue="">
                  <MenuItem value=""><em>None</em></MenuItem>
                  {templates.map(t => <MenuItem key={t.id} value={t.id}>{t.name}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField
                label="Notification Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <TextField
                label="Notification Message"
                variant="outlined"
                multiline
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <FormControl size="small" sx={{ minWidth: { xs: "100%", sm: 200 } }}>
                  <InputLabel>Target Audience</InputLabel>
                  <Select
                    label="Target Audience"
                    value={targetType}
                    onChange={(e) => setTargetType(e.target.value)}
                  >
                    <MenuItem value="all">All Users</MenuItem>
                    <MenuItem value="family">Specific Family (ID)</MenuItem>
                    <MenuItem value="child">Specific Child (Track ID)</MenuItem>
                  </Select>
                </FormControl>
                {targetType !== "all" && (
                  <TextField
                    size="small"
                    label={`${targetType === "family" ? "Family ID" : "Track ID"}`}
                    variant="outlined"
                    value={targetValue}
                    onChange={(e) => setTargetValue(e.target.value)}
                    sx={{ flexGrow: 1, width: { xs: "100%", sm: "auto" } }}
                  />
                )}
              </Stack>
              <Button
                variant="contained"
                startIcon={sending ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
                sx={{ alignSelf: 'flex-start' }}
                onClick={handleSendNotification}
                disabled={sending}
              >
                {sending ? "Sending..." : "Send Notification"}
              </Button>
            </Stack>
          </TabPanel>

          {/* Notification Templates Tab */}
          <TabPanel value={tabIndex} index={1}>
            <CardHeader
              title="Manage Notification Templates"
              action={
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setOpenTemplateModal(true)}
                >
                  Create Template
                </Button>
              }
              sx={{ p: 0, mb: 2 }}
            />
            {templateLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
            ) : (
              <List>
                {templates.length > 0 ? templates.map(template => (
                  <ListItem key={template.id} divider secondaryAction={
                    <Stack direction="row" spacing={1}>
                      <IconButton edge="end" onClick={() => {
                        setNewTemplate({ name: template.name, title: template.title, message: template.message });
                        setOpenTemplateModal(true);
                      }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton edge="end" onClick={() => handleDeleteTemplate(template.id)}><DeleteIcon /></IconButton>
                    </Stack>
                  }>
                    <ListItemText primary={template.name} secondary={`Title: ${template.title}`} />
                  </ListItem>
                )) : (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 3 }}>
                    No templates found.
                  </Typography>
                )}
              </List>
            )}
          </TabPanel>

          {/* Notification Logs Tab */}
          <TabPanel value={tabIndex} index={2}>
            <Typography variant="h6" gutterBottom>History of Sent Notifications</Typography>
            {logsLoading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}><CircularProgress /></Box>
            ) : (
              <TableContainer component={Paper} sx={{ boxShadow: "none" }}>
                <Table sx={{ minWidth: 650 }} aria-label="notification logs table">
                  <TableHead sx={{ backgroundColor: "#f5f5f5" }}>
                    <TableRow>
                      <TableCell>Timestamp</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Target</TableCell>
                      <TableCell align="center">Recipients</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logs && logs.length > 0 ? logs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell>{new Date(log.createdAt).toLocaleString()}</TableCell>
                        <TableCell>{log.title}</TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ textTransform: 'capitalize' }}>
                            {log.targetAudienceType}
                          </Typography>
                          {log.targetAudienceValue && (
                            <Typography variant="caption" color="text.secondary">
                              Value: {typeof log.targetAudienceValue === 'string' ? log.targetAudienceValue : JSON.stringify(log.targetAudienceValue)}
                            </Typography>
                          )}
                        </TableCell>
                        <TableCell align="center">
                          {log.successCount} / {log.recipientsCount}
                        </TableCell>
                        <TableCell align="center">{getStatusChip(log)}</TableCell>
                      </TableRow>
                    )) : (
                      <TableRow>
                        <TableCell colSpan={5} align="center">No logs found.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </Card>
      </Box>

      {/* Create Template Dialog */}
      <Dialog open={openTemplateModal} onClose={() => setOpenTemplateModal(false)} fullWidth maxWidth="sm">
        <DialogTitle>Create Notification Template</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Template Name"
              fullWidth
              value={newTemplate.name}
              onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
            />
            <TextField
              label="Default Title"
              fullWidth
              value={newTemplate.title}
              onChange={(e) => setNewTemplate({ ...newTemplate, title: e.target.value })}
            />
            <TextField
              label="Default Message"
              fullWidth
              multiline
              rows={4}
              value={newTemplate.message}
              onChange={(e) => setNewTemplate({ ...newTemplate, message: e.target.value })}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateModal(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleCreateTemplate}
            disabled={creatingTemplate}
          >
            {creatingTemplate ? <CircularProgress size={24} color="inherit" /> : "Create"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Feedback Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </CrmLayout>
  );
};

export default PushNotificationsPage;