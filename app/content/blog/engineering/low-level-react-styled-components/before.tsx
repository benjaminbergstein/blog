import React from "react";
import styled from "styled-components";
import System from "./System";
import Text from "./Text";
import Box from "./Box";
import Card from "./Card";

const Container = styled.div`
  font-family: sans-serif;
  max-width: 640px;
  margin: 0 auto;
  height: 100%;
`;

export default function App() {
  return (
    <System>
      <Container>
        <Box
          bg="purples.0"
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          height="100%"
        >
          <Card bg="white">
            <Text as="h1" color="purples.2">
              Hello
            </Text>
            <Text as="h2" color="purples.1">
              Let's build a styled system!
            </Text>
          </Card>
        </Box>
      </Container>
    </System>
  );
}

