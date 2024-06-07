/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedQuery<InputType, OutputType> = string & {
  __generatedQueryInput: InputType;
  __generatedQueryOutput: OutputType;
};

export const getConversation = /* GraphQL */ `query GetConversation($id: ID!) {
  getConversation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetConversationQueryVariables,
  APITypes.GetConversationQuery
>;
export const getMessage = /* GraphQL */ `query GetMessage($id: ID!) {
  getMessage(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetMessageQueryVariables,
  APITypes.GetMessageQuery
>;
export const getUser = /* GraphQL */ `query GetUser($id: ID!) {
  getUser(id: $id) {
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
` as GeneratedQuery<APITypes.GetUserQueryVariables, APITypes.GetUserQuery>;
export const getUserConversation = /* GraphQL */ `query GetUserConversation($id: ID!) {
  getUserConversation(id: $id) {
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
` as GeneratedQuery<
  APITypes.GetUserConversationQueryVariables,
  APITypes.GetUserConversationQuery
>;
export const listConversations = /* GraphQL */ `query ListConversations(
  $filter: ModelConversationFilterInput
  $limit: Int
  $nextToken: String
) {
  listConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      conversationId
      createdAt
      id
      name
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListConversationsQueryVariables,
  APITypes.ListConversationsQuery
>;
export const listMessages = /* GraphQL */ `query ListMessages(
  $filter: ModelMessageFilterInput
  $limit: Int
  $nextToken: String
) {
  listMessages(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      content
      createdAt
      id
      isSent
      messageId
      owner
      sender
      updatedAt
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListMessagesQueryVariables,
  APITypes.ListMessagesQuery
>;
export const listUserConversations = /* GraphQL */ `query ListUserConversations(
  $filter: ModelUserConversationFilterInput
  $limit: Int
  $nextToken: String
) {
  listUserConversations(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
      conversationId
      createdAt
      id
      owner
      updatedAt
      userConvId
      __typename
    }
    nextToken
    __typename
  }
}
` as GeneratedQuery<
  APITypes.ListUserConversationsQueryVariables,
  APITypes.ListUserConversationsQuery
>;
export const listUsers = /* GraphQL */ `query ListUsers(
  $filter: ModelUserFilterInput
  $limit: Int
  $nextToken: String
) {
  listUsers(filter: $filter, limit: $limit, nextToken: $nextToken) {
    items {
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
    nextToken
    __typename
  }
}
` as GeneratedQuery<APITypes.ListUsersQueryVariables, APITypes.ListUsersQuery>;
