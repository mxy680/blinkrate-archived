import { FaXTwitter } from "react-icons/fa6";
import {
    BiLogoFacebookCircle,
    BiLogoInstagram,
    BiLogoLinkedinSquare,
    BiLogoYoutube,
} from "react-icons/bi";
import { FaMediumM } from "react-icons/fa";

type ImageProps = {
    url?: string;
    src: string;
    alt?: string;
};

type Links = {
    title: string;
    url: string;
};

type SocialMediaLinks = {
    url: string;
    icon: React.ReactNode;
};

type ColumnLinks = {
    links: Links[];
};

type Address = {
    label: string;
    value: string;
};

type Contact = {
    label: string;
    phone: string;
    email: string;
};

type Props = {
    logo: ImageProps;
    address: Address;
    contact: Contact;
    columnLinks: ColumnLinks[];
    socialMediaLinks: SocialMediaLinks[];
    footerText?: string;
    footerLinks: Links[];
};

type FooterProps = React.ComponentPropsWithoutRef<"section"> & Partial<Props>;

const Footer = (props: FooterProps) => {
    const { logo, address, contact, columnLinks, socialMediaLinks, footerText, footerLinks } = {
        ...FooterDefaults,
        ...props,
    } as Props;
    return (
        <footer className="px-[5%] py-12 md:py-18 lg:py-20">
            <div className="container">
                <div className="grid grid-cols-1 gap-x-[4vw] gap-y-12 pb-12 md:gap-y-16 md:pb-18 lg:grid-cols-[1fr_0.5fr] lg:gap-y-4 lg:pb-20 font-secondary">
                    <div>
                        <div className="mb-6 md:mb-8">
                            <a href={logo.url} className='flex items-center gap-4'>
                                <img src={logo.src} alt={logo.alt} className='size-16' />
                                <p className='font-primary text-2xl'>BLINK RATE</p>
                            </a>
                        </div>
                        <div className="mb-6 md:mb-8">
                            <div>
                                <p className="mb-8 text-sm">Solo-developed by Mark Shteyn</p>
                            </div>
                            <div>
                                <p className="mb-1 text-sm font-semibold">{contact.label}</p>
                                <p className="flex flex-col text-sm underline decoration-black underline-offset-1 md:mb-6">
                                    <a href={`tel:${contact.phone}`}>{contact.phone}</a>
                                    <a href={`mailto:${contact.email}`}>{contact.email}</a>
                                </p>
                            </div>
                        </div>
                        <div className="grid grid-flow-col grid-cols-[max-content] items-start justify-start gap-x-3 gap-y-0">
                            {socialMediaLinks.map((link, index) => (
                                <a key={index} href={link.url} className='social-media-icon'>
                                    {link.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 items-start gap-x-6 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-4">
                        {columnLinks.map((column, index) => (
                            <ul key={index}>
                                {column.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className="py-2 text-sm font-semibold">
                                        <a href={link.url} className='hover-underline'>{link.title}</a>
                                    </li>
                                ))}
                            </ul>
                        ))}
                    </div>
                </div>
                <div className="h-px w-full bg-black" />
                <div className="flex flex-col-reverse items-start justify-between pb-4 pt-6 text-sm md:flex-row md:items-center md:pb-0 md:pt-8">
                    <p className="mt-8 md:mt-0 font-secondary">{footerText}</p>
                    <ul className="grid grid-flow-row grid-cols-[max-content] justify-center gap-x-0 gap-y-4 text-sm md:grid-flow-col md:gap-x-6 md:gap-y-0">
                        {footerLinks.map((link, index) => (
                            <li key={index}>
                                <a href={link.url} className='font-secondary hover-underline'>{link.title}</a>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
};

const FooterDefaults: FooterProps = {
    logo: {
        url: "/",
        src: "/Logo.svg",
        alt: "Logo image",
    },
    address: {
        label: "Founder:",
        value: "Mark Shteyn",
    },
    contact: {
        label: "Contact:",
        phone: "+1 (862) 253-7800",
        email: "help@blinkrate.io",
    },
    columnLinks: [
        {
            links: [
                { title: "Link One", url: "#" },
                { title: "Link Two", url: "#" },
                { title: "Link Three", url: "#" },
                { title: "Link Four", url: "#" },
                { title: "Link Five", url: "#" },
            ],
        },
        {
            links: [
                { title: "Link Six", url: "#" },
                { title: "Link Seven", url: "#" },
                { title: "Link Eight", url: "#" },
                { title: "Link Nine", url: "#" },
                { title: "Link Ten", url: "#" },
            ],
        },
    ],
    socialMediaLinks: [
        { url: "https://www.linkedin.com/in/markshteyn/", icon: <BiLogoLinkedinSquare className="size-6" /> },
        { url: "https://medium.com/@markshteyn1", icon: <FaMediumM className="size-6" /> },
        { url: "https://www.instagram.com/markshteyn/", icon: <BiLogoInstagram className="size-6" /> },
        { url: "https://x.com/MShteyn5470", icon: <FaXTwitter className="size-6 p-0.5" /> },
        { url: "https://www.youtube.com/@MarkShteyn-if8jj", icon: <BiLogoYoutube className="size-6" /> }
    ],
    footerText: "© 2024 Mark Shteyn. All rights reserved.",
    footerLinks: [
        { title: "Privacy Policy", url: "/privacy" },
        { title: "Terms of Service", url: "/terms" },
        { title: "Cookies Settings", url: "/cookies" },
    ],
};

export default Footer;