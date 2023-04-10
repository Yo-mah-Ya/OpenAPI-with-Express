import { getExpressApp, ServiceContext } from "../service";
import supertest from "supertest";

const app = getExpressApp({} as ServiceContext);

describe("getPeople", () => {
    test("first", async () => {
        const response = await supertest(app)
            .get("/people")
            .query({ length: 3, direction: "asc" });
        expect(response.body).toStrictEqual({
            pageInfo: {
                hasPreviousPage: false,
                hasNextPage: true,
                startCursor: "1",
                endCursor: "3",
            },
            totalCount: 82,
            items: [
                {
                    id: "1",
                    name: "Luke Skywalker",
                    height: 172,
                    mass: 77,
                    hair_color: ["blond"],
                    skin_color: ["fair"],
                    eye_color: ["blue"],
                    birth_year: "19BBY",
                    gender: "male",
                    homeworld: "1",
                    films: ["1", "2", "3", "6"],
                    vehicles: ["14", "30"],
                    starships: ["12", "22"],
                    created: "2014-12-09T13:50:51.644000Z",
                    edited: "2014-12-20T21:17:56.891000Z",
                },
                {
                    id: "2",
                    name: "C-3PO",
                    height: 167,
                    mass: 75,
                    hair_color: [],
                    skin_color: ["gold"],
                    eye_color: ["yellow"],
                    birth_year: "112BBY",
                    gender: "n/a",
                    homeworld: "1",
                    films: ["1", "2", "3", "4", "5", "6"],
                    species: "2",
                    vehicles: [],
                    starships: [],
                    created: "2014-12-10T15:10:51.357000Z",
                    edited: "2014-12-20T21:17:50.309000Z",
                },
                {
                    id: "3",
                    name: "R2-D2",
                    height: 96,
                    mass: 32,
                    hair_color: [],
                    skin_color: ["white", "blue"],
                    eye_color: ["red"],
                    birth_year: "33BBY",
                    gender: "n/a",
                    homeworld: "8",
                    films: ["1", "2", "3", "4", "5", "6"],
                    species: "2",
                    vehicles: [],
                    starships: [],
                    created: "2014-12-10T15:11:50.376000Z",
                    edited: "2014-12-20T21:17:50.311000Z",
                },
            ],
        });
    });
    test("forward", async () => {
        const response = await supertest(app)
            .get("/people")
            .query({ length: 3, cursor: "1", direction: "asc" });
        expect(response.body).toStrictEqual({
            pageInfo: {
                hasPreviousPage: true,
                hasNextPage: true,
                startCursor: "2",
                endCursor: "4",
            },
            totalCount: 82,
            items: [
                {
                    id: "2",
                    name: "C-3PO",
                    height: 167,
                    mass: 75,
                    hair_color: [],
                    skin_color: ["gold"],
                    eye_color: ["yellow"],
                    birth_year: "112BBY",
                    gender: "n/a",
                    homeworld: "1",
                    films: ["1", "2", "3", "4", "5", "6"],
                    species: "2",
                    vehicles: [],
                    starships: [],
                    created: "2014-12-10T15:10:51.357000Z",
                    edited: "2014-12-20T21:17:50.309000Z",
                },
                {
                    id: "3",
                    name: "R2-D2",
                    height: 96,
                    mass: 32,
                    hair_color: [],
                    skin_color: ["white", "blue"],
                    eye_color: ["red"],
                    birth_year: "33BBY",
                    gender: "n/a",
                    homeworld: "8",
                    films: ["1", "2", "3", "4", "5", "6"],
                    species: "2",
                    vehicles: [],
                    starships: [],
                    created: "2014-12-10T15:11:50.376000Z",
                    edited: "2014-12-20T21:17:50.311000Z",
                },
                {
                    id: "4",
                    name: "Darth Vader",
                    height: 202,
                    mass: 136,
                    hair_color: ["none"],
                    skin_color: ["white"],
                    eye_color: ["yellow"],
                    birth_year: "41.9BBY",
                    gender: "male",
                    homeworld: "1",
                    films: ["1", "2", "3", "6"],
                    vehicles: [],
                    starships: ["13"],
                    created: "2014-12-10T15:18:20.704000Z",
                    edited: "2014-12-20T21:17:50.313000Z",
                },
            ],
        });
    });
    test("forward and less than expected", async () => {
        const response = await supertest(app)
            .get("/people")
            .query({ length: 3, cursor: "81", direction: "asc" });
        expect(response.body).toStrictEqual({
            pageInfo: {
                hasPreviousPage: true,
                hasNextPage: false,
                startCursor: "82",
                endCursor: "83",
            },
            totalCount: 82,
            items: [
                {
                    id: "82",
                    name: "Sly Moore",
                    height: 178,
                    mass: 48,
                    hair_color: ["none"],
                    skin_color: ["pale"],
                    eye_color: ["white"],
                    birth_year: "unknown",
                    gender: "female",
                    homeworld: "60",
                    films: ["5", "6"],
                    vehicles: [],
                    starships: [],
                    created: "2014-12-20T20:18:37.619000Z",
                    edited: "2014-12-20T21:17:50.496000Z",
                },
                {
                    id: "83",
                    name: "Tion Medon",
                    height: 206,
                    mass: 80,
                    hair_color: ["none"],
                    skin_color: ["grey"],
                    eye_color: ["black"],
                    birth_year: "unknown",
                    gender: "male",
                    homeworld: "12",
                    films: ["6"],
                    species: "37",
                    vehicles: [],
                    starships: [],
                    created: "2014-12-20T20:35:04.260000Z",
                    edited: "2014-12-20T21:17:50.498000Z",
                },
            ],
        });
    });
    test("backward", async () => {
        const response = await supertest(app)
            .get("/people")
            .query({ length: 3, cursor: "83", direction: "desc" });
        expect(response.body).toStrictEqual({
            pageInfo: {
                hasPreviousPage: true,
                hasNextPage: true,
                startCursor: "82",
                endCursor: "80",
            },
            totalCount: 82,
            items: [
                {
                    id: "82",
                    name: "Sly Moore",
                    height: 178,
                    mass: 48,
                    hair_color: ["none"],
                    skin_color: ["pale"],
                    eye_color: ["white"],
                    birth_year: "unknown",
                    gender: "female",
                    homeworld: "60",
                    films: ["5", "6"],
                    vehicles: [],
                    starships: [],
                    created: "2014-12-20T20:18:37.619000Z",
                    edited: "2014-12-20T21:17:50.496000Z",
                },
                {
                    id: "81",
                    name: "Raymus Antilles",
                    height: 188,
                    mass: 79,
                    hair_color: ["brown"],
                    skin_color: ["light"],
                    eye_color: ["brown"],
                    birth_year: "unknown",
                    gender: "male",
                    homeworld: "2",
                    films: ["1", "6"],
                    vehicles: [],
                    starships: [],
                    created: "2014-12-20T19:49:35.583000Z",
                    edited: "2014-12-20T21:17:50.493000Z",
                },
                {
                    id: "80",
                    name: "Tarfful",
                    height: 234,
                    mass: 136,
                    hair_color: ["brown"],
                    skin_color: ["brown"],
                    eye_color: ["blue"],
                    birth_year: "unknown",
                    gender: "male",
                    homeworld: "14",
                    films: ["6"],
                    species: "3",
                    vehicles: [],
                    starships: [],
                    created: "2014-12-20T19:46:34.209000Z",
                    edited: "2014-12-20T21:17:50.491000Z",
                },
            ],
        });
    });
});
