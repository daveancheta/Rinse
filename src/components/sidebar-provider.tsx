import React from 'react'
import { AppSidebar } from './app-sidebar'
import { SidebarInset, SidebarTrigger, SidebarProvider } from './ui/sidebar'

function Sidebar({children}: any) {
    return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarInset>
                    <header className="flex h-16 shrink-0 items-center gap-2">
                        <div className="flex items-center gap-2 px-4">
                            <SidebarTrigger className="-ml-1" />
                        </div>
                    </header>
                    <div className="p-4 pt-0">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
    )
}

export default Sidebar