import React from 'react';
import { connect } from 'react-redux';
// import classnames from 'classnames';

import { Icon, Input, Form, Grid, Divider, toast, Modal, Button } from '../lib';
import styles from './index.module.scss';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.form = Form.create({
            keyword: {
                default: '',
                placeholder: '找笔记 / 找答案 / 找话题',
                validate(value) {
                    if (!value.length) {
                        return '请输入检索关键词';
                    }

                    return true;
                }
            }
        });
    }

    onVisible = () => this.setState({ visible: !this.state.visible });
    handleSearch = () => {
        try {
            this.form.json();
        } catch (error) {
            toast.error(error.message);
        }
    }

    render() {
        const { props, form, state } = this;

        return (
            <>
                <Form className={styles.searchHeader}>
                    <Form.Item className={styles.searchLabel}
                        model={form.fields.keyword}
                        extra={
                            <>
                                <Icon type='search' className={styles.searchIcon}
                                    onClick={this.handleSearch} />
                                <Divider />
                                <Icon
                                    type='close'
                                    onClick={this.onVisible}
                                    className={styles.searchIcon} style={{ fontSize: 22 }} />
                            </>
                        }>
                        <Input model={form.fields.keyword} className={styles.searchEnter} />
                    </Form.Item>
                </Form>
                <Button onClick={this.onVisible}>返回</Button>
                <Button>确认</Button>
                <Button>重置</Button>
                <Grid cell={4}>
                    <Grid.Cell span={1}>
                        <div className={styles.searchHotWord}>搜索热词</div>
                        {
                            props.hotWord.length
                                ? <ul multiple>{
                                    props.hotWord.map((word, index) =>
                                        <li key={index}>{word.value}</li>
                                    )}</ul>
                                : <div className={styles.searchHold}>
                                    <Icon type='info' size='2x' /> 暂无搜索热词</div>
                        }
                    </Grid.Cell>

                    <Grid.Cell span={1}>
                        <div className={styles.searchHistory}>搜索历史</div>
                        {
                            props.history.length
                                ? props.history.map(word => {
                                    return <div>{word.value}</div>
                                })
                                : <div className={styles.searchHold}>
                                    <Icon type='info' size='2x' /> 暂无搜索历史</div>
                        }
                    </Grid.Cell>

                    <Grid.Cell span={1}>
                        <div className={styles.searchHistory}>搜索结果</div>
                    </Grid.Cell>
                </Grid>
            </>
        );
    }
}

const mapStateToProps = ({ search }) => {
    return {
        hotWord: search.hotWord,
        history: search.historyWord
    };
};

const actionCreators = {

};

export default connect(mapStateToProps, actionCreators)(Search);