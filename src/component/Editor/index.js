import React from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import { Icon } from '../lib';

import styles from './index.module.scss';
import Content from './Content';

class Index extends React.Component {
    static defaultProps = {
        menus: [
            {
                icon: 'form',
                title: '资源列表',
                Component: React.lazy(() => import('./Source')),
            },
            {
                icon: 'search',
                title: '检索资源',
                Component: React.lazy(() => import('./Search')),
            },
        ]
    }
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
        };
    }
    onMove = e => {
        if (this.isDown) {
            this.menu.style.width = (e.pageX - 2) + 'px';
            this.slide.style.width = (this.menu.parentElement.offsetWidth - e.pageX + 2) + 'px';
        }
    }
    onMoving = () => {
        this.isDown = true;
        document.addEventListener('mousemove', this.onMove, false);
        document.addEventListener('mouseup', this.onMoved, false);
    }
    onMoved = () => {
        this.isDown = false;
        document.removeEventListener('mousemove', this.onMove);
        document.removeEventListener('mouseup', this.onMoved);
    }
    render() {
        const { state, props } = this;
        const Menu = props.menus[state.index];

        return (
            <div className={styles.box}>
                <div className={styles.left} ref={element => this.menu = element}>
                    <div className={styles.menuBar}>
                        {props.menus.map((menu, index) =>
                            <Icon
                                key={index}
                                type={menu.icon}
                                className={styles.menuIcon}
                                onClick={() => this.setState({ index })}
                            />
                        )}
                    </div>
                    <div className={styles.slideBox}>
                        <Menu.Component />
                    </div>
                    <div className={styles.slideBar} onMouseDown={this.onMoving} onMouseUp={this.onMoved}></div>
                </div>
                <div className={styles.right} ref={element => this.slide = element}>
                    <Content />
                </div>
            </div>
        );
    }
}
const mapStateToProps = ({ users }, props) => {
    return {
        created_by: props.created_by || users.id
    }
}
const mapDispatchToProps = {
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)