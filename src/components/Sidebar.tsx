import React from 'react';
import { departments } from '../data/departments';
import { ChevronDown, ChevronRight, LayoutDashboard, LogOut, User } from 'lucide-react';

interface SidebarProps {
  activeDepartment: string | null;
  setActiveDepartment: (id: string | null) => void;
  activeSubDepartment: string | null;
  setActiveSubDepartment: (id: string | null) => void;
  currentUser: string | null;
  onLogout: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  activeDepartment,
  setActiveDepartment,
  activeSubDepartment,
  setActiveSubDepartment,
  currentUser,
  onLogout
}) => {
  return (
    <div className="w-full h-full bg-gray-800 text-white overflow-y-auto flex flex-col">
      <div className="p-4 border-b border-gray-700 hidden md:block">
        <h1 className="text-xl font-bold">APF System</h1>
      </div>
      
      {/* User info */}
      <div className="p-4 border-b border-gray-700 flex items-center">
        <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-2">
          <User className="h-4 w-4" />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{currentUser || 'Người dùng'}</p>
          <p className="text-xs text-gray-400">Quản trị viên</p>
        </div>
      </div>
      
      <div className="p-2 flex-1">
        <div 
          className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-gray-700 ${activeDepartment === 'dashboard' ? 'bg-gray-700' : ''}`}
          onClick={() => {
            setActiveDepartment('dashboard');
            setActiveSubDepartment(null);
          }}
        >
          <LayoutDashboard className="mr-2 h-5 w-5" />
          <span>Dashboard</span>
        </div>
        
        {departments.map((department) => (
          <div key={department.id} className="mb-2">
            <div 
              className={`flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-700 ${activeDepartment === department.id ? 'bg-gray-700' : ''}`}
              onClick={() => {
                setActiveDepartment(department.id === activeDepartment ? null : department.id);
                setActiveSubDepartment(null);
              }}
            >
              <span>{department.name}</span>
              {activeDepartment === department.id ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </div>
            
            {activeDepartment === department.id && (
              <div className="ml-4 mt-1 space-y-1">
                {department.subDepartments.map((subDep) => (
                  <div 
                    key={subDep.id}
                    className={`p-2 rounded-md cursor-pointer hover:bg-gray-700 ${activeSubDepartment === subDep.id ? 'bg-gray-700' : ''}`}
                    onClick={() => setActiveSubDepartment(subDep.id)}
                  >
                    {subDep.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Logout button */}
      <div className="p-4 border-t border-gray-700">
        <button 
          onClick={onLogout}
          className="flex items-center w-full p-2 rounded-md text-gray-300 hover:bg-gray-700 hover:text-white"
        >
          <LogOut className="mr-2 h-5 w-5" />
          <span>Đăng xuất</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
