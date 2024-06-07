import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from "../auth/post-confirmation/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Conversation: a
    .model({
      conversationId: a.id().required(),
      name: a.string().required(),
      createdAt: a.datetime().required(),
      conversation: a.belongsTo("UserConversation", "conversationId"),
      messages: a.hasMany("Message", "messageId"),
    }),
    Message: a
      .model({
        messageId: a.id().required(),
        content: a.string(),
        createdAt: a.datetime().required(),
        sender: a.string().required(),
        isSent: a.boolean().required(),
        conversationId: a.belongsTo("Conversation", "messageId"),
//        comments: a.hasMany("Comment", "commentId"),
//        owner: a.string().authorization((allow) => [allow.owner().to(['read','delete'])]),
      }),
      UserConversation: a
      .model({
        userConvId: a.id().required(),
        userId: a.belongsTo("User", "userConvId"),
        conversationId: a.id().required(),
        conversation: a.hasOne("Conversation", "conversationId"),
//        owner: a.string().authorization((allow) => [allow.owner().to(['read','delete'])]),
      }),
      User: a
      .model({
        userId: a.id().required(),
        cognitoId: a.string().required(),
        username: a.string().required(),
        registered: a.boolean().required(),
        conversations: a.hasMany("UserConversation", "userConvId"),
      })
})
.authorization((allow) => [allow.resource(postConfirmation)
  , allow.authenticated('userPools')]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
//    defaultAuthorizationMode: 'apiKey',
    defaultAuthorizationMode: 'userPool',
    // API Key is used for a.allow.public() rules
    apiKeyAuthorizationMode: {
      expiresInDays: 30,
    },
  },
});

/*== STEP 2 ===============================================================
Go to your frontend source code. From your client-side code, generate a
Data client to make CRUDL requests to your table. (THIS SNIPPET WILL ONLY
WORK IN THE FRONTEND CODE FILE.)

Using JavaScript or Next.js React Server Components, Middleware, Server 
Actions or Pages Router? Review how to generate Data clients for those use
cases: https://docs.amplify.aws/gen2/build-a-backend/data/connect-to-API/
=========================================================================*/

/*
"use client"
import { generateClient } from "aws-amplify/data";
import type { Schema } from "@/amplify/data/resource";

const client = generateClient<Schema>() // use this Data client for CRUDL requests
*/

/*== STEP 3 ===============================================================
Fetch records from the database and use them in your frontend component.
(THIS SNIPPET WILL ONLY WORK IN THE FRONTEND CODE FILE.)
=========================================================================*/

/* For example, in a React component, you can use this snippet in your
  function's RETURN statement */
// const { data: todos } = await client.models.Todo.list()

// return <ul>{todos.map(todo => <li key={todo.id}>{todo.content}</li>)}</ul>
