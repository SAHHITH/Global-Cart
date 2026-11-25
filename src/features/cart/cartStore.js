import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const AVAILABLE_COUPONS = {
  GLOBAL10: { code: 'GLOBAL10', type: 'percent', value: 10, minOrder: 2000, label: '10% Off Orders ₹2,000+' },
  SAVE500: { code: 'SAVE500', type: 'flat', value: 500, minOrder: 5000, label: '₹500 Off Orders ₹5,000+' },
  WELCOME15: { code: 'WELCOME15', type: 'percent', value: 15, minOrder: 0, label: '15% Welcome Discount' },
};

export const INITIAL_DEMO_ORDERS = [
  {
    id: 'GC-2026-84921',
    createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000).toISOString(),
    items: [
      {
        id: '1',
        name: 'Sony WH-1000XM5 Wireless Noise-Canceling Headphones',
        brand: 'Sony',
        category: 'Electronics',
        price: 26990,
        originalPrice: 34990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '5',
        name: 'boAt Nirvana Ion ANC True Wireless Earbuds',
        brand: 'boAt',
        category: 'Electronics',
        price: 2499,
        originalPrice: 7990,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?auto=format&fit=crop&w=800&q=80',
      },
    ],
    payment: {
      method: 'Credit / Debit Card',
      transactionId: 'TXN982410573',
      status: 'Paid',
      subtotal: 29489,
      discount: 0,
      shipping: 0,
      tax: 1474,
      total: 30963,
    },
    shipment: {
      warehouseName: 'Global Cart Central Fulfillment Warehouse — Hub B4',
      warehouseCity: 'Chennai, Tamil Nadu',
      courierPartner: 'Global Express Logistics',
      awbNumber: 'GEX-IN-77492018',
      estimatedDelivery: '25 Nov 2026',
      currentStage: 2,
      stageTimestamps: [
        '22 Nov 2026, 10:30 AM',
        '23 Nov 2026, 02:15 PM',
        '24 Nov 2026, 06:45 AM',
        null,
        null,
      ],
    },
    customer: {
      fullName: 'Aarav Sharma',
      email: 'aarav.shopper@globalcart.in',
      phone: '+91 98765 43210',
      address: 'Flat 402, Green Glen Layout, Bellandur',
      city: 'Bengaluru',
      state: 'Karnataka',
      zipCode: '560103',
    },
  },
  {
    id: 'GC-2026-61208',
    createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000).toISOString(),
    items: [
      {
        id: '7',
        name: 'Nike Sportswear Club Fleece Pullover Hoodie',
        brand: 'Nike',
        category: 'Fashion',
        price: 3495,
        originalPrice: 4295,
        quantity: 1,
        image: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      },
      {
        id: '17',
        name: 'Minimalist 10% Niacinamide & Zinc Face Clarifying Serum (30ml)',
        brand: 'Minimalist',
        category: 'Beauty',
        price: 599,
        originalPrice: 699,
        quantity: 2,
        image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=800&q=80',
      },
    ],
    payment: {
      method: 'Global Pay Wallet',
      transactionId: 'TXN451982736',
      status: 'Paid',
      subtotal: 4693,
      discount: 500,
      shipping: 0,
      tax: 210,
      total: 4403,
    },
    shipment: {
      warehouseName: 'Global Cart Central Fulfillment Warehouse — Hub B4',
      warehouseCity: 'Chennai, Tamil Nadu',
      courierPartner: 'Global Express Logistics',
      awbNumber: 'GEX-IN-51829034',
      estimatedDelivery: '21 Nov 2026',
      currentStage: 4,
      stageTimestamps: [
        '18 Nov 2026, 11:15 AM',
        '19 Nov 2026, 09:40 AM',
        '20 Nov 2026, 04:20 PM',
        '21 Nov 2026, 08:30 AM',
        '21 Nov 2026, 01:45 PM',
      ],
    },
    customer: {
      fullName: 'Priya Patel',
      email: 'priya.patel@globalcart.in',
      phone: '+91 98123 45678',
      address: '12, Sunrise Enclave, Powai',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400076',
    },
  },
];

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isDrawerOpen: false,
      appliedCoupon: null,
      orders: INITIAL_DEMO_ORDERS,

      openDrawer: () => set({ isDrawerOpen: true }),
      closeDrawer: () => set({ isDrawerOpen: false }),
      toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),

      addItem: (product, quantity = 1) => {
        const items = get().items;
        const existingIndex = items.findIndex((item) => item.id === product.id);
        const maxStock = product.stock ?? 99;

        if (existingIndex > -1) {
          const updated = [...items];
          const nextQty = Math.min(updated[existingIndex].quantity + quantity, maxStock);
          updated[existingIndex] = { ...updated[existingIndex], quantity: nextQty };
          set({ items: updated });
        } else {
          set({
            items: [
              ...items,
              {
                id: product.id,
                name: product.name,
                price: product.price,
                originalPrice: product.originalPrice || product.price,
                image: product.image,
                brand: product.brand,
                category: product.category,
                stock: maxStock,
                quantity: Math.min(quantity, maxStock),
              },
            ],
          });
        }
      },

      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId);
          return;
        }
        set((state) => ({
          items: state.items.map((item) =>
            item.id === productId
              ? { ...item, quantity: Math.min(quantity, item.stock ?? 99) }
              : item
          ),
        }));
      },

      incrementQuantity: (productId) => {
        const item = get().items.find((i) => i.id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity + 1);
        }
      },

      decrementQuantity: (productId) => {
        const item = get().items.find((i) => i.id === productId);
        if (item) {
          get().updateQuantity(productId, item.quantity - 1);
        }
      },

      applyCoupon: (rawCode) => {
        const code = rawCode.trim().toUpperCase();
        const coupon = AVAILABLE_COUPONS[code];
        if (!coupon) {
          return { success: false, message: 'Invalid coupon code. Try WELCOME15, GLOBAL10, or SAVE500.' };
        }
        const subtotal = get().items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        if (subtotal < coupon.minOrder) {
          return {
            success: false,
            message: `Minimum order of ₹${coupon.minOrder.toLocaleString('en-IN')} required for ${code}.`,
          };
        }
        set({ appliedCoupon: coupon });
        return { success: true, message: `Coupon ${code} applied (${coupon.label})!` };
      },

      removeCoupon: () => set({ appliedCoupon: null }),

      clearCart: () => set({ items: [], appliedCoupon: null }),

      placeOrder: (orderDetails) => {
        const now = new Date();
        const deliveryDate = new Date(now.getTime() + 3 * 24 * 3600 * 1000);
        const timeStr =
          now.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
          }) +
          ', ' +
          now.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
          });
        const estDeliveryStr = deliveryDate.toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });

        const paymentMethodKey = orderDetails.customer?.paymentMethod || 'card';
        let paymentMethodLabel = 'Credit / Debit Card';
        let paymentStatus = 'Paid';
        let transactionId = `TXN${Math.floor(100000000 + Math.random() * 900000000)}`;

        if (paymentMethodKey === 'wallet') {
          paymentMethodLabel = 'Global Pay Wallet';
          paymentStatus = 'Paid';
          transactionId = `TXN${Math.floor(100000000 + Math.random() * 900000000)}`;
        } else if (paymentMethodKey === 'cod') {
          paymentMethodLabel = 'Pay on Delivery';
          paymentStatus = 'Pending (Pay on Delivery)';
          transactionId = 'COD-PENDING';
        }

        const orderId = `GC-2026-${Math.floor(10000 + Math.random() * 90000)}`;
        const awbNumber = `GEX-IN-${Math.floor(10000000 + Math.random() * 90000000)}`;
        const totals = orderDetails.totals || {};

        const newOrder = {
          id: orderId,
          createdAt: now.toISOString(),
          items: get().items.map((i) => ({ ...i })),
          payment: {
            method: paymentMethodLabel,
            transactionId,
            status: paymentStatus,
            subtotal: totals.subtotal || 0,
            discount: totals.couponDiscount || totals.productSavings || 0,
            shipping: totals.shipping || 0,
            tax: totals.tax || 0,
            total: totals.total || 0,
          },
          shipment: {
            warehouseName: 'Global Cart Central Fulfillment Warehouse — Hub B4',
            warehouseCity: 'Chennai, Tamil Nadu',
            courierPartner: 'Global Express Logistics',
            awbNumber,
            estimatedDelivery: estDeliveryStr,
            currentStage: 0,
            stageTimestamps: [timeStr, null, null, null, null],
          },
          customer: orderDetails.customer || {},
          totals,
        };

        set((state) => ({
          orders: [newOrder, ...(state.orders || [])],
          items: [],
          appliedCoupon: null,
        }));
        return newOrder;
      },

      advanceOrderStage: (orderId) => {
        let advanced = false;
        let nextStageName = '';
        const stageNames = [
          'Order Confirmed',
          'Packed at Warehouse',
          'Dispatched from Warehouse',
          'Out for Delivery',
          'Delivered to Customer',
        ];

        set((state) => {
          const updatedOrders = (state.orders || []).map((order) => {
            if (order.id !== orderId) return order;
            const currentStage = order.shipment?.currentStage ?? 0;
            if (currentStage >= 4) return order;

            const nextStage = currentStage + 1;
            advanced = true;
            nextStageName = stageNames[nextStage];

            const now = new Date();
            const timeStr =
              now.toLocaleDateString('en-IN', {
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              }) +
              ', ' +
              now.toLocaleTimeString('en-IN', {
                hour: '2-digit',
                minute: '2-digit',
              });

            const nextTimestamps = [...(order.shipment?.stageTimestamps || [null, null, null, null, null])];
            nextTimestamps[nextStage] = timeStr;

            return {
              ...order,
              shipment: {
                ...order.shipment,
                currentStage: nextStage,
                stageTimestamps: nextTimestamps,
              },
            };
          });

          return { orders: updatedOrders };
        });

        return { advanced, nextStageName };
      },
    }),
    {
      name: 'global-cart-bag',
      partialize: (state) => ({
        items: state.items,
        appliedCoupon: state.appliedCoupon,
        orders: state.orders,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && (!state.orders || state.orders.length === 0)) {
          state.orders = INITIAL_DEMO_ORDERS;
        }
      },
    }
  )
);

export default useCartStore;
