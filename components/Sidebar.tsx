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
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-64px)] bg-white border-r p-4 hidden md:block z-40">
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
