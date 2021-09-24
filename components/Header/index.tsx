import Link from "next/link";
import { useRouter } from "next/router";
import { memo } from "react";

const Header = ({ fav }: { fav?: boolean }) => {
  const router = useRouter();

  const isHome = router.pathname === "/";

  return (
    <div className="flex justify-between w-full py-6">
      <div>
        <Link href="/">
          <a className="font-code text-6xl md:text-5xl no-underline text-gray-800 hover:text-gray-800">
            <span className="text-purple-700 font-bold">{"<"}</span>
            {"REMOTO"}
            <span className="text-purple-700 font-bold">{"/>"}</span>
          </a>
        </Link>
        <p className="text-gray-500 text-center p-0 font-nunito font-light text-sm">
          Dev jobs para trabalhar de onde quiser.
        </p>
      </div>
      <div className={`pt-4 self-end`}>
        <Link href="/">
          <a
            className={`${
              isHome ? "text-purple-900 font-bold" : "text-purple-700"
            } font-nunito font-light no-underline px-4 py-2 text-purple-700 hover:text-purple-900`}
          >
            Home
          </a>
        </Link>
        <Link href="/favs">
          <a
            className={`${
              fav ? "text-purple-900 font-bold" : "text-purple-700"
            } font-nunito font-light no-underline px-4 py-2 text-purple-700 hover:text-purple-900`}
          >
            Favoritos
          </a>
        </Link>
      </div>
    </div>
  );
};

export default memo(Header);
