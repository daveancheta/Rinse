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
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"


function page() {
    const { user, handleGetSession, isLoadingAuth } = UseAuthStore();
    const { handlePostOrder, isLoadingOrder } = UseOrderStore();
    const [check, setCheck] = useState<boolean>(false)
    const [formData, setFormData] = useState<string | any>({
        userAddress: "",
        washLevel: ""
    })

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
                                <Loader2 className={cn("animate-spin", !isLoadingOrder && "hidden")}/> Save changes
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </Sidebar>
    )
}

export default page