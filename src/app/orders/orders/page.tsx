"use client"
import { UseOrderStore } from '@/app/state/use-order-store'
import Sidebar from '@/components/sidebar-provider'
import { useInitials } from '@/hooks/use-initials'
import { useEffect } from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
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

function page() {
    const { handleGetPickUpOrder, orders } = UseOrderStore();
    const getInitials = useInitials()

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
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {orders.map((order) =>
                        <TableRow key={order.orders.id}>
                            <TableCell className="font-medium">{order.user.name}</TableCell>
                            <TableCell className='capitalize'>{order.orders.washLevel}</TableCell>
                            <TableCell className='capitalize'>{order.orders.status}</TableCell>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="size-8">
                                            <MoreHorizontalIcon />
                                            <span className="sr-only">Open menu</span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem variant="destructive">
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