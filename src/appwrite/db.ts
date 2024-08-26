/* eslint-disable @typescript-eslint/no-explicit-any */
import { Client, Databases, ID } from "appwrite";

export class DatabaseService {
  private client: Client;
  private database: Databases;

  constructor() {
    this.client = new Client()
      .setEndpoint("https://cloud.appwrite.io/v1")
      .setProject(import.meta.env.VITE_APPWRITE_PROJECT_ID as string);
    this.database = new Databases(this.client);
  }

  async listFlow() {
    return await this.database.listDocuments(
      import.meta.env.VITE_DATABASE_ID as string,
      import.meta.env.VITE_COLLECTION_ID as string,
      ["name", "description"]
    );
  }

  async getFlow(document_id: string) {
    return await this.database.getDocument(
      import.meta.env.VITE_DATABASE_ID as string,
      import.meta.env.VITE_COLLECTION_ID as string,
      document_id
    );
  }

  async createFlow(data: Record<string, any>) {
    return await this.database.createDocument(
      import.meta.env.VITE_DATABASE_ID as string,
      import.meta.env.VITE_COLLECTION_ID as string,
      ID.unique(),
      data
    );
  }

  async updateFlow(document_id: string, data: Record<string, any>) {
    return await this.database.updateDocument(
      import.meta.env.VITE_DATABASE_ID as string,
      import.meta.env.VITE_COLLECTION_ID as string,
      document_id,
      data
    );
  }

  async deleteFlow(document_id: string) {
    return await this.database.deleteDocument(
      import.meta.env.VITE_DATABASE_ID as string,
      import.meta.env.VITE_COLLECTION_ID as string,
      document_id
    );
  }
}

const flowService = new DatabaseService();

export default flowService;
