from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

#define cors origins

origins = ["http://localhost:3000","localhost:3000"]


app.add_middleware(CORSMiddleware, 
               allow_origins = origins,
               allow_credentials = True,
               allow_methods = ["*"],
               allow_headers=["*"],)


#GET Route

@app.get('/', tags=["root"])
async def read_root()-> dict:
    return{"message": "Welcome to Fasst API!"}



todos = [
    {
        "id":"1",
        "item":"Read a book"
    },
    {
       "id":"2",
        "item":"Shopping"
    },
    {
       "id":"3",
        "item":"Work Out"
    },
    {
        "id":"4",
        "item":"Cook dinner"
    },
]

#GET todos route 

@app.get('/todos', tags=["todos"])
async def get_todos()-> dict:
    return {"data": todos}


@app.post('/todos', tags=["todos"])
async def add_todos(todo:dict)-> dict:
    todos.append(todo)
    return {"data": {"Todos has been added"}}

#Put Route
@app.put("/todos/{id}",tags=["todos"])
async def update_todos(id:int,body:dict)-> dict:
    for todo in todos:
        if int(todo["id"]) == id:
            todo["item"] = body["item"]
            return {"data": f"Todo with id {id} has been updated"}
    return {"data": f"Todo with id {id} has not been found"}


#
#elete Route 
@app.delete("/todos/{id}",tags=["todos"])
async def delete_todos(id:int)-> dict:
    for todo in todos:
        if int(todo["id"]) == id:todos.remove(todo)
        return {"data": f"Todo with id{id} has been deleted"}
    return {"data": f"Todo with id{id} is not found"}