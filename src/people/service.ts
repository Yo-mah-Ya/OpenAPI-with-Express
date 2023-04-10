import type { operations } from "../types";
import { data } from "./test-data";
import { cursorPaginationResponse } from "../pagination";

export const getPeople = async (
    query: operations["people"]["parameters"]["query"]
): Promise<
    operations["people"]["responses"]["200"]["content"]["application/json"]
> => {
    const person = data.find((d) => d.id === query.cursor);
    const people =
        query.direction === "asc"
            ? data.slice(person ? Number(person.id) : 0, query.length)
            : data
                  .slice()
                  .reverse()
                  .slice(person ? Number(person.id) : 0, query.length);

    return {
        pageInfo: cursorPaginationResponse(query, people, "id"),
        totalCount: data.length,
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
