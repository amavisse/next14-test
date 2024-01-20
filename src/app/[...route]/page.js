import { getPage } from "@/lib/storyblock";

export default async function Page({ params: { route } }) {
  const joinedRoute = route?.join("/");

  const page = await getPage({ route: joinedRoute });
  const pageInfo = page?.content?.page_information?.[0];

  const { title } = pageInfo;
  return (
    <main className="min-h-[50vh] flex flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">{title}</h1>
    </main>
  );
}
