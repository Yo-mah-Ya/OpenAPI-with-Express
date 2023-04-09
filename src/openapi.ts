import deepmerge from "deepmerge";
import * as OpenApiValidator from "express-openapi-validator";
import type { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import {
    components as filmsComponents,
    paths as filmsPaths,
} from "./films/controller";
// import {
//     components as countryComponents,
//     paths as countryPaths,
// } from "./country/controller";
// import {
//     components as countryLanguageComponents,
//     paths as countryLanguagePaths,
// } from "./country-language/controller";

const commonComponents: OpenAPIV3.ComponentsObject = {
    parameters: {
        CursorPaginationFirst: {
            name: "first",
            in: "query",
            description: "list length to fetch",
            required: true,
            schema: { type: "integer", minimum: 1 },
        },
        CursorPaginationAfter: {
            name: "after",
            in: "query",
            description: "start cursor to fetch",
            required: true,
            schema: { type: "string" },
        },
        CursorPaginationLast: {
            name: "last",
            in: "query",
            description: "list length to fetch",
            required: true,
            schema: { type: "integer", minimum: 1 },
        },
        CursorPaginationBefore: {
            name: "before",
            in: "query",
            description: "end cursor to fetch",
            required: true,
            schema: { type: "string" },
        },
    },
    schemas: {
        Error: {
            description: "Error",
            type: "object",
            required: ["message"],
            properties: { message: { type: "string" } },
        },
        NotFound: {
            description: "Not Found",
            type: "object",
            required: ["message"],
            properties: { message: { type: "string", enum: ["Not Found"] } },
        },
        CursorPagination: {
            oneOf: [
                {
                    $ref: "#/components/schemas/CursorPaginationFirst",
                },
                {
                    $ref: "#/components/schemas/CursorPaginationForward",
                },
                {
                    $ref: "#/components/schemas/CursorPaginationBackward",
                },
            ],
        },
        CursorPaginationFirst: {
            allOf: [
                {
                    $ref: "#/components/parameters/CursorPaginationFirst",
                },
            ],
        },
        CursorPaginationForward: {
            allOf: [
                {
                    $ref: "#/components/parameters/CursorPaginationFirst",
                },
                {
                    $ref: "#/components/parameters/CursorPaginationAfter",
                },
            ],
        },
        CursorPaginationBackward: {
            allOf: [
                {
                    $ref: "#/components/parameters/CursorPaginationLast",
                },
                {
                    $ref: "#/components/parameters/CursorPaginationBefore",
                },
            ],
        },
    },
    responses: {
        Unauthorized: {
            description: "Unauthorized",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/Error",
                    },
                },
            },
        },
    },
};

const paths = deepmerge.all<OpenAPIV3.PathsObject>([
    filmsPaths,
    // countryPaths,
    // countryLanguagePaths,
]);
const components = deepmerge.all<OpenAPIV3.ComponentsObject>([
    commonComponents,
    filmsComponents,
    // countryComponents,
    // countryLanguageComponents,
]);
export const schema: OpenAPIV3.Document = {
    openapi: "3.0.9",
    info: {
        title: "backend api",
        version: "v1",
    },
    paths: paths,
    components: components,
};

export const openApiValidator = OpenApiValidator.middleware({
    apiSpec: schema,
    validateRequests: true,
    validateResponses: true,
});
