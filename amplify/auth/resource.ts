
import { defineAuth } from "@aws-amplify/backend";
import { postConfirmation } from "./post-confirmation/resource";

export const auth = defineAuth({
  loginWith: {
    email: true,
  },   
  userAttributes: {
    preferredUsername: {
      mutable: true,
      required: true
    }
  },
  groups: ["SUBSCRIBERS", "PILOTS"],
  triggers: {
    postConfirmation,
  },
  access: (allow) => [
    allow.resource(postConfirmation).to(["addUserToGroup"]),
  ],
})
  
