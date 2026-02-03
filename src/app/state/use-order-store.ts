import { create } from "zustand"

interface Orders {
    id: string,
    userId: string,
    status: string,
    washLevel: string,
    paymentStatus: string,
    createdAt: string,
    updatedAt: string,
}

interface Users {
    id: string,
    name: string,
    email: string,
    emailVerified: string,
    isAdmin: string,
    address: string,
    image: null,
    createdAt: string,
    updatedAt: string,
}

interface Order {
    user: Users,
    orders: Orders
}

interface OrderState {
    loading: boolean,
    orders: Order[],
    handleGetPickUpOrder: () => (void),
    handleUpdatePaymentStatus: (id: string, status: string) => (void),
    handleUpdateOrderStatus: (id: string, status: string) => (void),
    handleDeleteOrder: (id: string) => (void),
}

export const UseOrderStore = create<OrderState>((set, get) => ({
    loading: false,
    orders: [],

    handleGetPickUpOrder: async () => {
        try {
            const res = await fetch("/api/order/admin");

            const data = await res.json();

            set({ orders: data.order })
        } catch (error) {
            console.log(error);
        }
    },

    handleUpdatePaymentStatus: async (id: string, status: string) => {
        const previousOrders = get().orders

        set({
            orders: previousOrders.map((order) =>
                order.orders.id === id
                    ? { ...order, orders: { ...order.orders, paymentStatus: status } }
                    : order)
        });

        try {
            await fetch("/api/order/admin/payment", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            })
        } catch (error) {
            console.log(error)
        }
    },

    handleUpdateOrderStatus: async (id: string, status: string) => {
        const previousOrders = get().orders;

        set({
            orders: previousOrders.map((order) =>
                order.orders.id === id
                    ? { ...order, orders: { ...order.orders, status: status } }
                    : order)
        })

        try {
            await fetch("/api/order/admin/order", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id, status }),
            })
        } catch (error) {
            console.log(error)
        }
    },

    handleDeleteOrder: async (id: string) => {
        const previousOrders = get().orders

        set({
            orders: previousOrders.filter((order) => order.orders.id !== id)
        })

        try {
            await fetch("/api/order/admin", {
                method: "DELETE",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id }),
            })
        } catch (error) {
            console.log(error)
        }
    }

}))