/* tslint:disable */
/* eslint-disable */
//  This file was automatically generated and should not be edited.

export type Conversation = {
  __typename: "Conversation",
  conversation?: UserConversation | null,
  conversationId: string,
  createdAt: string,
  id: string,
  messages?: ModelMessageConnection | null,
  name: string,
  updatedAt: string,
};

export type UserConversation = {
  __typename: "UserConversation",
  conversation?: Conversation | null,
  conversationId: string,
  createdAt: string,
  id: string,
  owner?: string | null,
  updatedAt: string,
  userConvId: string,
  userId?: User | null,
};

export type User = {
  __typename: "User",
  cognitoId: string,
  conversations?: ModelUserConversationConnection | null,
  createdAt: string,
  id: string,
  owner?: string | null,
  registered: boolean,
  updatedAt: string,
  userId: string,
  username: string,
};

export type ModelUserConversationConnection = {
  __typename: "ModelUserConversationConnection",
  items:  Array<UserConversation | null >,
  nextToken?: string | null,
};

export type ModelMessageConnection = {
  __typename: "ModelMessageConnection",
  items:  Array<Message | null >,
  nextToken?: string | null,
};

export type Message = {
  __typename: "Message",
  content?: string | null,
  conversationId?: Conversation | null,
  createdAt: string,
  id: string,
  isSent: boolean,
  messageId: string,
  owner?: string | null,
  sender: string,
  updatedAt: string,
};

export type ModelConversationFilterInput = {
  and?: Array< ModelConversationFilterInput | null > | null,
  conversationId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  name?: ModelStringInput | null,
  not?: ModelConversationFilterInput | null,
  or?: Array< ModelConversationFilterInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelIDInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export enum ModelAttributeTypes {
  _null = "_null",
  binary = "binary",
  binarySet = "binarySet",
  bool = "bool",
  list = "list",
  map = "map",
  number = "number",
  numberSet = "numberSet",
  string = "string",
  stringSet = "stringSet",
}


export type ModelSizeInput = {
  between?: Array< number | null > | null,
  eq?: number | null,
  ge?: number | null,
  gt?: number | null,
  le?: number | null,
  lt?: number | null,
  ne?: number | null,
};

export type ModelStringInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  size?: ModelSizeInput | null,
};

export type ModelConversationConnection = {
  __typename: "ModelConversationConnection",
  items:  Array<Conversation | null >,
  nextToken?: string | null,
};

export type ModelMessageFilterInput = {
  and?: Array< ModelMessageFilterInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  isSent?: ModelBooleanInput | null,
  messageId?: ModelIDInput | null,
  not?: ModelMessageFilterInput | null,
  or?: Array< ModelMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  sender?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type ModelBooleanInput = {
  attributeExists?: boolean | null,
  attributeType?: ModelAttributeTypes | null,
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelUserConversationFilterInput = {
  and?: Array< ModelUserConversationFilterInput | null > | null,
  conversationId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserConversationFilterInput | null,
  or?: Array< ModelUserConversationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userConvId?: ModelIDInput | null,
};

export type ModelUserFilterInput = {
  and?: Array< ModelUserFilterInput | null > | null,
  cognitoId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  id?: ModelIDInput | null,
  not?: ModelUserFilterInput | null,
  or?: Array< ModelUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
  registered?: ModelBooleanInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  username?: ModelStringInput | null,
};

export type ModelUserConnection = {
  __typename: "ModelUserConnection",
  items:  Array<User | null >,
  nextToken?: string | null,
};

export type ModelConversationConditionInput = {
  and?: Array< ModelConversationConditionInput | null > | null,
  conversationId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  name?: ModelStringInput | null,
  not?: ModelConversationConditionInput | null,
  or?: Array< ModelConversationConditionInput | null > | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateConversationInput = {
  conversationId: string,
  createdAt?: string | null,
  id?: string | null,
  name: string,
};

export type ModelMessageConditionInput = {
  and?: Array< ModelMessageConditionInput | null > | null,
  content?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  isSent?: ModelBooleanInput | null,
  messageId?: ModelIDInput | null,
  not?: ModelMessageConditionInput | null,
  or?: Array< ModelMessageConditionInput | null > | null,
  owner?: ModelStringInput | null,
  sender?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
};

export type CreateMessageInput = {
  content?: string | null,
  createdAt?: string | null,
  id?: string | null,
  isSent: boolean,
  messageId: string,
  owner?: string | null,
  sender: string,
};

export type ModelUserConditionInput = {
  and?: Array< ModelUserConditionInput | null > | null,
  cognitoId?: ModelStringInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelUserConditionInput | null,
  or?: Array< ModelUserConditionInput | null > | null,
  owner?: ModelStringInput | null,
  registered?: ModelBooleanInput | null,
  updatedAt?: ModelStringInput | null,
  userId?: ModelIDInput | null,
  username?: ModelStringInput | null,
};

export type CreateUserInput = {
  cognitoId: string,
  id?: string | null,
  owner?: string | null,
  registered: boolean,
  userId: string,
  username: string,
};

export type ModelUserConversationConditionInput = {
  and?: Array< ModelUserConversationConditionInput | null > | null,
  conversationId?: ModelIDInput | null,
  createdAt?: ModelStringInput | null,
  not?: ModelUserConversationConditionInput | null,
  or?: Array< ModelUserConversationConditionInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelStringInput | null,
  userConvId?: ModelIDInput | null,
};

export type CreateUserConversationInput = {
  conversationId: string,
  id?: string | null,
  owner?: string | null,
  userConvId: string,
};

export type DeleteConversationInput = {
  id: string,
};

export type DeleteMessageInput = {
  id: string,
};

export type DeleteUserInput = {
  id: string,
};

export type DeleteUserConversationInput = {
  id: string,
};

export type UpdateConversationInput = {
  conversationId?: string | null,
  createdAt?: string | null,
  id: string,
  name?: string | null,
};

export type UpdateMessageInput = {
  content?: string | null,
  createdAt?: string | null,
  id: string,
  isSent?: boolean | null,
  messageId?: string | null,
  owner?: string | null,
  sender?: string | null,
};

export type UpdateUserInput = {
  cognitoId?: string | null,
  id: string,
  owner?: string | null,
  registered?: boolean | null,
  userId?: string | null,
  username?: string | null,
};

export type UpdateUserConversationInput = {
  conversationId?: string | null,
  id: string,
  owner?: string | null,
  userConvId?: string | null,
};

export type ModelSubscriptionConversationFilterInput = {
  and?: Array< ModelSubscriptionConversationFilterInput | null > | null,
  conversationId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  name?: ModelSubscriptionStringInput | null,
  or?: Array< ModelSubscriptionConversationFilterInput | null > | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionIDInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionStringInput = {
  beginsWith?: string | null,
  between?: Array< string | null > | null,
  contains?: string | null,
  eq?: string | null,
  ge?: string | null,
  gt?: string | null,
  in?: Array< string | null > | null,
  le?: string | null,
  lt?: string | null,
  ne?: string | null,
  notContains?: string | null,
  notIn?: Array< string | null > | null,
};

export type ModelSubscriptionMessageFilterInput = {
  and?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  content?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  isSent?: ModelSubscriptionBooleanInput | null,
  messageId?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionMessageFilterInput | null > | null,
  owner?: ModelStringInput | null,
  sender?: ModelSubscriptionStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionBooleanInput = {
  eq?: boolean | null,
  ne?: boolean | null,
};

export type ModelSubscriptionUserFilterInput = {
  and?: Array< ModelSubscriptionUserFilterInput | null > | null,
  cognitoId?: ModelSubscriptionStringInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserFilterInput | null > | null,
  owner?: ModelStringInput | null,
  registered?: ModelSubscriptionBooleanInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userId?: ModelSubscriptionIDInput | null,
  username?: ModelSubscriptionStringInput | null,
};

export type ModelSubscriptionUserConversationFilterInput = {
  and?: Array< ModelSubscriptionUserConversationFilterInput | null > | null,
  conversationId?: ModelSubscriptionIDInput | null,
  createdAt?: ModelSubscriptionStringInput | null,
  id?: ModelSubscriptionIDInput | null,
  or?: Array< ModelSubscriptionUserConversationFilterInput | null > | null,
  owner?: ModelStringInput | null,
  updatedAt?: ModelSubscriptionStringInput | null,
  userConvId?: ModelSubscriptionIDInput | null,
};

export type GetConversationQueryVariables = {
  id: string,
};

export type GetConversationQuery = {
  getConversation?:  {
    __typename: "Conversation",
    conversation?:  {
      __typename: "UserConversation",
      conversationId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
      userConvId: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type GetMessageQueryVariables = {
  id: string,
};

export type GetMessageQuery = {
  getMessage?:  {
    __typename: "Message",
    content?: string | null,
    conversationId?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    id: string,
    isSent: boolean,
    messageId: string,
    owner?: string | null,
    sender: string,
    updatedAt: string,
  } | null,
};

export type GetUserQueryVariables = {
  id: string,
};

export type GetUserQuery = {
  getUser?:  {
    __typename: "User",
    cognitoId: string,
    conversations?:  {
      __typename: "ModelUserConversationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    owner?: string | null,
    registered: boolean,
    updatedAt: string,
    userId: string,
    username: string,
  } | null,
};

export type GetUserConversationQueryVariables = {
  id: string,
};

export type GetUserConversationQuery = {
  getUserConversation?:  {
    __typename: "UserConversation",
    conversation?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userConvId: string,
    userId?:  {
      __typename: "User",
      cognitoId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      registered: boolean,
      updatedAt: string,
      userId: string,
      username: string,
    } | null,
  } | null,
};

export type ListConversationsQueryVariables = {
  filter?: ModelConversationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListConversationsQuery = {
  listConversations?:  {
    __typename: "ModelConversationConnection",
    items:  Array< {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListMessagesQueryVariables = {
  filter?: ModelMessageFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListMessagesQuery = {
  listMessages?:  {
    __typename: "ModelMessageConnection",
    items:  Array< {
      __typename: "Message",
      content?: string | null,
      createdAt: string,
      id: string,
      isSent: boolean,
      messageId: string,
      owner?: string | null,
      sender: string,
      updatedAt: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUserConversationsQueryVariables = {
  filter?: ModelUserConversationFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUserConversationsQuery = {
  listUserConversations?:  {
    __typename: "ModelUserConversationConnection",
    items:  Array< {
      __typename: "UserConversation",
      conversationId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
      userConvId: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type ListUsersQueryVariables = {
  filter?: ModelUserFilterInput | null,
  limit?: number | null,
  nextToken?: string | null,
};

export type ListUsersQuery = {
  listUsers?:  {
    __typename: "ModelUserConnection",
    items:  Array< {
      __typename: "User",
      cognitoId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      registered: boolean,
      updatedAt: string,
      userId: string,
      username: string,
    } | null >,
    nextToken?: string | null,
  } | null,
};

export type CreateConversationMutationVariables = {
  condition?: ModelConversationConditionInput | null,
  input: CreateConversationInput,
};

export type CreateConversationMutation = {
  createConversation?:  {
    __typename: "Conversation",
    conversation?:  {
      __typename: "UserConversation",
      conversationId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
      userConvId: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type CreateMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: CreateMessageInput,
};

export type CreateMessageMutation = {
  createMessage?:  {
    __typename: "Message",
    content?: string | null,
    conversationId?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    id: string,
    isSent: boolean,
    messageId: string,
    owner?: string | null,
    sender: string,
    updatedAt: string,
  } | null,
};

export type CreateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: CreateUserInput,
};

export type CreateUserMutation = {
  createUser?:  {
    __typename: "User",
    cognitoId: string,
    conversations?:  {
      __typename: "ModelUserConversationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    owner?: string | null,
    registered: boolean,
    updatedAt: string,
    userId: string,
    username: string,
  } | null,
};

export type CreateUserConversationMutationVariables = {
  condition?: ModelUserConversationConditionInput | null,
  input: CreateUserConversationInput,
};

export type CreateUserConversationMutation = {
  createUserConversation?:  {
    __typename: "UserConversation",
    conversation?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userConvId: string,
    userId?:  {
      __typename: "User",
      cognitoId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      registered: boolean,
      updatedAt: string,
      userId: string,
      username: string,
    } | null,
  } | null,
};

export type DeleteConversationMutationVariables = {
  condition?: ModelConversationConditionInput | null,
  input: DeleteConversationInput,
};

export type DeleteConversationMutation = {
  deleteConversation?:  {
    __typename: "Conversation",
    conversation?:  {
      __typename: "UserConversation",
      conversationId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
      userConvId: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type DeleteMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: DeleteMessageInput,
};

export type DeleteMessageMutation = {
  deleteMessage?:  {
    __typename: "Message",
    content?: string | null,
    conversationId?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    id: string,
    isSent: boolean,
    messageId: string,
    owner?: string | null,
    sender: string,
    updatedAt: string,
  } | null,
};

export type DeleteUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: DeleteUserInput,
};

export type DeleteUserMutation = {
  deleteUser?:  {
    __typename: "User",
    cognitoId: string,
    conversations?:  {
      __typename: "ModelUserConversationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    owner?: string | null,
    registered: boolean,
    updatedAt: string,
    userId: string,
    username: string,
  } | null,
};

export type DeleteUserConversationMutationVariables = {
  condition?: ModelUserConversationConditionInput | null,
  input: DeleteUserConversationInput,
};

export type DeleteUserConversationMutation = {
  deleteUserConversation?:  {
    __typename: "UserConversation",
    conversation?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userConvId: string,
    userId?:  {
      __typename: "User",
      cognitoId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      registered: boolean,
      updatedAt: string,
      userId: string,
      username: string,
    } | null,
  } | null,
};

export type UpdateConversationMutationVariables = {
  condition?: ModelConversationConditionInput | null,
  input: UpdateConversationInput,
};

export type UpdateConversationMutation = {
  updateConversation?:  {
    __typename: "Conversation",
    conversation?:  {
      __typename: "UserConversation",
      conversationId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
      userConvId: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type UpdateMessageMutationVariables = {
  condition?: ModelMessageConditionInput | null,
  input: UpdateMessageInput,
};

export type UpdateMessageMutation = {
  updateMessage?:  {
    __typename: "Message",
    content?: string | null,
    conversationId?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    id: string,
    isSent: boolean,
    messageId: string,
    owner?: string | null,
    sender: string,
    updatedAt: string,
  } | null,
};

export type UpdateUserMutationVariables = {
  condition?: ModelUserConditionInput | null,
  input: UpdateUserInput,
};

export type UpdateUserMutation = {
  updateUser?:  {
    __typename: "User",
    cognitoId: string,
    conversations?:  {
      __typename: "ModelUserConversationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    owner?: string | null,
    registered: boolean,
    updatedAt: string,
    userId: string,
    username: string,
  } | null,
};

export type UpdateUserConversationMutationVariables = {
  condition?: ModelUserConversationConditionInput | null,
  input: UpdateUserConversationInput,
};

export type UpdateUserConversationMutation = {
  updateUserConversation?:  {
    __typename: "UserConversation",
    conversation?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userConvId: string,
    userId?:  {
      __typename: "User",
      cognitoId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      registered: boolean,
      updatedAt: string,
      userId: string,
      username: string,
    } | null,
  } | null,
};

export type OnCreateConversationSubscriptionVariables = {
  filter?: ModelSubscriptionConversationFilterInput | null,
};

export type OnCreateConversationSubscription = {
  onCreateConversation?:  {
    __typename: "Conversation",
    conversation?:  {
      __typename: "UserConversation",
      conversationId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
      userConvId: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnCreateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnCreateMessageSubscription = {
  onCreateMessage?:  {
    __typename: "Message",
    content?: string | null,
    conversationId?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    id: string,
    isSent: boolean,
    messageId: string,
    owner?: string | null,
    sender: string,
    updatedAt: string,
  } | null,
};

export type OnCreateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserSubscription = {
  onCreateUser?:  {
    __typename: "User",
    cognitoId: string,
    conversations?:  {
      __typename: "ModelUserConversationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    owner?: string | null,
    registered: boolean,
    updatedAt: string,
    userId: string,
    username: string,
  } | null,
};

export type OnCreateUserConversationSubscriptionVariables = {
  filter?: ModelSubscriptionUserConversationFilterInput | null,
  owner?: string | null,
};

export type OnCreateUserConversationSubscription = {
  onCreateUserConversation?:  {
    __typename: "UserConversation",
    conversation?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userConvId: string,
    userId?:  {
      __typename: "User",
      cognitoId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      registered: boolean,
      updatedAt: string,
      userId: string,
      username: string,
    } | null,
  } | null,
};

export type OnDeleteConversationSubscriptionVariables = {
  filter?: ModelSubscriptionConversationFilterInput | null,
};

export type OnDeleteConversationSubscription = {
  onDeleteConversation?:  {
    __typename: "Conversation",
    conversation?:  {
      __typename: "UserConversation",
      conversationId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
      userConvId: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnDeleteMessageSubscription = {
  onDeleteMessage?:  {
    __typename: "Message",
    content?: string | null,
    conversationId?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    id: string,
    isSent: boolean,
    messageId: string,
    owner?: string | null,
    sender: string,
    updatedAt: string,
  } | null,
};

export type OnDeleteUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserSubscription = {
  onDeleteUser?:  {
    __typename: "User",
    cognitoId: string,
    conversations?:  {
      __typename: "ModelUserConversationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    owner?: string | null,
    registered: boolean,
    updatedAt: string,
    userId: string,
    username: string,
  } | null,
};

export type OnDeleteUserConversationSubscriptionVariables = {
  filter?: ModelSubscriptionUserConversationFilterInput | null,
  owner?: string | null,
};

export type OnDeleteUserConversationSubscription = {
  onDeleteUserConversation?:  {
    __typename: "UserConversation",
    conversation?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userConvId: string,
    userId?:  {
      __typename: "User",
      cognitoId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      registered: boolean,
      updatedAt: string,
      userId: string,
      username: string,
    } | null,
  } | null,
};

export type OnUpdateConversationSubscriptionVariables = {
  filter?: ModelSubscriptionConversationFilterInput | null,
};

export type OnUpdateConversationSubscription = {
  onUpdateConversation?:  {
    __typename: "Conversation",
    conversation?:  {
      __typename: "UserConversation",
      conversationId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      updatedAt: string,
      userConvId: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    messages?:  {
      __typename: "ModelMessageConnection",
      nextToken?: string | null,
    } | null,
    name: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateMessageSubscriptionVariables = {
  filter?: ModelSubscriptionMessageFilterInput | null,
  owner?: string | null,
};

export type OnUpdateMessageSubscription = {
  onUpdateMessage?:  {
    __typename: "Message",
    content?: string | null,
    conversationId?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    createdAt: string,
    id: string,
    isSent: boolean,
    messageId: string,
    owner?: string | null,
    sender: string,
    updatedAt: string,
  } | null,
};

export type OnUpdateUserSubscriptionVariables = {
  filter?: ModelSubscriptionUserFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserSubscription = {
  onUpdateUser?:  {
    __typename: "User",
    cognitoId: string,
    conversations?:  {
      __typename: "ModelUserConversationConnection",
      nextToken?: string | null,
    } | null,
    createdAt: string,
    id: string,
    owner?: string | null,
    registered: boolean,
    updatedAt: string,
    userId: string,
    username: string,
  } | null,
};

export type OnUpdateUserConversationSubscriptionVariables = {
  filter?: ModelSubscriptionUserConversationFilterInput | null,
  owner?: string | null,
};

export type OnUpdateUserConversationSubscription = {
  onUpdateUserConversation?:  {
    __typename: "UserConversation",
    conversation?:  {
      __typename: "Conversation",
      conversationId: string,
      createdAt: string,
      id: string,
      name: string,
      updatedAt: string,
    } | null,
    conversationId: string,
    createdAt: string,
    id: string,
    owner?: string | null,
    updatedAt: string,
    userConvId: string,
    userId?:  {
      __typename: "User",
      cognitoId: string,
      createdAt: string,
      id: string,
      owner?: string | null,
      registered: boolean,
      updatedAt: string,
      userId: string,
      username: string,
    } | null,
  } | null,
};
