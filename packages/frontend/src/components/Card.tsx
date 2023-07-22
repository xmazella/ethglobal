import React from "react";
import { styled } from "styled-components";
import { Column } from "./Tools";

export const CardContainer = styled(Column)`
  min-height: 200px;
  width: 100%;
  background: #b9b9b9;
`;

const Title = styled.div`
  color: var(--text-icons, #bcf8f4);
  font-family: Orbitron;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.2px;
`;

type CardProps = {
  title?: string;
  children: JSX.Element;
};

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <CardContainer>
      {title && <Title>{title}</Title>}
      {children}
    </CardContainer>
  );
};

export default Card;
