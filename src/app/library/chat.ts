import { generateClient } from 'aws-amplify/data';
import type { Schema } from '../../../amplify/data/resource';
import { Subscription } from 'rxjs';
import { AuthGuardService } from '../auth/auth-route-guard.service'
import { Geolocation, ClearWatchOptions } from '@capacitor/geolocation';
import { getUrl } from "aws-amplify/storage";
import { getUserProfilePhoto } from '../library/user'

const client = generateClient<Schema>();

export async function getActiveConvUsers(): Promise<string[]> {

    const {errors, data: convs } = await client.models.Conversation.list ({
        filter: {
        active: {eq: true}
        }
    });
    
    if (errors || convs.length == 0)
        return [];
    const filter = {
        or: convs.map(conv => ({ userConversationId: { eq: conv.id } }))
    };
    const {data: users } = await client.models.UserConversation.list ({ filter });
    var userIds = users.map(({ userId }) => userId);
    return [...new Set(userIds)];
}