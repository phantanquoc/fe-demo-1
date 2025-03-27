import React from 'react';
import DepartmentFactory from './departments/DepartmentFactory';

interface DepartmentViewProps {
  departmentId: string;
  subDepartmentId: string | null;
}

const DepartmentView: React.FC<DepartmentViewProps> = ({ departmentId, subDepartmentId }) => {
  return <DepartmentFactory departmentId={departmentId} subDepartmentId={subDepartmentId} />;
};

export default DepartmentView;
