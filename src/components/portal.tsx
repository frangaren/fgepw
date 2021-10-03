import React from 'react';
import ReactDOM from 'react-dom';

/** {@link Portal}'s props. */
interface IPortalProps {
    /** Portal children. */
    children?: React.ReactNode;
}

/** React portal wrapper. */
const Portal: React.FC<IPortalProps> = ({ children }) => {
    const root = typeof document !== 'undefined' ? document.getElementById('portal') : null;
    if (root && children) {
        return ReactDOM.createPortal(children, root);
    } else {
        return (<></>);
    }
};

export default Portal;
