import React from "react";
import { Customer } from "@/types";
import { Column, ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/Components/ui/checkbox";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { MoreHorizontal } from "lucide-react";
import Dropdown from "@/Components/Dropdown";
import { Mail } from "lucide-react";
import { PhoneCall } from "lucide-react";
import { Trash } from "lucide-react";
import route from "ziggy-js";
import { router } from "@inertiajs/core";

const Header = ({
    column,
    title,
}: {
    column: Column<Customer>;
    title: string;
}) => {
    return (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
            {title}
            <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    );
};

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: "id",
        id: "id",
        header: ({ table }) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) =>
                    table.toggleAllPageRowsSelected(!!value)
                }
                aria-label="Select all"
            />
        ),
        cell: ({ row }) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: "name",
        header: ({ column }) => Header({ column, title: "Nama" }),
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "phone",
        header: "Telepon",
    },
    {
        accessorKey: "address",
        header: "Alamat",
    },
    {
        accessorKey: "avatar",
        header: "Avatar",
        cell: ({ row }) => (
            <img
                alt={row.getValue("name")}
                src={
                    row.getValue("avatar")
                        ? row.getValue("avatar")
                        : `https://ui-avatars.com/api/?name=${row.getValue(
                              "name"
                          )}`
                }
                className="rounded-full w-8 h-8 object-cover"
            />
        ),
    },
    {
        accessorKey: "created_at",
        header: ({ column }) => Header({ column, title: "Berlangganan Sejak" }),
        cell: ({ row }) => (
            <span>
                {new Date(row.getValue("created_at")).toLocaleDateString(
                    "id-ID",
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }
                )}
            </span>
        ),
    },
    {
        accessorKey: "updated_at",
        header: ({ column }) => Header({ column, title: "Diubah" }),
        cell: ({ row }) => (
            <span>
                {new Date(row.getValue("updated_at")).toLocaleDateString(
                    "id-ID",
                    {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    }
                )}
            </span>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row, table }) => (
            <Dropdown
                isFixed={true}
                renderTrigger={() => (
                    <MoreHorizontal className="h-6 w-6 cursor-pointer" />
                )}
            >
                <div className="pt-2 pb-3 text-xs w-60 text-gray-400">
                    <div className="px-4">
                        <h3 className="font-semibold text-lg">Aksi</h3>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() =>
                                navigator.clipboard.writeText(
                                    row.getValue("name")
                                )
                            }
                        >
                            Salin nama pelanggan
                        </Button>
                    </div>
                    <hr className="mb-4" />
                    <div className="px-4">
                        <a
                            className="block"
                            href={`mailto:${row.getValue("email")}`}
                        >
                            <Mail className="inline mr-2" size={18} /> Hubungi
                            pelanggan
                        </a>
                        <a
                            className="block"
                            href={`https://wa.me/${row.getValue("phone")}`}
                        >
                            <PhoneCall className="inline mr-2" size={18} />{" "}
                            Hubungi pelanggan
                        </a>
                    </div>{" "}
                </div>
                <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => {
                        router.delete(
                            route("customers.destroy", row.getValue("id"))
                        );
                    }}
                >
                    <Trash size={18} className="mr-2" /> Hapus pelanggan{" "}
                    {row.id}{" "}
                    {table.getState().rowSelection[row.id] ? "bener" : "salah"}
                </Button>
            </Dropdown>
        ),
    },
];
