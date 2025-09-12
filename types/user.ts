export interface User {
  id: string;
  name?: string;
  email: string;
  role: 'ADMIN' | 'USER';
  subscription: boolean;
}
