import { useEffect, useMemo, useRef, useState } from 'react';
import { Table, ConfirmModal, Badge } from '../../common';
import { DotsVerticalIcon } from '../../icons';

const STATUS_TABS = [
  { value: 'all', label: 'All', variant: 'neutral', activeVariant: 'neutral' },
  { value: 'active', label: 'Active', variant: 'success', activeVariant: 'success', activeSolid: true },
  { value: 'inactive', label: 'Inactive', variant: 'warning', activeVariant: 'warning', activeSolid: true },
];

export default function ServicesTable({ services, onOpenEdit, onRemove, loading = false }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openActionId, setOpenActionId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState('title');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const kebabRefs = useRef({});

  const counts = useMemo(
    () => ({
      all: services.length,
      active: services.filter((s) => s.isActive !== false).length,
      inactive: services.filter((s) => s.isActive === false).length,
    }),
    [services]
  );

  const filteredServices = useMemo(() => {
    return services.filter((s) => {
      if (statusFilter === 'active' && s.isActive === false) return false;
      if (statusFilter === 'inactive' && s.isActive !== false) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const title = (s.title || '').toLowerCase();
        const slug = (s.slug || '').toLowerCase();
        const shortDescription = (s.shortDescription || '').toLowerCase();
        const description = (s.description || '').toLowerCase();
        if (
          !title.includes(q) &&
          !slug.includes(q) &&
          !shortDescription.includes(q) &&
          !description.includes(q)
        ) {
          return false;
        }
      }
      return true;
    });
  }, [services, statusFilter, searchQuery]);

  const totalFiltered = filteredServices.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
  const pageSafe = Math.min(page, totalPages) || 1;

  const activeFilters = useMemo(() => {
    const list = [];
    if (statusFilter !== 'all') {
      const label = STATUS_TABS.find((t) => t.value === statusFilter)?.label ?? statusFilter;
      list.push({
        id: 'status',
        label: 'Status',
        value: label,
        onRemove: () => setStatusFilter('all'),
      });
    }
    if (searchQuery.trim()) {
      list.push({
        id: 'keyword',
        label: 'Keyword',
        value: searchQuery.trim(),
        onRemove: () => setSearchQuery(''),
      });
    }
    return list;
  }, [statusFilter, searchQuery]);

  const handleClearAllFilters = () => {
    setStatusFilter('all');
    setSearchQuery('');
  };

  const sortedServices = useMemo(() => {
    const list = [...filteredServices];
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
  }, [filteredServices, sortKey, sortDirection]);

  const paginatedServices = useMemo(() => {
    const start = (pageSafe - 1) * rowsPerPage;
    return sortedServices.slice(start, start + rowsPerPage);
  }, [sortedServices, pageSafe, rowsPerPage]);

  const handleSort = (key) => {
    if (sortKey === key) {
      setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setPage(1);
  };

  useEffect(() => {
    setPage((p) => (p > totalPages && totalPages > 0 ? totalPages : p));
  }, [totalPages]);

  const allSelected = paginatedServices.length > 0 && paginatedServices.every((s) => selectedIds.has(s._id));
  const someSelected = selectedIds.size > 0;

  const handleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginatedServices.map((s) => s._id)));
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

  const openSingleDeleteConfirm = (service) => {
    closeMenu();
    setDeleteConfirm({ type: 'single', id: service._id, title: service.title });
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

  const serviceForMenu = openActionId ? services.find((s) => s._id === openActionId) : null;

  return (
    <>
      <div className="border-b border-slate-200 bg-white dark:border-gray-600 dark:bg-gray-800">
        <Table.StatusTabs
          tabs={STATUS_TABS}
          value={statusFilter}
          onChange={setStatusFilter}
          counts={counts}
        />
        <Table.Toolbar>
          <Table.SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ariaLabel="Search services"
            placeholder="Search services"
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
              { key: 'title', label: 'Title', sortable: true },
              { key: 'slug', label: 'Slug', sortable: true },
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
            <Table.LoadingState colSpan={5} />
          ) : paginatedServices.length === 0 ? (
            <Table.EmptyState colSpan={5} />
          ) : (
            paginatedServices.map((s) => (
              <Table.Row key={s._id}>
                <Table.SelectionCell
                  checked={selectedIds.has(s._id)}
                  onChange={() => handleSelectRow(s._id)}
                  ariaLabel={`Select ${s.title}`}
                />
                <Table.Td>{s.title}</Table.Td>
                <Table.Td>
                  <code className="rounded bg-slate-100 px-2 py-0.5 text-sm text-slate-600 dark:bg-gray-600 dark:text-gray-300">
                    {s.slug}
                  </code>
                </Table.Td>
                <Table.Td>
                  <Badge variant={s.isActive !== false ? 'success' : 'warning'} size="md">
                    {s.isActive !== false ? 'Active' : 'Inactive'}
                  </Badge>
                </Table.Td>
                <Table.Td align="right" className="whitespace-nowrap">
                  <div className="relative flex justify-end">
                    <button
                      ref={(el) => (kebabRefs.current[s._id] = el)}
                      type="button"
                      onClick={(e) => openActionMenu(e, s._id)}
                      aria-label="Open actions"
                      aria-expanded={openActionId === s._id}
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
        onEdit={serviceForMenu ? () => onOpenEdit(serviceForMenu) : undefined}
        onDelete={serviceForMenu ? () => openSingleDeleteConfirm(serviceForMenu) : undefined}
        onClose={closeMenu}
      />

      <ConfirmModal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleConfirmDelete}
        title="Delete service"
        message={
          deleteConfirm?.type === 'single'
            ? `Are you sure you want to delete "${deleteConfirm.title}"? This cannot be undone.`
            : deleteConfirm?.type === 'bulk'
              ? `Are you sure you want to delete ${deleteConfirm.ids.length} selected service(s)? This cannot be undone.`
              : ''
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="error"
      />
    </>
  );
}
