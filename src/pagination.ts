import type { components } from "./types";

type Items<T, K extends keyof T> = T & { [x in K]: string };
const responseCursor = <T extends Record<string, unknown>, K extends keyof T>(
    items: Items<T, K>[],
    cursorName: K
): Pick<
    components["schemas"]["CursorPaginationResponse"]["pageInfo"],
    "startCursor" | "endCursor"
> => ({
    startCursor: items[0]?.[cursorName],
    endCursor: items[items.length - 1]?.[cursorName],
});

export const cursorPaginationResponse = <
    T extends Record<string, unknown>,
    K extends keyof T
>(
    param: {
        length: components["parameters"]["length"];
        cursor?: components["parameters"]["cursor"];
        direction: components["parameters"]["direction"];
    },
    items: Items<T, K>[],
    cursorName: K
): components["schemas"]["CursorPaginationResponse"]["pageInfo"] => {
    if (param.direction === "asc") {
        return {
            hasPreviousPage: param.cursor != undefined,
            hasNextPage: param.length <= items.length,
            ...responseCursor(items, cursorName),
        };
    } else {
        return {
            hasPreviousPage: param.length <= items.length,
            hasNextPage: true,
            ...responseCursor(items, cursorName),
        };
    }
};
