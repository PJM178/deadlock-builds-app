import Link from "next/link";
import TestFetchData from "../items/components/TestFetchData";

const Header = () => {
  return (
    <nav>
      <div>
        <Link prefetch={true} href="/">Home icon?</Link>
        <Link prefetch={true} href="/heroes">Heroes?</Link>
        <Link prefetch={true} href="/items">Items?</Link>
        {/* <TestFetchData /> */}
      </div>
    </nav>
  );
};

export default Header;