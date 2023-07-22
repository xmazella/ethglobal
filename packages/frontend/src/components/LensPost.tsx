import { Column, createPost } from "./Tools";
import { styled } from "styled-components";
import { useState } from "react";
import Button from "./Button";

import imgLogo from "../assets/svgs/imgLogo.svg";
import documentLogo from "../assets/svgs/documentLogo.svg";
import gifLogo from "../assets/svgs/gifLogo.svg";

const Container = styled(Column)`
  margin-top: 20px;
  gap: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`;

const TextArea = styled.textarea`
  border: none;
  outline: none;
  box-shadow: none;
  background: transparent;
  height: 100px;
  padding: 12px 11px;

  border-radius: 1px;
  border: 1px solid #b7fffa;

  color: #b7fffa;
  font-family: Prompt;
  font-size: 14px;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
`;

const Options = styled.div`
  display: flex;
  gap: 24px;
`;

const LensPost: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [text, setText] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const onCreate = async () => {
    setIsLoading(true);
    await createPost("// TODO");
    setIsLoading(false);
  };

  if (isLoading) {
    return <Container>⏳</Container>;
  }

  return (
    <Container>
      <TextArea placeholder={"Message"} value={text} onChange={handleChange} />
      <Options>
        <img src={imgLogo} />
        <img src={documentLogo} />
        <img src={gifLogo} />
      </Options>
      <ButtonContainer>
        <Button onClick={onCreate}>
          <>Post</>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

export default LensPost;
