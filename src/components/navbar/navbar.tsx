import PopUpMenu from './popup_menu'; 
import React, { useState } from 'react';
import RawLogo from '../../resources/svg/logo.svg';
import { Link } from 'gatsby';
import { GrGithub } from '@react-icons/all-files/gr/GrGithub';
import { GrLinkedinOption } from '@react-icons/all-files/gr/GrLinkedinOption';
import { HiMenu } from '@react-icons/all-files/hi/HiMenu';
import { ILinkDTO, ISocialDTO } from './dto';

/** {@link NavBar}'s props. */
export interface INavBarProps {
    /** Links present in the navigation bar. */
    links: Array<ILinkDTO>;

    /** Social network information. */
    social: ISocialDTO;
}

/** Navigation bar component. */
const NavBar: React.FC<INavBarProps> = ({
    links,
    social,
}) => {
    const navClassNames = [
        'bg-code',
        'block',
        'fixed',
        'h-24',
        'shadow-lg',
        'text-white',
        'w-full',
    ];
    const ulClassNames = [
        'max-w-screen-lg',
        'flex',
        'h-full',
        'items-center',
        'mx-auto',
    ];
    return (
        <nav className={navClassNames.join(' ')}>
            <ul className={ulClassNames.join(' ')}>
                <Logo/>
                <NavBarLinks links={links}/>
                <Socials {...social}/>
                <Hamburger links={links} social={social}/>
            </ul>
        </nav>
    );
};

export default NavBar;

/** {@link NavBarLinks}' props. */
interface INavBarLinksProps {
    /** Links in the navigation bar. */
    links: Array<ILinkDTO>,
}

/** Navigation bar links component. */
const NavBarLinks: React.FC<INavBarLinksProps> = ({
    links
}) => {

    return (
        <>
        {
            links.map(link => (<NavBarLink key={link.name} {...link}/>))
        }
        </>
    );
};

/** {@link NavBarLink}' props. */
interface NavBarLinkProps extends ILinkDTO {}

/** Navigation bar link component. */
const NavBarLink: React.FC<NavBarLinkProps> = ({
    name,
    url,
}) => {
    const liClassNames = [
        'hidden',
        'md:inline-flex',
        'ml-4',
        'mr-4',
    ];
    const linkClassNames = [
        'duration-300',
        'hover:tdc-secondary',
        'tdc-transparent',
        'tdt-md',
        'transition-all',
        'underline',
        'uo-lg',
    ];
    return (
        <li className={liClassNames.join(' ')}>
            <Link to={url} className={linkClassNames.join(' ')}>
                {name}
            </Link>
        </li>
    );
};

/** {@link Socials}' props. */
interface ISocialsProps extends ISocialDTO {}

/** Navigation bar social networks component. */
const Socials: React.FC<ISocialsProps> = ({
    github,
    linkedin,
}) => {
    const classNames = [
        'flex-row',
        'inline-flex',
        'items-center',
        'ml-auto',
        'text-4xl',
    ];
    return (
        <ul className={classNames.join(' ')}>
            <Social url={github}><GrGithub/></Social>
            <Social url={linkedin}><GrLinkedinOption/></Social>
        </ul>
    );
}

/** {@link Social}' props. */
interface SocialProps {
    /** Icon of the social network. */
    children: React.ReactNode;

    /** URL to the social network. */
    url: string;
}

/** Navigation bar link component. */
const Social: React.FC<SocialProps> = ({
    children,
    url,
}) => {
    const liClassNames = [
        'hidden',
        'md:inline-flex',
        'ml-4',
        'mr-4',
    ];
    const linkClassNames = [
        'duration-300',
        'hover:text-secondary',
        'text-white',
        'transition-all',
    ];
    return (
        <li className={liClassNames.join(' ')}>
            <Link to={url} className={linkClassNames.join(' ')}>
                {children}
            </Link>
        </li>
    );
};

/** {@link Logo}'s props. */
interface ILogoProps {}

/** Navigation bar logo component. */
const Logo: React.FC<ILogoProps> = () => {
    const liClassNames = [
        'inline-flex',
        'mr-4',
    ];
    const linkClassNames = [
        'duration-300',
        'hover:text-secondary',
        'text-white',
        'transition-all',
    ];
    const logoClassNames = [
        'h-20',
        'inline',
    ];
    return (
        <li className={liClassNames.join(' ')}>
            <Link to='/' className={linkClassNames.join(' ')}>
                <RawLogo className={logoClassNames.join(' ')}/>
            </Link>
        </li>
    );
};

/** {@link Hamburger}'s props. */
interface IHamburgerProps {
    /** Links present in the navigation bar. */
    links: Array<ILinkDTO>;

    /** Social network information. */
    social: ISocialDTO;
}

/** Navigation bar logo component. */
const Hamburger: React.FC<IHamburgerProps> = (props) => {
    const [closed, setClosed] = useState(true);
    const liClassNames = [
        'inline-flex',
        'md:hidden',
        'mr-4',
    ];
    const linkClassNames = [
        'duration-300',
        'hover:text-secondary',
        'text-6xl',
        'text-white',
        'transition-all',
    ];
    return (
        <li className={liClassNames.join(' ')}>
            <Link to='/' className={linkClassNames.join(' ')}>
                <HiMenu onClick={() => setClosed(false)}/>
            </Link>
            <PopUpMenu
                closed={closed}
                onClose={() => setClosed(true)}
                {...props}
            />
        </li>
    );
};