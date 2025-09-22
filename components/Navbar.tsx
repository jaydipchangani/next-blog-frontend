'use client';
import '@ant-design/v5-patch-for-react-19'; 
import { useAuth } from '../context/AuthContext';
import { Button, Dropdown, MenuProps } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';

const Navbar = () => {
  const { user, logout } = useAuth();

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-50 px-6 py-3 flex justify-between items-center">
      <div className="text-xl font-bold text-gray-800">MyBlogApp</div>
      <div className="flex items-center space-x-4">
        {user && (
          <Dropdown menu={{ items }} placement="bottomRight">
            <div className="flex items-center cursor-pointer space-x-2">
              <UserOutlined className="text-gray-700" />
              <span className="text-gray-700 font-medium">{user.name || user.email}</span>
            </div>
          </Dropdown>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
