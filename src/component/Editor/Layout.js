import React from 'react';
// import PropTypes from 'prop-types';
import { Flex, FlexItem, Slot } from '@writ/react';
import styles from './index.module.scss';
class Layout extends React.PureComponent {
    constructor() {
        super();
        this.isDown = false;
    }
    onMouseDown = () => {
        this.isDown = true;
        document.addEventListener('mousemove', this.onMouseMove, false);
        document.addEventListener('mouseup', this.onMouseUp, false);
    }
    onMouseMove = e => {
        if (this.isDown) {
            this.menu.style.width = (e.pageX - 2) + 'px';
            this.slide.style.width = (this.menu.parentElement.offsetWidth - e.pageX + 2) + 'px';
        }
    }
    onMouseUp = () => {
        this.isDown = false;
        document.removeEventListener('mousemove', this.onMouseMove);
        document.removeEventListener('mouseup', this.onMouseUp);
    }
    render() {

        return (
            <Flex className={styles.container}>
                <FlexItem className={styles.sidebar} ref={element => this.menu = element}>
                    <div className={styles.activityBar}>
                        <Slot.Install name='menu' />
                    </div>
                    <div className={styles.navContent}>
                        <div className={styles.navHead}>
                            <div className={styles.navTitle}>
                                <Slot.Install name='menuTitle' />
                            </div>
                            <div className={styles.navAction}>
                                <Slot.Install name='menuAction' />
                            </div>
                        </div>
                        <div className={styles.navBody}>
                            <Slot.Install name='menuContent' />
                        </div>
                    </div>
                    <div className={styles.slideBar} onMouseDown={this.onMouseDown} onMouseUp={this.onMouseUp}></div>
                </FlexItem>
                <FlexItem className={styles.content} ref={element => this.slide = element}>
                    <div className={styles.tabs}>
                        <div className={styles.tabItems}>
                            <Slot.Install name='tab' />
                        </div>
                        <div className={styles.tabExtra}>
                            <Slot.Install name='tabExtra' />
                        </div>
                    </div>
                    <div className={styles.mainContent}>
                        <Slot.Install name='content' />
                    </div>
                </FlexItem>
            </Flex>
        );
    }
}

Layout.defaultProps = {
};
if (window.DEV) {
    Layout.propTypes = {
    };
}

export default Layout;