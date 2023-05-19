import { createHttp } from "./BaseService";

const authenticatedHttp = createHttp(true);

export const getAllUsers = () => authenticatedHttp.get("/users");

export const getEditCurrentUser = ({
  firstName,
  lastName,
  dayOfBirth,
  monthOfBirth,
  yearOfBirth,
  timeOfBirth,
  facialId
}) =>
  authenticatedHttp.patch("/users/me/edit", {
    firstName,
    lastName,
    dayOfBirth,
    monthOfBirth,
    yearOfBirth,
    timeOfBirth,
    facialId
  });

export const getCurrentUser = () => authenticatedHttp.get("/users/me");

export const getUserById = (id) => authenticatedHttp.get(`/users/${id}`);

export const deleteCurrentUserAcc = () =>
  authenticatedHttp.post("/users/me/delete");
