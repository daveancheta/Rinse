import { toast } from "sonner"
import { create } from "zustand"

interface AuthUser {
    email: string,
    password: string
}

interface User {
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


interface AuthState {
    isLoadingAuth: boolean,
    isLoggedIn: boolean,
    user: User | null,
    handleSignUp: (formData: AuthUser) => (void),
    handleSignIn: (formData: AuthUser) => (void),
    handleGetSession: () => (void),
    handleLogout: () => (void),
}


export const UseAuthStore = create<AuthState>((set) => ({
    isLoadingAuth: false,
    isLoggedIn: false,
    user: null,

    handleSignUp: async (formData: AuthUser) => {
        set({ isLoadingAuth: true })

        try {
            const res = await fetch("api/auth/signup", ({
                method: "POSt",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }));

            const result = await res.json();

            if (result.success) {
                toast.success("Account Created Successfully!");
            } else {
                toast.error(result.message);
            }

        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            set({ isLoadingAuth: false });
        }
    },

    handleSignIn: async (formData: AuthUser) => {
        set({ isLoadingAuth: true })

        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })

            const result = await res.json();

            if (!result.success) {
                set({ isLoggedIn: false });
                toast.error(result.message)
            } else {
                set({ isLoggedIn: true });
            }
        } catch (error: any) {
            toast.error(error.message);
        } finally {
            set({ isLoadingAuth: false });
        }
    },

    handleGetSession: async () => {
        set({ isLoadingAuth: true });

        try {
            const res = await fetch("/api/auth/session");
            const data = await res.json();

            set({ user: data.session || null });
        } catch (error) {
            console.log(error)
        } finally {
            set({ isLoadingAuth: false });
        }
    },

    handleLogout: async () => {
        try {
            await fetch("/api/auth/signout", {
                method: "POST",
                credentials: "include",
            });

            set({ user: null })

            window.location.reload()
        } catch (error) {
            console.log(error)
        }
    },
}))