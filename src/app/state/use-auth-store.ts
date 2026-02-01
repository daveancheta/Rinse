import { toast } from "sonner"
import { create } from "zustand"

export const UseAuthStore = create((set) => ({
    handleSignUp: async (formData: FormData) => {
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