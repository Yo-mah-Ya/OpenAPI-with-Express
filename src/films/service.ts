import type { operations } from "../types";
import { data } from "./test-data";
import { cursorPaginationResponse } from "../pagination";

export const getFilms = (
    query: operations["films"]["parameters"]["query"]
): operations["films"]["responses"]["200"]["content"]["application/json"] => {
    const film = data.find((d) => d.id === query.cursor);
    const films =
        query.direction === "asc"
            ? data.slice(film ? Number(film.id) : 0, query.length)
            : data
                  .slice()
                  .reverse()
                  .slice(film ? Number(film.id) : 0, query.length);

    return {
        pageInfo: cursorPaginationResponse(query, films, "id"),
        totalCount: data.length,
        items: films,
    };
};

export const getFilm = (
    id: operations["film"]["parameters"]["path"]["id"]
):
    | operations["film"]["responses"]["200"]["content"]["application/json"]
    | undefined => {
    return data.find((d) => d.id === id);
};
