import React from 'react'
import { Box, Typography, Tabs, Tab, TextField, InputAdornment, Avatar, Badge } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'

function ChatSidebar({ activeTab, onTabChange, contacts, selectedChatIndex, onSelectChat }) {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        width: '35%'
      }}
    >
      <Box sx={{ p: 3, borderBottom: '1px solid #e0e0e0' }}>
        <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
          Chats
        </Typography>

        <Tabs
          value={activeTab}
          onChange={onTabChange}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '14px',
              minWidth: 'auto',
              px: 4,
              mx: 2
            },
            '& .Mui-selected': {
              color: '#DC3173'
            },
            '& .MuiTabs-indicator': {
              backgroundColor: '#DC3173'
            }
          }}
        >
          <Tab label="All" />
          <Tab label="Riders" />
          <Tab label="Drivers" />
        </Tabs>
      </Box>

      <Box sx={{ p: 2, borderBottom: '1px solid #e0e0e0' }}>
        <TextField
          fullWidth
          placeholder="Search users..."
          size="small"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: '#171c26b3' }} />
              </InputAdornment>
            ),
            sx: {
              borderRadius: '20px',
              backgroundColor: '#f5f5f5',
              '& fieldset': { border: 'none' }
            }
          }}
        />
      </Box>

      <Box
        sx={{
          height: 'calc(100% - 140px)',
          overflowY: 'auto',
          '&::-webkit-scrollbar': {
            width: '8px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#c1c1c1',
            borderRadius: '4px',
            '&:hover': {
              background: '#a8a8a8'
            }
          },
          '&::-webkit-scrollbar-button': {
            display: 'none'
          }
        }}
      >
        {contacts.map((contact, index) => (
          <Box
            key={contact.id}
            onClick={() => onSelectChat(index)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              cursor: 'pointer',
              backgroundColor: selectedChatIndex === index ? '#fdf0f5' : 'transparent',
              borderBottom: '1px solid #f0f0f0',
              '&:hover': {
                backgroundColor: selectedChatIndex === index ? '#fdf0f5' : '#f9f9f9'
              }
            }}
          >
            <Badge
              badgeContent={contact.unread}
              color="primary"
              sx={{
                '& .MuiBadge-badge': {
                  backgroundColor: '#DC3173',
                  color: 'white',
                  fontSize: '10px',
                  minWidth: '16px',
                  height: '16px'
                }
              }}
            >
              <Avatar
                sx={{
                  width: 48,
                  height: 48,
                  backgroundColor: '#171c2614',
                  color: '#171c26b3',
                  fontWeight: 'bold',
                  fontSize: '18px'
                }}
              >
                {contact.avatar}
              </Avatar>
            </Badge>

            <Box sx={{ ml: 2, flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle2" fontWeight="500" sx={{ color: '#333' }} noWrap>
                {contact.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#666', fontSize: '13px', mt: 0.5 }}
                noWrap
              >
                {contact.lastMessage}
              </Typography>
            </Box>

            <Typography variant="caption" sx={{ color: '#999', fontSize: '11px', ml: 1 }}>
              {contact.timestamp}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

export default ChatSidebar
