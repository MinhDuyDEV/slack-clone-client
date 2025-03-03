export interface User {
  id: string;
  username: string;
  fullName: string;
  displayName: string;
  email: string;
  avatar: string | null;
  isOnline: boolean;
  lastSeen: string | null;
}
