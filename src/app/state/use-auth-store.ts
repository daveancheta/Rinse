import { redirect } from "next/navigation"
import { toast } from "sonner"
import { create } from "zustand"

interface User {
    email: string,
    password: string,
    name?: string
}

interface AuthState {
    loading: boolean,
    isLoggedIn: boolean,
    handleSignUp: (formData: User) => (void),
    handleSignIn: (formData: User) => (void),
}


export const UseAuthStore = create<AuthState>((set) => ({
    loading: false,
    isLoggedIn: false,

    handleSignUp: async (formData: User) => {
        set({ loading: true })

        try {
            const res = await fetch("api/auth/signup", ({
                method: "POSt",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }));

            const result = await res.json();

            if (result.success) {
                toast.success("Account Created Successfully!")
            } else {
                toast.error(result.message)
            }

        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            set({ loading: false })
        }
    },

    handleSignIn: async (formData: User) => {
        set({ loading: true })

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const result = await res.json();

            if (!result.success) {
                set({ isLoggedIn: false })
            } else {
                set({ isLoggedIn: true })
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            set({ loading: false })
        }
    }
}))