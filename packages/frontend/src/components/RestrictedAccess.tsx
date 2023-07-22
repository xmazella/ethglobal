import React from "react";
import styled from "styled-components";
import { Text } from "./Tools";
import locker from "../assets/svgs/locker.svg";

const Container = styled.div`
  display: flex;
  justify-items: center;
`;

const Access = styled.div`
  display: flex;
  width: 257px;
  padding: 16px 22px;
  align-items: center;
  margin-top: 20px;
  gap: 20px;
  flex-shrink: 0;
  background: #223938;
`;

const WrapperImg = styled.div`
  display: flex;
  padding: 4px;
  background: #152221;

  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const Title = styled(Text)`
  font-family: Prompt;
  font-size: 16px;
  font-weight: 700;
`;

const RestrictedAccess: React.FC = () => (
  <Container>
    <Access>
      <WrapperImg>
        <img src={locker} />
      </WrapperImg>
      <Title>Restricted access</Title>
    </Access>
  </Container>
);

export default RestrictedAccess;
