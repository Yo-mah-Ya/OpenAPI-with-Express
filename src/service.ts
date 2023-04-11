import express, { Express, Response, NextFunction, ErrorRequestHandler } from "express";
import compression from "compression";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import { Logger } from "./utils";
import { createRouter } from "./router";
import { openApiValidator, schema } from "./openapi";
import type { components } from "./types";

const hasKey = (
    error: object
): error is {
    status: unknown;
    path: unknown;
    headers: unknown;
    errors: unknown;
} =>
    Object.prototype.hasOwnProperty.call(error, "status") &&
    Object.prototype.hasOwnProperty.call(error, "path") &&
    Object.prototype.hasOwnProperty.call(error, "headers") &&
    Object.prototype.hasOwnProperty.call(error, "errors");

const isApiError = (error: unknown): error is Error & { status: number; path: string } =>
    error instanceof Error &&
    hasKey(error) &&
    typeof error.status === "number" &&
    typeof error.path === "string";

const errorHandler: ErrorRequestHandler<unknown, components["schemas"]["Error"]> = (
    error: unknown,
    req,
    res: Response,
    next: NextFunction
) => {
    if (res.headersSent) return next(error);

    if (isApiError(error)) {
        Logger.warn({
            message: error.message,
            status: error.status,
            path: error.path,
            param: req.params,
            callSite: {
                function: errorHandler.name,
            },
            error,
        });
        if (error.status === 400) {
            res.status(error.status).json({ message: "Bad Request" });
            return;
        }
        res.status(error.status).json({ message: error.message });
        return;
    }
    res.status(500).json({ message: "INTERNAL SERVER ERROR" });
    return;
};

export const getExpressApp = (serviceContext: ServiceContext): Express => {
    const app = express();
    app.use(compression())
        .use(helmet())
        .use(express.urlencoded({ extended: true }))
        .use(express.json())
        .use("/api-docs", swaggerUi.serve, swaggerUi.setup(schema));
    app.get("/health", (_, res) => {
        res.status(200).send("OK");
    }).get("/schema-json", (_, res) => {
        res.status(200).json(schema);
    });
    app.use(openApiValidator).use(createRouter(serviceContext)).use(errorHandler);
    return app;
};

export type ServiceContext = Record<string, never>;
export const createServiceContext = (): ServiceContext => {
    return {};
};

export const startService = (): void => {
    const app = getExpressApp(createServiceContext());
    const port = 3000;
    const server = app.listen(port, () => {
        Logger.info({
            message: `Express Server Start. Listening to port ${port}`,
        });
    });
    server.keepAliveTimeout = 0;
};
