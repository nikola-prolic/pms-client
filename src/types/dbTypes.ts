export type Invite = {
  id: string;
  userId: string;
  userEmail: string;
  organizationId: string;
  organization: Organization;
  user: User;
};

export type User = {
  id: string;
  name: string;
  email: string;
  organizationId?: string;
  organization?: Organization;
  invite?: Invite;
  tasks: Task[];
  projects: Project[];
};

export type Organization = {
  id: string;
  name: string;
  adminId: string;
  users: User[];
  projects: Project[];
  invites: Invite[];
};

export type Project = {
  id: string;
  name: string;
  estimatedHours: number;
  actualHours: number;
  status: Status;
  organizationId: string;
  deadline: Date;
  createdAt: Date;
  startedAt: Date;
  completedAt: Date;
  projectOwnerId: string;
  stakeHolders: string[];
  organization: Organization;
  projectOwner: User;
  tasks: Task[];
};

export type Task = {
  id: string;
  name: string;
  estimatedHours: number;
  actualHours: number;
  status: Status;
  deadline: Date;
  createdAt: Date;
  startedAt: Date;
  completedAt: Date;
  projectId: string;
  assignedUserId?: string;
  project: Project;
  assignedUser?: User;
};

export enum Status {
  CREATED = "CREATED",
  IN_PROGRESS = "IN_PROGRESS",
  COMPLETE = "COMPLETE",
  OVERDUE = "OVERDUE",
  ON_HOLD = "ON_HOLD",
  CLOSED = "CLOSED",
  BLOCKED = "BLOCKED",
}
