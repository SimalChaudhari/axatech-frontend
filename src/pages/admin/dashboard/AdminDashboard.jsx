import { useEffect, useState } from 'react';
import api from '../../../api';
import {
  DashboardLoading,
  DashboardStats,
  DashboardQuickActions,
  DashboardWelcome,
  DashboardOverview,
  DashboardTips,
} from '../../../components/admin/dashboard';
// import { LevelItem } from '../../../components/common';

export default function AdminDashboard() {
  const [counts, setCounts] = useState({ enquiries: 0, newEnquiries: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.admin.enquiries.list(),
      api.admin.enquiries.list({ status: 'New' }),
    ])
      .then(([all, newList]) => {
        setCounts({
          enquiries: all.total ?? (all.enquiries?.length ?? 0),
          newEnquiries: newList.enquiries?.length ?? 0,
        });
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <DashboardLoading />;
  }

  return (
    <div className="mx-auto max-w-[1280px]">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="m-0 text-2xl font-bold tracking-tight text-slate-800 dark:text-white">
          Dashboard
        </h1>

        {/* <LevelItem
          id="dashboard-toggle"
          label="Toggle"
          defaultOpen
          className="min-w-[200px]"
          items={[
            { label: 'Level 1' },
            {
              label: 'Toggle 2',
              children: [
                { label: 'Level 2.1' },
                { label: 'Level 2.2' },
                {
                  label: 'Toggle 3',
                  children: [
                    { label: 'Level 3.1' },
                    { label: 'Level 2.2' },
                    {
                      label: 'Toggle 4',
                      children: [
                        { label: 'Level 4.1' },
                        { label: 'Level 4.2' },
                      ],
                    },
                  ],
                },
              ],
            },
            { label: 'Level 3' },
            { label: 'Level 4' },
            { label: 'Level 5' },
            
            {
              label: 'Toggle 5',
              children: [
                { label: 'Level 5.1' },
                { label: 'Level 5.2' },
              ],
            },
          ]}
        /> */}
      </header>
      <DashboardWelcome />
      <DashboardStats counts={counts} />
      <DashboardQuickActions />
      <DashboardOverview />
      <DashboardTips />
    </div>
  );
}
