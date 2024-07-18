export interface AuthProviderService<
  T extends { token: string },
  LoginPayload
> {
  getUser(): T;
  login: (payload: LoginPayload) => Promise<T>;
  logout: () => void;
}
