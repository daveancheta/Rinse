"use client"
import { UseOrderStore } from '@/app/state/use-order-store'
import Sidebar from '@/components/sidebar-provider'
import { useEffect, useRef } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuCheckboxItem,
    DropdownMenuGroup,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { MoreHorizontalIcon } from "lucide-react"
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

function page() {
    const { handleGetPickUpOrder, orders,
        handleUpdatePaymentStatus, handleUpdateOrderStatus,
        handleDeleteOrder } = UseOrderStore();
    const selectRef = useRef<HTMLSelectElement | any>(null);

    useEffect(() => {
        handleGetPickUpOrder()
    }, [handleGetPickUpOrder]);

    return (
        <Sidebar>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Wash Level</TableHead>
                        <TableHead>Payment Status</TableHead>
                        <TableHead>Order Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) =>
                        <TableRow key={order.orders.id}>
                            <TableCell className="font-medium">{order.user.name}</TableCell>
                            <TableCell className='capitalize'>{order.orders.washLevel}</TableCell>
                            <TableCell className='capitalize'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Badge onClick={() => selectRef.current?.click()}
                                            variant="outline"
                                            className='flex flex-row items-center justify-start cursor-pointer'>
                                            <div className={cn('w-2 h-2 rounded-full',
                                                order.orders.paymentStatus === "pending" ? "bg-yellow-500" :
                                                    order.orders.paymentStatus === "paid" ? "bg-green-500" :
                                                        'bg-blue-500')}>

                                            </div>
                                            {order.orders.paymentStatus}
                                        </Badge>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                                            <DropdownMenuCheckboxItem
                                                onClick={() => handleUpdatePaymentStatus(order.orders.id, "pending")}
                                            >
                                                <div className='w-2 h-2 bg-yellow-500 rounded-full'>

                                                </div> Pending
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem
                                                onClick={() => handleUpdatePaymentStatus(order.orders.id, "paid")}
                                            >
                                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                                Paid
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem
                                                onClick={() => handleUpdatePaymentStatus(order.orders.id, "refund")}
                                            >
                                                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                                                Refund
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            <TableCell className='capitalize'>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Badge onClick={() => selectRef.current?.click()}
                                            variant="outline"
                                            className='flex flex-row items-center justify-start cursor-pointer'>
                                            <div className={cn('w-2 h-2 rounded-full',
                                                order.orders.status === "pickup" ? "bg-yellow-500" :
                                                    order.orders.status === "deliver" ? "bg-green-500" :
                                                        'bg-blue-500')}>

                                            </div>
                                            {order.orders.status}
                                        </Badge>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuGroup>
                                            <DropdownMenuLabel>Payment Status</DropdownMenuLabel>
                                            <DropdownMenuCheckboxItem
                                                onClick={() => handleUpdateOrderStatus(order.orders.id, "pickup")}
                                            >
                                                <div className='w-2 h-2 bg-yellow-500 rounded-full'></div>
                                                To Pickup
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem
                                                onClick={() => handleUpdateOrderStatus(order.orders.id, "deliver")}
                                            >
                                                <div className='w-2 h-2 bg-green-500 rounded-full'></div>
                                                To Deliver
                                            </DropdownMenuCheckboxItem>
                                            <DropdownMenuCheckboxItem
                                                onClick={() => handleUpdateOrderStatus(order.orders.id, "washing")}
                                            >
                                                <div className='w-2 h-2 bg-blue-500 rounded-full'></div>
                                                Washing
                                            </DropdownMenuCheckboxItem>
                                        </DropdownMenuGroup>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem variant="destructive"
                                            onClick={() => handleDeleteOrder(order.orders.id)}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </Sidebar>
    )
}

export default page