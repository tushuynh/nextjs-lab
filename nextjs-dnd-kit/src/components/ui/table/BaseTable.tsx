import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';

interface SortableTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
}

const BaseTable = <T extends { id: number }>({
  data,
  columns,
}: SortableTableProps<T>) => {
  const [items] = useState<T[]>(data);

  return (
    <TableContainer
      component={Paper}
      style={{ overflow: 'visible' }}
    >
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell key={column.key as string}>{column.label}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => (
                <TableCell key={column.key as string}>
                  {item[column.key] as React.ReactNode}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default BaseTable;
