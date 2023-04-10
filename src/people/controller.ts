import type { Router, NextFunction } from "express";
import type { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import type { ServiceContext } from "../service";
import type { operations } from "../types";
import { getPeople, getPerson } from "./service";

export const paths: OpenAPIV3.PathsObject = {
    "/people": {
        get: {
            operationId: "people",
            parameters: [
                {
                    $ref: "#/components/parameters/length",
                },
                {
                    $ref: "#/components/parameters/cursor",
                },
                {
                    $ref: "#/components/parameters/direction",
                },
            ],
            responses: {
                "200": {
                    description: "people response",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/People",
                            },
                        },
                    },
                },
            },
        },
    },
    "/people/{id}": {
        get: {
            operationId: "person",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of people",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            responses: {
                "200": {
                    description: "person",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Person",
                            },
                        },
                    },
                },
                "404": {
                    description: "Not Found",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/NotFound",
                            },
                        },
                    },
                },
            },
        },
    },
};

export const components: OpenAPIV3.ComponentsObject = {
    schemas: {
        People: {
            allOf: [
                { $ref: "#/components/schemas/CursorPaginationResponse" },
                {
                    description: "AllPeople",
                    type: "object",
                    required: ["items"],
                    properties: {
                        items: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Person",
                            },
                        },
                    },
                },
            ],
        },
        Person: {
            description: "Person",
            type: "object",
            required: ["id", "name"],
            properties: {
                id: { type: "string" },
                name: { type: "string" },
                height: { type: "number" },
                mass: { type: "number" },
                hair_color: { type: "array", items: { type: "string" } },
                skin_color: { type: "array", items: { type: "string" } },
                eye_color: { type: "array", items: { type: "string" } },
                birth_year: { type: "string" },
                gender: { type: "string" },
                homeworld: { type: "string" },
                films: { type: "array", items: { type: "string" } },
                vehicles: { type: "array", items: { type: "string" } },
                starships: { type: "array", items: { type: "string" } },
                created: { type: "string" },
                edited: { type: "string" },
            },
        },
    },
};

export const setRouter = (router: Router, context: ServiceContext): void => {
    router.get<
        never,
        operations["people"]["responses"]["200"]["content"]["application/json"],
        never,
        operations["people"]["parameters"]["query"]
    >("/people", (req, res, next: NextFunction): void => {
        (async (): Promise<void> => {
            res.status(200).json(await getPeople(req.query));
        })().catch(next);
    });
    router.get<
        operations["person"]["parameters"]["path"],
        | operations["person"]["responses"]["200"]["content"]["application/json"]
        | operations["person"]["responses"]["404"]["content"]["application/json"]
    >("/people/:id", (req, res, next: NextFunction): void => {
        (async (): Promise<void> => {
            context;
            const response = await getPerson(req.params.id);
            response
                ? res.status(200).json(response)
                : res.status(404).json({ message: "Not Found" });
        })().catch(next);
    });
};
