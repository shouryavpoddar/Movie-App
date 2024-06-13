import React, { useMemo } from 'react';
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table';

const MovieCreditsTable = ({ isMovieCreditsLoading, movieCredits }) => {
    // Define column helper
    const columnHelper = createColumnHelper();

    // Define table columns
    const columns = useMemo(
        () => [
            columnHelper.accessor('category', {
                header: 'Category',
                cell: info => info.getValue(),
            }),
            columnHelper.accessor('details', {
                header: 'Details',
                cell: info => info.getValue(),
            }),
        ],
        []
    );

    // Define table data
    const data = useMemo(
        () => [
            {
                category: 'Director:',
                details: isMovieCreditsLoading
                    ? 'Loading...'
                    : movieCredits?.directors?.map((director) => director.name).join(', '),
            },
            {
                category: 'Writers:',
                details: isMovieCreditsLoading
                    ? 'Loading...'
                    : movieCredits?.writers?.map((writer) => writer.name).join(', '),
            },
            {
                category: 'Stars:',
                details: isMovieCreditsLoading
                    ? 'Loading...'
                    : movieCredits?.topCast?.map((actor) => actor.name).join(', '),
            },
        ],
        [isMovieCreditsLoading, movieCredits]
    );

    // Use the useTable hook to get the table instance
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <table
            className="w-full text-sm text-left rtl:text-right text-gray-500"
        >
            <thead>
            {table.getHeaderGroups().map(headerGroup => (
                <tr>
                    {headerGroup.headers.map(header => (
                        <th
                            className="px-6 py-4 text-xl font-medium text-gray-900 whitespace-nowrap"
                        >
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                    ))}
                </tr>
            ))}
            </thead>
            <tbody>
            {table.getRowModel().rows.map(row => (
                <tr className="bg-white border-b">
                    {row.getVisibleCells().map(cell => (
                        <td  className="px-6 py-4">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default MovieCreditsTable;
