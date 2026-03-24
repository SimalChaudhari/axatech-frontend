import { useEffect, useMemo, useRef, useState } from 'react';
import { Table, ConfirmModal, Badge } from '../../common';
import { DotsVerticalIcon } from '../../icons';

const STATUS_TABS = [
  { value: 'all', label: 'All', variant: 'neutral', activeVariant: 'neutral' },
  { value: 'published', label: 'Published', variant: 'success', activeVariant: 'success', activeSolid: true },
  { value: 'draft', label: 'Draft', variant: 'warning', activeVariant: 'warning', activeSolid: true },
];

export default function BlogsTable({ blogs, onOpenEdit, onRemove, loading = false }) {
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
      all: blogs.length,
      published: blogs.filter((b) => !!b.published).length,
      draft: blogs.filter((b) => !b.published).length,
    }),
    [blogs]
  );

  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      if (statusFilter === 'published' && !b.published) return false;
      if (statusFilter === 'draft' && b.published) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const title = (b.title || '').toLowerCase();
        const author = (b.author || '').toLowerCase();
        const slug = (b.slug || '').toLowerCase();
        if (!title.includes(q) && !author.includes(q) && !slug.includes(q)) return false;
      }
      return true;
    });
  }, [blogs, statusFilter, searchQuery]);

  const totalFiltered = filteredBlogs.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
  const pageSafe = Math.min(page, totalPages) || 1;

  const activeFilters = useMemo(() => {
    const list = [];
    if (statusFilter !== 'all') {
      const label = STATUS_TABS.find((t) => t.value === statusFilter)?.label ?? statusFilter;
      list.push({ id: 'status', label: 'Status', value: label, onRemove: () => setStatusFilter('all') });
    }
    if (searchQuery.trim()) {
      list.push({ id: 'keyword', label: 'Keyword', value: searchQuery.trim(), onRemove: () => setSearchQuery('') });
    }
    return list;
  }, [statusFilter, searchQuery]);

  const sortedBlogs = useMemo(() => {
    const list = [...filteredBlogs];
    list.sort((a, b) => {
      let va = a[sortKey];
      let vb = b[sortKey];
      if (sortKey === 'published') {
        va = va ? 1 : 0;
        vb = vb ? 1 : 0;
        return sortDirection === 'asc' ? va - vb : vb - va;
      }
      if (sortKey === 'publishedAt') {
        va = va ? new Date(va).getTime() : 0;
        vb = vb ? new Date(vb).getTime() : 0;
        return sortDirection === 'asc' ? va - vb : vb - va;
      }
      va = String(va ?? '').toLowerCase();
      vb = String(vb ?? '').toLowerCase();
      return sortDirection === 'asc' ? va.localeCompare(vb) : vb.localeCompare(va);
    });
    return list;
  }, [filteredBlogs, sortKey, sortDirection]);

  const paginatedBlogs = useMemo(() => {
    const start = (pageSafe - 1) * rowsPerPage;
    return sortedBlogs.slice(start, start + rowsPerPage);
  }, [sortedBlogs, pageSafe, rowsPerPage]);

  useEffect(() => {
    setPage((p) => (p > totalPages && totalPages > 0 ? totalPages : p));
  }, [totalPages]);

  const handleSort = (key) => {
    if (sortKey === key) setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'));
    else {
      setSortKey(key);
      setSortDirection('asc');
    }
    setPage(1);
  };

  const allSelected = paginatedBlogs.length > 0 && paginatedBlogs.every((b) => selectedIds.has(b._id));
  const someSelected = selectedIds.size > 0;

  const handleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginatedBlogs.map((b) => b._id)));
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

  const openSingleDeleteConfirm = (blog) => {
    closeMenu();
    setDeleteConfirm({ type: 'single', id: blog._id, title: blog.title });
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

  const blogForMenu = openActionId ? blogs.find((b) => b._id === openActionId) : null;

  return (
    <>
      <div className="border-b border-slate-200 bg-white dark:border-gray-600 dark:bg-gray-800">
        <Table.StatusTabs tabs={STATUS_TABS} value={statusFilter} onChange={setStatusFilter} counts={counts} />
        <Table.Toolbar>
          <Table.SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            ariaLabel="Search blogs"
            placeholder="Search blogs"
          />
        </Table.Toolbar>
      </div>

      <Table.ActiveFilters
        filters={activeFilters}
        resultCount={totalFiltered}
        onClearAll={() => {
          setStatusFilter('all');
          setSearchQuery('');
        }}
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
              { key: 'published', label: 'Published', sortable: true },
              { key: 'publishedAt', label: 'Date', sortable: true },
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
          ) : paginatedBlogs.length === 0 ? (
            <Table.EmptyState colSpan={5} />
          ) : (
            paginatedBlogs.map((b) => (
              <Table.Row key={b._id}>
                <Table.SelectionCell
                  checked={selectedIds.has(b._id)}
                  onChange={() => handleSelectRow(b._id)}
                  ariaLabel={`Select ${b.title}`}
                />
                <Table.Td>{b.title}</Table.Td>
                <Table.Td>
                  <Badge variant={b.published ? 'success' : 'warning'} size="md">
                    {b.published ? 'Published' : 'Draft'}
                  </Badge>
                </Table.Td>
                <Table.Td>{b.publishedAt ? new Date(b.publishedAt).toLocaleDateString() : '—'}</Table.Td>
                <Table.Td align="right" className="whitespace-nowrap">
                  <div className="relative flex justify-end">
                    <button
                      ref={(el) => (kebabRefs.current[b._id] = el)}
                      type="button"
                      onClick={(e) => openActionMenu(e, b._id)}
                      aria-label="Open actions"
                      aria-expanded={openActionId === b._id}
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
        onRowsPerPageChange={(newRowsPerPage) => {
          setRowsPerPage(newRowsPerPage);
          setPage(1);
        }}
      />

      <Table.ActionMenu
        open={!!openActionId}
        position={menuPosition}
        onEdit={blogForMenu ? () => onOpenEdit(blogForMenu) : undefined}
        onDelete={blogForMenu ? () => openSingleDeleteConfirm(blogForMenu) : undefined}
        onClose={closeMenu}
      />

      <ConfirmModal
        open={!!deleteConfirm}
        onClose={() => setDeleteConfirm(null)}
        onConfirm={handleConfirmDelete}
        title="Delete blog post"
        message={
          deleteConfirm?.type === 'single'
            ? `Are you sure you want to delete "${deleteConfirm.title}"? This cannot be undone.`
            : deleteConfirm?.type === 'bulk'
              ? `Are you sure you want to delete ${deleteConfirm.ids.length} selected post(s)? This cannot be undone.`
              : ''
        }
        confirmLabel="Delete"
        cancelLabel="Cancel"
        confirmVariant="error"
      />
    </>
  );
}
