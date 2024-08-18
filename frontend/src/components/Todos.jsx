import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  InputGroup,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalOverlay,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

const TodosContext = React.createContext({
  todos: [],
  fetchTodos: () => {},
});

//Post route function

const AddTodo = () => {
  const [item, setItem] = useState("");
  const { todos, fetchTodos } = React.useContext(TodosContext);

  const handleInput = (e) => {
    setItem(e.target.value);
  };
  const handleSubmit = (e) => {
    const newTodos = {
      id: todos.length + 1,
      item: item,
    };
    fetch("http://localhost:8000/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTodos),
    }).then(fetchTodos);
  };
  return (
    <form onSubmit={handleSubmit}>
      <InputGroup size="md">
        <Input
          pr="4.5rem"
          type="text"
          placeholder="Add a todo item"
          aria-label="Add a todo item"
          onChange={handleInput}
        />
      </InputGroup>
    </form>
  );
};

//Update todo

//Todo helper functionfor renderingtodos

const TodoHelper = ({ item, id, fetchTodos }) => {
  return (
    <Box p={1} shadow="sm">
      <Flex justify="space-between">
        <Text mt={4} as="div">
          {item}
          <Flex align="end">
            <UpdateTodo item={item} id={id} fetchTodos={fetchTodos} />
            <DeleteTodo id={id} fetchTodos={fetchTodos} />
          </Flex>
        </Text>
      </Flex>
    </Box>
  );
};

//Update todos

const UpdateTodo = ({ id, item }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [todo, setTodos] = useState();
  const { fetchTodos } = React.useContext(TodosContext);

  const updateTodo = async () => {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ item: todo }),
    });
    onClose();
    await fetchTodos();
  };
  return (
    <>
      <Button
        h="2rem"
        fontSize="1rem"
        fontWeight="bold"
        colorScheme="twitter"
        borderRadius="10px"
        _hover={{ bg: "facebook.500" }}
        size="sm"
        onClick={onOpen}
      >
        Update Todo
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update todos</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <InputGroup>
              <Input
                pr="4.5rem"
                type="text"
                placeholder="update a todo item"
                aria-label="Update a todo item"
                value={todo}
                onChange={(e) => setTodos(e.target.value)}
              />
            </InputGroup>
            <ModalFooter>
              <Button
                h="2rem"
                fontSize="1rem"
                fontWeight="bold"
                borderRadius="10px"
                boxShadow="md"
                _hover={{
                  bg: "facebook.500",
                }}
                size="sm"
                onClick={updateTodo}
              >
                Update Todo
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

//Delete Route
const DeleteTodo = ({ id }) => {
  const { fetchTodos } = React.useContext(TodosContext);

  const deleteTodo = async () => {
    await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: { id: id },
    });
    await fetchTodos();
  };

  return (
    <Button
      h="2rem"
      fontSize="1rem"
      fontWeight="bold"
      colorScheme="yellow"
      borderRadius="10px"
      boxShadow="md"
      _hover={{ bg: "red.500" }}
      onClick={deleteTodo}
    >
      Delete Button
    </Button>
  );
};

const Todos = () => {
  const [todos, setTodos] = useState([]);
  const fetchTodos = async () => {
    const response = await fetch("http://localhost:8000/todos");
    const todos = await response.json();
    setTodos(todos.data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <TodosContext.Provider value={{ todos, fetchTodos }}>
      <AddTodo />
      <Stack spacing={5}>
        {todos.map((todo) => (
          //   <b key={todos.id}>{todo.item}</b>
          <TodoHelper item={todo.item} id={todo.id} fetchTodos={fetchTodos}>
            {fetchTodos}
          </TodoHelper>
        ))}
      </Stack>
    </TodosContext.Provider>
  );
};
export default Todos;
