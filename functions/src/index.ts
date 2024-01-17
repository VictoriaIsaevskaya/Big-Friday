import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

exports.sendChatNotification = functions.firestore
  .document("chats/{chatId}/messages/{messageId}")
  .onCreate(async (snapshot, context) => {
    const messageData = snapshot.data();
    const chatId = context.params.chatId;

    const chatSnapshot = await admin.firestore().doc(`chats/${chatId}`).get();
    const chatInfo = chatSnapshot.data();
    const eventId = chatInfo?.details?.eventId;

    if (!eventId) {
      console.log("Chat is not relevant to event");
      return;
    }

    const eventSnapshot =
      await admin.firestore().doc(`events/${eventId}`).get();
    const eventInfo = eventSnapshot.data();
    const participants = eventInfo?.participants || [];

    const tokens = [];
    for (const participant of participants) {
      if (participant.userId !== messageData.senderId) {
        const userSnapshot =
          await admin.firestore().doc(`users/${participant.userId}`).get();
        const user = userSnapshot.data();
        if (user?.fcmToken) {
          tokens.push(user.fcmToken);
        }
      }
    }

    if (tokens.length === 0) {
      console.log("No FCM tokens for sending notifications");
      return;
    }

    const multicastMessage: admin.messaging.MulticastMessage = {
      notification: {
        title: "New message in event chat",
        body: messageData?.text || "You have received a new message",
      },
      tokens: tokens,
    };

    try {
      const response =
        await admin.messaging().sendEachForMulticast(multicastMessage);
      console.log("Notifications sent successfully:", response);
    } catch (error) {
      console.error("Error sending notification:", error);
    }
  });
