"use client"

import { UseAuthStore } from "@/app/state/use-auth-store"
import Sidebar from "@/components/sidebar-provider"
import { notFound } from "next/navigation"
import { useEffect } from "react"

function page() {
    const { user, handleGetSession } = UseAuthStore()

    useEffect(() => {
        handleGetSession()
    }, [handleGetSession])

    if (user?.isAdmin) {
        notFound()
    };

    return (
        <Sidebar>
            page
        </Sidebar>
    )
}

export default page