export type UserType = {
  email: string;
  firstName: string;
  fullName?: string;
  id: number;
  lastName: string;
  login: string;
  middleName: string;
  name?: string;
  password?: string;
};

export type UserPassword = {
  id?: number,
  setPassword: string,
}
