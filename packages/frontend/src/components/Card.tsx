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
  border: 1px solid #b7fffa;
`;

const OverflowContainer = styled.div`
  overflow: scroll;
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

const Angle = styled.div<{
  trickscolor?: string;
}>`
  position: absolute;
  rotate: 45deg;
  background: ${(props) => props.trickscolor};

  width: 39px;
  height: 36px;
  content: "";
`;

const TopAngle = styled(Angle)`
  top: -20px;
  left: -22px;
  border-right: 1px #b7fffa solid;
`;

const BottomAngle = styled(Angle)`
  bottom: -20px;
  right: -22px;
  border-left: 1px #b7fffa solid;
`;

type CardProps = {
  title?: string;
  tricksColorTop: string;
  tricksColorBottom: string;
  children: JSX.Element;
};

const Card: React.FC<CardProps> = ({
  children,
  title,
  tricksColorTop,
  tricksColorBottom,
}) => {
  return (
    <CardContainer>
      <TopAngle trickscolor={tricksColorTop} />
      <CustomRow>
        {title && <Title>{title}</Title>}
        <img src={graphicCardHeader} />
      </CustomRow>
      <OverflowContainer>{children}</OverflowContainer>
      <BottomAngle trickscolor={tricksColorBottom} />
    </CardContainer>
  );
};

export default Card;
