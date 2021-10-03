import React from 'react';
import PopUp from '../popup';
import { Link } from 'gatsby';
import { GrGithub } from '@react-icons/all-files/gr/GrGithub';
import { GrLinkedinOption } from '@react-icons/all-files/gr/GrLinkedinOption';
import { ILinkDTO, ISocialDTO } from './dto';

/** {@link PopUpMenu}'s props. */
export interface IPopUpMenuProps {
    /** Links present in the pop up menu. */
    links: Array<ILinkDTO>;

    /** Social network information. */
    social: ISocialDTO;

    /** Is the pop-up menu closed? */
    closed?: boolean;

    /** Pop-up menu on close event. */
    onClose: () => void;
}

/** Pop-up navigation bar menu. */
const PopUpMenu: React.FC<IPopUpMenuProps> = ({
    links,
    social,
    closed = false,
    onClose = () => undefined,
}) => {
    return (
        <PopUp
            headless
            closed={closed}
            onClose={onClose}
        >
            <MenuLinks links={links}/>
            <Socials {...social}/>
        </PopUp>
    );
};

export default PopUpMenu;

/** {@link MenuLinks}' props. */
interface IMenuLinksProps {
    /** Pop-up menu links. */
    links: Array<ILinkDTO>;
}

/** Pop-up menu links component. */
const MenuLinks: React.FC<IMenuLinksProps> = ({
    links,
}) => {
    const classNames = [
        'border-b-1',
        'border-gray-200',
        'flex',
        'flex-col',
        'font-semibold',
        'm-2',
        'mb-4',
        'mt-0',
        'pb-4',
        'text-gray-800',
        'text-xl',
    ];
    return (
        <ul className={classNames.join(' ')}>
        {
            links.map(link => (<MenuLink key={link.name} {...link}/>))
        }
        </ul>
    );
};

/** {@link MenuLink}' props. */
interface MenuLinkProps extends ILinkDTO {}

/** Pop-up menu link component. */
const MenuLink: React.FC<MenuLinkProps> = ({
    name,
    url,
}) => {
    const classNames = [
        'p-2',
    ];
    return (
        <Link to={url} className={classNames.join(' ')}>
            {name}
        </Link>
    );
};

/** {@link Socials}' props. */
interface ISocialsProps extends ISocialDTO {}

/** Pop-up menu social networks component. */
const Socials: React.FC<ISocialsProps> = ({
    github,
    linkedin,
}) => {
    const classNames = [
        'flex',
        'flex-row',
        'm-2',
        'mt-0',
        'text-gray-800',
        'text-3xl',
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

/** Pop-up menu link component. */
const Social: React.FC<SocialProps> = ({
    children,
    url,
}) => {
    const classNames = [
        'p-2',
    ];
    return (
        <Link to={url} className={classNames.join(' ')}>
            {children}
        </Link>
    );
};