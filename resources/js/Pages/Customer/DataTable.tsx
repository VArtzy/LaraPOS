import React, { useState } from "react";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    flexRender,
    getSortedRowModel,
    getPaginationRowModel,
    getFilteredRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
    TableCell,
    TableBody,
} from "@/Components/ui/table";
import { FileDown, MoveLeft, MoveRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/Components/ui/select";
import DebouncedInput from "@/Components/DebounceInput";
import Dropdown from "@/Components/Dropdown";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export default function DataTable<TData, TValue>({
    data,
    columns,
}: DataTableProps<TData, TValue>) {
    const [rowSelection, setRowSelection] = useState({});
    const [globalFilter, setGlobalFilter] = React.useState("");

    const table = useReactTable({
        data,
        columns,
        state: {
            rowSelection,
            globalFilter,
        },
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <>
            <div className="flex items-center justify-between mb-4">
                <DebouncedInput
                    value={globalFilter ?? ""}
                    onChange={(value) => setGlobalFilter(String(value))}
                    placeholder="Mencari pelanggan dari semua kolom..."
                    className="max-w-xs"
                />
                <Dropdown
                    renderTrigger={() => (
                        <Button variant="secondary">
                            <FileDown className="mr-2" size={18} /> Ekspor Tabel
                        </Button>
                    )}
                ></Dropdown>
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <TableCell key={cell.id}>
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                        Menunjukan {table.getRowModel().rows?.length} dari{" "}
                        {data.length} hasil
                    </span>
                    <Select
                        onValueChange={(e) => table.setPageSize(Number(e))}
                        value={String(table.getState().pagination.pageSize)}
                    >
                        <SelectTrigger className="w-16">
                            <SelectValue placeholder="Baris per halaman" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {[10, 20, 30, 40, 50].map((pageSize) => (
                                    <SelectItem
                                        key={pageSize}
                                        value={String(pageSize)}
                                    >
                                        {pageSize}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                <div className="items-center gap-2 hidden md:flex">
                    {Array.from(
                        { length: table.getPageCount() },
                        (_, i) => i + 1
                    ).map(
                        (page) =>
                            ({ page } && (
                                <Button
                                    key={page}
                                    onClick={() => table.setPageIndex(page - 1)}
                                    size="icon"
                                    variant={
                                        table.getState().pagination.pageIndex +
                                            1 ===
                                        page
                                            ? "default"
                                            : "outline"
                                    }
                                >
                                    {page}
                                </Button>
                            ))
                    )}
                </div>
                <div className="flex gap-4">
                    <Button
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        <MoveLeft size={18} />
                    </Button>
                    <Button
                        onClick={() =>
                            table.getCanNextPage() ? table.nextPage() : null
                        }
                        disabled={!table.getCanNextPage()}
                    >
                        <MoveRight size={18} />
                    </Button>
                </div>
            </div>
        </>
    );
}
