"use client"

import { UseAuthStore } from "@/app/state/use-auth-store"
import Sidebar from "@/components/sidebar-provider"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { UseOrderStore } from "@/app/state/use-order-store"
import { Checkbox } from "@/components/ui/checkbox"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Calendar, History, Info, Loader2, MapPin, Truck, TruckElectric, WashingMachine } from "lucide-react"
import { cn } from "@/lib/utils"


function page() {
    const { user, handleGetSession, isLoadingAuth } = UseAuthStore();
    const { handlePostOrder, isLoadingOrder, handleGetOrderByAuthId, orders } = UseOrderStore();
    const [check, setCheck] = useState<boolean>(false)
    const [formData, setFormData] = useState<string | any>({
        userAddress: "",
        washLevel: ""
    })

    useEffect(() => {
        handleGetOrderByAuthId()
    }, [handleGetOrderByAuthId])

    useEffect(() => {
        handleGetSession()
    }, [handleGetSession])

    const request = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        handlePostOrder(formData);
    }

    return (
        <Sidebar>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" disabled={isLoadingAuth}>Request Pickup</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-sm">
                    <form onSubmit={request} className="space-y-4">
                        <DialogHeader>
                            <DialogTitle>Request Pickup</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you&apos;re
                                done.
                            </DialogDescription>
                        </DialogHeader>
                        <FieldGroup>
                            <Field>
                                <Label htmlFor="name-1">Address</Label>
                                <Input id="Address" value={formData.userAddress}
                                    onChange={(e) => setFormData({ ...formData, userAddress: e.target.value })}
                                    disabled={check} />
                                <div className="flex flex-row items-center gap-2">
                                    <Checkbox id="terms-checkbox" name="terms-checkbox" checked={check}
                                        onCheckedChange={() => {
                                            !check ? setFormData({ ...formData, userAddress: user?.address }) :
                                                setFormData({ ...formData, userAddress: "" })
                                            setCheck(!check)
                                        }} />
                                    <Label htmlFor="terms-checkbox">Use my current address.</Label>
                                </div>
                            </Field>

                            <Field>
                                <Label>Wash Level</Label>
                                <Select onValueChange={(value) => setFormData({ ...formData, washLevel: value })}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Wash Level" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectLabel>Wash Level</SelectLabel>
                                            <SelectItem value="light">Light</SelectItem>
                                            <SelectItem value="medium">Medium</SelectItem>
                                            <SelectItem value="heavy">Heavy</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </Field>
                        </FieldGroup>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button variant="outline" onClick={() => {
                                    setFormData({ ...formData, userAddress: "" })
                                    setFormData({ ...formData, washLevel: "" })
                                    setCheck(!check)
                                }} disabled={isLoadingOrder}>Cancel</Button>
                            </DialogClose>
                            <Button type="submit"
                                disabled={
                                    !formData.userAddress.trim() ||
                                    !formData.washLevel.trim() || isLoadingOrder}>
                                <Loader2 className={cn("animate-spin", !isLoadingOrder && "hidden")} /> Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:grid-cols-4 gap-4 mt-5">
                {orders.map((order) =>
                    <div className="bg-background dark:bg-neutral-900 rounded-sm flex flex-col justify-between" key={order.orders.id}>
                        <div className={cn("px-4 py-3 rounded-t-sm",
                            order.orders.status === "pickup" ? "bg-yellow-100" :
                                order.orders.status === "washing" ? "bg-blue-100" :
                                    order.orders.status === "done" ? "bg-green-100" : "bg-orange-100")}>
                            {order.orders.status === "pickup" ?
                                <div className="flex flex-row justify-between items-center">
                                    <div className="flex flex-row items-center text-yellow-900 gap-2 font-bold text-sm">
                                        <History className="size-4" /> To Pickup
                                    </div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-900 animate-pulse"></div>
                                </div> :
                                order.orders.status === "washing" ?
                                    <div className="flex flex-row justify-between items-center">
                                        <div className="flex flex-row items-center text-blue-900 gap-2 font-bold text-sm">
                                            <WashingMachine className="size-4" /> Washing
                                        </div>
                                        <div className="w-2 h-2 rounded-full bg-blue-900 animate-pulse"></div>
                                    </div> :
                                    order.orders.status === "done" ?
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex flex-row items-center text-green-900 gap-2 font-bold text-sm">
                                                <Truck className="size-4" /> Delivered
                                            </div>
                                            <div className="w-2 h-2 rounded-full bg-green-900 animate-pulse"></div>
                                        </div>
                                        :
                                        <div className="flex flex-row justify-between items-center">
                                            <div className="flex flex-row items-center text-orange-900 gap-2 font-bold text-sm">
                                                <TruckElectric className="size-4" /> To Deliver
                                            </div>
                                            <div className="w-2 h-2 rounded-full bg-orange-900 animate-pulse"></div>
                                        </div>}
                        </div>
                        <div className="p-4 flex flex-col items-start gap-2">
                            <div className="flex flex-row items-center gap-1 text-sm capitalize">
                                <MapPin className="size-4" /> {order.orders.address.toLowerCase()}
                            </div>
                            <div className="flex flex-row items-center gap-1 text-sm">
                                <Calendar className="size-4" /> {new Date(order.orders.createdAt).toLocaleString("en-US", {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                    hour: "numeric",
                                    minute: "2-digit",
                                    hour12: true
                                })}

                            </div>

                        </div>
                        <div className="flex justify-end p-4">
                            <div className={cn("flex flex-row items-center gap-1 text-xs capitalize px-2 py-1 rounded-full",
                                order.orders.paymentStatus === "pending" ? "bg-yellow-100 text-yellow-900" :
                                    order.orders.paymentStatus === "paid" ? "bg-green-100 text-green-900" : "bg-blue-100 text-blue-900")}>
                                <Info className="size-4" /> {order.orders.paymentStatus}
                            </div>
                        </div>
                    </div>
                )}

            </div>

        </Sidebar>
    )
}

export default page