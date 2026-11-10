import {
  onAdminContentDelete,
  onAdminContentPost,
  onAdminContentPut,
} from "../../../src/lib/cms/handlers";

export const onRequestPost = onAdminContentPost;
export const onRequestPut = onAdminContentPut;
export const onRequestDelete = onAdminContentDelete;
