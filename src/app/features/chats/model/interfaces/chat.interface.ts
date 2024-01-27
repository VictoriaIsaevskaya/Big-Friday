export interface ChatRoom {
  id: string;
  details: ChatDetails;
  messages: ChatMessage[];
  loadingMessages?: boolean;
  hasError?: boolean;
  lastMessage?: ChatMessage;
  unreadMessagesCount?: number;
}

export interface ChatParticipant {
  userId: string;
  unreadMessagesCount: number;
}

export interface ChatDetails {
  name: string;
  image: string;
  eventId?: string;
  participants: ChatParticipant[];
}

export interface ChatMessage {
  id?: string;
  senderId: string;
  senderName?: string;
  text: string;
  timestamp: Date | any;
  isRead?: boolean;
}
