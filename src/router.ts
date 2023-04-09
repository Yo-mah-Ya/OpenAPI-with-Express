import { Router } from "express";
import { ServiceContext } from "./service";
import { setRouter as setFilmsRouter } from "./films/controller";
// import { setRouter as setCountryRouter } from "./country/controller";
// import { setRouter as setCountryLanguageRouter } from "./country-language/controller";

export const createRouter = (context: ServiceContext): Router => {
    const router = Router();
    context;
    setFilmsRouter(router, context);
    // setCountryRouter(router, context);
    // setCountryLanguageRouter(router, context);
    return router;
};
