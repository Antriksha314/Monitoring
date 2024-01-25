import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { RiArrowDownSLine, RiArrowUpSLine } from "react-icons/ri";

export const Header = () => {
  const { push } = useRouter();

  const [isUpArrow, setIsUpArrow] = useState(true);

  const handleLogOut = () => {
    if (typeof window !== undefined) {
      localStorage.clear();
      push("/");
    }
  };

  return (
    <header className="bg-black text-white fixed top-0 w-full z-30">
      <nav className="px-6 relative">
        <div className="flex justify-between items-center">
          <h2>Monitoring system</h2>
          <div className="flex">
            <div
              className="p-2 cursor-pointer flex items-center"
              onClick={() => setIsUpArrow(!isUpArrow)}
            >
              <Image
                src="/profile-pic.png"
                alt="profile-pic"
                height={40}
                width={40}
                className="rounded-full"
              />
              {isUpArrow ? (
                <RiArrowUpSLine />
              ) : (
                <>
                  <RiArrowDownSLine />
                  <div className="absolute top-12 right-10 z-40 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                      <li>
                        <p
                          onClick={handleLogOut}
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Log out
                        </p>
                      </li>
                      <li>
                        <Link
                          href="/reset-password"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Reset password
                        </Link>
                      </li>
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};