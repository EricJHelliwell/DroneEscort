import { type ClientSchema, a, defineData } from '@aws-amplify/backend';
import { postConfirmation } from "../auth/post-confirmation/resource";

/*== STEP 1 ===============================================================
The section below creates a Todo database table with a "content" field. Try
adding a new "isDone" field as a boolean. The authorization rule below
specifies that any user authenticated via an API key can "create", "read",
"update", and "delete" any "Todo" records.
=========================================================================*/
const schema = a.schema({
  Location: a.customType({
    lat: a.float(),
    lng: a.float(),
  }),
  Conversation: a
    .model({
      name: a.string().required(),
      active: a.boolean().required(),
      emergency: a.boolean().required(),
      requestorId: a.string().required(),
      userConversation: a.hasOne("UserConversation", "userConversationId"),
      messages: a.hasMany("Message", "conversationId"),
      droneId: a.id(),
      drone: a.belongsTo("Drone", "droneId"),
    }),
    Message: a
      .model({
        content: a.string(),
        sender: a.string().required(),
        isSent: a.boolean().required(),
        isText: a.boolean().required(),
        conversationId: a.id().required(),
        conversation: a.belongsTo("Conversation", "conversationId"),
      }),
      UserConversation: a
      .model({
        userId: a.id().required(),
        user: a.belongsTo("User", "userId"),
        lastRead: a.datetime(),
        userConversationId: a.id().required(),
        conversation: a.belongsTo("Conversation", "userConversationId"),
      }),
      User: a
      .model({
        cognitoId: a.id().required(),  // this is specific to the security subsystem
        username: a.string().required(),
        phone: a.phone().required(),
        email: a.email().required(),
        registered: a.boolean().required(),
        description: a.string(),
        conversations: a.hasMany("UserConversation", "userId"),
        location: a.ref('Location'),
        chatCount: a.integer().default(0),
        textCount: a.integer().default(0),
        imageCount: a.integer().default(0),
      }),
      Drone: a
      .model({
        conversation: a.hasMany("Conversation", "droneId"),
        name: a.string().required(),
        description: a.string(),
        active: a.boolean(),
        location: a.ref('Location'),
      }),
      GeoBoundary: a
      .model({
        domainId: a.id().required(),
        location: a.ref('Location').required(),
        radius: a.float().required(),
        domain: a.belongsTo('GeoDomainBoundary', 'domainId'),
      }),
      GeoDomainBoundary: a
      .model({
        domain: a.string().required(),
        description: a.string().required(),
        active: a.boolean().required(),
        phone: a.phone().required(),
        locations: a.hasMany('GeoBoundary','domainId'),
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
