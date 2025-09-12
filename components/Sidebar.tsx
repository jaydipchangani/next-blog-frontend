'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FileTextOutlined, PlusOutlined } from '@ant-design/icons';

interface SidebarProps {
  role: 'admin' | 'user';
}

const Sidebar = ({ role }: SidebarProps) => {
  const pathname = usePathname();

  if (!role) return null;

  const menuItems =
    role === 'admin'
      ? [
          { name: 'Dashboard', icon: <FileTextOutlined />, href: '/admin' },
          { name: 'Blog', icon: <PlusOutlined />, href: '/admin/blogs' },
        ]
      : [{ name: 'Blogs', icon: <FileTextOutlined />, href: '/blogs' }];

  return (
    <aside className="w-64 bg-white border-r min-h-screen p-4 hidden md:block">
      <ul className="space-y-2">
        {menuItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center p-2 rounded hover:bg-gray-100 transition ${
                pathname === item.href ? 'bg-gray-200 font-semibold' : ''
              }`}
            >
              <span className="mr-2">{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
