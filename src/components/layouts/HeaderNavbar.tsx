import { Navbar } from "flowbite-react";
import { Img } from "../ui/Img";

export const HeaderNavbar = () => {
  return (
    <Navbar fluid={true} id="section-header" className="shadow-normal">
      <Navbar.Brand href="/">
        <Img
          src="/images/logo/logo-trans-min.png"
          data-src-full="/images/logo/logo-trans.png"
          alt="Logo"
          className="mr-3 h-6 sm:h-9 relative top-[-2px]"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          VietD
        </span>
      </Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Navbar.Link href="/" active={true}>
          Home
        </Navbar.Link>
        {/*<Navbar.Link href="/navbars">*/}
        {/*  About*/}
        {/*</Navbar.Link>*/}
        {/*<Navbar.Link href="/navbars">*/}
        {/*  Services*/}
        {/*</Navbar.Link>*/}
        {/*<Navbar.Link href="/navbars">*/}
        {/*  Pricing*/}
        {/*</Navbar.Link>*/}
        {/*<Navbar.Link href="/navbars">*/}
        {/*  Contact*/}
        {/*</Navbar.Link>*/}
      </Navbar.Collapse>
    </Navbar>
  );
}
