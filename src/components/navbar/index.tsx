import React from "react"
import PureNavBar from "./navbar"

const NavBar = () => {
    return (<PureNavBar
        links={[
            {
                name: 'About me',
                url: '/about',
            },
            {
                name: 'Blog',
                url: '/blog',
            },
            {
                name: 'Projects',
                url: '/projects',
            },
        ]}
        social={{
            linkedin: 'linkedin',
            github: 'github',
        }}
    />)  
};

export default NavBar;