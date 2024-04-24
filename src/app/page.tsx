import { DataFetcher } from "@/components/server/DataFetcher";

export default function Home({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>;
}) {
  return (
    <main className="flex w-screen min-h-screen flex-col justify-start items-center pt-16 pb-8 px-4">
      <section className="flex flex-col justify-between items-center gap-6 w-full text-xl">
        <h1 className="uppercase">Stack overflow question</h1>

        <DataFetcher searchParams={searchParams} />
      </section>
    </main>
  );
}
