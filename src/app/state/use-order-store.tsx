import { create } from "zustand"

interface Order {
    user: any,
    orders: any
}

interface OrderState {
    loading: boolean,
    orders: Order[],
    handleGetAllOrder: () => (void)
}

export const UseOrderStore = create<OrderState>((set) => ({
    loading: false,
    orders: [],

    handleGetAllOrder: async () => {
        try {
            const res = await fetch("/api/order/admin");

            const data = await res.json();

            set({ orders: data.order })
        } catch (error) {
            console.log(error);
        }
    }
}))