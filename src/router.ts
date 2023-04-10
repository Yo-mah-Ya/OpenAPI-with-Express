import { Router } from "express";
import { ServiceContext } from "./service";
import { setRouter as setFilmsRouter } from "./films/controller";
import { setRouter as setPeopleRouter } from "./people/controller";

export const createRouter = (context: ServiceContext): Router => {
    const router = Router();
    context;
    setFilmsRouter(router, context);
    setPeopleRouter(router, context);
    return router;
};
