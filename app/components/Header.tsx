import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

interface HeaderProps {
    username: string;
}

const getInitials = (name: string): string => {
    const names = name.split(' ');
    return names
        .map((word) => word.charAt(0))
        .join('')
        .toUpperCase();
};

const Header: React.FC<HeaderProps> = ({ username }) => {
    const [loading, setLoading] = useState(true);
    const initials = getInitials(username);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="flex items-center text-gray-500 mb-[25px]">
            <Link href="/profile">
                <div role="status" className={`max-w-sm ${loading ? 'animate-pulse' : ''} p-4 flex`}>
                    <div>
                        {loading ? (
                            <div className="bg-gray-500 rounded-full w-[50px] h-[50px] mb-4"></div>
                        ) : (
                            <Image
                                src={`data:image/svg+xml,${encodeURIComponent(
                                    `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="rgb(107 114 128)"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="white" font-family="Arial" font-weight="bold">${initials}</text></svg>`
                                )}`}
                                alt={initials}
                                width={50}
                                height={50}
                            />
                        )}
                    </div>
                </div>
            </Link>
            {loading ? (
                <div className="ml-3">
                    <div className={`h-5 bg-gray-400 rounded-full w-32 mb-4 animate-pulse`}></div>
                    <div className={`h-2.5 bg-gray-400 rounded-full w-16 mb-4 animate-pulse`}></div>
                </div>
            ): (
                <div className="ml-3">
                    <p className="text-2xl font-semibold">
                        {username}
                    </p>
                    <p className="text-sm font-semibold">
                        Refueler
                    </p>
                </div>
            )}
        </div>
    );
};

export default Header;
