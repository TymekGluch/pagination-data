import { SORTING_ORDER } from "@/components/server/DataFetcher/DataFetcher.constants";
import { ValuesOf } from "./utilities";

export type MaybyWithSearchParams = Partial<{
    page: `${number}`;
    order: ValuesOf<typeof SORTING_ORDER>;
}> & Record<string, string | string[] | undefined>;
