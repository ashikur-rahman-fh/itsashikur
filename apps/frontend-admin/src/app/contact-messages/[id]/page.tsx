import { ContactMessageDetailPage } from '../ContactMessageDetailPage';

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: PageProps) {
  const { id } = await params;
  return <ContactMessageDetailPage key={id} messageId={id} />;
}
