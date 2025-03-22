import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@mui/material';
import { SortableItem } from './SortableItem';

interface SortableTableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  onReorder: (reorderedData: T[]) => void;
}

export const SortableTable = <T extends { id: number }>({
  data,
  columns,
  onReorder,
}: SortableTableProps<T>) => {
  const [items, setItems] = useState<T[]>(data);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        const reorderedItems = arrayMove(items, oldIndex, newIndex);
        onReorder(reorderedItems);
        return reorderedItems;
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
      modifiers={[restrictToVerticalAxis]}
    >
      <TableContainer
        component={Paper}
        style={{ overflow: 'visible' }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell width={20}></TableCell>
              {columns.map((column) => (
                <TableCell key={column.key as string}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <SortableContext
              items={items.map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <SortableItem
                  key={item.id}
                  id={item.id}
                >
                  {columns.map((column) => (
                    <TableCell key={column.key as string}>
                      {item[column.key] as React.ReactNode}
                    </TableCell>
                  ))}
                </SortableItem>
              ))}
            </SortableContext>
          </TableBody>
        </Table>
      </TableContainer>
    </DndContext>
  );
};
