import { ofetch } from "ofetch";

export const api = ofetch.create({
  baseURL: "https://symphonybackend-6a4k.onrender.com",
});
