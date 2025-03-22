'use client';

import React from 'react';
import { SortableTable } from '@/components/ui/table/SortableTable';
import { Post } from '@/types/products';

interface Props {
  posts: Post[];
  columns: { key: keyof Post; label: string }[];
}

const SortableTablePage = ({ posts, columns }: Props) => {
  const handleReorder = (reorderedData: Post[]) => {
    console.log('Reordered Posts:', reorderedData);
  };

  return (
    <div>
      <SortableTable
        data={posts}
        columns={columns}
        onReorder={handleReorder}
      />
    </div>
  );
};

export default SortableTablePage;
