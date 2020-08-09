import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Flex, FlexItem, Avatar, Icon, Scrollor, ViewLink } from '@writ/react';
import styles from '../index.module.scss';
import { views } from '../viewConfig';
import { setReaderViewKey, closeReaderLayoutMessageBox } from '../reducers/layout';

const Sidebar = memo(function NS(props) {
    const { views, closeReaderLayoutMessageBox } = props;

    return (
        <Flex dir='ttr'>
            <FlexItem className={styles.sidebarMenu}>
                {views.map(view => {
                    const isMy = view.key === 'my';

                    return (
                        <ViewLink
                            className={styles.sidebarMenuIcon}
                            key={view.key}
                            to={view.key}
                            type='div'
                            onClick={() => {
                                if (isMy) return;
                                closeReaderLayoutMessageBox()
                            }}
                        >
                            <Avatar
                                size='md'
                                src={view.cover}
                                radius={view.radius} scale={isMy}
                                icon={view.icon}
                            />
                            <div className={styles.sidebarMenuText}>{view.title}</div>
                        </ViewLink>
                    );
                })}
            </FlexItem>
            <FlexItem className={styles.sidebarMyTeam}>
                <h6 className={styles.sidebarMyTeamTitle}><Icon type='smile' size='2x' /> 我的团队</h6>
                <Scrollor viewClassName={styles.sidebarMenu}>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 1, 1, 1, 1].map(i =>
                        <div className={styles.sidebarMenuIcon}>
                            <Avatar size='md' scale={false} />
                            <div className={styles.sidebarMenuText}>团队名称</div>
                        </div>)}
                </Scrollor>
            </FlexItem>
        </Flex>
    );
});
Sidebar.defaultProps = {
    views: []
};
if (window.DEV) {
    Sidebar.propTypes = {
        views: PropTypes.array.isRequired
    };
}
const mapStateToProps = ({ reader }, ) => {
    return {
        views: [].concat(views, reader.layout.views)
    };
};
const mapDispatchToProps = {
    setReaderViewKey,
    closeReaderLayoutMessageBox
};
export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);