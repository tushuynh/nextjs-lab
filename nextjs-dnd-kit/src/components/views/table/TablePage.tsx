'use client';

import React from 'react';
import { Post } from '@/types/products';
import BaseTable from '@/components/ui/table/BaseTable';

interface Props {
  posts: Post[];
  columns: { key: keyof Post; label: string }[];
}

const TablePage = ({ posts, columns }: Props) => {
  return (
    <div>
      <BaseTable
        data={posts}
        columns={columns}
      />
    </div>
  );
};

export default TablePage;
