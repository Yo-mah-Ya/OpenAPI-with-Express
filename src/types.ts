/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */


export type paths = {
  "/films": {
    get: operations["films"];
  };
  "/films/{id}": {
    get: operations["film"];
  };
};

export type webhooks = Record<string, never>;

export type components = {
  schemas: {
    /** @description Error */
    readonly Error: {
      readonly message: string;
    };
    /** @description Not Found */
    readonly NotFound: {
      /** @enum {string} */
      readonly message: "Not Found";
    };
    readonly CursorPagination: components["schemas"]["CursorPaginationFirst"] | components["schemas"]["CursorPaginationForward"] | components["schemas"]["CursorPaginationBackward"];
    readonly CursorPaginationFirst: components["parameters"]["CursorPaginationFirst"];
    readonly CursorPaginationForward: components["parameters"]["CursorPaginationFirst"] & components["parameters"]["CursorPaginationAfter"];
    readonly CursorPaginationBackward: components["parameters"]["CursorPaginationLast"] & components["parameters"]["CursorPaginationBefore"];
    /** @description AllFilms */
    readonly AllFilms: readonly (components["schemas"]["Film"])[];
    /** @description Film */
    readonly Film: {
      readonly id: string;
      readonly title: string;
      readonly episode_id: number;
      readonly opening_crawl: string;
      readonly director?: string;
      readonly producer?: readonly (string)[];
      /** Format: date */
      readonly release_date?: string;
      readonly characters?: readonly (string)[];
      readonly planets?: readonly (string)[];
      readonly starships?: readonly (string)[];
      readonly vehicles?: readonly (string)[];
      readonly species?: readonly (string)[];
      readonly created?: string;
      readonly edited?: string;
    };
  };
  responses: {
    /** @description Unauthorized */
    readonly Unauthorized: {
      content: {
        readonly "application/json": components["schemas"]["Error"];
      };
    };
  };
  parameters: {
    /** @description list length to fetch */
    readonly CursorPaginationFirst: number;
    /** @description start cursor to fetch */
    readonly CursorPaginationAfter: string;
    /** @description list length to fetch */
    readonly CursorPaginationLast: number;
    /** @description end cursor to fetch */
    readonly CursorPaginationBefore: string;
  };
  requestBodies: never;
  headers: never;
  pathItems: never;
};

export type external = Record<string, never>;

export type operations = {

  films: {
    responses: {
      /** @description all films */
      200: {
        content: {
          readonly "application/json": components["schemas"]["AllFilms"];
        };
      };
    };
  };
  film: {
    parameters: {
      path: {
        /** @description ID of films */
        id: string;
      };
    };
    responses: {
      /** @description film */
      200: {
        content: {
          readonly "application/json": components["schemas"]["Film"];
        };
      };
      /** @description Not Found */
      404: {
        content: {
          readonly "application/json": components["schemas"]["NotFound"];
        };
      };
    };
  };
};
