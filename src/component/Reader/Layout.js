import React, { memo, useState, } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { Flex, FlexItem, Slot, Drawer, Icon, Scrollor } from '@writ/react';
import { BoundaryBar } from './Component/BoundaryBar';
import { closeReaderLayoutMessageBox } from './reducers/layout';
import styles from './index.module.scss';

const Layout = memo(function ReaderLayout(props) {
    const { closeMessageBox, messageBoxVisible } = props;
    const [addressVisible, setAddressVisible] = useState(true);
    const [asidebarVisible, setAsidebarVisible] = useState(true);

    return (
        <Flex className={styles.container}>
            <FlexItem className={styles.sidebar}>
                <Slot.Install name='sidebar' />
            </FlexItem>
            <FlexItem className={styles.content}>
                <BoundaryBar icon='unfold' position='top' none={addressVisible} onAction={() => setAddressVisible(true)} />
                <BoundaryBar icon={asidebarVisible ? 'more' : 'back'} position='right' none={false} onAction={() => setAsidebarVisible(!asidebarVisible)} />
                <Drawer
                    className={styles.addressDrawer}
                    bodyClassName={styles.addressDrawerBody}
                    placement='top'
                    global={false}
                    mask={false}
                    visible={addressVisible}
                >
                    <Icon type='more' size='2x' className={styles.addressDrawerIcon} />
                    <div className={styles.addressDrawerText}>
                        <Slot.Install name='address' />
                    </div>
                    <div className={styles.addressDrawerExtra} onClick={() => setAddressVisible(false)}>
                        <Icon type='close' size='3x' title='隐藏标题栏' />
                    </div>
                </Drawer>
                <Scrollor viewClassName={classnames(styles.mainContent, {
                    [styles.mainContentNoPadding]: !addressVisible
                })}>
                    <Slot.Install name='content' />
                </Scrollor>
                <Drawer
                    className={styles.addressDrawer}
                    bodyClassName={styles.addressDrawerBody}
                    placement='bottom'
                    global={false}
                    mask={false}
                    visible={messageBoxVisible}
                >
                    <div className={styles.addressDrawerText}>
                        <Slot.Install name='message' />
                    </div>
                    <div className={styles.addressDrawerExtra} onClick={closeMessageBox}>
                        <Icon type='close' size='3x' title='底部说明栏' />
                    </div>
                </Drawer>
            </FlexItem>
            <FlexItem className={classnames(styles.asidebar, asidebarVisible ? undefined : styles.asidebarHidden)}>
                <Slot.Install name='asidebar' />
            </FlexItem>
        </Flex>
    );
});

Layout.defaultProps = {

};
if (window.DEV) {
    Layout.propTypes = {
        closeMessageBox: PropTypes.func,
        messageBoxVisible: PropTypes.bool
    };
}
const mapStateToProps = ({ reader }, ) => {
    return {
        messageBoxVisible: reader.layout.messageBoxVisible,
    };
};
const mapDispatchToProps = {
    closeMessageBox: closeReaderLayoutMessageBox
};

export default connect(mapStateToProps, mapDispatchToProps)(Layout);