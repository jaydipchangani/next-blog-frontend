'use client';
import '@ant-design/v5-patch-for-react-19'; 
import { useAuth } from '../context/AuthContext';
import { Button, Dropdown, MenuProps } from 'antd';
import { LogoutOutlined, UserOutlined, MenuOutlined } from '@ant-design/icons';
import { useState } from 'react';

interface NavbarProps {
  onHamburgerClick?: () => void;
}

const Navbar = ({ onHamburgerClick }: NavbarProps) => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: logout,
    },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white shadow z-50 px-4 md:px-6 flex items-center justify-between">
      
      <div className="md:hidden">
        
      </div>

      <div className="absolute left-1/2 transform -translate-x-1/2  md:static md:transform-none text-xl font-bold text-gray-800 md:pl-24">
        Blog App
      </div>

      <div className="flex items-center space-x-4">
        {user && (
          <Dropdown menu={{ items }} placement="bottomRight">
            <div className="flex items-center cursor-pointer space-x-2">
              <UserOutlined className="text-gray-700" />
              <span className="hidden sm:inline text-gray-700 font-medium">
                {user.name || user.email}
              </span>
            </div>
          </Dropdown>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
