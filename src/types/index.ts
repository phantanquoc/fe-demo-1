export interface Department {
  id: string;
  name: string;
  subDepartments: SubDepartment[];
}

export interface SubDepartment {
  id: string;
  name: string;
}

export interface ReportCategory {
  id: string;
  name: string;
}

export interface GoalPlan {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  assignee: string;
  priority: 'low' | 'medium' | 'high';
}

export interface User {
  username: string;
  fullName: string;
  role: string;
  department?: string;
}
