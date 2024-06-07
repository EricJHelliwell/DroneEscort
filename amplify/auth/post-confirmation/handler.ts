import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { type Schema } from "../../data/resource";
import { Amplify } from "aws-amplify";
import { generateClient } from "aws-amplify/data";
import { env } from '$amplify/env/post-confirmation';
import { createUser } from "./graphql/mutations";

const cogClient = new CognitoIdentityProviderClient();

Amplify.configure(
  {
    API: {
      GraphQL: {
        endpoint: env.AMPLIFY_DATA_GRAPHQL_ENDPOINT,
        region: env.AWS_REGION,
        defaultAuthMode: 'userPool',
      },
    },
  },
  {
    Auth: {
      credentialsProvider: {
        getCredentialsAndIdentityId: async () => ({
          credentials: {
            accessKeyId: env.AWS_ACCESS_KEY_ID,
            secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
            sessionToken: env.AWS_SESSION_TOKEN,
          },
        }),
        clearCredentialsAndIdentityId: () => {
          /* noop */
        },
      },
    },
  }
);

const dataClient = generateClient<Schema>({
  authMode: 'userPool',
});

// add user to group
export const handler: PostConfirmationTriggerHandler = async (event) => {
  const command = new AdminAddUserToGroupCommand({
    GroupName: env.GROUP_NAME,
    Username: event.userName,
    UserPoolId: event.userPoolId
  });
  const groupResponse = await cogClient.send(command);
  console.log('processed', groupResponse.$metadata.requestId);
  await dataClient.graphql({
    query: createUser,
    variables: {
      input: {
        userId: `${event.request.userAttributes.sub}`,
        cognitoId: `${event.request.userAttributes.sub}`,
        username: `${event.userName}`,
        registered: true
      },
    },
  });

  console.error('created user '+ `${event.userName}`);
  return event;
};