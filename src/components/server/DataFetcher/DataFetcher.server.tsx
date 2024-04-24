import { List } from "@/components/List";
import React from "react";
import { fetchQuestion } from "./DataFetcher.utitities";
import { SORTING_ORDER } from "./DataFetcher.constants";
import { MaybyWithSearchParams } from "@/types";

const DataFetcher = async ({
  searchParams,
}: {
  searchParams: MaybyWithSearchParams;
}) => {
  const data = await fetchQuestion(
    searchParams?.order ?? SORTING_ORDER.ASCENDING,
    searchParams?.page ?? "1"
  );

  return <List data={data} />;
};

export { DataFetcher };
