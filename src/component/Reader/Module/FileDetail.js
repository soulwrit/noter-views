import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Slot } from '@writ/react';

const FileDetail = memo(function Detail(props) {
    return (
        <>
            <Slot name='address'>笔记详情</Slot>
            <Slot name='content'>
                {detail ? (
                    <>
                        <div className={styles.detailInfo} title={state.detail.category_intro}>
                            更新时间：<span className={styles.detailMuted}>{state.detail.updated_at}</span>
                            <p></p>
                            内容摘要：<span className={styles.detailMuted}>{state.detail.intro}</span>
                        </div>
                        <div className='markdown-body' dangerouslySetInnerHTML={{ __html: markdown(state.detail.content || '') }} />
                    </>
                ) : '加载中 ...'}
            </Slot>
        </>
    );
});
FileDetail.defaultProps = {
    fileId: null
};
if (window.DEV) {
    FileDetail.propTypes = {
        fileId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired
    };
}
const mapStateToProps = () => {

};
const mapDispatchToProps = {

};
export default connect(mapStateToProps, mapDispatchToProps)(FileDetail);