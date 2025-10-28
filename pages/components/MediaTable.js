import React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  Avatar,
  Chip,
  Stack,
  Typography,
  Pagination,
  PaginationItem,
  TableSortLabel,
  Paper
} from '@mui/material';
import {
  Image as ImageIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  ArrowForwardIos as ArrowForwardIosIcon
} from '@mui/icons-material';

function MediaTable({
  rows = [],
  selectedIds = [],
  allPageSelected = false,
  somePageSelected = false,
  onToggleSelectAll,
  onToggleRow,
  createSortProps,
  page = 1,
  totalPages = 1,
  onChangePage
}) {
  return (
    <Paper sx={{ overflow: 'hidden' }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell padding="checkbox">
                <Checkbox
                  checked={allPageSelected}
                  indeterminate={somePageSelected}
                  onChange={(e) => onToggleSelectAll?.(e.target.checked)}
                />
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel {...(createSortProps ? createSortProps('name') : {})}>File</TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel {...(createSortProps ? createSortProps('author') : {})}>Author</TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel {...(createSortProps ? createSortProps('type') : {})}>Type</TableSortLabel>
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>
                <TableSortLabel {...(createSortProps ? createSortProps('createdAt') : {})}>Created At</TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((file) => (
              <TableRow key={file.id} hover>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedIds.includes(file.id)}
                    onChange={() => onToggleRow?.(file.id)}
                  />
                </TableCell>
                <TableCell>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar
                      src={file.thumbnail}
                      variant="rounded"
                      sx={{ width: 40, height: 40 }}
                    >
                      <ImageIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {file.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {file.size}
                      </Typography>
                    </Box>
                  </Stack>
                </TableCell>
                <TableCell>
                  <Typography variant="body2">{file.author}</Typography>
                </TableCell>
                <TableCell>
                  <Chip
                    label={file.type}
                    size="small"
                    sx={{
                      backgroundColor: '#ffe3ef',
                      color: '#DC3173',
                      fontSize: '0.75rem'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Typography variant="body2" color="text.secondary">
                    {file.createdAt}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={(_, value) => onChangePage?.(value)}
          color="primary"
          size="small"
          renderItem={(item) => (
            <PaginationItem
              slots={{ previous: ArrowBackIosNewIcon, next: ArrowForwardIosIcon }}
              {...item}
            />
          )}
        />
      </Box>
    </Paper>
  );
}

export default MediaTable;
