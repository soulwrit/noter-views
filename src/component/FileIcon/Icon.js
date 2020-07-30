import React from 'react';
import { ReactComponent as IconFileNew } from './assets/file-new.svg';
import { ReactComponent as IconFolderClose } from './assets/folder-close.svg';
import { ReactComponent as IconFolderClosed } from './assets/folder-closed.svg';
import { ReactComponent as IconFolderNew } from './assets/folder-new.svg';
import { ReactComponent as IconFolderOpen } from './assets/folder-open.svg';
import { ReactComponent as IconFolderOpened } from './assets/folder-opened.svg';
import { ReactComponent as IconMarkdown } from './assets/markdown.svg';
export const getFileIcon = (file, status) => {
    switch (file.type) {
        case 1: return status.expanded ? <IconFolderClose className='svgico' /> : <IconFolderOpen className='svgico' />;
        case 2: return <IconMarkdown className='svgico' />;
        default: return 'form';
    }
}
export const getFileIconByClosed = (file, closed) => {
    switch (file.type) {
        case 1: return closed ? <IconFolderOpened /> : <IconFolderClosed />;
        case 2: return <IconMarkdown />;
        default: return <IconMarkdown />;
    }
}
export {
    IconFileNew,
    IconFolderClose,
    IconFolderClosed,
    IconFolderNew,
    IconFolderOpen,
    IconFolderOpened,
};