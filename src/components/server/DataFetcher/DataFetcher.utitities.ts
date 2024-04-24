import { ValuesOf } from "@/types";
import { SORTING_ORDER } from "./DataFetcher.constants";

const fetchQuestion = async (
    sorting: ValuesOf<typeof SORTING_ORDER> = SORTING_ORDER.ASCENDING,
    page: `${number}` = '1',
) => {
    const baseUrl = process.env.STACKOVERFLOW_QUESTION_BASE_API;
    const response = await fetch(`${baseUrl}&pagesize=10&sort=creation&order=${sorting}&page=${page}`);
    const data = await response.json();

    return data
}

export { fetchQuestion }