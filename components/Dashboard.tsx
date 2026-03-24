'use client'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

// ─── Mock Data ──────────────────────────────────────────────────────────────

const revenueData = [
  { month: 'Sep', revenue: 65000, target: 70000 },
  { month: 'Oct', revenue: 72000, target: 70000 },
  { month: 'Nov', revenue: 68000, target: 75000 },
  { month: 'Dec', revenue: 85000, target: 80000 },
  { month: 'Jan', revenue: 91000, target: 85000 },
  { month: 'Feb', revenue: 87000, target: 90000 },
  { month: 'Mar', revenue: 124500, target: 95000 },
]

const ordersData = [
  { category: 'Electronics', orders: 420 },
  { category: 'Clothing', orders: 380 },
  { category: 'Food', orders: 310 },
  { category: 'Books', orders: 290 },
  { category: 'Sports', orders: 250 },
  { category: 'Home', orders: 243 },
]

const trafficData = [
  { name: 'Organic', value: 42 },
  { name: 'Social', value: 28 },
  { name: 'Direct', value: 18 },
  { name: 'Referral', value: 12 },
]

const TRAFFIC_COLORS = ['#6366f1', '#8b5cf6', '#a78bfa', '#c4b5fd']

const transactions = [
  { id: '#TXN-001', customer: 'Alice Johnson', amount: '$250.00', status: 'Completed', date: 'Mar 23, 2026' },
  { id: '#TXN-002', customer: 'Bob Smith', amount: '$125.50', status: 'Pending', date: 'Mar 23, 2026' },
  { id: '#TXN-003', customer: 'Carol White', amount: '$890.00', status: 'Completed', date: 'Mar 22, 2026' },
  { id: '#TXN-004', customer: 'David Lee', amount: '$45.00', status: 'Failed', date: 'Mar 22, 2026' },
  { id: '#TXN-005', customer: 'Emma Wilson', amount: '$320.75', status: 'Completed', date: 'Mar 21, 2026' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

interface StatCardProps {
  title: string
  value: string
  change: string
  positive: boolean
  icon: React.ReactNode
}

function StatCard({ title, value, change, positive, icon }: StatCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className={`text-sm font-medium ${positive ? 'text-emerald-600' : 'text-red-500'}`}>
        {positive ? '▲' : '▼'} {change}{' '}
        <span className="text-gray-400 font-normal">vs last month</span>
      </div>
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    Completed: 'bg-emerald-50 text-emerald-700',
    Pending: 'bg-amber-50 text-amber-700',
    Failed: 'bg-red-50 text-red-700',
  }
  return (
    <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${styles[status] ?? 'bg-gray-100 text-gray-600'}`}>
      {status}
    </span>
  )
}

// ─── Icons ───────────────────────────────────────────────────────────────────

const RevenueIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const UsersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const OrdersIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
  </svg>
)

const ConversionIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
      d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

// ─── Dashboard ───────────────────────────────────────────────────────────────

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <span className="text-lg font-semibold text-gray-900">Analytics Dashboard</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">March 23, 2026</span>
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold text-sm select-none">
            AJ
          </div>
        </div>
      </header>

      {/* ── Main ── */}
      <main className="p-6 max-w-7xl mx-auto">

        {/* Page title */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
          <p className="text-gray-500 text-sm mt-1">Track your key metrics and performance</p>
        </div>

        {/* ── Stat Cards ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard title="Total Revenue"    value="$124,500" change="12.5%" positive icon={<RevenueIcon />} />
          <StatCard title="Active Users"     value="8,420"    change="8.2%"  positive icon={<UsersIcon />} />
          <StatCard title="New Orders"       value="1,893"    change="3.1%"  positive={false} icon={<OrdersIcon />} />
          <StatCard title="Conversion Rate"  value="3.6%"     change="1.2%"  positive icon={<ConversionIcon />} />
        </div>

        {/* ── Row 1: Revenue Line + Traffic Pie ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">

          {/* Revenue Trend */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-gray-900">Revenue Trend</h3>
                <p className="text-xs text-gray-500 mt-0.5">Revenue vs Target — last 7 months</p>
              </div>
              <span className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full font-medium">
                Monthly
              </span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`}
                />
                <Tooltip formatter={(v: number) => [`$${v.toLocaleString()}`, '']} />
                <Legend />
                <Line
                  type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2.5}
                  dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} name="Revenue"
                />
                <Line
                  type="monotone" dataKey="target" stroke="#d1d5db" strokeWidth={2}
                  strokeDasharray="5 5" dot={false} name="Target"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Traffic Sources */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="mb-4">
              <h3 className="font-semibold text-gray-900">Traffic Sources</h3>
              <p className="text-xs text-gray-500 mt-0.5">This month</p>
            </div>
            <ResponsiveContainer width="100%" height={160}>
              <PieChart>
                <Pie
                  data={trafficData} cx="50%" cy="50%"
                  innerRadius={45} outerRadius={70}
                  paddingAngle={3} dataKey="value"
                >
                  {trafficData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={TRAFFIC_COLORS[i % TRAFFIC_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(v) => [`${v}%`, '']} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2.5 mt-2">
              {trafficData.map((item, i) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: TRAFFIC_COLORS[i] }} />
                    <span className="text-gray-600">{item.name}</span>
                  </div>
                  <span className="font-semibold text-gray-900">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Row 2: Orders Bar + Transactions Table ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">

          {/* Orders by Category */}
          <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="mb-5">
              <h3 className="font-semibold text-gray-900">Orders by Category</h3>
              <p className="text-xs text-gray-500 mt-0.5">Current month</p>
            </div>
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={ordersData} layout="vertical" barSize={13}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 11, fill: '#9ca3af' }} axisLine={false} tickLine={false} />
                <YAxis
                  dataKey="category" type="category"
                  tick={{ fontSize: 11, fill: '#6b7280' }} axisLine={false} tickLine={false} width={78}
                />
                <Tooltip />
                <Bar dataKey="orders" fill="#6366f1" radius={[0, 4, 4, 0]} name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Recent Transactions */}
          <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="font-semibold text-gray-900">Recent Transactions</h3>
                <p className="text-xs text-gray-500 mt-0.5">Latest activity</p>
              </div>
              <button className="text-xs text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
                View all →
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-gray-400 border-b border-gray-100">
                    <th className="pb-3 font-medium">ID</th>
                    <th className="pb-3 font-medium">Customer</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium">Status</th>
                    <th className="pb-3 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {transactions.map((txn) => (
                    <tr key={txn.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="py-3 text-gray-400 font-mono text-xs">{txn.id}</td>
                      <td className="py-3 text-gray-900 font-medium">{txn.customer}</td>
                      <td className="py-3 text-gray-900 font-semibold">{txn.amount}</td>
                      <td className="py-3"><StatusBadge status={txn.status} /></td>
                      <td className="py-3 text-gray-400 text-xs">{txn.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
