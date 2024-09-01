import { RxChevronRight } from "react-icons/rx";
import Link from 'next/link';

type ImageProps = {
  url?: string;
  src: string;
  alt?: string;
};

type NavLink = {
  url: string;
  title: string;
  subMenuLinks?: NavLink[];
};

type Props = {
  logo: ImageProps;
  navLinks: NavLink[];
};

export type NavbarProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

export const Navbar = (props: NavbarProps) => {
  const { logo, navLinks } = {
    ...NavbarDefaults,
    ...props,
  } as Props;

  return (
    <nav className="flex w-full items-center border-b lg:min-h-18 lg:px-[5%]">
      <div className="size-full lg:flex lg:items-center lg:justify-between">
        <div className="flex min-h-16 items-center justify-between px-[5%] md:min-h-18 lg:min-h-full lg:px-0">
          <a href={logo.url} className='flex items-center gap-4'>
            <img src={logo.src} alt={logo.alt} className='size-16' />
            <p className='font-primary text-2xl'>BLINK RATE</p>
          </a>
        </div>
        <div
          className="overflow-hidden px-[5%] lg:flex lg:items-center lg:px-0 lg:[--height-closed:auto] lg:[--height-open:auto]"
        >
          {navLinks.map((navLink, index) => (
            <div key={index} className="first:pt-4 lg:first:pt-0">
              <a href={navLink.url} className="block py-3 text-base lg:px-4 lg:py-2 lg:text-md font-primary hover-underline">
                {navLink.title}
              </a>
            </div>
          ))}
          <div className="mt-6 flex flex-col items-center gap-4 lg:ml-4 lg:mt-0 lg:flex-row">
            <Link href='/test'>
              <button className='btn font-primary flex items-center gap-1'>
                Take the Test
                <RxChevronRight className='size-6 arrow' />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export const NavbarDefaults: NavbarProps = {
  logo: {
    url: "/",
    src: "/Logo.svg",
    alt: "Logo image",
  },
  navLinks: [
    { title: "Our Mission", url: "/mission" },
    { title: "The Process", url: "/process" },
    { title: "Contact Us", url: "/contact" },
  ],
};

export default Navbar;