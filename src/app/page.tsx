import type { Data } from '@/lib/types';
import { createTree } from '@/lib';
import DirectoryTree from '@/components/DirectoryTree';

async function getData() {
  const res = await fetch('http://localhost:3000/services/api', {
    method: 'GET',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function Home() {
  const data: Data = await getData();

  const { services } = data;
  const tree = createTree(services);

  return (
    <main className='m-1'>
      <DirectoryTree tree={tree} />
    </main>
  );
}
