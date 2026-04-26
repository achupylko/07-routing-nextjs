import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type Props = {
  params: Promise<{ tag: string }>;
};

export default async function Notes({ params }: Props) {
  const { tag } = await params;
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', ''],
    queryFn: () => fetchNotes('', '', 1),
  });

  return (
    <>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotesClient tagQuery={tag} />
      </HydrationBoundary>
    </>
  );
}
