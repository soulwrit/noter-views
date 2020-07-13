import React from 'react';
import PropTypes from 'prop-types';
import { array, toHTMLNode, emitter, EVENTS } from './utils';
import './index.scss';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showChildren: false
        }
        emitter.on(EVENTS.MESSAGE_SHOW_CHILDREN + props.index, this.childrenToggle);
    }

    childrenToggle = () => {
        this.setState({
            showChildren: !this.state.showChildren
        });
    }

    render() {
        if (!this.props.title) return null;
        const { indent, avator, title, content, nested, extra, notation, actions } = this.props;

        return (
            <div className='cmt-nest'>
                <div className='cmt-msg'>
                    <div className='cmt-avt'>
                        {avator}
                    </div>
                    <div className='cmt-cnt'>
                        <div className='cnt-hd'>
                            {title}
                            {extra}
                        </div>
                        <div className='cnt-bd'>
                            <div dangerouslySetInnerHTML={{ __html: content }}></div>
                        </div>
                        <div className='cnt-ft'>
                            <div className='cnt-time'>
                                {notation}
                            </div>
                            <div className='cnt-acts'>
                                {actions}
                            </div>
                        </div>

                        {this.state.showChildren && (<div className='cnt-ot'> {this.props.children} </div>)}
                    </div>
                </div>
                {nested && (<div className={!indent ? 'cmt-int' : null}>{nested}</div>)}

            </div>
        );
    }
};

Comment.propTypes = {
    avator: PropTypes.node,
    title: PropTypes.node,
    content: PropTypes.node,
    nested: PropTypes.node,
    extra: PropTypes.array,
    actions: PropTypes.array,
    notation: PropTypes.array,
    indent: PropTypes.bool,
    index: PropTypes.string
};

Comment.defaultProps = {
    avator: null,
    title: null,
    content: null,
    extra: array,
    actions: array,
    notation: array,
    indent: false,
    index: null
};


