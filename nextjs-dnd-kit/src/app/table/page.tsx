import SortableTablePage from '@/components/views/table/SortableTablePage';
import TablePage from '@/components/views/table/TablePage';
import { Post } from '@/types/products';

const columns: { key: keyof Post; label: string }[] = [
  { key: 'id', label: 'ID' },
  { key: 'title', label: 'Title' },
  { key: 'userId', label: 'User ID' },
  { key: 'body', label: 'Body' },
];

export default async function Page() {
  const response = await fetch(
    'https://jsonplaceholder.typicode.com/posts?_limit=5'
  );
  const data: Post[] = await response.json();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Table</h2>
      <TablePage
        posts={data}
        columns={columns}
      />

      <br />
      <hr />
      <br />

      <h2 className="text-2xl font-bold mb-4">Sortable Table</h2>
      <SortableTablePage
        posts={data}
        columns={columns}
      />
    </div>
  );
}
