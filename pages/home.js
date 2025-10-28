import React, { useState } from 'react';
import CrmLayout from './components/CrmLayout';
import {
  Box,
  Typography,
  Grid,
  Paper,
  Stack,
  Avatar,
  LinearProgress,
  Select,
  MenuItem, Button, Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tabs,
  Tab,
} from '@mui/material';
import {
  PlayCircle,
  WhereToVote,
  Schedule,
  Cancel,
  CheckCircle,
} from '@mui/icons-material';
import DirectionsBike from '@mui/icons-material/DirectionsBike';
import VerifiedUser from '@mui/icons-material/VerifiedUser';
import GppMaybe from '@mui/icons-material/GppMaybe';
import DirectionsCar from '@mui/icons-material/DirectionsCar';
import AttachMoney from '@mui/icons-material/AttachMoney';
import MoneyOff from '@mui/icons-material/MoneyOff';
import CreditCard from '@mui/icons-material/CreditCard';
import RequestQuote from '@mui/icons-material/RequestQuote';

function Home() {
  const [age, setAge] = useState(10);
  // Add this state and data in your component

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  return (
    <CrmLayout>
      <Box >
        {/* Header */}
        <Stack direction={"row"} justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
          <Typography fontSize={20} className='bold'>
            Hello, <span style={{ color: "#9B1FE8" }}>Administrator</span>
          </Typography>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ boxShadow: '0px 2px 4px rgba(18, 165, 81, 0.05)', borderRadius: 2, backgroundColor: "#fff", px: 2 }}>
            <Typography fontSize={16} className='SemiBold'>
              Sort By
            </Typography>
            <Select
              value={age}
              onChange={handleChange}
              sx={{
                border: "none",
                boxShadow: "none",
                '.MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
                '&.MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  border: 'none',
                },
              }}
            >
              <MenuItem value={10} sx={{ color: "#000" }}>This Year</MenuItem>

            </Select>
          </Stack>

        </Stack>

      </Box>
    </CrmLayout>
  );
}

export default Home;