import React from "react";
import { Heading, Flex, Divider } from "@chakra-ui/react";

const Headers = () => {
  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      paddingX="1rem"
      paddingY="1rem"
      bg="facebook.500"
      color="white"
      boxShadow="0px 2px 4pxrgba(0,0,0,0.2"
    >
      <Flex align="center" mr={5}>
        <Heading as="h2" size="lg" fontWeight="bold">
          Task Manager
        </Heading>
      </Flex>
    </Flex>
  );
};

export default Headers;
