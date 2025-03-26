import React, { useState, useEffect } from 'react';
import { Lock, User, AlertCircle, Info } from 'lucide-react';
import axios from 'axios';

interface LoginProps {
  onLogin: (username: string, password: string) => void;
  onSwitchToRegister: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onSwitchToRegister }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [bypassMode, setBypassMode] = useState(false);
  const [isBoltEnvironment, setIsBoltEnvironment] = useState(false);

  // Detect Bolt.diy environment on component mount
  useEffect(() => {
    const hostname = window.location.hostname;
    const isBolt = hostname.includes('bolt.diy') || 
                  hostname.includes('bolt-') || 
                  hostname.includes('replit') ||
                  hostname !== 'localhost';
    
    console.log('Phát hiện môi trường:', { hostname, isBolt });
    setIsBoltEnvironment(isBolt);
    
    // Auto-enable bypass mode in Bolt environment
    if (isBolt) {
      setBypassMode(true);
      console.log('Tự động bật chế độ bypass cho môi trường Bolt.diy');
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!username.trim() || !password.trim()) {
      setError('Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu');
      return;
    }
  
    setIsLoading(true);
    setError(null);
  
    try {
      // For debugging - log the request
      console.log('Đang gửi yêu cầu đăng nhập với:', { email: username, password });
      
      // If bypass mode is enabled or we're in Bolt environment, skip API call
      if (bypassMode || isBoltEnvironment) {
        console.log('Đăng nhập thành công (chế độ bypass)');
        onLogin(username, password);
        setIsLoading(false);
        return;
      }
      
      const response = await axios.post('http://localhost:5000/api/login', {
        email: username,
        password,
      });
  
      console.log('Phản hồi từ server:', response.data);
      onLogin(response.data.user.username, password);
    } catch (error: unknown) {
      console.error('Lỗi đăng nhập:', error);
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || 'Đăng nhập thất bại. Vui lòng kiểm tra thông tin đăng nhập.';
        setError(errorMessage);
        console.log('Chi tiết lỗi:', error.response?.data);
        console.log('Mã lỗi HTTP:', error.response?.status);
        console.log('Headers:', error.response?.headers);
        
        // Check for CORS errors
        if (error.message.includes('Network Error') || !error.response) {
          setError('Lỗi kết nối mạng hoặc CORS. Vui lòng bật chế độ bypass bên dưới.');
        }
      } else {
        setError('Lỗi kết nối đến server. Vui lòng kiểm tra server đã chạy chưa hoặc bật chế độ bypass.');
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-blue-600 p-6 text-center">
            <h1 className="text-2xl font-bold text-white">ABF System</h1>
            <p className="text-blue-100 mt-1">Hệ thống quản lý công ty</p>
          </div>
          
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">Đăng nhập</h2>
            
            {isBoltEnvironment && (
              <div className="mb-4 bg-blue-50 border-l-4 border-blue-500 p-3 rounded">
                <div className="flex items-center">
                  <Info className="h-5 w-5 text-blue-500 mr-2" />
                  <p className="text-sm text-blue-600">
                    Phát hiện môi trường Bolt.diy. Chế độ bypass đã được bật tự động.
                  </p>
                </div>
              </div>
            )}
            
            {error && (
              <div className="mb-4 bg-red-50 border-l-4 border-red-500 p-3 rounded">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
                  Tên đăng nhập
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập tên đăng nhập"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Mật khẩu
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Nhập mật khẩu"
                  />
                </div>
              </div>
              
              {/* Bypass mode toggle for testing */}
              <div className="mb-4 p-3 border border-blue-200 rounded-md bg-blue-50">
                <div className="flex items-center">
                  <input
                    id="bypassMode"
                    type="checkbox"
                    checked={bypassMode}
                    onChange={(e) => setBypassMode(e.target.checked)}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label htmlFor="bypassMode" className="ml-2 block text-sm text-gray-700 font-medium">
                    Chế độ bypass (bỏ qua API)
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-1 ml-6">
                  Bật tùy chọn này nếu bạn gặp lỗi kết nối đến server hoặc đang chạy trong môi trường Bolt.diy
                </p>
              </div>
              
              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Đang xử lý...
                    </>
                  ) : 'Đăng nhập'}
                </button>
              </div>
            </form>
            
            <div className="mt-4 text-center">
              <div className="flex justify-between items-center">
                <a href="#" className="text-sm text-blue-600 hover:text-blue-800">
                  Quên mật khẩu?
                </a>
                <button 
                  onClick={onSwitchToRegister}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Đăng ký tài khoản
                </button>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 px-4 py-3 text-center text-xs text-gray-600 border-t">
            © 2025 ABF System. Bản quyền thuộc về Công ty ABF.
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Hỗ trợ kỹ thuật: <a href="mailto:support@abf.com" className="text-blue-600 hover:text-blue-800">support@abf.com</a></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
