"use client"
import { UseOrderStore } from '@/app/state/use-order-store'
import Sidebar from '@/components/sidebar-provider'
import React, { useEffect } from 'react'

function page() {
    const { handleGetAllOrder, orders } = UseOrderStore()

    useEffect(() => {
        handleGetAllOrder()
    }, [handleGetAllOrder])

    return (
        <Sidebar>
            <div>
                {orders.map((order) => (
                    <div key={order.orders.id}>
                        {order.orders.status}
                        </div>
                ))}
            </div>
        </Sidebar>
    )
}

export default page