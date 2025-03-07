import Link from "next/link";

const Header = () => {
  return (
    <nav>
      <div>
        <Link prefetch={true} href="/">Home icon?</Link>
        <Link prefetch={true} href="/heroes">Heroes?</Link>
        <Link prefetch={true} href="/items">Items?</Link>
      </div>
    </nav>
  );
};

export default Header;