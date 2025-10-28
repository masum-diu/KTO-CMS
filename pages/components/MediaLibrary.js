import React, { useRef, useState } from 'react';
import { Box, Typography, Button, Stack, Paper, IconButton, TextField, Select, MenuItem, FormControl } from '@mui/material';
import { Add as AddIcon, GridView as GridViewIcon, ViewList as ViewListIcon, Search as SearchIcon, Close as CloseIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material';

function MediaLibrary({
  title = 'Media Library',
  viewMode = 'list',
  onChangeViewMode,
  searchQuery = '',
  onChangeSearchQuery,
  itemsPerPage = 15,
  onChangeItemsPerPage,
  bulkAction = '',
  onChangeBulkAction,
  totalItems = 0,
  onUploadFiles
}) {
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [selectedFilesLocal, setSelectedFilesLocal] = useState([]);
  const fileInputRef = useRef(null);

  const handleUpload = () => {
    if (selectedFilesLocal.length === 0) return;
    if (typeof onUploadFiles === 'function') {
      onUploadFiles(selectedFilesLocal);
    }
    setSelectedFilesLocal([]);
    setIsUploaderOpen(false);
  };

  return (
    <Box >
      <Stack direction="row" alignItems="center" spacing={1} mb={2}>
        <Typography variant="h4" fontWeight="bold">
          {title}
        </Typography>
        <Button
          variant="outlined"
          startIcon={<AddIcon />}
          sx={{
            borderColor: '#DC3173',
            color: '#DC3173',
            textTransform: 'none',
            px: 2,
            '&:hover': { borderColor: '#B0215A', backgroundColor: 'transparent' }
          }}
          onClick={() => setIsUploaderOpen(true)}
        >
          Add New
        </Button>
      </Stack>

      {isUploaderOpen && (
        <Paper sx={{ p: 2, mb: 2, position: 'relative', backgroundColor: '#ffffff' }}>
          <IconButton
            aria-label="close"
            onClick={() => setIsUploaderOpen(false)}
            sx={{ position: 'absolute', top: 8, right: 8 }}
          >
            <CloseIcon />
          </IconButton>

          <Box
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const droppedFiles = Array.from(e.dataTransfer.files || []);
              setSelectedFilesLocal(droppedFiles);
            }}
            sx={{
              border: '2px dashed',
              borderColor: '#ffe3ef',
              borderRadius: 2,
              minHeight: 260,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              p: 4,
              backgroundColor: '#fff5fa'
            }}
          >
            <Stack spacing={2} alignItems="center">
              <CloudUploadIcon sx={{ fontSize: 48, color: '#DC3173' }} />
              <Typography variant="subtitle1">Drop files to upload</Typography>
              <Stack direction="row" spacing={2} justifyContent="center">
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  hidden
                  onChange={(e) => setSelectedFilesLocal(Array.from(e.target.files || []))}
                />
                <Button
                  variant="outlined"
                  onClick={() => fileInputRef.current?.click()}
                  sx={{
                    borderColor: '#DC3173',
                    color: '#DC3173',
                    textTransform: 'none',
                    backgroundColor: '#ffe3ef'
                  }}
                >
                  Select Files
                </Button>
                <Button
                  variant="contained"
                  disabled={selectedFilesLocal.length === 0}
                  onClick={handleUpload}
                  sx={{
                    textTransform: 'none',
                    backgroundColor: '#DC3173',
                    '&:hover': { backgroundColor: '#B0215A' }
                  }}
                >
                  Upload
                </Button>
              </Stack>
              {selectedFilesLocal.length > 0 && (
                <Typography variant="caption" color="text.secondary">
                  {selectedFilesLocal.length} file(s) selected
                </Typography>
              )}
            </Stack>
          </Box>
        </Paper>
      )}

      <Paper sx={{ p: 1.5, mb: 2, backgroundColor: '#f8f9fa' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={1}>
            <IconButton
              onClick={() => onChangeViewMode?.('grid')}
              sx={{
                backgroundColor: viewMode === 'grid' ? '#DC3173' : 'transparent',
                color: viewMode === 'grid' ? 'white' : '#DC3173',
                '& .MuiSvgIcon-root': {
                  color: viewMode === 'grid' ? '#ffffff' : '#DC3173'
                },
                '&:hover': {
                  backgroundColor: viewMode === 'grid' ? '#B0215A' : 'rgba(220, 49, 115, 0.1)'
                }
              }}
            >
              <GridViewIcon />
            </IconButton>
            <IconButton
              onClick={() => onChangeViewMode?.('list')}
              sx={{
                backgroundColor: viewMode === 'list' ? '#DC3173' : 'transparent',
                color: viewMode === 'list' ? 'white' : '#DC3173',
                '& .MuiSvgIcon-root': {
                  color: viewMode === 'list' ? '#ffffff' : '#DC3173'
                },
                '&:hover': {
                  backgroundColor: viewMode === 'list' ? '#B0215A' : 'rgba(220, 49, 115, 0.1)'
                }
              }}
            >
              <ViewListIcon />
            </IconButton>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center" sx={{ width: { xs: '100%', md: 'auto' } }}>
            <TextField
              size="small"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => onChangeSearchQuery?.(e.target.value)}
              sx={{ minWidth: { xs: 'auto', md: 280 }, backgroundColor: 'white' }}
              InputProps={{
                startAdornment: <SearchIcon sx={{ color: 'gray', mr: 1 }} />
              }}
            />
            <Button
              variant="outlined"
              sx={{ borderColor: '#DC3173', color: '#DC3173', textTransform: 'none' }}
            >
              Search
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper sx={{ p: 1.5, mb: 3, backgroundColor: '#f8f9fa' }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" flexWrap="wrap" gap={2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 80 }}>
              <Select
                value={itemsPerPage}
                onChange={(e) => onChangeItemsPerPage?.(e.target.value)}
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value={10}>10</MenuItem>
                <MenuItem value={15}>15</MenuItem>
                <MenuItem value={25}>25</MenuItem>
                <MenuItem value={50}>50</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ minWidth: 150 }}>
              <Select
                value={bulkAction}
                onChange={(e) => onChangeBulkAction?.(e.target.value)}
                displayEmpty
                sx={{ backgroundColor: 'white' }}
              >
                <MenuItem value="">Bulk actions</MenuItem>
                <MenuItem value="delete">Delete</MenuItem>
                <MenuItem value="download">Download</MenuItem>
                <MenuItem value="copy">Copy URLs</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="outlined"
              sx={{ borderColor: '#DC3173', color: '#DC3173', textTransform: 'none' }}
            >
              Apply
            </Button>
          </Stack>

          <Typography variant="body2" color="text.secondary">
            {totalItems} Items
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}

export default MediaLibrary;
