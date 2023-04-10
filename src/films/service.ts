import type { operations } from "../types";
import { data } from "./test-data";
import { cursorPaginationResponse } from "../pagination";

const reorder = (
    list: typeof data,
    direction: operations["people"]["parameters"]["query"]["direction"]
): typeof data => (direction === "asc" ? list : list.slice().reverse());

export const getFilms = async (
    query: operations["films"]["parameters"]["query"]
): Promise<
    operations["films"]["responses"]["200"]["content"]["application/json"]
> => {
    const reorderData = reorder(data, query.direction);
    const filmIndex = reorderData.findIndex((d) => d.id === query.cursor);
    const startIndex = filmIndex === -1 ? 0 : filmIndex + 1;
    const films = reorderData.slice(startIndex, startIndex + query.length);

    return {
        pageInfo: cursorPaginationResponse(query, films, "id"),
        totalCount: reorderData.length,
        items: films,
    };
};

export const getFilm = async (
    id: operations["film"]["parameters"]["path"]["id"]
): Promise<
    | operations["film"]["responses"]["200"]["content"]["application/json"]
    | undefined
> => {
    return data.find((d) => d.id === id);
};
