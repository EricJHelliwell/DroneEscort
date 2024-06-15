import { defineStorage } from '@aws-amplify/backend';

export const storage = defineStorage({
  name: 'profileStorage',
  access: (allow) => ({
    'profile-pictures/*': [
      allow.authenticated.to(['read','write', 'delete']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
    'chat-submissions/{entity_id}/*': [
      allow.authenticated.to(['read','write']),
      allow.entity('identity').to(['read', 'write', 'delete'])
    ],
  })
});