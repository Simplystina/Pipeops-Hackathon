import { string } from "joi";

export interface PaystackResponse {
  status: boolean;
  message: string;
  data: AuthorizationData;
}

interface AuthorizationData {
  authorization_url: string;
  access_code: string;
  reference: string;
}