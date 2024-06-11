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
      id: a.id().required(),
      name: a.string().required(),
      createdAt: a.datetime().required(),
      active: a.boolean().required(),
      requestorId: a.string().required(),
      userConversation: a.belongsTo("UserConversation", "id"),
      messages: a.hasMany("Message", "id"),
      drone: a.hasOne("Drone", "id"),
    }),
    Message: a
      .model({
        id: a.id().required(),
        content: a.string(),
        createdAt: a.datetime().required(),
        sender: a.string().required(),
        isSent: a.boolean().required(),
        conversation: a.belongsTo("Conversation", "id"),
      }),
      UserConversation: a
      .model({
        id: a.id().required(),
        user: a.belongsTo("User", "id"),
        conversation: a.hasOne("Conversation", "id"),
      }),
      User: a
      .model({
        id: a.id().required(),
        userId: a.id().required(),  // this is specific to the security subsystem
        username: a.string().required(),
        registered: a.boolean().required(),
        conversations: a.hasMany("UserConversation", "id"),
        lat: a.float(),
        lng: a.float(),
      }),
      Drone: a
      .model({
        id: a.id().required(),
        createdAt: a.datetime().required(),
        conversation: a.belongsTo("Conversation", "id"),
        name: a.string().required(),
        description: a.string(),
        active: a.boolean(),
        lat: a.float(),
        lng: a.float(),
      })
})
.authorization((allow) => [allow.resource(postConfirmation),
   allow.authenticated()]);

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'userPool',
//    defaultAuthorizationMode: 'apiKey',
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
