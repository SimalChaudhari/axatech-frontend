import { Button } from '../../common';

const selectClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-secondary dark:focus:ring-secondary/20';
const textareaClass =
  'w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-slate-800 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:focus:border-secondary dark:focus:ring-secondary/20 min-h-[80px]';

export default function EnquiryDetailModal({
  open,
  detail,
  status,
  adminNotes,
  saving,
  onClose,
  onStatusChange,
  onAdminNotesChange,
  onUpdate,
}) {
  if (!open || !detail) return null;

  return (
    <div
      className="fixed inset-0 z-1000 flex animate-admin-fadeIn items-center justify-center bg-slate-900/50 p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[90vh] w-full max-w-[480px] flex-col overflow-hidden rounded-xl bg-white shadow-2xl animate-admin-slideUp dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shrink-0 border-b border-gray-200 px-6 py-5 text-lg font-bold text-slate-800 dark:border-gray-600 dark:text-white">
          Enquiry details
        </div>
        <div className="flex-1 overflow-y-auto p-6">
          <dl className="mb-4 grid grid-cols-[100px_1fr] gap-x-4 gap-y-1.5 text-sm">
            <dt className="font-medium text-slate-500 dark:text-gray-400">
              Type
            </dt>
            <dd className="m-0 text-slate-700 dark:text-gray-300">
              {detail.type}
            </dd>
            <dt className="font-medium text-slate-500 dark:text-gray-400">
              Name
            </dt>
            <dd className="m-0 text-slate-700 dark:text-gray-300">
              {detail.name}
            </dd>
            <dt className="font-medium text-slate-500 dark:text-gray-400">
              Email
            </dt>
            <dd className="m-0 text-slate-700 dark:text-gray-300">
              {detail.email}
            </dd>
            {detail.phone && (
              <>
                <dt className="font-medium text-slate-500 dark:text-gray-400">
                  Phone
                </dt>
                <dd className="m-0 text-slate-700 dark:text-gray-300">
                  {detail.phone}
                </dd>
              </>
            )}
            {detail.company && (
              <>
                <dt className="font-medium text-slate-500 dark:text-gray-400">
                  Company
                </dt>
                <dd className="m-0 text-slate-700 dark:text-gray-300">
                  {detail.company}
                </dd>
              </>
            )}
            {detail.message && (
              <>
                <dt className="font-medium text-slate-500 dark:text-gray-400">
                  Message
                </dt>
                <dd className="m-0 text-slate-700 dark:text-gray-300">
                  {detail.message}
                </dd>
              </>
            )}
            {detail.product && (
              <>
                <dt className="font-medium text-slate-500 dark:text-gray-400">
                  Product
                </dt>
                <dd className="m-0 text-slate-700 dark:text-gray-300">
                  {detail.product.name}
                </dd>
              </>
            )}
            {detail.service && (
              <>
                <dt className="font-medium text-slate-500 dark:text-gray-400">
                  Service
                </dt>
                <dd className="m-0 text-slate-700 dark:text-gray-300">
                  {detail.service.title}
                </dd>
              </>
            )}
            {detail.licensePlan && (
              <>
                <dt className="font-medium text-slate-500 dark:text-gray-400">
                  License
                </dt>
                <dd className="m-0 text-slate-700 dark:text-gray-300">
                  {detail.licensePlan.planName}
                </dd>
              </>
            )}
            {detail.cloudPlan && (
              <>
                <dt className="font-medium text-slate-500 dark:text-gray-400">
                  Cloud plan
                </dt>
                <dd className="m-0 text-slate-700 dark:text-gray-300">
                  {detail.cloudPlan.planName}
                </dd>
              </>
            )}
            <dt className="font-medium text-slate-500 dark:text-gray-400">
              Created
            </dt>
            <dd className="m-0 text-slate-700 dark:text-gray-300">
              {new Date(detail.createdAt).toLocaleString()}
            </dd>
          </dl>
          <hr className="my-4 border-0 border-t border-gray-200 dark:border-gray-600" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-600 dark:text-gray-400">
                Status
              </label>
              <select
                className={selectClass}
                value={status}
                onChange={(e) => onStatusChange(e.target.value)}
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-slate-600 dark:text-gray-400">
                Admin notes
              </label>
              <textarea
                className={textareaClass}
                value={adminNotes}
                onChange={(e) => onAdminNotesChange(e.target.value)}
                rows={3}
              />
            </div>
          </div>
        </div>
        <div className="shrink-0 border-t border-gray-200 bg-slate-50 px-6 py-4 dark:border-gray-600 dark:bg-gray-800">
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              fullWidth={false}
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              type="button"
              variant="primary"
              fullWidth={false}
              onClick={onUpdate}
              disabled={saving}
              loading={saving}
              loadingLabel="Saving…"
            >
              Update
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

