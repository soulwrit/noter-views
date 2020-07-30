import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classnames from 'classnames';
import { Flex, FlexItem, Form, Input, Icon, Tag, TabPlus, TabPane, Text, toast, Slot } from '@writ/react';
import styles from '../index.module.scss';
const FileSearcher = memo(function NS(props) {
    const { form, noHistory, noHotWord, noResults } = props;
    const keyword = form.fields.keyword;
    const onClean = () => {
        form.resetField('keyword');
    }
    const onSubmit = () => {
        try {
            const data = form.json();

            console.log(data);
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <>
            <Slot name='address'>笔记查找</Slot>
            <Slot name='content'>
                <Flex dir='ttr' justifyContent='center' alignItems='center'>
                    <FlexItem width='67%'>
                        <Form onSubmit={onSubmit}>
                            <Form.Item model={keyword}>
                                <Input
                                    model={keyword}
                                    prefix={<Tag value='笔记查找' />}
                                    suffix={suffix => (
                                        <Tag theme='muted' className={suffix.className}>
                                            <Icon size='2x' type='close' className={classnames(styles.searchIcon, {
                                                non: suffix.length === 0
                                            })} onClick={onClean} />
                                            <Icon size='2x' type='search' onClick={onSubmit} />
                                        </Tag>
                                    )}
                                    size='lg'
                                    width='100%'
                                />
                            </Form.Item>
                        </Form>
                    </FlexItem>
                    <FlexItem width='67%'>
                        <TabPlus centered dir='ttr'>
                            <TabPane title={<><Icon type='hot' size='1x' className={styles.searchIcon} />搜索热词</>} key='hotword'>
                                {props.hotWord.length ? props.hotWord.map(word => <div>{word.value}</div>) : <Text>{noHotWord}</Text>}
                            </TabPane>
                            <TabPane title={<><Icon type='info' size='1x' className={styles.searchIcon} />搜索历史</>} key='history'>
                                {props.history.length ? props.history.map(word => <div>{word.value}</div>) : <Text>{noHistory}</Text>}
                            </TabPane>
                            <TabPane title={<><Icon type='view-list' size='1x' className={styles.searchIcon} /> 搜索结果</>} key='results'>
                                {props.results.length ? props.results.map(word => <div>{word.value}</div>) : <Text>{noResults}</Text>}
                            </TabPane>
                        </TabPlus>
                    </FlexItem>
                </Flex>
            </Slot>
        </>
    );
});
FileSearcher.defaultProps = {
    model: null,
    hotWord: [],
    history: [],
    results: [],
    noHotWord: '暂无搜索热词',
    noHistory: '暂无搜索历史',
    noResults: '暂无搜索结果',
};
if (window.DEV) {
    FileSearcher.propTypes = {
        model: PropTypes.object,
    };
}

const mapStateToProps = ({ }, ) => {
    return {
        form: Form.create({
            keyword: {
                default: '',
                placeholder: '找笔记 / 找答案 / 找话题',
                validate(value) {
                    if (!value.length) {
                        return '请输入检索关键词';
                    }
                }
            }
        }, null, 'readerFileSearch')
    };
};
const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(FileSearcher);