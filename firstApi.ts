import { Application, Router } from "https://deno.land/x/oak/mod.ts";

// File : model

interface Couse {
    name: string,
    price:number,
    certification:boolean
}

// File : data

let courses: Array<Couse> = [
    {
        name: "C++ Bootcamp",
        price: 2.4,
        certification: true
    },
    {
        name: "React Bootcamp",
        price: 2.2,
        certification: true
    },
    {
        name: "Redux Crash Course",
        price: 3.0,
        certification: false
    },
    {
        name: "Data Structures",
        price: 4.4,
        certification: true
    },
]

// File: Controllers

export const getCourses = ({response}:{response:any}) => {
    response.body = courses;
}

export const addCourses = async (
        {request, response} : {
            request:any, response:any
        }
    ) => {
    const body = await request.body();
    const course: Couse = body.value;
    courses.push(course);
    response.body = { courseAdded: "SUCCESS"};
    response.status = 200;
}

// File: server File
const router = new Router();
const app = new Application();
const PORT = 4300;

router
    .get("/learn", getCourses)
    .post("/create", addCourses)

app.use(router.routes());
app.use(router.allowedMethods());


await app.listen({port:PORT})