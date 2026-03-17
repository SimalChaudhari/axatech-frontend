import { useState, useRef, useEffect, useMemo } from 'react';
import { Table, ConfirmModal, Badge } from '../../common';
import { DotsVerticalIcon } from '../../icons';

const STATUS_TABS = [
  { value: 'all', label: 'All', variant: 'neutral', activeVariant: 'neutral' },
  { value: 'active', label: 'Active', variant: 'success', activeVariant: 'success', activeSolid: true },
  { value: 'inactive', label: 'Inactive', variant: 'warning', activeVariant: 'warning', activeSolid: true },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All categories' },
  { value: 'Frontend Technologies', label: 'Frontend' },
  { value: 'Backend Technologies', label: 'Backend' },
  { value: 'Database Technologies', label: 'Database' },
];

export default function TechnologiesTable({ technologies, onOpenEdit, onRemove, loading = false }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [openActionId, setOpenActionId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const kebabRefs = useRef({});

  const counts = useMemo(() => ({
    all: technologies.length,
    active: technologies.filter((t) => t.isActive !== false).length,
    inactive: technologies.filter((t) => t.isActive === false).length,
  }), [technologies]);

  const filtered = useMemo(() => {
    return technologies.filter((t) => {
      if (statusFilter === 'active' && t.isActive === false) return false;
      if (statusFilter === 'inactive' && t.isActive !== false) return false;
      if (categoryFilter !== 'all' && (t.category || '') !== categoryFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        if (!(t.title || '').toLowerCase().includes(q) && !(t.description || '').toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [technologies, statusFilter, categoryFilter, searchQuery]);

  const totalFiltered = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
  const pageSafe = Math.min(page, totalPages) || 1;

  const activeFilters = useMemo(() => {
    const list = [];
    if (statusFilter !== 'all') {
      const label = STATUS_TABS.find((t) => t.value === statusFilter)?.label ?? statusFilter;
      list.push({ id: 'status', label: 'Status', value: label, onRemove: () => setStatusFilter('all') });
    }
    if (categoryFilter !== 'all') {
      const label = CATEGORY_OPTIONS.find((t) => t.value === categoryFilter)?.label ?? categoryFilter;
      list.push({ id: 'category', label: 'Category', value: label, onRemove: () => setCategoryFilter('all') });
    }
    if (searchQuery.trim()) {
      list.push({ id: 'keyword', label: 'Keyword', value: searchQuery.trim(), onRemove: () => setSearchQuery('') });
    }
    return list;
  }, [statusFilter, categoryFilter, searchQuery]);

  const handleClearAllFilters = () => {
    setStatusFilter('all');
    setCategoryFilter('all');
    setSearchQuery('');
  };

  const sorted = useMemo(() => {
    const list = [...filtered];
    const key = sortKey;
    const dir = sortDirection;
    list.sort((a, b) => {
      let va = a[key];
      let vb = b[key];
      if (key === 'isActive') {
        va = va !== false ? 1 : 0;
        vb = vb !== false ? 1 : 0;
        return dir === 'asc' ? va - vb : vb - va;
      }
      va = String(va ?? '').toLowerCase();
      vb = String(vb ?? '').toLowerCase();
      return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return list;
  }, [filtered, sortKey, sortDirection]);

  const paginated = useMemo(() => {
    const start = (pageSafe - 1) * rowsPerPage;
    return sorted.slice(start, start + rowsPerPage);
  }, [sorted, pageSafe, rowsPerPage]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setPage(1);
  };

  useEffect(() => {
    setPage((p) => (p > totalPages && totalPages > 0 ? totalPages : p));
  }, [totalPages]);

  const allSelected = paginated.length > 0 && paginated.every((t) => selectedIds.has(t._id));
  const someSelected = selectedIds.size > 0;

  const handleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginated.map((t) => t._id)));
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const openActionMenu = (e, id) => {
    e.stopPropagation();
    const el = kebabRefs.current[id] || e.currentTarget;
    const rect = el.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom - 45, left: rect.left - 135 });
    setOpenActionId(id);
  };

  const closeMenu = () => setOpenActionId(null);

  const openSingleDeleteConfirm = (tech) => {
    closeMenu();
    setDeleteConfirm({ type: 'single', id: tech._id, title: tech.title });
  };

  const handleBulkDelete = () => {
    if (!selectedIds.size) return;
    setDeleteConfirm({ type: 'bulk', ids: [...selectedIds] });
  };

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return;
    if (deleteConfirm.type === 'single') {
      onRemove(deleteConfirm.id);
    } else {
      deleteConfirm.ids.forEach((id) => onRemove(id));
      setSelectedIds(new Set());
    }
    setDeleteConfirm(null);
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const techForMenu = openActionId ? technologies.find((t) => t._id === openActionId) : null;

  return (
    <>
      <div className="border-b border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800">
        <Table.StatusTabs
          tabs={STATUS_TABS}
          value={statusFilter}
          onChange={setStatusFilter}
          counts={counts}
        />
        <Table.Toolbar>
          <Table.ToolbarDropdown
            value={categoryFilter}
            onChange={setCategoryFilter}
            options={CATEGORY_OPTIONS}
            showPlaceholderOption={false}
          />
          <Table.SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ariaLabel="Search technologies"
            placeholder="Search technologies"
          />
        </Table.Toolbar>
      </div>

      <Table.ActiveFilters
        filters={activeFilters}
        resultCount={totalFiltered}
        onClearAll={handleClearAllFilters}
      />

      <Table.SelectionBar
        selectedCount={selectedIds.size}
        totalCount={totalFiltered}
        onClearSelection={() => setSelectedIds(new Set())}
        onBulkDelete={handleBulkDelete}
        label="selected"
      />

      <Table>
        {selectedIds.size === 0 && (
          <Table.Head
            columns={[
              { key: 'image', label: 'Image', sortable: false },
              { key: 'title', label: 'Title', sortable: true },
              { key: 'category', label: 'Category', sortable: true },
              { key: 'isActive', label: 'Active', sortable: true },
              { key: 'actions', label: 'Actions', align: 'right' },
            ]}
            selectAll={{
              checked: allSelected,
              indeterminate: someSelected && !allSelected,
              onChange: handleSelectAll,
            }}
            sortState={{ key: sortKey, direction: sortDirection }}
            onSort={handleSort}
          />
        )}
        <Table.Body>
          {loading ? (
            <Table.LoadingState colSpan={6} />
          ) : paginated.length === 0 ? (
            <Table.EmptyState colSpan={6} />
          ) : (
            paginated.map((t) => (
              <Table.Row key={t._id}>
                <Table.SelectionCell
                  checked={selectedIds.has(t._id)}
                  onChange={() => handleSelectRow(t._id)}
                  ariaLabel={`Select ${t.title}`}
                />
                <Table.Td className="w-16">
                  {t.image ? (
                    <img
                      src={t.image}
                      alt=""
                      className="h-10 w-10 rounded-lg object-cover border border-slate-200 dark:border-gray-600"
                    />
                  ) : (
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-slate-100 text-slate-400 dark:bg-gray-700 dark:text-gray-500 text-xs">—</span>
                  )}
                </Table.Td>
                <Table.Td>{t.title}</Table.Td>
                <Table.Td>{t.category}</Table.Td>
                <Table.Td>
                  <Badge variant={t.isActive !== false ? 'success' : 'warning'}>
                    {t.isActive !== false ? 'Active' : 'Inactive'}
                  </Badge>
                </Table.Td>
                <Table.Td align="right" className="whitespace-nowrap">
                  <div className="relative flex justify-end">
                    <button
                      ref={(el) => (kebabRefs.current[t._id] = el)}
                      type="button"
                      onClick={(e) => openActionMenu(e, t._id)}
                      aria-label="Open actions"
                      aria-expanded={openActionId === t._id}
                      aria-haspopup="menu"
                      className="inline-flex items-center justify-center rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
                    >
                      <DotsVerticalIcon className="text-xl" />
                    </button>
                  </div>
                </Table.Td>
              </Table.Row>
            ))
          )}
        </Table.Body>
      </Table>

      <Table.Pagination
        page={pageSafe}
        rowsPerPage={rowsPerPage}
        totalRows={totalFiltered}
        onPageChange={setPage}
        onRowsPerPageChange={handleRowsPerPageChange}
      />

      <Table.ActionMenu
        open={!!openActionId}
        position={menuPosition}
        onEdit={techForMenu ? () => onOpenEdit(techForMenu) : undefined}
        onDelete={techForMenu ? () => openSingleDeleteConfirm(techForMenu) : undefined}
        onClose={closeMenu}
      />

      <ConfirmModal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleConfirmDelete}
        title="Delete technology"
        message={
          deleteConfirm?.type === 'single'
            ? `Are you sure you want to delete "${deleteConfirm.title}"? This cannot be undone.`
            : deleteConfirm?.type === 'bulk'
              ? `Are you sure you want to delete ${deleteConfirm.ids.length} selected item(s)? This cannot be undone.`
              : ''
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="error"
      />
    </>
  );
}
