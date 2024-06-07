/* tslint:disable */
/* eslint-disable */
// this is an auto generated file. This will be overwritten

import * as APITypes from "./API";
type GeneratedSubscription<InputType, OutputType> = string & {
  __generatedSubscriptionInput: InputType;
  __generatedSubscriptionOutput: OutputType;
};

export const onCreateConversation = /* GraphQL */ `subscription OnCreateConversation(
  $filter: ModelSubscriptionConversationFilterInput
) {
  onCreateConversation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnCreateConversationSubscriptionVariables,
  APITypes.OnCreateConversationSubscription
>;
export const onCreateMessage = /* GraphQL */ `subscription OnCreateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onCreateMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateMessageSubscriptionVariables,
  APITypes.OnCreateMessageSubscription
>;
export const onCreateUser = /* GraphQL */ `subscription OnCreateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onCreateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserSubscriptionVariables,
  APITypes.OnCreateUserSubscription
>;
export const onCreateUserConversation = /* GraphQL */ `subscription OnCreateUserConversation(
  $filter: ModelSubscriptionUserConversationFilterInput
  $owner: String
) {
  onCreateUserConversation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnCreateUserConversationSubscriptionVariables,
  APITypes.OnCreateUserConversationSubscription
>;
export const onDeleteConversation = /* GraphQL */ `subscription OnDeleteConversation(
  $filter: ModelSubscriptionConversationFilterInput
) {
  onDeleteConversation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteConversationSubscriptionVariables,
  APITypes.OnDeleteConversationSubscription
>;
export const onDeleteMessage = /* GraphQL */ `subscription OnDeleteMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onDeleteMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteMessageSubscriptionVariables,
  APITypes.OnDeleteMessageSubscription
>;
export const onDeleteUser = /* GraphQL */ `subscription OnDeleteUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onDeleteUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserSubscriptionVariables,
  APITypes.OnDeleteUserSubscription
>;
export const onDeleteUserConversation = /* GraphQL */ `subscription OnDeleteUserConversation(
  $filter: ModelSubscriptionUserConversationFilterInput
  $owner: String
) {
  onDeleteUserConversation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnDeleteUserConversationSubscriptionVariables,
  APITypes.OnDeleteUserConversationSubscription
>;
export const onUpdateConversation = /* GraphQL */ `subscription OnUpdateConversation(
  $filter: ModelSubscriptionConversationFilterInput
) {
  onUpdateConversation(filter: $filter) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateConversationSubscriptionVariables,
  APITypes.OnUpdateConversationSubscription
>;
export const onUpdateMessage = /* GraphQL */ `subscription OnUpdateMessage(
  $filter: ModelSubscriptionMessageFilterInput
  $owner: String
) {
  onUpdateMessage(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateMessageSubscriptionVariables,
  APITypes.OnUpdateMessageSubscription
>;
export const onUpdateUser = /* GraphQL */ `subscription OnUpdateUser(
  $filter: ModelSubscriptionUserFilterInput
  $owner: String
) {
  onUpdateUser(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserSubscriptionVariables,
  APITypes.OnUpdateUserSubscription
>;
export const onUpdateUserConversation = /* GraphQL */ `subscription OnUpdateUserConversation(
  $filter: ModelSubscriptionUserConversationFilterInput
  $owner: String
) {
  onUpdateUserConversation(filter: $filter, owner: $owner) {
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
` as GeneratedSubscription<
  APITypes.OnUpdateUserConversationSubscriptionVariables,
  APITypes.OnUpdateUserConversationSubscription
>;
