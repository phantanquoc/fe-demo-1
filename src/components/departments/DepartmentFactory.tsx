import React from 'react';
import QualityDepartment from './QualityDepartment';
import SynthesisDepartment from './SynthesisDepartment';
import BusinessDepartment from './BusinessDepartment';
import AccountingDepartment from './AccountingDepartment';
import PurchasingDepartment from './PurchasingDepartment';
import ProductionDepartment from './ProductionDepartment';
import TechnicalDepartment from './TechnicalDepartment';

interface DepartmentFactoryProps {
  departmentId: string;
  subDepartmentId: string | null;
}

const DepartmentFactory: React.FC<DepartmentFactoryProps> = ({ departmentId, subDepartmentId }) => {
  switch (departmentId) {
    case 'quality':
      return <QualityDepartment subDepartmentId={subDepartmentId} />;
    case 'synthesis':
      return <SynthesisDepartment subDepartmentId={subDepartmentId} />;
    case 'business':
      return <BusinessDepartment subDepartmentId={subDepartmentId} />;
    case 'accounting':
      return <AccountingDepartment subDepartmentId={subDepartmentId} />;
    case 'purchasing':
      return <PurchasingDepartment subDepartmentId={subDepartmentId} />;
    case 'production':
      return <ProductionDepartment subDepartmentId={subDepartmentId} />;
    case 'technical':
      return <TechnicalDepartment subDepartmentId={subDepartmentId} />;
    default:
      return <div className="p-4 md:p-6">Không tìm thấy bộ phận</div>;
  }
};

export default DepartmentFactory;
