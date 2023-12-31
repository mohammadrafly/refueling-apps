import Link from 'next/link';
import Image from 'next/image';

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

    const initials = getInitials(username);

    return (
        <div className="flex items-center text-gray-500 mb-[25px]">
            <Link href="/profile">
                <Image
                    src={`data:image/svg+xml,${encodeURIComponent(
                        `<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50"><circle cx="25" cy="25" r="25" fill="gray"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-size="20" fill="white" font-family="Arial" font-weight="bold">${initials}</text></svg>`
                    )}`}
                    alt={initials}
                    width={50}
                    height={50}
                />
            </Link>
            <div className="ml-3">
                <p className="text-2xl text-black font-semibold">{username}</p>
                <p className="text-sm bold">Employee</p>
            </div>
        </div>
    );
};

export default Header;
