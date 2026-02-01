import { toast } from "sonner"
import { create } from "zustand"

interface User {
    email: string,
    password: string,
    name: string
}

interface AuthState {
    loading: boolean,
    handleSignUp: (formData: User) => (void)
}
export const UseAuthStore = create<AuthState>((set) => ({
    loading: false,

    handleSignUp: async (formData: User) => {
        set({ loading: true })
        try {
            const res = await fetch("api/auth/signup", ({
                method: "POSt",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            }));

            const response = await res.json();

            if (response.success) {
                toast.success("Account Created Successfully!")
            } else {
                toast.error(response.message)
            }

        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            set({ loading: false })
        }
    }
}))