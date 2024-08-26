import { Account, Client, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account: Account;

  constructor() {
    this.client
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID);
    this.account = new Account(this.client);
  }

  async sendEmailOTP({ email }: { email: string }) {
    return await this.account.createEmailToken(ID.unique(), email, true);
  }

  async verifyOTP({ userID, secret }: { userID: string; secret: string }) {
    return await this.account.createSession(userID, secret);
  }

  async getCurrentSession() {
    return await this.account.get();
  }

  async logout() {
    return await this.account.deleteSessions();
  }
}

const authService = new AuthService();

export default authService;
