import React, { useRef, useState, useEffect, useContext } from 'react';
import { propTypes } from "react-bootstrap/esm/Image";
import { Container, HeaderContainer, ConversationContainer, ConversationList, Header, IconArea, InfoArea, ChattingContainer, BackBtn, AddChatRoom, PhotoArea, Preview, ReplyBtn, Username, Column } from "./styles";
import moment from "moment";
import Chat_Conv from "../Chat_Conv";
import { SocketContext } from '../../API/video'

const today = moment().format("MM-DD-YYYY");

const Data = [
  {
    id: 1,
    img: "",
    username: "Dr.Lee",
    preview: "Hi! I need more\ninformations...",
  }
];

export const Conversations = () => {
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
          <Chat_Conv/>
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
