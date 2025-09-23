'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileTextOutlined, PlusOutlined, MenuOutlined } from '@ant-design/icons';
import { Drawer, Button } from 'antd';

interface SidebarProps {
  role: 'admin' | 'user';
}

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  if (!role) return null;

  const menuItems =
    role === 'admin'
      ? [
          { name: 'Dashboard', icon: <FileTextOutlined />, href: '/admin' },
          { name: 'Blog', icon: <PlusOutlined />, href: '/admin/blogs' },
        ]
      : [
          { name: 'Blogs', icon: <FileTextOutlined />, href: '/blogs' },
          { name: 'Featured Blog', icon: <PlusOutlined />, href: '/blogs/top-blogs' },
        ];

  const renderMenu = (isMobile = false) => (
    <ul className="space-y-2">
      {menuItems.map((item) => (
        <li key={item.href}>
          <Link
            href={item.href}
            className={`flex items-center p-2 rounded hover:bg-gray-100 transition ${
              pathname === item.href ? 'bg-gray-200 font-semibold' : ''
            }`}
            onClick={() => isMobile && setOpen(false)} // close drawer on mobile
          >
            <span className="mr-2">{item.icon}</span>
            <span>{item.name}</span>
          </Link>
        </li>
      ))}
    </ul>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-white border-r p-4 hidden md:block z-40">
        {renderMenu()}
      </aside>

      {/* Mobile Hamburger */}
      <div className="md:hidden fixed top-4 left-4 z-500">
        <Button
          type="text"
          icon={<MenuOutlined style={{ fontSize: '24px' }} />}
          onClick={() => setOpen(true)}
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="left"
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ padding: '16px' }}
      >
        {renderMenu(true)}
      </Drawer>
    </>
  );
};

export default Sidebar;
