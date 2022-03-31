import createAuth0Client, { Auth0Client } from "@auth0/auth0-spa-js";
import { user, isAuthenticated, popupOpen } from "../stores/auth";
import config from "../config/auth.config";

async function createClient(): Promise<Auth0Client> {
  const auth0Client = await createAuth0Client({
    domain: config.domain,
    client_id: config.clientId
  }).then().catch().finally();

  return auth0Client;
}

async function loginWithPopup(client: Auth0Client, options:any) : Promise<void> {
  popupOpen.set(true);
  try {
    await client.loginWithPopup(options);
    user.set(await client.getUser());
    isAuthenticated.set(true);
  } catch (e) {
    // eslint-disable-next-line
    console.error(e);
  } finally {
    popupOpen.set(false);
  }
}

function logout(client:Auth0Client) : void | Promise<void>{
  return client.logout();
}

const auth = {
  createClient,
  loginWithPopup,
  logout
};

export default auth;