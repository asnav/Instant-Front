export type Chat = {
  userId: string;
  username: string;
  imageURI: string;
  messages: Array<Message>;
};

export type Message = {
  messageId: string;
  senderId: string;
  text: string;
};

var chats: Array<Chat> = [
  {
    userId: "653a8197bedc5888925e40e7",
    username: "asaf navon",
    imageURI: "../../assets/cart.png",
    messages: [
      { messageId: "1", senderId: "653a8197bedc5888925e40e7", text: "first message" },
      { messageId: "2", senderId: "653953a387b11e66d2dfce4b", text: "last message" },
      { messageId: "3", senderId: "653a8197bedc5888925e40e7", text: "first message" },
      { messageId: "4", senderId: "653953a387b11e66d2dfce4b", text: "last message" },
      { messageId: "5", senderId: "653a8197bedc5888925e40e7", text: "first message" },
      { messageId: "6", senderId: "653953a387b11e66d2dfce4b", text: "last message" },
      { messageId: "7", senderId: "653a8197bedc5888925e40e7", text: "first message" },
      { messageId: "8", senderId: "653953a387b11e66d2dfce4b", text: "last message" },
      { messageId: "9", senderId: "653a8197bedc5888925e40e7", text: "first message" },
      { messageId: "10", senderId: "653953a387b11e66d2dfce4b", text: "last message" },
      { messageId: "11", senderId: "653a8197bedc5888925e40e7", text: "first message" },
      { messageId: "12", senderId: "653953a387b11e66d2dfce4b", text: "last message" },
      { messageId: "13", senderId: "653a8197bedc5888925e40e7", text: "first message" },
      { messageId: "14", senderId: "653953a387b11e66d2dfce4b", text: "last message" },
    ],
  },
  {
    userId: "653a8197bedc5888925e40e8",
    username: "avraham kabala",
    imageURI: "../../assets/cart.png",
    messages: [
      { messageId: "3", senderId: "653a8197bedc5888925e40e7", text: "first message" },
      { messageId: "4", senderId: "653953a387b11e66d2dfce4b", text: "last message" },
    ],
  },
  {
    userId: "653a8197bedc5888925e40e9",
    username: "david evenhaim",
    imageURI: "../../assets/cart.png",
    messages: [
      { messageId: "5", senderId: "653a8197bedc5888925e40e7", text: "first message" },
      { messageId: "6", senderId: "653953a387b11e66d2dfce4b", text: "last message" },
    ],
  },
];

export const getAllchats = () => {
  return chats;
};

export const getChatById = (id: string) => {
  return chats.find((chat) => chat.userId == id);
};
