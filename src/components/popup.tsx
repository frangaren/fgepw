import React from 'react';
import { HiX } from '@react-icons/all-files/hi/HiX';

import Portal from './portal';

/** {@link PopUp}'s props. */
interface PopUpProps {
    /** Pop-up's icon. */
    icon?: React.ReactNode;

    /** Pop-up's title. */
    title?: React.ReactNode;

    /** Should the pop-up have a differentiated title bar? */
    headless?: boolean;

    /** Pop-up's children. */
    children: React.ReactNode;

    /** Is the pop-up closed? */
    closed?: boolean;

    /** Pop-up's on close event. */
    onClose?: () => void;
}

/** Pop-up component. */
const PopUp: React.FC<PopUpProps> = ({
    icon,
    title,
    headless,
    children,
    closed,
    onClose,
}) => {
    const containerVisibility = closed ? 'opacity-0 pointer-events-none' : 'opacity-100';
    const windowVisibility = closed ? 'scale-0' : 'scale-100';
    const headStyle = headless ? 'h-16' : 'border-b-1 border-gray-200 shadow-sm bg-gray-100';
    return (
        <Portal>
            <div className={`transition-all duration-500 ease-in-out ${containerVisibility} flex items-center justify-center h-screen w-screen backdrop-filter backdrop-blur-sm z-50 absolute left-0 top-0 p-8`}>
                <div className={`transition-all duration-300 ease-in-out transform ${windowVisibility} inline bg-white border-1 border-gray-300 rounded shadow-lg min-w-lg md:min-w-xl h-auto`}>
                    <div className={`h-16 md:h-12 w-full flex text-3xl md:text-xl text-gray-600 pl-4 pr-4 ${headStyle}`}>
                        {icon && (
                            <div className='inline-flex items-center uppercase p-1'>
                                {icon}
                            </div>
                        )}
                        {title && (
                            <div className='inline-flex items-center uppercase p-1 text-base font-bold'>
                                <p>{title}</p>
                            </div>          
                        )}
                        <a href='#' onClick={onClose}    className='inline-flex items-center uppercase p-1 ml-auto'>
                            <HiX/>
                        </a>
                    </div>
                    <div className='p-2 pt-0'>
                        {children}
                    </div>
                </div>
            </div>
        </Portal>
    );
};

export default PopUp;