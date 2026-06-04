import { redirect } from "next/navigation";

type EventDetailsRedirectProps = { params: Promise<{ id: string }> };

export default async function EventDetailsRedirect({ params }: EventDetailsRedirectProps) {
  const { id } = await params;
  redirect(`/admin/events/${id}/edit`);
}
