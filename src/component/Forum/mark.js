import React from 'react'; 
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

import { Grid, Button, Card, Cover, Text, Icon } from '../../lib';
import styles from './index.module.scss';

class MarkManager extends React.Component {
    constructor() {
        super();
        this.state = {
            marks: [
                {
                    title: 'reactjs',
                    cover: 'https://cdn.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.3/dist/img/react.png',
                    descr: 'this is a javascript framework.',
                    count: 12332,
                    total: 1232,
                    focus: 0
                }
            ]
        };
    }

    handleFocus = mark => {
        ++mark.focus;
        mark.focus %= 2;
        this.forceUpdate();
    }

    render() {
        return this.state.marks.map((mark, index) =>
            <Card bordered bodyStyle={{ padding: 0 }} width={240} key={index}>
                <Cover src={mark.cover} />
                <div className='md'>
                    <h3><Link to='/'>{mark.title}</Link></h3>
                    <Text value={mark.descr} />
                    <Grid cell={3} className={styles.markActions} grid>
                        <Grid.Cell span={1} title='关注人数'>
                            <Icon type='hot' />
                            <span className={styles.markActionName}>{mark.count}</span>
                        </Grid.Cell>
                        <Grid.Cell span={1} className='tac' title='文章数'>
                            <Icon type='view-list' />
                            <span className={styles.markActionName}>{mark.total}</span>
                        </Grid.Cell>
                        <Grid.Cell span={1} className='tar'>
                            <Button hollow value={mark.focus ? '已关注' : '关注'} onClick={() => this.handleFocus(mark)} />
                        </Grid.Cell>
                    </Grid>
                </div>
            </Card>
        );
    }
}

export default MarkManager;
