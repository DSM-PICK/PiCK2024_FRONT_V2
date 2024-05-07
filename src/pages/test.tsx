import { useState } from "react";
import styled, { ThemeProvider } from "styled-components";
import { theme } from "../styles/theme";

const Test = () => {
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setCurrentTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeProvider theme={currentTheme === "light" ? theme.light : theme.dark}>
      <Wrapper>
        <Button onClick={toggleTheme}>
          {currentTheme === "light"
            ? "Switch to Dark Mode"
            : "Switch to Light Mode"}
        </Button>
        <Content>qwer</Content>
      </Wrapper>
    </ThemeProvider>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.color.main[100]};
  color: ${(props) => props.theme.color.normal.white};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
`;

const Content = styled.div`
  color: ${(props) => props.theme.color.normal.black};
  background-color: ${(props) => props.theme.color.normal.white};
  padding: 20px;
  border-radius: 5px;
  font-size: ${(props) => props.theme.font.heading[1].size};
  letter-spacing: ${(props) => props.theme.font.heading[1].letterSpacing};
`;

export default Test;
