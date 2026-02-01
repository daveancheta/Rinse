import { toast } from "sonner"
import { create } from "zustand"

interface User {
    email: string,
    password: string,
    name: string
}

interface AuthState {
    handleSignUp: (formData: User) => (void)
}
export const UseAuthStore = create<AuthState>((set) => ({
    handleSignUp: async (formData: User) => {
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
        }
    }
}))