import { useState, useMemo, useRef, useEffect } from 'react';
import { Table, ConfirmModal, Badge } from '../../common';
import { DotsVerticalIcon } from '../../icons';

const STATUS_TABS = [
  { value: 'all', label: 'All', variant: 'neutral', activeVariant: 'neutral' },
  { value: 'active', label: 'Active', variant: 'success', activeVariant: 'success', activeSolid: true },
  { value: 'inactive', label: 'Inactive', variant: 'warning', activeVariant: 'warning', activeSolid: true },
];

function getImageUrl(project) {
  if (!project?.image) return null;
  const img = project.image;
  if (typeof img === 'string' && (img.startsWith('http') || img.startsWith('//'))) return img;
  const base = import.meta.env.VITE_API_BASE_URL?.replace(/\/$/, '') || '';
  return base ? `${base}/uploads/${img.replace(/^\/+/, '')}` : `/uploads/${img.replace(/^\/+/, '')}`;
}

export default function ProjectsTable({ projects = [], onOpenEdit, onRemove, loading = false }) {
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [openActionId, setOpenActionId] = useState(null);
  const [menuPosition, setMenuPosition] = useState(null);
  const kebabRefs = useRef({});

  const counts = useMemo(
    () => ({
      all: projects.length,
      active: projects.filter((p) => p.isActive !== false).length,
      inactive: projects.filter((p) => p.isActive === false).length,
    }),
    [projects]
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((p) => {
      if (statusFilter === 'active' && p.isActive === false) return false;
      if (statusFilter === 'inactive' && p.isActive !== false) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.trim().toLowerCase();
        const title = (p.title || '').toLowerCase();
        const category = (p.category || '').toLowerCase();
        const web = (p.webLink || '').toLowerCase();
        if (!title.includes(q) && !category.includes(q) && !web.includes(q)) return false;
      }
      return true;
    });
  }, [projects, statusFilter, searchQuery]);

  const totalFiltered = filteredProjects.length;
  const totalPages = Math.max(1, Math.ceil(totalFiltered / rowsPerPage));
  const pageSafe = Math.min(page, totalPages) || 1;

  const paginatedProjects = useMemo(() => {
    const start = (pageSafe - 1) * rowsPerPage;
    return filteredProjects.slice(start, start + rowsPerPage);
  }, [filteredProjects, pageSafe, rowsPerPage]);

  const allSelected = paginatedProjects.length > 0 && paginatedProjects.every((p) => selectedIds.has(p._id));
  const someSelected = selectedIds.size > 0;

  const handleSelectAll = () => {
    if (allSelected) setSelectedIds(new Set());
    else setSelectedIds(new Set(paginatedProjects.map((p) => p._id)));
  };

  const handleSelectRow = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleBulkDelete = () => {
    if (!selectedIds.size) return;
    setDeleteConfirm({ ids: [...selectedIds], single: false });
  };

  const handleSingleDelete = (project) => {
    setDeleteConfirm({ ids: [project._id], single: true, title: project.title });
  };

  const confirmRemove = () => {
    if (!deleteConfirm) return;
    onRemove?.(deleteConfirm.ids);
    setDeleteConfirm(null);
    setSelectedIds(new Set());
  };

  const handleRowsPerPageChange = (newRowsPerPage) => {
    setRowsPerPage(newRowsPerPage);
    setPage(1);
  };

  useEffect(() => {
    setPage((p) => (p > totalPages && totalPages > 0 ? totalPages : p));
  }, [totalPages]);

  const openActionMenu = (e, id) => {
    e.stopPropagation();
    const el = kebabRefs.current[id] || e.currentTarget;
    const rect = el.getBoundingClientRect();
    setMenuPosition({ top: rect.bottom - 45, left: rect.left - 135 });
    setOpenActionId(id);
  };

  const closeMenu = () => setOpenActionId(null);

  const openSingleDeleteConfirm = (project) => {
    closeMenu();
    setDeleteConfirm({ ids: [project._id], single: true, title: project.title });
  };

  const projectForMenu = openActionId ? projects.find((p) => p._id === openActionId) : null;

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
            ariaLabel="Search projects"
            placeholder="Search projects"
          />
        </Table.Toolbar>
      </div>

      <Table.SelectionBar
        selectedCount={selectedIds.size}
        totalCount={totalFiltered}
        onClearSelection={() => setSelectedIds(new Set())}
        onBulkDelete={handleBulkDelete}
        label="selected"
      />

      <Table>
        <Table.Head
          columns={[
            { key: 'image', label: 'Image' },
            { key: 'title', label: 'Title' },
            { key: 'category', label: 'Category' },
            { key: 'isActive', label: 'Active' },
            { key: 'actions', label: 'Actions', align: 'right' },
          ]}
          selectAll={{
            checked: allSelected,
            indeterminate: someSelected && !allSelected,
            onChange: handleSelectAll,
          }}
        />
        <Table.Body>
          {loading ? (
            <Table.LoadingState colSpan={6} />
          ) : paginatedProjects.length === 0 ? (
            <Table.EmptyState colSpan={6} />
          ) : (
            paginatedProjects.map((p) => (
              <Table.Row key={p._id}>
                <Table.SelectionCell
                  checked={selectedIds.has(p._id)}
                  onChange={() => handleSelectRow(p._id)}
                  ariaLabel={`Select ${p.title}`}
                />
                <Table.Td>
                  {getImageUrl(p) ? (
                    <img
                      src={getImageUrl(p)}
                      alt=""
                      className="h-10 w-16 rounded-md object-cover bg-slate-100 dark:bg-gray-700"
                    />
                  ) : (
                    <span className="text-slate-400 dark:text-gray-500">—</span>
                  )}
                </Table.Td>
                <Table.Td>{p.title}</Table.Td>
                <Table.Td>{p.category || '—'}</Table.Td>
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
        onView={projectForMenu ? () => onOpenEdit(projectForMenu) : undefined}
        onEdit={projectForMenu ? () => onOpenEdit(projectForMenu) : undefined}
        onDelete={projectForMenu ? () => openSingleDeleteConfirm(projectForMenu) : undefined}
        onClose={closeMenu}
      />

      {deleteConfirm && (
        <ConfirmModal
          open
          onClose={() => setDeleteConfirm(null)}
          onConfirm={confirmRemove}
          title={deleteConfirm.single ? 'Delete project' : 'Delete projects'}
          message={
            deleteConfirm.single
              ? `Are you sure you want to delete "${deleteConfirm.title}"? This cannot be undone.`
              : `Are you sure you want to delete ${deleteConfirm.ids.length} selected project(s)? This cannot be undone.`
          }
          confirmLabel="Delete"
          cancelLabel="Cancel"
          confirmVariant="error"
        />
      )}
    </>
  );
}
