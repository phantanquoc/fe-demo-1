import React from 'react';
import { reportCategories } from '../data/departments';
import { BarChart, PieChart, LineChart, Users, ShoppingCart, Briefcase, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="p-4 md:p-6">
      <h1 className="text-xl md:text-2xl font-bold mb-4 md:mb-6">Dashboard</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="bg-blue-500 text-white p-3 md:p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs md:text-sm opacity-80">Tổng nhân viên</p>
              <p className="text-xl md:text-2xl font-bold">18</p>
            </div>
            <Users className="h-8 w-8 md:h-10 md:w-10 opacity-80" />
          </div>
        </div>
        
        <div className="bg-green-500 text-white p-3 md:p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs md:text-sm opacity-80">Đơn hàng mới</p>
              <p className="text-xl md:text-2xl font-bold">20</p>
            </div>
            <ShoppingCart className="h-8 w-8 md:h-10 md:w-10 opacity-80" />
          </div>
        </div>
        
        <div className="bg-purple-500 text-white p-3 md:p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs md:text-sm opacity-80">Dự án đang thực hiện</p>
              <p className="text-xl md:text-2xl font-bold">7</p>
            </div>
            <Briefcase className="h-8 w-8 md:h-10 md:w-10 opacity-80" />
          </div>
        </div>
        
        <div className="bg-orange-500 text-white p-3 md:p-4 rounded-lg shadow-md">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs md:text-sm opacity-80">Báo cáo chờ duyệt</p>
              <p className="text-xl md:text-2xl font-bold">10</p>
            </div>
            <FileText className="h-8 w-8 md:h-10 md:w-10 opacity-80" />
          </div>
        </div>
      </div>
      
      <h2 className="text-lg md:text-xl font-bold mb-3 md:mb-4">Báo cáo</h2>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {reportCategories.map((category) => (
          <div key={category.id} className="bg-white p-3 md:p-4 rounded-lg shadow border border-gray-200">
            <h3 className="font-medium text-base md:text-lg mb-2 md:mb-3">{category.name}</h3>
            <div className="text-right">
              <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
