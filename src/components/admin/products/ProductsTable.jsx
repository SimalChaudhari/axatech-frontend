import { useState, useRef, useEffect, useMemo } from 'react';
import { Table, ConfirmModal, Badge } from '../../common';
import { DotsVerticalIcon } from '../../icons';

const STATUS_TABS = [
  { value: 'all', label: 'All', variant: 'neutral', activeVariant: 'neutral' },
  { value: 'featured', label: 'Featured', variant: 'info', activeVariant: 'info', activeSolid: true },
  { value: 'active', label: 'Active', variant: 'success', activeVariant: 'success', activeSolid: true },
  { value: 'inactive', label: 'Inactive', variant: 'warning', activeVariant: 'warning', activeSolid: true },
];

export default function ProductsTable({ products = [], onOpenEdit, onRemove }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [openActionId, setOpenActionId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortKey, setSortKey] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const kebabRefs = useRef({});

  const counts = useMemo(
    () => ({
      all: products.length,
      featured: products.filter((p) => p.featured).length,
      active: products.filter((p) => p.isActive !== false).length,
      inactive: products.filter((p) => p.isActive === false).length,
    }),
    [products]
  );

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (statusFilter === 'featured' && !p.featured) return false;
      if (statusFilter === 'active' && p.isActive === false) return false;
      if (statusFilter === 'inactive' && p.isActive !== false) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const name = (p.name || '').toLowerCase();
        const slug = (p.slug || '').toLowerCase();
        const short = (p.shortDescription || '').toLowerCase();
        if (!name.includes(q) && !slug.includes(q) && !short.includes(q)) return false;
      }
      return true;
    });
  }, [products, statusFilter, searchQuery]);

  const totalFiltered = filteredProducts.length;
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

  const sortedProducts = useMemo(() => {
    const list = [...filteredProducts];
    const key = sortKey;
    const dir = sortDirection;
    list.sort((a, b) => {
      if (key === 'name') {
        const va = String(a.name ?? '').toLowerCase();
        const vb = String(b.name ?? '').toLowerCase();
        return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      if (key === 'category') {
        const va = (a.category?.name ?? '').toLowerCase();
        const vb = (b.category?.name ?? '').toLowerCase();
        return dir === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
      }
      if (key === 'featured') {
        const va = a.featured ? 1 : 0;
        const vb = b.featured ? 1 : 0;
        return dir === 'asc' ? va - vb : vb - va;
      }
      if (key === 'isActive') {
        const va = a.isActive !== false ? 1 : 0;
        const vb = b.isActive !== false ? 1 : 0;
        return dir === 'asc' ? va - vb : vb - va;
      }
      return 0;
    });
    return list;
  }, [filteredProducts, sortKey, sortDirection]);

  const paginatedProducts = useMemo(() => {
    const start = (pageSafe - 1) * rowsPerPage;
    return sortedProducts.slice(start, start + rowsPerPage);
  }, [sortedProducts, pageSafe, rowsPerPage]);

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

  const allSelected = paginatedProducts.length > 0 && paginatedProducts.every((p) => selectedIds.has(p._id));
  const someSelected = selectedIds.size > 0;

  const handleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginatedProducts.map((p) => p._id)));
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

  const openSingleDeleteConfirm = (product) => {
    closeMenu();
    setDeleteConfirm({ type: 'single', id: product._id, name: product.name });
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

  const productForMenu = openActionId ? products.find((p) => p._id === openActionId) : null;

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
          <Table.SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ariaLabel="Search products"
            placeholder="Search products"
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
              { key: 'name', label: 'Name', sortable: true },
              { key: 'category', label: 'Category', sortable: true },
              { key: 'featured', label: 'Featured', sortable: true },
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
          {paginatedProducts.length === 0 ? (
            <Table.EmptyState colSpan={6} />
          ) : (
          paginatedProducts.map((p) => (
            <Table.Row key={p._id}>
              <Table.SelectionCell
                checked={selectedIds.has(p._id)}
                onChange={() => handleSelectRow(p._id)}
                ariaLabel={`Select ${p.name}`}
              />
              <Table.Td>{p.name}</Table.Td>
              <Table.Td>{p.category?.name || '—'}</Table.Td>
              <Table.Td>
                <Badge variant={p.featured ? 'info' : 'neutral'} size="md">
                  {p.featured ? 'Yes' : 'No'}
                </Badge>
              </Table.Td>
              <Table.Td>
                <Badge variant={p.isActive !== false ? 'success' : 'warning'} size="md">
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
      />

      <Table.ActionMenu
        open={!!openActionId}
        position={menuPosition}
        onEdit={productForMenu ? () => onOpenEdit(productForMenu) : undefined}
        onDelete={productForMenu ? () => openSingleDeleteConfirm(productForMenu) : undefined}
        onClose={closeMenu}
      />

      <ConfirmModal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleConfirmDelete}
        title="Delete product"
        message={
          deleteConfirm?.type === 'single'
            ? `Are you sure you want to delete "${deleteConfirm.name}"? This cannot be undone.`
            : deleteConfirm?.type === 'bulk'
              ? `Are you sure you want to delete ${deleteConfirm.ids.length} selected product(s)? This cannot be undone.`
              : ''
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="error"
      />
    </>
  );
}
