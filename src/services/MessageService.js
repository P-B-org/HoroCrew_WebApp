import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const getMessages = (id) => authenticatedHttp.get(`/messages/${id}`);

export const createMessage = ({ id, msg }) =>
  authenticatedHttp.post(`/messages/${id}/create`, { msg });

export const getMessageNotifications = (id) =>
  authenticatedHttp.get(`/users/me/messages/${id}`);
