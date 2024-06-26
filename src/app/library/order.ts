import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Subscription } from 'rxjs';
import { AuthGuardService } from '../auth/auth-route-guard.service'

const client = generateClient<Schema>();
let updateSub : any = null;
let ReqId : any = null;
 
 export async function createNewOrder(user:any, isEmergency: boolean): Promise<string> {
    const now = new Date();

    const convName =  user.username + " " + 
      now.toLocaleDateString("en-US") + " " +
      now.toLocaleTimeString("en-US");

    const {data: conv } = await client.models.Conversation.create({
      name: convName,
      active: true,
      emergency: isEmergency,
      requestorId: user.id,
      droneId: "unassigned",
    });

    const {data: convUser } = await client.models.UserConversation.create({
      userId: user.id,
      userConversationId: conv.id,
      lastRead: now.toISOString(),
    });

    const newCount = user.chatCount + 1
    const {data: updateUser} = await client.models.User.update({
       id: user.id,
       chatCount: newCount,
    });
  
    ReqId = conv.id;
    return ReqId;
  }

  export async function sendOrderMessage (userId:string, messageToDisplay:string
    , isPhoto: boolean)
  {
    if (isPhoto) {
      const {errors, data: firstMsg } = await client.models.Message.create({
        content: messageToDisplay,
        isSent: true,
        isText: false,
        conversationId: ReqId,
        sender: userId
      });
  
    }
    else {
      const {errors, data: firstMsg } = await client.models.Message.create({
        content: messageToDisplay,
        isSent: true,
        isText: true,
        conversationId: ReqId,
        sender: userId
      });
    }
  }

  export async function cancelOrder() {

    const {errors, data: conv } = await client.models.Conversation.update ({
        id: ReqId,
        active: false
      });
    ReqId = null;
  }

  export function isOrderActive() : boolean {
    return ReqId != null;
  }

  export function monitorOrder(callback): void {
    if (!ReqId)
        callback("Cancelled");
    updateSub = client.models.Conversation.onUpdate({  
        filter: {
        id: {
          eq: ReqId,
        },
      },
      }).subscribe({
        next: (data) => {
          // cancelled 
          updateSub.unsubscribe();
          updateSub = null;
          ReqId = null;
          
          if (data.active == false) {
            callback("Cancelled");
          }
          // fulfilled
          else if (data.droneId != "unassigned") {
            callback("Accepted");
          }
          else {
            callback("Cancelled");
          }
        },
        error: (error) => {
            console.warn(error);
            updateSub.unsubscribe();
            updateSub = null;
            callback("Cancelled");
        }
      });
  }

export async function cancelMonitorOrder() {
    if (!updateSub)
        return;
    updateSub.unsubscribe();
    updateSub = null;
}

export function isDroneAssigned(droneId:string) : boolean {
    return droneId != "unassigned";
}
