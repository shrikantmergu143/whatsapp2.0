import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment";
import { auth, db } from "../firebase";
import messages_doublemark from "./../img/messages_doublemark.svg"
import {
  collection,
  doc,
  orderBy,
  query,
  Timestamp,
  addDoc,
  where,
  setDoc,
  updateDoc 
} from "firebase/firestore";

function Message({ user, message, router_id, id }) {
  const [userLoggedIn] = useAuthState(auth);
  const SeenMessages = () =>{
    if((!message.seen) && user !== userLoggedIn.email){
      const colRef = doc(db, `chats/${router_id}/messages/${id}`);
      setDoc(colRef, {
        seen:Timestamp.now(),
      },
      { merge: true });
    }
  }
  const TypeOfMessage = user === userLoggedIn.email ? Sender : Receiver;
  const MessagesType = user === userLoggedIn.email ? "Sender" : "Receiver";

  return (
    <Container>
      <div className={"MessagesInner " +MessagesType}>
      <TypeOfMessage className={"MessagesBox "}>
            {SeenMessages()}
            <p className={"text_messages"}>{message.message}</p>
            {/* <div className={"messages_status_div"}/> */}
            <div className={"messages_status"}>
                <span className={"timemessages"}>
                  {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
                </span>
              {user === userLoggedIn.email && (message?.delivered && (!message?.seen) )&&  <span className={"MessagesStatus Delivered"}/>}
              {user === userLoggedIn.email && (message?.seen && message?.delivered)&&  <span className={"MessagesStatus Delivered seen"}/>}
              {user === userLoggedIn.email && ((!message?.delivered) && (!message?.seen))&&  <span className={"MessagesStatus unRead"}/>}
            </div>
      </TypeOfMessage>
      </div>
    </Container>
  );
}

export default Message;

const Container = styled.div``;

const MessageElement = styled.div`
  width: fit-content;
  border-radius: 8px;
  position: relative;
  text-align: right;
`;

const Sender = styled(MessageElement)`
  background-color: #dcf8c6;
  padding: 15px 30px 30px 30px;
`;

const Receiver = styled(MessageElement)`
  text-align: left;
  background-color: whitesmoke;
`;

const Timestamp1 = styled.span`
  color: gray;
  font-size: 9px;
  position: absolute;
  bottom: 10px;
  text-align: right;
  right: 30px;
  width:100%
`;
