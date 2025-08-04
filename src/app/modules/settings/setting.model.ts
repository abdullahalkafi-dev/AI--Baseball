import { model, Schema } from "mongoose";
import { TPrivacyPage } from "./setting.interface";
const privacyPageSchema = new Schema<TPrivacyPage>({
  content: { type: String, required: true },
});
export const PrivacyPage = model<TPrivacyPage>("PrivacyPage", privacyPageSchema);
