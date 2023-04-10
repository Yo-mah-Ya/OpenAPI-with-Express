import type { Router, NextFunction } from "express";
import type { OpenAPIV3 } from "express-openapi-validator/dist/framework/types";
import type { ServiceContext } from "../service";
import type { operations } from "../types";
import { getFilms, getFilm } from "./service";

export const paths: OpenAPIV3.PathsObject = {
    "/films": {
        get: {
            operationId: "films",
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
                    description: "films response",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Films",
                            },
                        },
                    },
                },
            },
        },
    },
    "/films/{id}": {
        get: {
            operationId: "film",
            parameters: [
                {
                    name: "id",
                    in: "path",
                    description: "ID of films",
                    required: true,
                    schema: { type: "string" },
                },
            ],
            responses: {
                "200": {
                    description: "film",
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/Film",
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
        Films: {
            allOf: [
                { $ref: "#/components/schemas/CursorPaginationResponse" },
                {
                    description: "AllFilms",
                    type: "object",
                    required: ["items"],
                    properties: {
                        items: {
                            type: "array",
                            items: {
                                $ref: "#/components/schemas/Film",
                            },
                        },
                    },
                },
            ],
        },
        Film: {
            description: "Film",
            type: "object",
            required: ["id", "title", "episode_id", "opening_crawl"],
            properties: {
                id: { type: "string" },
                title: { type: "string" },
                episode_id: { type: "number" },
                opening_crawl: { type: "string" },
                director: { type: "string" },
                producer: { type: "array", items: { type: "string" } },
                release_date: { type: "string", format: "date" },
                characters: { type: "array", items: { type: "string" } },
                planets: { type: "array", items: { type: "string" } },
                starships: { type: "array", items: { type: "string" } },
                vehicles: { type: "array", items: { type: "string" } },
                species: { type: "array", items: { type: "string" } },
                created: { type: "string" },
                edited: { type: "string" },
            },
        },
    },
};

export const setRouter = (router: Router, context: ServiceContext): void => {
    router.get<
        never,
        operations["films"]["responses"]["200"]["content"]["application/json"],
        never,
        operations["films"]["parameters"]["query"]
    >("/films", (req, res, next: NextFunction): void => {
        (async (): Promise<void> => {
            res.status(200).json(getFilms(req.query));
        })().catch(next);
    });
    router.get<
        operations["film"]["parameters"]["path"],
        | operations["film"]["responses"]["200"]["content"]["application/json"]
        | operations["film"]["responses"]["404"]["content"]["application/json"]
    >("/films/:id", (req, res, next: NextFunction): void => {
        (async (): Promise<void> => {
            context;
            const response = getFilm(req.params.id);
            response
                ? res.status(200).json(response)
                : res.status(404).json({ message: "Not Found" });
        })().catch(next);
    });
};
