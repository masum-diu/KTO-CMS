import { useState, useEffect } from "react";
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
  Tabs,
  Tab,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Chip,
  Divider,
  CircularProgress,
} from "@mui/material";
import CrmLayout from "./components/CrmLayout";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import instance from "./api/api_instance";

const initialApps = [
  { id: 1, name: "YouTube", status: "Allowed" },
  { id: 2, name: "TikTok", status: "Blocked" },
  { id: 3, name: "Roblox", status: "Allowed" },
  { id: 4, name: "Instagram", status: "Blocked" },
  { id: 5, name: "Calculator", status: "Allowed" },
  { id: 6, name: "Browser", status: "Allowed" },
];

const initialKeywords = ["bullying", "exam cheat"];

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`parental-controls-tabpanel-${index}`}
      aria-labelledby={`parental-controls-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
};

const ParentalControlsPage = () => {
  const [users, setUsers] = useState([]);
  const [selectedParent, setSelectedParent] = useState("");
  const [selectedChild, setSelectedChild] = useState("");
  const [loading, setLoading] = useState(true);

  const [tabIndex, setTabIndex] = useState(0);
  const [apps, setApps] = useState(initialApps);
  const [keywords, setKeywords] = useState(initialKeywords);
  const [newKeyword, setNewKeyword] = useState("");

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

  const handleParentChange = (event) => {
    setSelectedParent(event.target.value);
    setSelectedChild(""); // Reset child when parent changes
  };

  const handleChildChange = (event) => {
    setSelectedChild(event.target.value);
  };

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue);
  };

  const handleAppStatusChange = (appId, newStatus) => {
    setApps(apps.map(app => app.id === appId ? { ...app, status: newStatus } : app));
  };

  const handleAddKeyword = () => {
    if (newKeyword && !keywords.includes(newKeyword)) {
      setKeywords([...keywords, newKeyword]);
      setNewKeyword("");
    }
  };

  const handleDeleteKeyword = (keywordToDelete) => {
    setKeywords(keywords.filter(keyword => keyword !== keywordToDelete));
  };

  // Get current parent object
  const parentObj = users.find(u => u.id === selectedParent);
  // Get children of selected parent
  const childrenList = parentObj?.children || [];

  return (
    <CrmLayout>
      <Box>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#073064", fontSize: 20 }}>
          Parental Controls
        </Typography>

        <Card>
          <CardContent sx={{ pb: 1 }}>
            <Stack direction="row" spacing={2} sx={{ mb: 2 }}>
              <FormControl size="small" sx={{ minWidth: 240 }}>
                <InputLabel>Select Parent</InputLabel>
                <Select
                  value={selectedParent}
                  label="Select Parent"
                  onChange={handleParentChange}
                  disabled={loading}
                >
                  {loading ? (
                    <MenuItem disabled>
                      <CircularProgress size={20} sx={{ mr: 1 }} /> Loading...
                    </MenuItem>
                  ) : (
                    users.map((user) => (
                      <MenuItem key={user.id} value={user.id}>
                        {user.name || user.email} {user.familyName ? `(${user.familyName})` : ""}
                      </MenuItem>
                    ))
                  )}
                </Select>
              </FormControl>

              <FormControl size="small" sx={{ minWidth: 240 }} disabled={!selectedParent}>
                <InputLabel>Select Child</InputLabel>
                <Select
                  value={selectedChild}
                  label="Select Child"
                  onChange={handleChildChange}
                >
                  {childrenList.length > 0 ? (
                    childrenList.map((c) => (
                      <MenuItem key={c.child.id} value={c.child.id}>
                        {c.child.name || `Child ${c.child.trackId}`}
                      </MenuItem>
                    ))
                  ) : (
                    <MenuItem disabled>No children found</MenuItem>
                  )}
                </Select>
              </FormControl>
            </Stack>

            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tabIndex} onChange={handleTabChange} aria-label="parental controls tabs">
                <Tab label="Screen Time Rules" disabled={!selectedChild} />
                <Tab label="App Management" disabled={!selectedChild} />
                <Tab label="Keyword Alerts" disabled={!selectedChild} />
              </Tabs>
            </Box>
          </CardContent>

          {selectedChild ? (
            <>
              <TabPanel value={tabIndex} index={0}>
                <Typography variant="h6" gutterBottom>Daily Time Limits</Typography>
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                  <FormControlLabel control={<Switch defaultChecked />} label="Enable Daily Limit" />
                  <TextField label="Hours" type="number" size="small" defaultValue={2} sx={{ width: 100 }} />
                  <TextField label="Minutes" type="number" size="small" defaultValue={30} sx={{ width: 100 }} />
                </Stack>
                <Divider sx={{ my: 2 }} />
                <Typography variant="h6" gutterBottom>Restricted Times (School/Sleep)</Typography>
                <FormControlLabel control={<Switch />} label="Enable Restricted Times" />
                <Stack spacing={2} sx={{ mt: 2 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography sx={{ width: 100 }}>Weekdays</Typography>
                    <TextField label="From" type="time" size="small" defaultValue="08:00" InputLabelProps={{ shrink: true }} />
                    <TextField label="To" type="time" size="small" defaultValue="15:00" InputLabelProps={{ shrink: true }} />
                  </Stack>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Typography sx={{ width: 100 }}>Bedtime</Typography>
                    <TextField label="From" type="time" size="small" defaultValue="21:00" InputLabelProps={{ shrink: true }} />
                    <TextField label="To" type="time" size="small" defaultValue="07:00" InputLabelProps={{ shrink: true }} />
                  </Stack>
                </Stack>
              </TabPanel>

              <TabPanel value={tabIndex} index={1}>
                <Typography variant="h6" gutterBottom>App Blocking / Whitelisting</Typography>
                <List>
                  {apps.map(app => (
                    <ListItem key={app.id} secondaryAction={
                      <Select size="small" value={app.status} onChange={(e) => handleAppStatusChange(app.id, e.target.value)}>
                        <MenuItem value="Allowed">Allowed</MenuItem>
                        <MenuItem value="Blocked">Blocked</MenuItem>
                      </Select>
                    }>
                      <ListItemText primary={app.name} />
                    </ListItem>
                  ))}
                </List>
              </TabPanel>

              <TabPanel value={tabIndex} index={2}>
                <Typography variant="h6" gutterBottom>Keyword Alerts</Typography>
                <FormControlLabel control={<Switch defaultChecked />} label="Enable Keyword Monitoring" />
                <Stack direction="row" spacing={1} sx={{ my: 2 }}>
                  <TextField
                    label="Add new keyword"
                    size="small"
                    value={newKeyword}
                    onChange={(e) => setNewKeyword(e.target.value)}
                    sx={{ flexGrow: 1 }}
                  />
                  <Button variant="contained" onClick={handleAddKeyword} startIcon={<AddIcon />}>Add</Button>
                </Stack>
                <Typography variant="subtitle1" sx={{ mt: 3 }}>Monitored Keywords:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  {keywords.map(keyword => (
                    <Chip key={keyword} label={keyword} onDelete={() => handleDeleteKeyword(keyword)} />
                  ))}
                </Box>
              </TabPanel>
            </>
          ) : (
            <Box sx={{ p: 5, textAlign: 'center' }}>
              <Typography color="text.secondary">
                Please select a parent and a child to manage parental controls.
              </Typography>
            </Box>
          )}
        </Card>
      </Box>
    </CrmLayout>
  );
};

export default ParentalControlsPage;