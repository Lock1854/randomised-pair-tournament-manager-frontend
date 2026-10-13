export type Report = {
  id: string;
  userId: string;
  user: User;
  clientId: string;
  client: Company;
  monthReport: Date;
  activities: Player[];
  comment?: string | null;
};

export type User = {
  id: string;
  reports: Report[];
  companies: Company[];
};

export type Company = {
  id: string;
  businessName: string;
  reports: Report[];
  userCreatorId: string;
  userCreator: User;
};

export type Player = {
  joueureuseId: string;
  nom: string;
  tournoiId: string;
  nbMatchsJoues?: number;
  nbVictoires?: number;
  aGagne?: boolean;
  roundStreak?: number;
};

export type TimeWorked = "FULL_DAY" | "HALF_DAY";
