export interface IChatRoom extends IChatDetails {
  id: string;
  message: string;
}

export interface IChatDetails {
  name: string;
  image: string;
}

export interface IChatMessage {
  id: string;
  sender: string;
  text: string;
  time: Date;
}
