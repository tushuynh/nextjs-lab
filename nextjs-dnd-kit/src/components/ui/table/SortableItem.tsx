import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import React from 'react';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import { TableCell } from '@mui/material';

interface SortableItemProps {
  id: number;
  children: React.ReactNode;
}

export const SortableItem = ({ id, children }: SortableItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style: React.CSSProperties = {
    transform: CSS.Transform.toString(transform),
    transition,
    position: 'relative',
    zIndex: isDragging ? 1 : 'auto',
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <tr
      ref={setNodeRef}
      style={style}
      {...attributes}
    >
      <TableCell>
        <DragHandleIcon
          style={{ cursor: 'grab' }}
          {...listeners}
        />
      </TableCell>
      {children}
    </tr>
  );
};
