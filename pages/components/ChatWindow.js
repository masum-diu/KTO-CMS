import React from 'react'
import { Box, Typography, Avatar, IconButton, Paper, TextField } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import SendIcon from '@mui/icons-material/Send'

function ChatWindow({ contact, messages, messageValue, onMessageChange, onSend, onKeyPress }) {
  const contactAvatar = contact ? contact.avatar : 'A'
  const contactName = contact ? contact.name : 'Select a chat'
  const contactStatus = contact ? 'Online' : 'Offline'

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        flex: 1,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Box
        sx={{
          p: 2,
          borderBottom: '1px solid #e0e0e0',
          backgroundColor: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            sx={{
              width: 40,
              height: 40,
              backgroundColor: '#171c2614',
              color: '#171c26b3',
              fontWeight: 'bold',
              fontSize: '16px'
            }}
          >
            {contactAvatar}
          </Avatar>
          <Box sx={{ ml: 2 }}>
            <Typography variant="subtitle1" fontWeight="500">
              {contactName}
            </Typography>
            <Typography variant="caption" sx={{ color: '#666' }}>
              {contactStatus}
            </Typography>
          </Box>
        </Box>

        <IconButton size="small">
          <SettingsIcon sx={{ fontSize: 20, color: '#171c26b3' }} />
        </IconButton>
      </Box>

      <Box
        sx={{
          flex: 1,
          p: 2,
          overflowY: 'auto',
          backgroundColor: '#fafafa',
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
        {messages.map((msg) => (
          <Box
            key={msg.id}
            sx={{ display: 'flex', justifyContent: msg.sender === 'me' ? 'flex-end' : 'flex-start', mb: 2 }}
          >
            <Box sx={{ display: 'flex', alignItems: 'flex-end', maxWidth: '70%' }}>
              {msg.sender === 'them' && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: '#171c2614',
                    color: '#171c26b3',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    mr: 1
                  }}
                >
                  {msg.avatar}
                </Avatar>
              )}

              <Box>
                <Paper
                  sx={{
                    p: 1.5,
                    backgroundColor: msg.sender === 'me' ? '#DC3173' : '#fff',
                    color: msg.sender === 'me' ? '#fff' : '#333',
                    borderRadius: '18px',
                    maxWidth: '100%',
                    wordBreak: 'break-word'
                  }}
                >
                  <Typography variant="body2">{msg.content}</Typography>
                </Paper>
                <Typography
                  variant="caption"
                  sx={{ color: '#999', fontSize: '11px', mt: 0.5, display: 'block', textAlign: msg.sender === 'me' ? 'right' : 'left' }}
                >
                  {msg.timestamp}
                </Typography>
              </Box>

              {msg.sender === 'me' && (
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    backgroundColor: '#171c2614',
                    color: '#171c26b3',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    ml: 1
                  }}
                >
                  {msg.avatar}
                </Avatar>
              )}
            </Box>
          </Box>
        ))}
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #e0e0e0', backgroundColor: '#fff' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <TextField
            fullWidth
            placeholder="Type Message here.."
            value={messageValue}
            onChange={(e) => onMessageChange(e.target.value)}
            onKeyPress={onKeyPress}
            multiline
            maxRows={3}
            InputProps={{
              sx: {
                borderRadius: '20px',
                backgroundColor: '#f5f5f5',
                '& fieldset': { border: 'none' },
                '& .MuiInputBase-input': { fontSize: '14px' }
              }
            }}
          />
          <IconButton
            onClick={onSend}
            sx={{
              backgroundColor: '#DC3173',
              color: 'white',
              width: 40,
              height: 40,
              '&:hover': { backgroundColor: '#B8295F' }
            }}
          >
            <SendIcon sx={{ fontSize: 18, color: '#fff' }} />
          </IconButton>
        </Box>
      </Box>
    </Box>
  )
}

export default ChatWindow
