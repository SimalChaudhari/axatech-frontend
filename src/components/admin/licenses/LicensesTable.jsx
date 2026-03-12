import { useState, useRef, useEffect, useMemo } from 'react';
import { Table, Dropdown } from '../../common';
import { SearchIcon, DotsVerticalIcon } from '../../icons';

const STATUS_TABS = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive' },
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
  const kebabRefs = useRef({});
  const selectAllRef = useRef(null);

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
  const paginatedPlans = useMemo(() => {
    const start = (pageSafe - 1) * rowsPerPage;
    return filteredPlans.slice(start, start + rowsPerPage);
  }, [filteredPlans, pageSafe, rowsPerPage]);

  useEffect(() => {
    setPage((p) => (p > totalPages && totalPages > 0 ? totalPages : p));
  }, [totalPages]);

  const allSelected = paginatedPlans.length > 0 && paginatedPlans.every((p) => selectedIds.has(p._id));
  const someSelected = selectedIds.size > 0;

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = someSelected && !allSelected;
    }
  }, [someSelected, allSelected]);

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

  const handleBulkDelete = () => {
    if (!selectedIds.size) return;
    if (!confirm(`Delete ${selectedIds.size} selected plan(s)?`)) return;
    selectedIds.forEach((id) => onRemove(id));
    setSelectedIds(new Set());
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  const planForMenu = openActionId ? plans.find((p) => p._id === openActionId) : null;

  return (
    <>
      {/* Toolbar: status tabs + filters row */}
      <div className="border-b border-slate-200 dark:border-gray-600">
        {/* Status tabs */}
        <div className="flex flex-wrap gap-1 px-4 pt-3">
          {STATUS_TABS.map((tab) => {
            const count = counts[tab.value];
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatusFilter(tab.value)}
                className={`flex items-center gap-1.5 rounded-t px-4 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'border-b-2 border-primary bg-transparent text-slate-800 dark:border-secondary dark:text-white'
                    : 'border-b-2 border-transparent text-slate-600 hover:text-slate-800 dark:text-gray-400 dark:hover:text-gray-200'
                }`}
              >
                {tab.label}
                <span
                  className={`inline-flex h-5 min-w-[20px] items-center justify-center rounded px-1.5 text-xs font-semibold ${
                    isActive
                      ? 'bg-slate-800 text-white dark:bg-gray-200 dark:text-gray-800'
                      : 'bg-slate-200 text-slate-700 dark:bg-gray-600 dark:text-gray-300'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
        {/* Dropdown filter + search */}
        <div className="flex flex-wrap items-center gap-3 px-4 pb-3 pt-2">
          <Dropdown
            // placeholder="All types"
            value={typeFilter}
            onChange={setTypeFilter}
            options={TYPE_OPTIONS}
            className="w-40 [&_button]:h-[42px] [&_button]:py-2.5 [&_button]:rounded-lg [&_button]:border [&_button]:text-sm"
          />
          <div className="relative flex-1 min-w-[200px]">
            <span
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-gray-500"
              aria-hidden
            >
              <SearchIcon className="text-xl" />
            </span>
            <input
              type="search"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="h-[42px] w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm text-slate-800 placeholder-slate-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100 dark:placeholder-gray-500 dark:focus:border-secondary dark:focus:ring-secondary/20"
              aria-label="Search plans"
            />
          </div>
          <button
            type="button"
            aria-label="More options"
            className="inline-flex items-center justify-center rounded-lg p-2.5 text-slate-500 hover:bg-slate-100 hover:text-slate-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200"
          >
            <DotsVerticalIcon className="text-xl" />
          </button>
        </div>
      </div>

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
              { label: 'Plan' },
              { label: 'Type' },
              { label: 'Price' },
              { label: 'Active' },
              { label: 'Actions', align: 'right' },
            ]}
            selectAll={{
              checked: allSelected,
              indeterminateRef: selectAllRef,
              onChange: handleSelectAll,
            }}
          />
        )}
        <Table.Body>
          {paginatedPlans.map((p) => (
            <Table.Row key={p._id}>
              <Table.Td className="w-10 px-2 text-center">
                <input
                  type="checkbox"
                  checked={selectedIds.has(p._id)}
                  onChange={() => handleSelectRow(p._id)}
                  aria-label={`Select ${p.planName}`}
                  className="h-4 w-4 rounded border-slate-300 text-primary focus:ring-primary/20 dark:border-gray-500 dark:text-secondary"
                />
              </Table.Td>
              <Table.Td>{p.planName}</Table.Td>
              <Table.Td>{p.type}</Table.Td>
              <Table.Td>₹{p.price?.toLocaleString()}</Table.Td>
              <Table.Td>
                <span
                  className={`inline-block rounded px-2.5 py-0.5 text-xs font-semibold uppercase ${
                    p.isActive !== false
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                      : 'bg-slate-100 text-slate-600 dark:bg-gray-600 dark:text-gray-400'
                  }`}
                >
                  {p.isActive !== false ? 'Yes' : 'No'}
                </span>
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
          ))}
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

      {filteredPlans.length === 0 && plans.length > 0 && (
        <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-gray-400">
          No plans match your filters. Try changing status, type, or search.
        </div>
      )}

      <Table.ActionMenu
        open={!!openActionId}
        position={menuPosition}
        onEdit={planForMenu ? () => onOpenEdit(planForMenu) : undefined}
        onDelete={planForMenu ? () => onRemove(planForMenu._id) : undefined}
        onClose={closeMenu}
      />
    </>
  );
}
