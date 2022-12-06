import { Avatar } from "@mui/material";
import { collection, query, where, orderBy } from "firebase/firestore";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import styled from "styled-components";
import { auth, db } from "../firebase";
import getRecipientEmail from "../utils/getRecipientEmail";
import { H3, H4, P } from "./ChatScreen";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const [recipientSnapshot] = useCollection(
    query(collection(db, "users"), where("email", "==", recipientEmail))
  );
  const recipientUser = recipientSnapshot?.docs?.[0]?.data();
  const [messagesSnapshot] = useCollection(
    query(
      collection(db, `chats/${id}/messages`),
      orderBy("timestamp", "asc")
    )
  );
  
  const Messages = messagesSnapshot && messagesSnapshot?.docs?.map(item=>item.data());
  let LastMessages = Messages && Messages[Messages?.length -1];
  console.log("LastMessages", LastMessages)
  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Container onClick={enterChat}>
      {recipientUser ? (
        <UserAvatar src={recipientUser.photoURL} />
      ) : (
        <UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
      )}
      <MessagesInner>
      <H4>{recipientEmail}</H4>
      {LastMessages && <P>{LastMessages.message}</P>}
      </MessagesInner>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 10px 15px;
  word-break: break-word;

  :hover {
    background-color: #e9eaeb;
  }
`;
const MessagesInner = styled.div`
display: flex;
flex-direction:column;
align-items:baseline;
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
