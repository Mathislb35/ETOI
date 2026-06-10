'use client';

import Link from 'next/link';
import {
    LayoutDashboard,
    Users,
    Calendar,
    MessageSquare,
    Settings,
} from 'lucide-react';

const links = [
    {
        label: 'Dashboard',
        href: '/dashboard',
        icon: LayoutDashboard,
    },
    {
        label: 'Intervenants',
        href: '/intervenants',
        icon: Users,
    },
    {
        label: 'Disponibilités',
        href: '/disponibilites',
        icon: Calendar,
    },
    {
        label: 'Messagerie',
        href: '/messages',
        icon: MessageSquare,
    },
    {
        label: 'Paramètres',
        href: '/settings',
        icon: Settings,
    },
];

export default function Sidebar() {
    return (
        <aside className="w-64 border-r border-gray-200 bg-white flex flex-col">
            <div className="h-20 flex items-center px-6 border-b border-gray-200">
                <h1 className="text-xl font-bold text-blue-600">
                    Plateforme2ESR
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className="
                flex items-center gap-3
                px-4 py-3
                rounded-xl
                text-gray-700
                hover:bg-blue-50
                hover:text-blue-600
                transition
              "
                        >
                            <Icon size={20} />
                            <span className="font-medium">
                {link.label}
              </span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}