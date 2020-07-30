import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Slot } from '@writ/react';

const MyGroup = memo(function MGroup(props) {

    return (
        <>
            <Slot name='address'>我的团队</Slot>
            <Slot name='content'></Slot>
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