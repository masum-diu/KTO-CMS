import React, { useMemo, useState } from 'react'
import CrmLayout from './components/CrmLayout'
import { Box } from '@mui/material'
import ChatSidebar from './components/ChatSidebar'
import ChatWindow from './components/ChatWindow'
import chatsData from '../data/chats.json'

function Chats() {
  const [activeTab, setActiveTab] = useState(0)
  const [selectedChat, setSelectedChat] = useState(0)
  const [message, setMessage] = useState('')

  // Mock data loaded from JSON
  const allChatContacts = chatsData.allChatContacts
  const riderChatContacts = chatsData.riderChatContacts
  const driverChatContacts = chatsData.driverChatContacts

  // Get current chat contacts based on active tab
  const getCurrentChatContacts = () => {
    switch (activeTab) {
      case 0: // All
        return allChatContacts
      case 1: // Riders
        return riderChatContacts
      case 2: // Drivers
        return driverChatContacts
      default:
        return allChatContacts
    }
  }

  // Get current chat contacts based on active tab - this will be recalculated when activeTab changes
  const chatContacts = getCurrentChatContacts()

  // Messages loaded from JSON
  const allMessages = useMemo(() => chatsData.allMessages, [])
  const riderMessages = useMemo(() => chatsData.riderMessages, [])
  const driverMessages = useMemo(() => chatsData.driverMessages, [])

  // Get current messages based on active tab and selected chat
  const getCurrentMessages = () => {
    const currentContacts = getCurrentChatContacts()
    if (currentContacts.length === 0) return []

    const selectedContact = currentContacts[selectedChat]
    if (!selectedContact) return []

    switch (activeTab) {
      case 0: // All
        return allMessages[selectedContact.id] || []
      case 1: // Riders
        return riderMessages[selectedContact.id] || []
      case 2: // Drivers
        return driverMessages[selectedContact.id] || []
      default:
        return allMessages[selectedContact.id] || []
    }
  }

  const messages = getCurrentMessages()

  const handleTabChange = (event, newValue) => {
    const currentContacts = getCurrentChatContacts()
    const newContacts = (() => {
      switch (newValue) {
        case 0: return allChatContacts
        case 1: return riderChatContacts
        case 2: return driverChatContacts
        default: return allChatContacts
      }
    })()

    // Try to find the currently selected contact in the new tab
    if (currentContacts.length > 0 && selectedChat < currentContacts.length) {
      const currentSelectedContact = currentContacts[selectedChat]
      const sameContactIndex = newContacts.findIndex(contact => contact.name === currentSelectedContact.name)

      if (sameContactIndex !== -1) {
        // If the same contact exists in the new tab, keep it selected
        setSelectedChat(sameContactIndex)
      } else {
        // If the contact doesn't exist in the new tab, select the first one
        setSelectedChat(0)
      }
    } else {
      // If no contact is currently selected, select the first one
      setSelectedChat(0)
    }

    setActiveTab(newValue)
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      // Here you would typically send the message to your backend
      console.log('Sending message:', message)
      setMessage('')
    }
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <CrmLayout>
      <Box sx={{ display: 'flex', height: 'calc(100vh - 200px)', gap: 2 }}>
        <ChatSidebar
          activeTab={activeTab}
          onTabChange={handleTabChange}
          contacts={chatContacts}
          selectedChatIndex={selectedChat}
          onSelectChat={setSelectedChat}
        />

        <ChatWindow
          contact={chatContacts.length > 0 && selectedChat < chatContacts.length ? chatContacts[selectedChat] : null}
          messages={messages}
          messageValue={message}
          onMessageChange={setMessage}
          onSend={handleSendMessage}
          onKeyPress={handleKeyPress}
        />
      </Box>
    </CrmLayout>
  )
}

export default Chats