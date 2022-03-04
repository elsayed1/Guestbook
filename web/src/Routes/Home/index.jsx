import React, { useEffect, useState, useLayoutEffect } from "react";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Grid from "../../components/Grid";
import Input from "../../components/Input";
import Typography from "../../components/Typography";
import {
  getMessages as getMessagesService,
  updateMessage as updateMessageService,
  createMessage as createMessageService,
  deleteMessage as deleteMessageService,
  addReplyMessage as addReplyMessageService,
} from "../..//services/messages";
import "./styles.css";
import { useNavigation } from "../../context/Navigation";

const Message = ({ message, canReply, setOpenReplyId, isSub, refetch }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const canUpdate = user._id === message.user._id;
  const [isEdit, setIsEdit] = useState(false);
  const [editedMessage, setEditedMessage] = useState(message.message || "");
  const [replyMessage, setReplyMessage] = useState("");

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEdit(true);
  };

  const stopEditing = () => {
    setIsEdit(false);
    setEditedMessage(message.message);
  };
  const updateMessage = async () => {
    try {
      const response = await updateMessageService({
        messageId: message._id,
        message: editedMessage,
      });
      setIsEdit(false);
      refetch();
    } catch (e) {
      console.log(e);
    }
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await deleteMessageService({ messageId: message._id });
      refetch();
    } catch (error) {
      console.log(error);
    }
  };

  const addReplyMessage = async () => {
    await addReplyMessageService({
      messageId: message._id,
      message: replyMessage,
    });
    setReplyMessage("");
    await refetch();
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Escape":
        return stopEditing();
      case "Enter":
        return updateMessage();
      default:
        return false;
    }
  };

  return (
    <div
      className="message"
      style={{
        marginLeft: isSub ? 25 : 0,
      }}
    >
      <Card
        variant="dark"
        onClick={() => setOpenReplyId(message._id)}
        style={{ padding: isSub ? "4px 8px" : undefined }}
      >
        <Grid justifyContent="space-between" space={4}>
          <Grid space={12}>
            <Typography>{message.user.username}:</Typography>
            {isEdit ? (
              <Input
                type="text"
                value={editedMessage}
                onChange={setEditedMessage}
                onKeyDown={handleKeyDown}
                style={{ width: "350px" }}
              />
            ) : (
              <Typography color="white">{message.message}</Typography>
            )}
          </Grid>
          {canUpdate && (
            <Grid space={8}>
              <Button onClick={handleEdit}>Edit</Button>
              <Button variant="primary" onClick={handleDelete}>
                Delete
              </Button>
            </Grid>
          )}
        </Grid>
      </Card>
      {canReply && !isSub && (
        <Input
          variant="standard"
          type="text"
          placeholder="reply"
          onChange={setReplyMessage}
          value={replyMessage}
          onKeyDown={({ key }) => key === "Enter" && addReplyMessage()}
        />
      )}
    </div>
  );
};

const MessagesList = ({ messages, refetch }) => {
  const [openReplyID, setOpenReplyId] = useState("");
  return (
    <div>
      {messages.map((message) => (
        <Card key={message._id}>
          <Message
            refetch={refetch}
            key={message._id}
            message={message}
            canReply={openReplyID === message._id}
            setOpenReplyId={setOpenReplyId}
          />
          {message.replies.map((message) => (
            <Message
              refetch={refetch}
              isSub
              key={message._id}
              message={message}
              setOpenReplyId={setOpenReplyId}
            />
          ))}
        </Card>
      ))}
    </div>
  );
};

const Home = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { navigate } = useNavigation();
  const user = JSON.parse(localStorage.getItem("user"));
  const getMessages = async () => {
    try {
      const response = await getMessagesService();
      setMessages(response);
    } catch (e) {}
  };

  useEffect(() => {
    getMessages();
  }, []);
  useLayoutEffect(() => {
    if (!user) navigate("/login");
  }, []);
  const createMessage = async () => {
    try {
      const createdMessage = await createMessageService(newMessage);
      setNewMessage("");
      await getMessages();
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case "Enter":
        return createMessage();
      default:
        return false;
    }
  };

  return (
    <>
      <Card
        variant="dark"
        style={{ maxHeight: "90vh", overflow: "scroll", width: "50vw" }}
      >
        <div>
          <MessagesList messages={messages} refetch={getMessages} />
        </div>
      </Card>
      <div className="compose-message">
        <Input
          value={newMessage}
          onChange={setNewMessage}
          type="text"
          placeholder="Write a message"
          variant="standard"
          onKeyDown={handleKeyDown}
        />
      </div>
    </>
  );
};

export default Home;
