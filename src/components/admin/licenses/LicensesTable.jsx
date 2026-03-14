import { useState, useRef, useEffect, useMemo } from 'react';
import { Table, ConfirmModal, Badge } from '../../common';
import { DotsVerticalIcon } from '../../icons';

const STATUS_TABS = [
  { value: 'all', label: 'All', variant: 'neutral', activeVariant: 'neutral' },
  { value: 'active', label: 'Active', variant: 'success', activeVariant: 'success', activeSolid: true },
  { value: 'inactive', label: 'Inactive', variant: 'warning', activeVariant: 'warning', activeSolid: true },
];

const TYPE_OPTIONS = [
  { value: 'all', label: 'All types' },
  { value: 'single', label: 'Single' },
  { value: 'multi', label: 'Multi' },
];

export default function LicensesTable({ plans, onOpenEdit, onRemove }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [openActionId, setOpenActionId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState('planName');
  const [sortDirection, setSortDirection] = useState('asc');
  const [deleteConfirm, setDeleteConfirm] = useState(null); // null | { type: 'single', id, planName } | { type: 'bulk', ids: string[] }
  const kebabRefs = useRef({});

  const counts = useMemo(() => ({
    all: plans.length,
    active: plans.filter((p) => p.isActive !== false).length,
    inactive: plans.filter((p) => p.isActive === false).length,
  }), [plans]);

  const filteredPlans = useMemo(() => {
    return plans.filter((p) => {
      if (statusFilter === 'active' && p.isActive === false) return false;
      if (statusFilter === 'inactive' && p.isActive !== false) return false;
      if (typeFilter !== 'all' && (p.type || 'single') !== typeFilter) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        if (!(p.planName || '').toLowerCase().includes(q)) return false;
      }
      return true;
    });
  }, [plans, statusFilter, typeFilter, searchQuery]);

  const totalFiltered = filteredPlans.length;
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
    if (typeFilter !== 'all') {
      const label = TYPE_OPTIONS.find((t) => t.value === typeFilter)?.label ?? typeFilter;
      list.push({
        id: 'type',
        label: 'Type',
        value: label,
        onRemove: () => setTypeFilter('all'),
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
  }, [statusFilter, typeFilter, searchQuery]);

  const handleClearAllFilters = () => {
    setStatusFilter('all');
    setTypeFilter('all');
    setSearchQuery('');
  };

  const sortedPlans = useMemo(() => {
    const list = [...filteredPlans];
    const key = sortKey;
    const dir = sortDirection;
    list.sort((a, b) => {
      let va = a[key];
      let vb = b[key];
      if (key === 'price') {
        va = Number(va) || 0;
        vb = Number(vb) || 0;
        return dir === 'asc' ? va - vb : vb - va;
      }
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
  }, [filteredPlans, sortKey, sortDirection]);

  const paginatedPlans = useMemo(() => {
    const start = (pageSafe - 1) * rowsPerPage;
    return sortedPlans.slice(start, start + rowsPerPage);
  }, [sortedPlans, pageSafe, rowsPerPage]);

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

  const allSelected = paginatedPlans.length > 0 && paginatedPlans.every((p) => selectedIds.has(p._id));
  const someSelected = selectedIds.size > 0;

  const handleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginatedPlans.map((p) => p._id)));
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

  const openSingleDeleteConfirm = (plan) => {
    closeMenu();
    setDeleteConfirm({ type: 'single', id: plan._id, planName: plan.planName });
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

  const closeDeleteConfirm = () => setDeleteConfirm(null);

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const planForMenu = openActionId ? plans.find((p) => p._id === openActionId) : null;

  return (
    <>
      {/* Toolbar: status tabs + filters row */}
      <div className="border-b border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800">
        {/* Status tabs: same padding for all; active = dark label + colored underline; inactive = grey label, no underline */}
        <Table.StatusTabs
          tabs={STATUS_TABS}
          value={statusFilter}
          onChange={setStatusFilter}
          counts={counts}
        />
        <Table.Toolbar>
          <Table.ToolbarDropdown
            value={typeFilter}
            onChange={setTypeFilter}
            options={TYPE_OPTIONS}
            showPlaceholderOption={false}
          />
          <Table.SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ariaLabel="Search plans"
            placeholder="Search plans"
          />
          <button
            type="button"
            aria-label="More options"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
          >
            <DotsVerticalIcon className="text-xl" />
          </button>
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
              { key: 'planName', label: 'Plan', sortable: true },
              { key: 'type', label: 'Type', sortable: true },
              { key: 'price', label: 'Price', sortable: true },
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
          {paginatedPlans.length === 0 ? (
            <Table.EmptyState colSpan={6} />
          ) : (
          paginatedPlans.map((p) => (
            <Table.Row key={p._id}>
              <Table.SelectionCell
                checked={selectedIds.has(p._id)}
                onChange={() => handleSelectRow(p._id)}
                ariaLabel={`Select ${p.planName}`}
              />
              <Table.Td>{p.planName}</Table.Td>
              <Table.Td>{p.type}</Table.Td>
              <Table.Td>₹{p.price?.toLocaleString()}</Table.Td>
              <Table.Td>
                <Badge variant={p.isActive !== false ? 'success' : 'warning'}>
                  {p.isActive !== false ? 'Active' : 'Inactive'}
                </Badge>
              </Table.Td>
              <Table.Td align="right" className="whitespace-nowrap">
                <div className="relative flex justify-end">
                  <button
                    ref={(el) => (kebabRefs.current[p._id] = el)}
                    type="button"
                    onClick={(e) => openActionMenu(e, p._id)}
                    aria-label="Open actions"
                    aria-expanded={openActionId === p._id}
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
        // rowsPerPageOptions={[ 5, 10, 20, 50]}
      />

      <Table.ActionMenu
        open={!!openActionId}
        position={menuPosition}
        onEdit={planForMenu ? () => onOpenEdit(planForMenu) : undefined}
        onDelete={planForMenu ? () => openSingleDeleteConfirm(planForMenu) : undefined}
        onClose={closeMenu}
      />

      <ConfirmModal
        open={!!deleteConfirm}
        onClose={closeDeleteConfirm}
        onConfirm={handleConfirmDelete}
        title="Delete plan"
        message={
          deleteConfirm?.type === 'single'
            ? `Are you sure you want to delete "${deleteConfirm.planName}"? This cannot be undone.`
            : deleteConfirm?.type === 'bulk'
              ? `Are you sure you want to delete ${deleteConfirm.ids.length} selected plan(s)? This cannot be undone.`
              : ''
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="error"
      />
    </>
  );
}
