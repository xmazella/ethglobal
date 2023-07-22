import React from "react";
import { styled } from "styled-components";
import { Column, Row } from "./Tools";

import graphicCardHeader from "../assets/svgs/graphicCardHeader.svg";

export const CardContainer = styled(Column)`
  position: relative;
  min-height: 150px;
  max-height: 400px;
  width: calc(100% - 48px);
  padding: 20px 24px;
  background: linear-gradient(
    180deg,
    rgba(65, 100, 98, 0.5) 0%,
    rgba(106, 177, 173, 0.5) 100%
  );
  stroke-width: 1px;
  stroke: var(--text-icons, #b7fffa);
  overflow: scroll;
  border: 1px solid #b7fffa;
`;

const Title = styled.div`
  color: #bcf8f4;
  font-family: Orbitron;
  font-size: 24px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  letter-spacing: 1.2px;
`;

const CustomRow = styled(Row)`
  justify-content: space-between;
`;

type CardProps = {
  title?: string;
  children: JSX.Element;
};

const Card: React.FC<CardProps> = ({ children, title }) => {
  return (
    <CardContainer>
      <CustomRow>
        {title && <Title>{title}</Title>}
        <img src={graphicCardHeader} />
      </CustomRow>

      {children}
    </CardContainer>
  );
};

export default Card;
