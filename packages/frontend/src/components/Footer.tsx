"use client";

import { styled } from "styled-components";
import footer from "../assets/svgs/footer.svg";
import { Row } from "./Tools";

const Container = styled.div`
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const Line = styled(Row)`
  position: absolute;
  left: -40px;
  bottom: 0;
`;

const Footer: React.FC<{}> = () => {
  return (
    <Container>
      <Line>
        <img src={footer} />
      </Line>
    </Container>
  );
};

export default Footer;
