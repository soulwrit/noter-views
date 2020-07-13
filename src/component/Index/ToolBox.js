import React from 'react';
import { connect } from 'react-redux';
import { Suffix, Icon } from '../lib';

import styles from './ToolBox.module.scss';
import { onVisible as onChatModal } from '../../reducers/chat';

const Chat = React.lazy(function () {
    return import('../Chat/Index');
});

class ToolBox extends React.Component {
    onChat = () => {
        this.props.onChat(false);
    }
    render() {
        const { props } = this;
        return (
            <>
                <Suffix>
                    <div className={styles.action} title='群组聊天' onClick={this.onChat}>
                        <Icon type='remind' />
                    </div>
                </Suffix>
                {props.modalChat ? <Chat /> : null}
            </>
        );
    }
}
const mapStateToProps = function (state) {
    return {
        modalChat: state.chat.visible
    };
};
const mapDispatchToProps = {
    onChat: onChatModal
};
export default connect(mapStateToProps, mapDispatchToProps)(ToolBox);