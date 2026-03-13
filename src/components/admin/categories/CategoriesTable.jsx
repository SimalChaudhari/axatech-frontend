import { useState, useRef, useEffect, useMemo } from 'react';
import { Table, ConfirmModal, Badge } from '../../common';
import { SearchIcon, DotsVerticalIcon } from '../../icons';

const STATUS_TABS = [
  { value: 'all', label: 'All', variant: 'neutral', activeVariant: 'neutral' },
  { value: 'active', label: 'Active', variant: 'success', activeVariant: 'success', activeSolid: true },
  { value: 'inactive', label: 'Inactive', variant: 'warning', activeVariant: 'warning', activeSolid: true },
];

export default function CategoriesTable({ categories, onOpenEdit, onRemove }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openActionId, setOpenActionId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState(null); // null | { type: 'single', id, name } | { type: 'bulk', ids: string[] }
  const kebabRefs = useRef({});

  const counts = useMemo(
    () => ({
      all: categories.length,
      active: categories.filter((c) => c.isActive !== false).length,
      inactive: categories.filter((c) => c.isActive === false).length,
    }),
    [categories]
  );

  const filteredCategories = useMemo(() => {
    return categories.filter((c) => {
      if (statusFilter === 'active' && c.isActive === false) return false;
      if (statusFilter === 'inactive' && c.isActive !== false) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const name = (c.name || '').toLowerCase();
        const slug = (c.slug || '').toLowerCase();
        if (!name.includes(q) && !slug.includes(q)) return false;
      }
      return true;
    });
  }, [categories, statusFilter, searchQuery]);

  const totalFiltered = filteredCategories.length;
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

  const sortedCategories = useMemo(() => {
    const list = [...filteredCategories];
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
  }, [filteredCategories, sortKey, sortDirection]);

  const paginatedCategories = useMemo(() => {
    const start = (pageSafe - 1) * rowsPerPage;
    return sortedCategories.slice(start, start + rowsPerPage);
  }, [sortedCategories, pageSafe, rowsPerPage]);

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

  const allSelected = paginatedCategories.length > 0 && paginatedCategories.every((c) => selectedIds.has(c._id));
  const someSelected = selectedIds.size > 0;

  const handleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginatedCategories.map((c) => c._id)));
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

  const openSingleDeleteConfirm = (cat) => {
    closeMenu();
    setDeleteConfirm({ type: 'single', id: cat._id, name: cat.name });
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

  const catForMenu = openActionId ? categories.find((c) => c._id === openActionId) : null;

  return (
    <>
      <div className="border-b border-slate-200 dark:border-gray-600 bg-white dark:bg-gray-800">
        <div className="flex flex-wrap gap-0 px-4 pt-4 pb-0 border-b border-slate-200 dark:border-gray-600">
          {STATUS_TABS.map((tab) => {
            const count = counts[tab.value];
            const isActive = statusFilter === tab.value;
            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setStatusFilter(tab.value)}
                className={`flex items-center gap-2 rounded-t-lg border-b-2 -mb-px px-5 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-transparent text-slate-900 dark:text-white'
                    : 'border-transparent bg-transparent text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {tab.label}
                <Badge
                  size="sm"
                  variant={isActive ? tab.activeVariant : tab.variant}
                  solid={isActive && !!tab.activeSolid}
                >
                  {count}
                </Badge>
              </button>
            );
          })}
        </div>
        <div className="flex flex-wrap items-center gap-3 px-4 py-3">
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
              aria-label="Search categories"
            />
          </div>
        </div>
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
              { key: 'name', label: 'Name', sortable: true },
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
          {paginatedCategories.map((c) => (
            <Table.Row key={c._id}>
              <Table.SelectionCell
                checked={selectedIds.has(c._id)}
                onChange={() => handleSelectRow(c._id)}
                ariaLabel={`Select ${c.name}`}
              />
              <Table.Td>{c.name}</Table.Td>
              <Table.Td>
                <code className="rounded bg-slate-100 px-2 py-0.5 text-sm text-slate-600 dark:bg-gray-600 dark:text-gray-300">
                  {c.slug}
                </code>
              </Table.Td>
              <Table.Td>
                <Badge variant={c.isActive !== false ? 'success' : 'warning'} size="md">
                  {c.isActive !== false ? 'Active' : 'Inactive'}
                </Badge>
              </Table.Td>
              <Table.Td align="right" className="whitespace-nowrap">
                <div className="relative flex justify-end">
                  <button
                    ref={(el) => (kebabRefs.current[c._id] = el)}
                    type="button"
                    onClick={(e) => openActionMenu(e, c._id)}
                    aria-label="Open actions"
                    aria-expanded={openActionId === c._id}
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
      />

      {filteredCategories.length === 0 && categories.length > 0 && (
        <div className="px-4 py-8 text-center text-sm text-slate-500 dark:text-gray-400">
          No categories match your filters. Try changing status or search.
        </div>
      )}

      <Table.ActionMenu
        open={!!openActionId}
        position={menuPosition}
        onEdit={catForMenu ? () => onOpenEdit(catForMenu) : undefined}
        onDelete={catForMenu ? () => openSingleDeleteConfirm(catForMenu) : undefined}
        onClose={closeMenu}
      />

      <ConfirmModal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleConfirmDelete}
        title="Delete category"
        message={
          deleteConfirm?.type === 'single'
            ? `Are you sure you want to delete "${deleteConfirm.name}"? This cannot be undone.`
            : deleteConfirm?.type === 'bulk'
              ? `Are you sure you want to delete ${deleteConfirm.ids.length} selected category(ies)? This cannot be undone.`
              : ''
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="error"
      />
    </>
  );
}
