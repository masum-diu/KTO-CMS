import React, { useMemo, useState } from 'react';
import CrmLayout from './components/CrmLayout';
import MediaLibrary from './components/MediaLibrary';
import MediaTable from './components/MediaTable';
import { mediaFiles } from '../data/mediaFiles';
function Media() {
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(15);
  const [bulkAction, setBulkAction] = useState('');
  const [orderBy, setOrderBy] = useState('name');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState([]);

  const filteredFiles = useMemo(() => {
    return mediaFiles.filter((file) =>
      file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      file.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const sortedFiles = useMemo(() => {
    const comparator = (a, b) => {
      let aVal = a[orderBy];
      let bVal = b[orderBy];
      if (orderBy === 'createdAt') {
        aVal = new Date(aVal);
        bVal = new Date(bVal);
      } else {
        aVal = String(aVal).toLowerCase();
        bVal = String(bVal).toLowerCase();
      }
      if (aVal < bVal) return order === 'asc' ? -1 : 1;
      if (aVal > bVal) return order === 'asc' ? 1 : -1;
      return 0;
    };
    return [...filteredFiles].sort(comparator);
  }, [filteredFiles, orderBy, order]);

  const totalPages = Math.max(1, Math.ceil(sortedFiles.length / itemsPerPage));
  const paginatedFiles = useMemo(() => {
    const start = (page - 1) * itemsPerPage;
    return sortedFiles.slice(start, start + itemsPerPage);
  }, [sortedFiles, page, itemsPerPage]);

  const allPageSelected = paginatedFiles.length > 0 && paginatedFiles.every((f) => selectedItems.includes(f.id));
  const somePageSelected = paginatedFiles.some((f) => selectedItems.includes(f.id)) && !allPageSelected;

  const handleRequestSort = (property) => {
    if (orderBy === property) {
      setOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setOrderBy(property);
      setOrder('asc');
    }
    setPage(1);
  };

  const createSortProps = (property) => ({
    active: orderBy === property,
    direction: orderBy === property ? order : 'asc',
    onClick: () => handleRequestSort(property),
  });

  return (
    <CrmLayout>
      <MediaLibrary
        title="Media Library"
        viewMode={viewMode}
        onChangeViewMode={setViewMode}
        searchQuery={searchQuery}
        onChangeSearchQuery={(q) => {
          setSearchQuery(q);
          setPage(1);
        }}
        itemsPerPage={itemsPerPage}
        onChangeItemsPerPage={(n) => {
          setItemsPerPage(n);
          setPage(1);
        }}
        bulkAction={bulkAction}
        onChangeBulkAction={setBulkAction}
        totalItems={sortedFiles.length}
        onUploadFiles={(files) => console.log('Uploading files:', files)}
      />

      <MediaTable
        rows={paginatedFiles}
        selectedIds={selectedItems}
        allPageSelected={allPageSelected}
        somePageSelected={somePageSelected}
        onToggleSelectAll={(checked) => {
          if (checked) {
            setSelectedItems((prev) => Array.from(new Set([...prev, ...paginatedFiles.map((f) => f.id)])));
          } else {
            setSelectedItems((prev) => prev.filter((id) => !paginatedFiles.some((f) => f.id === id)));
          }
        }}
        onToggleRow={(id) => {
          setSelectedItems((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
        }}
        createSortProps={createSortProps}
        page={page}
        totalPages={totalPages}
        onChangePage={setPage}
      />
    </CrmLayout>
  );
}

export default Media;