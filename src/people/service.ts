import type { operations } from "../types";
import { data } from "./test-data";
import { cursorPaginationResponse } from "../pagination";

const reorder = (
    list: typeof data,
    direction: operations["people"]["parameters"]["query"]["direction"]
): typeof data => (direction === "asc" ? list : list.slice().reverse());

export const getPeople = async (
    query: operations["people"]["parameters"]["query"]
): Promise<
    operations["people"]["responses"]["200"]["content"]["application/json"]
> => {
    const reorderData = reorder(data, query.direction);
    const personIndex = reorderData.findIndex((d) => d.id === query.cursor);
    const startIndex = personIndex === -1 ? 0 : personIndex + 1;
    const people = reorderData.slice(startIndex, startIndex + query.length);

    return {
        pageInfo: cursorPaginationResponse(query, people, "id"),
        totalCount: reorderData.length,
        items: people,
    };
};

export const getPerson = async (
    id: operations["person"]["parameters"]["path"]["id"]
): Promise<
    | operations["person"]["responses"]["200"]["content"]["application/json"]
    | undefined
> => {
    return data.find((d) => d.id === id);
};
