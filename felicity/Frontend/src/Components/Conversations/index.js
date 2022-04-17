import React, { useRef, useState, useEffect } from 'react';
import { propTypes } from "react-bootstrap/esm/Image";
import { Container, HeaderContainer, ConversationContainer, ConversationList, ChattingContainer, BackBtn, Header, AddChatRoom, IconArea, InfoArea, PhotoArea, Preview, ReplyBtn, Username } from "./styles";
import Chat from "../Chat";

const Data = [
  {
    id: 1,
    img: "",
    username: "Dr.Lee",
    preview: "Hi! I need more\ninformations...",
  }
];

export const Conversations = ({ context }) => {
  const [isChatting, setIsChatting] = useState(false);
  
  const handleBtnClk = () => {
    setIsChatting(!isChatting);
  }
  
  return (
    <Container>
      <HeaderContainer>
        <Header>Conversations</Header>
        <AddChatRoom></AddChatRoom>
      </HeaderContainer>
      <ConversationList>
        {isChatting ? 
        <ChattingContainer>
          <Chat context={context}/>
          <BackBtn onClick={handleBtnClk}>Back</BackBtn>
        </ChattingContainer>
        : 
        Data.map((data) => (
          <ConversationContainer>
            <PhotoArea img = {data.img}/>
            <InfoArea>
              <Username>{data.username}</Username>
              <Preview>{data.preview}</Preview>
            </InfoArea>
            <IconArea>
              <ReplyBtn onClick={handleBtnClk}>REPLY</ReplyBtn>
            </IconArea>
          </ConversationContainer>
        ))}
      </ConversationList>

    </Container>
  );
};

export default Conversations;
