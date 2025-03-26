import React, { useState } from 'react';
import { GoalPlan } from '../types';
import { PlusCircle, Edit, Trash2, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import GoalPlanForm from './GoalPlanForm';

interface GoalPlanViewProps {
  departmentName: string;
  onClose: () => void;
}

const GoalPlanView: React.FC<GoalPlanViewProps> = ({ departmentName, onClose }) => {
  const [goalPlans, setGoalPlans] = useState<GoalPlan[]>([
    {
      id: '1',
      title: 'Tăng năng suất sản xuất 15%',
      description: 'Cải thiện quy trình sản xuất để tăng năng suất lên 15% trong quý 3',
      startDate: '2023-07-01',
      endDate: '2023-09-30',
      status: 'in-progress',
      assignee: 'Nguyễn Văn A',
      priority: 'high'
    },
    {
      id: '2',
      title: 'Đào tạo nhân viên mới',
      description: 'Tổ chức chương trình đào tạo cho 5 nhân viên mới về quy trình làm việc',
      startDate: '2023-08-15',
      endDate: '2023-08-30',
      status: 'pending',
      assignee: 'Trần Thị B',
      priority: 'medium'
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingGoal, setEditingGoal] = useState<GoalPlan | null>(null);

  const handleSave = (goalPlan: GoalPlan) => {
    if (editingGoal) {
      setGoalPlans(goalPlans.map(gp => gp.id === editingGoal.id ? goalPlan : gp));
      setEditingGoal(null);
    } else {
      setGoalPlans([...goalPlans, goalPlan]);
    }
  };

  const handleEdit = (goalPlan: GoalPlan) => {
    setEditingGoal(goalPlan);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mục tiêu/kế hoạch này?')) {
      setGoalPlans(goalPlans.filter(gp => gp.id !== id));
    }
  };

  const getStatusBadge = (status: GoalPlan['status']) => {
    switch (status) {
      case 'pending':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800"><Clock className="w-3 h-3 mr-1" /> Chưa bắt đầu</span>;
      case 'in-progress':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"><AlertCircle className="w-3 h-3 mr-1" /> Đang thực hiện</span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" /> Hoàn thành</span>;
      case 'delayed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800"><Clock className="w-3 h-3 mr-1" /> Tạm hoãn</span>;
      default:
        return null;
    }
  };

  const getPriorityBadge = (priority: GoalPlan['priority']) => {
    switch (priority) {
      case 'low':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">Thấp</span>;
      case 'medium':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">Trung bình</span>;
      case 'high':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Cao</span>;
      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Mục tiêu và kế hoạch - {departmentName}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-base font-medium">Danh sách mục tiêu và kế hoạch</h3>
            <button 
              onClick={() => {
                setEditingGoal(null);
                setShowForm(true);
              }}
              className="flex items-center text-sm bg-blue-600 text-white px-3 py-1.5 rounded hover:bg-blue-700"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Thêm mới
            </button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tiêu đề
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Người phụ trách
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thời gian
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Trạng thái
                  </th>
                  <th scope="col" className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ưu tiên
                  </th>
                  <th scope="col" className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {goalPlans.map((goalPlan) => (
                  <tr key={goalPlan.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{goalPlan.title}</div>
                      <div className="text-xs text-gray-500 max-w-xs truncate">{goalPlan.description}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{goalPlan.assignee}</div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <div className="text-xs text-gray-500">
                        {new Date(goalPlan.startDate).toLocaleDateString('vi-VN')} - {new Date(goalPlan.endDate).toLocaleDateString('vi-VN')}
                      </div>
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {getStatusBadge(goalPlan.status)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      {getPriorityBadge(goalPlan.priority)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button 
                        onClick={() => handleEdit(goalPlan)}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => handleDelete(goalPlan.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {goalPlans.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-3 py-4 text-center text-sm text-gray-500">
                      Chưa có mục tiêu hoặc kế hoạch nào. Hãy thêm mới!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-medium mb-2">Hướng dẫn</h4>
            <ul className="text-xs text-gray-600 space-y-1">
              <li>• Thêm mục tiêu và kế hoạch mới bằng cách nhấn nút "Thêm mới"</li>
              <li>• Cập nhật trạng thái của mục tiêu khi có tiến độ mới</li>
              <li>• Đảm bảo các mục tiêu có người phụ trách rõ ràng</li>
              <li>• Mục tiêu ưu tiên cao sẽ được theo dõi chặt chẽ hơn</li>
            </ul>
          </div>
        </div>
      </div>
      
      {showForm && (
        <GoalPlanForm 
          departmentName={departmentName}
          onClose={() => setShowForm(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
};

export default GoalPlanView;
