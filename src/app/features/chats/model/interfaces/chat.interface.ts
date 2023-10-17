export interface IChatRoom {
  id: string;
  name: string;
  photo: string;
  message: string;
}

export interface IChatMessage {
  id: string;
  sender: string;
  text: string;
  time: Date;
}
