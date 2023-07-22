import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  display: flex;
  padding: 8px 20px;
  justify-content: center;
  align-items: center;
  border-radius: 1px;
  background-color: #b7fffa;
  color: #131d1d;
  font-size: 16px;
  border: none;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};

  outline: none;
  width: fit-content;
`;

type ButtonProps = {
  disabled?: boolean;
  onClick: () => void;
  children: JSX.Element;
};

const Button: React.FC<ButtonProps> = ({ disabled, onClick, children }) => (
  <StyledButton disabled={disabled} onClick={onClick}>
    {children}
  </StyledButton>
);

export default Button;
