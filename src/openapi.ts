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
        length: {
            name: "length",
            in: "query",
            description: "list length to fetch",
            required: true,
            schema: { type: "integer", minimum: 1 },
        },
        cursor: {
            name: "cursor",
            in: "query",
            description: "start cursor to fetch",
            required: true,
            schema: { type: "string" },
        },
        direction: {
            name: "direction",
            in: "query",
            description: "the direction of pagination",
            required: true,
            schema: { type: "string", enum: ["asc", "desc"] },
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
        CursorPaginationResponse: {
            description: "cursor pagination response",
            type: "object",
            required: ["pageInfo"],
            properties: {
                pageInfo: {
                    description: "Information to aid in pagination.",
                    type: "object",
                    required: ["hasPreviousPage", "hasNextPage"],
                    properties: {
                        endCursor: { type: "string" },
                        hasNextPage: { type: "boolean" },
                        hasPreviousPage: { type: "boolean" },
                        startCursor: { type: "string" },
                    },
                },
                totalCount: { type: "integer" },
                // items: {
                //     type: "array",
                //     items: {
                //         $ref: "#/components/schemas/Country",
                //     },
                // },
            },
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
