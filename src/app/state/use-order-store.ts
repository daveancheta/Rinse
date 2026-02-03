import { create } from "zustand"

interface Orders {
    id: string,
    userId: string,
    status: string,
    washLevel: string,
    paymentStatus: string,
    createdAt: string,
    updaatedAt: string,
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
    updaatedAt: string,
}

interface Order {
    user: Users,
    orders: Orders
}

interface OrderState {
    loading: boolean,
    orders: Order[],
    handleGetPickUpOrder: () => (void)
}

export const UseOrderStore = create<OrderState>((set) => ({
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
    }
}))