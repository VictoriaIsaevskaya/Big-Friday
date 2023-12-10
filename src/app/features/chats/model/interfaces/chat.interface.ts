export interface ChatRoom {
  id: string;
  details: ChatDetails;
  messages: ChatMessage[];
  loadingMessages?: boolean;
  hasError?: boolean;
  lastMessage?: string;
}

export interface ChatDetails {
  name: string;
  image: string;
  eventId?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName?: string;
  text: string;
  timestamp: Date;
  isRead?: boolean;
}
