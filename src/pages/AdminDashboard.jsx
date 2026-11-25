import { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
} from 'recharts';
import { Table, Tag, Popconfirm } from 'antd';
import {
  IndianRupee,
  ShoppingBag,
  Package,
  TrendingUp,
  Plus,
  Trash2,
} from 'lucide-react';
import { toast } from 'react-toastify';
import { Breadcrumbs } from '@/components/common/Breadcrumbs';
import { Button } from '@/components/common/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/Dialog';
import { categories } from '@/data/categories';
import { formatPrice } from '@/utils/formatPrice';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';

const MONTHLY_REVENUE = [
  { month: 'Jun', revenue: 3425000, orders: 310 },
  { month: 'Jul', revenue: 3890000, orders: 356 },
  { month: 'Aug', revenue: 4250000, orders: 402 },
  { month: 'Sep', revenue: 4980000, orders: 468 },
  { month: 'Oct', revenue: 5850000, orders: 540 },
  { month: 'Nov', revenue: 6940000, orders: 645 },
];

export function AdminDashboard() {
  const { products, addProduct, deleteProduct } = useProducts();
  const { orders } = useCart();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    brand: '',
    category: 'Electronics',
    price: '',
    originalPrice: '',
    stock: '20',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    description: '',
  });

  const categoryChartData = useMemo(() => {
    return categories.map((cat) => {
      const catItems = products.filter(
        (p) => p.category.toLowerCase() === cat.name.toLowerCase()
      );
      const inventoryValue = catItems.reduce((sum, p) => sum + p.price * p.stock, 0);
      return {
        name: cat.name,
        products: catItems.length,
        inventoryValue,
      };
    });
  }, [products]);

  const totalInventoryUnits = useMemo(
    () => products.reduce((sum, p) => sum + (Number(p.stock) || 0), 0),
    [products]
  );

  const liveDemoRevenue = useMemo(() => {
    const userOrdersRevenue = orders.reduce((sum, o) => sum + (o.totals?.total || 0), 0);
    return 370300 + userOrdersRevenue;
  }, [orders]);

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const price = Number(newItem.price);
    const originalPrice = Number(newItem.originalPrice) || price;
    if (!newItem.name.trim() || !newItem.brand.trim() || price <= 0) {
      toast.error('Please enter valid product name, brand, and price.');
      return;
    }

    const discount =
      originalPrice > price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0;

    addProduct({
      name: newItem.name.trim(),
      brand: newItem.brand.trim(),
      category: newItem.category,
      price,
      originalPrice,
      discount,
      stock: Number(newItem.stock) || 10,
      image: newItem.image.trim(),
      images: [newItem.image.trim()],
      description:
        newItem.description.trim() ||
        'Newly added marketplace item with Global Cart buyer protection.',
      featured: true,
      bestseller: false,
      specs: {
        Condition: 'Brand New',
        Warranty: '1 Year Standard Warranty',
      },
    });

    toast.success(`Added "${newItem.name}" to live catalog!`);
    setAddModalOpen(false);
    setNewItem({
      name: '',
      brand: '',
      category: 'Electronics',
      price: '',
      originalPrice: '',
      stock: '20',
      image:
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
      description: '',
    });
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'name',
      key: 'name',
      render: (text, record) => (
        <div className="flex items-center gap-3">
          <img
            src={record.image}
            alt={text}
            className="h-10 w-10 rounded-lg object-cover bg-slate-100"
          />
          <div>
            <p className="font-bold text-xs sm:text-sm line-clamp-1">{text}</p>
            <p className="text-xs opacity-65">{record.brand}</p>
          </div>
        </div>
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      render: (cat) => <Tag color="blue">{cat}</Tag>,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      sorter: (a, b) => a.price - b.price,
      render: (price) => <span className="font-bold">{formatPrice(price)}</span>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
      sorter: (a, b) => a.stock - b.stock,
      render: (stock) => (
        <Tag color={stock > 15 ? 'green' : stock > 0 ? 'orange' : 'red'}>
          {stock} units
        </Tag>
      ),
    },
    {
      title: 'Rating',
      dataIndex: 'rating',
      key: 'rating',
      render: (rating) => <span className="font-semibold">★ {Number(rating).toFixed(1)}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Popconfirm
          title="Remove product from catalog?"
          onConfirm={() => {
            deleteProduct(record.id);
            toast.info(`Deleted "${record.name}"`);
          }}
          okText="Yes"
          cancelText="No"
        >
          <button
            type="button"
            aria-label="Delete product"
            className="rounded-lg p-1.5 text-red-500 hover:bg-red-500/10 cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </Popconfirm>
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 space-y-8">
      <div>
        <Breadcrumbs items={[{ label: 'Admin Dashboard' }]} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
              Merchant & Analytics Console
            </h1>
            <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>
              Real-time frontend catalog inventory, mock sales performance, and product controls.
            </p>
          </div>

          <Button onClick={() => setAddModalOpen(true)}>
            <Plus className="h-4 w-4" />
            <span>Add New Product</span>
          </Button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          {
            label: 'Gross Merchandise Value',
            value: formatPrice(liveDemoRevenue),
            trend: '+18.4% vs last month',
            icon: IndianRupee,
            accent: 'text-emerald-500 bg-emerald-500/15',
          },
          {
            label: 'Total Orders',
            value: (2721 + orders.length).toLocaleString(),
            trend: `${orders.length} placed in this session`,
            icon: ShoppingBag,
            accent: 'text-[#2874F0] bg-[#2874F0]/15',
          },
          {
            label: 'Active Catalog SKUs',
            value: products.length,
            trend: 'Across 10 departments',
            icon: Package,
            accent: 'text-[#FF9900] bg-[#FF9900]/15',
          },
          {
            label: 'Total Warehouse Stock',
            value: totalInventoryUnits.toLocaleString(),
            trend: '98.6% fulfillment SLA',
            icon: TrendingUp,
            accent: 'text-purple-500 bg-purple-500/15',
          },
        ].map(({ label, value, trend, icon: Icon, accent }) => (
          <div key={label} className="surface-card rounded-2xl p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">{label}</span>
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent}`}>
                <Icon className="h-4 w-4" />
              </div>
            </div>
            <p className="mt-3 text-2xl font-extrabold">{value}</p>
            <p className="mt-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              {trend}
            </p>
          </div>
        ))}
      </div>

      {/* Recharts Analytics Row */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div
          className="rounded-2xl border p-5"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <h3 className="mb-4 text-base font-extrabold">6-Month Revenue Trend (₹)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={MONTHLY_REVENUE}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FF9900" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#FF9900" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="month" />
                <YAxis />
                <RechartsTooltip />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#FF9900"
                  strokeWidth={2.5}
                  fill="url(#revGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div
          className="rounded-2xl border p-5"
          style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
        >
          <h3 className="mb-4 text-base font-extrabold">Inventory Valuation by Category (₹)</h3>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryChartData}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis />
                <RechartsTooltip />
                <Bar dataKey="inventoryValue" fill="#2874F0" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Ant Design Product Inventory Table */}
      <div
        className="rounded-2xl border p-5"
        style={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)' }}
      >
        <h3 className="mb-4 text-base font-extrabold">Catalog Inventory Manager</h3>
        <Table
          dataSource={products}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 8 }}
          scroll={{ x: 680 }}
        />
      </div>

      {/* Add Product Modal */}
      <Dialog open={addModalOpen} onOpenChange={setAddModalOpen}>
        <DialogContent onClose={() => setAddModalOpen(false)}>
          <DialogHeader>
            <DialogTitle>Add New Product to Storefront</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateProduct} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label className="mb-1 block text-xs font-bold">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g., Apple AirPods Max — Midnight"
                  className="w-full rounded-xl border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-[#2874F0]"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">Brand *</label>
                <input
                  type="text"
                  required
                  value={newItem.brand}
                  onChange={(e) => setNewItem({ ...newItem, brand: e.target.value })}
                  placeholder="Apple"
                  className="w-full rounded-xl border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-[#2874F0]"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">Category</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full rounded-xl border px-3.5 py-2 text-sm outline-none"
                  style={{
                    backgroundColor: 'var(--bg-secondary)',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">Sale Price (₹) *</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  placeholder="2999"
                  className="w-full rounded-xl border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-[#2874F0]"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">Original MRP (₹)</label>
                <input
                  type="number"
                  min="1"
                  value={newItem.originalPrice}
                  onChange={(e) => setNewItem({ ...newItem, originalPrice: e.target.value })}
                  placeholder="3499"
                  className="w-full rounded-xl border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-[#2874F0]"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">Initial Stock</label>
                <input
                  type="number"
                  min="1"
                  value={newItem.stock}
                  onChange={(e) => setNewItem({ ...newItem, stock: e.target.value })}
                  className="w-full rounded-xl border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-[#2874F0]"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>

              <div>
                <label className="mb-1 block text-xs font-bold">Image URL</label>
                <input
                  type="url"
                  value={newItem.image}
                  onChange={(e) => setNewItem({ ...newItem, image: e.target.value })}
                  className="w-full rounded-xl border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-[#2874F0]"
                  style={{ borderColor: 'var(--border-color)' }}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-xs font-bold">Description</label>
              <textarea
                rows={2}
                value={newItem.description}
                onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                placeholder="Highlight key product specifications..."
                className="w-full rounded-xl border bg-transparent px-3.5 py-2 text-sm outline-none focus:border-[#2874F0]"
                style={{ borderColor: 'var(--border-color)' }}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" onClick={() => setAddModalOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Publish Product</Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AdminDashboard;