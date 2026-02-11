"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  href: string;
}

export default function Breadcrumb() {
  const pathname = usePathname();

  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const segments = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "หน้าแรก", href: "/" }
    ];

    const pathMap: { [key: string]: string } = {
      'about': 'เกี่ยวกับเรา',
      'activities': 'กิจกรรม',
      'prayer-rooms': 'ห้องละหมาด',
      'news': 'ข่าวสาร',
      'contact': 'ติดต่อเรา',
      'contents': 'เนื้อหา'
    };

    segments.forEach((segment, index) => {
      const href = '/' + segments.slice(0, index + 1).join('/');
      const label = pathMap[segment] || segment;
      breadcrumbs.push({ label, href });
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (pathname === '/') return null;

  return (
    <nav className="bg-white py-3 px-4" aria-label="Breadcrumb">
      <div className="max-w-7xl mx-auto">
        <ol className="flex items-center space-x-2 text-sm flex-nowrap overflow-hidden">
          {breadcrumbs.map((crumb, index) => (
            <li key={crumb.href} className="flex items-center shrink-0 last:shrink last:min-w-0">
              {index === 0 && <Home className="w-4 h-4 mr-1" />}
              {index > 0 && <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />}
              {index === breadcrumbs.length - 1 ? (
                <span className="text-gray-600 font-medium truncate max-w-[150px] sm:max-w-[300px] md:max-w-none inline-block">{crumb.label}</span>
              ) : (
                <Link
                  href={crumb.href}
                  className="text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {crumb.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
