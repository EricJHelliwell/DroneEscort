/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedMutation<InputType, OutputType> = string & {
  __generatedMutationInput: InputType;
  __generatedMutationOutput: OutputType;
};

export const createConversation = /* GraphQL */ `mutation CreateConversation(
  $condition: ModelConversationConditionInput
  $input: CreateConversationInput!
) {
  createConversation(condition: $condition, input: $input) {
    conversation {
      conversationId
      createdAt
      id
      owner
      updatedAt
      userConvId
      __typename
    }
    conversationId
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateConversationMutationVariables,
  APITypes.CreateConversationMutation
>;
export const createMessage = /* GraphQL */ `mutation CreateMessage(
  $condition: ModelMessageConditionInput
  $input: CreateMessageInput!
) {
  createMessage(condition: $condition, input: $input) {
    content
    conversationId {
      conversationId
      createdAt
      id
      name
      updatedAt
      __typename
    }
    createdAt
    id
    isSent
    messageId
    owner
    sender
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateMessageMutationVariables,
  APITypes.CreateMessageMutation
>;
export const createUser = /* GraphQL */ `mutation CreateUser(
  $condition: ModelUserConditionInput
  $input: CreateUserInput!
) {
  createUser(condition: $condition, input: $input) {
    cognitoId
    conversations {
      nextToken
      __typename
    }
    createdAt
    id
    owner
    registered
    updatedAt
    userId
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserMutationVariables,
  APITypes.CreateUserMutation
>;
export const createUserConversation = /* GraphQL */ `mutation CreateUserConversation(
  $condition: ModelUserConversationConditionInput
  $input: CreateUserConversationInput!
) {
  createUserConversation(condition: $condition, input: $input) {
    conversation {
      conversationId
      createdAt
      id
      name
      updatedAt
      __typename
    }
    conversationId
    createdAt
    id
    owner
    updatedAt
    userConvId
    userId {
      cognitoId
      createdAt
      id
      owner
      registered
      updatedAt
      userId
      username
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.CreateUserConversationMutationVariables,
  APITypes.CreateUserConversationMutation
>;
export const deleteConversation = /* GraphQL */ `mutation DeleteConversation(
  $condition: ModelConversationConditionInput
  $input: DeleteConversationInput!
) {
  deleteConversation(condition: $condition, input: $input) {
    conversation {
      conversationId
      createdAt
      id
      owner
      updatedAt
      userConvId
      __typename
    }
    conversationId
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteConversationMutationVariables,
  APITypes.DeleteConversationMutation
>;
export const deleteMessage = /* GraphQL */ `mutation DeleteMessage(
  $condition: ModelMessageConditionInput
  $input: DeleteMessageInput!
) {
  deleteMessage(condition: $condition, input: $input) {
    content
    conversationId {
      conversationId
      createdAt
      id
      name
      updatedAt
      __typename
    }
    createdAt
    id
    isSent
    messageId
    owner
    sender
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteMessageMutationVariables,
  APITypes.DeleteMessageMutation
>;
export const deleteUser = /* GraphQL */ `mutation DeleteUser(
  $condition: ModelUserConditionInput
  $input: DeleteUserInput!
) {
  deleteUser(condition: $condition, input: $input) {
    cognitoId
    conversations {
      nextToken
      __typename
    }
    createdAt
    id
    owner
    registered
    updatedAt
    userId
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserMutationVariables,
  APITypes.DeleteUserMutation
>;
export const deleteUserConversation = /* GraphQL */ `mutation DeleteUserConversation(
  $condition: ModelUserConversationConditionInput
  $input: DeleteUserConversationInput!
) {
  deleteUserConversation(condition: $condition, input: $input) {
    conversation {
      conversationId
      createdAt
      id
      name
      updatedAt
      __typename
    }
    conversationId
    createdAt
    id
    owner
    updatedAt
    userConvId
    userId {
      cognitoId
      createdAt
      id
      owner
      registered
      updatedAt
      userId
      username
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.DeleteUserConversationMutationVariables,
  APITypes.DeleteUserConversationMutation
>;
export const updateConversation = /* GraphQL */ `mutation UpdateConversation(
  $condition: ModelConversationConditionInput
  $input: UpdateConversationInput!
) {
  updateConversation(condition: $condition, input: $input) {
    conversation {
      conversationId
      createdAt
      id
      owner
      updatedAt
      userConvId
      __typename
    }
    conversationId
    createdAt
    id
    messages {
      nextToken
      __typename
    }
    name
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateConversationMutationVariables,
  APITypes.UpdateConversationMutation
>;
export const updateMessage = /* GraphQL */ `mutation UpdateMessage(
  $condition: ModelMessageConditionInput
  $input: UpdateMessageInput!
) {
  updateMessage(condition: $condition, input: $input) {
    content
    conversationId {
      conversationId
      createdAt
      id
      name
      updatedAt
      __typename
    }
    createdAt
    id
    isSent
    messageId
    owner
    sender
    updatedAt
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateMessageMutationVariables,
  APITypes.UpdateMessageMutation
>;
export const updateUser = /* GraphQL */ `mutation UpdateUser(
  $condition: ModelUserConditionInput
  $input: UpdateUserInput!
) {
  updateUser(condition: $condition, input: $input) {
    cognitoId
    conversations {
      nextToken
      __typename
    }
    createdAt
    id
    owner
    registered
    updatedAt
    userId
    username
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserMutationVariables,
  APITypes.UpdateUserMutation
>;
export const updateUserConversation = /* GraphQL */ `mutation UpdateUserConversation(
  $condition: ModelUserConversationConditionInput
  $input: UpdateUserConversationInput!
) {
  updateUserConversation(condition: $condition, input: $input) {
    conversation {
      conversationId
      createdAt
      id
      name
      updatedAt
      __typename
    }
    conversationId
    createdAt
    id
    owner
    updatedAt
    userConvId
    userId {
      cognitoId
      createdAt
      id
      owner
      registered
      updatedAt
      userId
      username
      __typename
    }
    __typename
  }
}
` as GeneratedMutation<
  APITypes.UpdateUserConversationMutationVariables,
  APITypes.UpdateUserConversationMutation
>;
