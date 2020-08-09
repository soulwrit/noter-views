import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Slot } from '@writ/react';

const MyGroup = memo(function MGroup(props) {

    return (
        <>
            <Slot name='address'>团队笔记列表</Slot>
            <Slot name='content'>
                
            </Slot>
            <Slot name='asidebar'>
                团队成员
            </Slot>
        </>
    );
});
MyGroup.defaultProps = {

};
if (window.DEV) {
    MyGroup.propTypes = {

    };
}
const mapStateToProps = () => {

};
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(MyGroup);