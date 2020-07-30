import { createElement } from 'react';
import PropTypes from 'prop-types';
import parse from '../lang/Markdown/parse';
export default FilePreview;

const FilePreview = props => {
    const { className, parse, value } = props;
    return createElement('div', {
        className,
        dangerouslySetInnerHTML: {
            __html: parse(value || '')
        }
    });
}

FilePreview.defaultProps = {
    className: 'markdown-body',
    parse,
    value: '',
};
if (window.DEV) {
    FilePreview.propTypes = {
        className: PropTypes.string,
        parse: PropTypes.func,
        value: PropTypes.string,
    };
}