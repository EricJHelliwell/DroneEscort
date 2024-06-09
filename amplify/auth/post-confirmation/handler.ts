import type { PostConfirmationTriggerHandler } from 'aws-lambda';
import {
  CognitoIdentityProviderClient,
  AdminAddUserToGroupCommand
} from '@aws-sdk/client-cognito-identity-provider';
import { type Schema } from "../../data/resource";
import { Amplify } from "aws-amplify";

const cogClient = new CognitoIdentityProviderClient();

// add user to group
export const handler: PostConfirmationTriggerHandler = async (event) => {
  var groupToAddTo = "SUBSCRIBERS";
  if (event.request.userAttributes.email.indexOf("@gmail.com") !== -1)
    groupToAddTo = "PILOTS";
  const command = new AdminAddUserToGroupCommand({
    GroupName: groupToAddTo,
    Username: event.userName,
    UserPoolId: event.userPoolId
  });
  const groupResponse = await cogClient.send(command);
  console.log('processed', groupResponse.$metadata.requestId);

  return event;
};