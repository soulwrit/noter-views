import React from 'react';
import styles from './index.module.scss';

import ZFB from './zfb.jpg';
import WX_ZF from './wx_zf.png';
import QQ_ZF from './qq_zf.png';

import ME from './me.jpg';
import QQ from './qq.jpg';
import WX from './wx.png';
import QQ_GROUP from './qq_group.jpg';

const About = () => {
    return (
        <div className={styles.box}>
            <div className={styles.resume}>
                <h4 className={styles.title}>介绍下我</h4>
                <div className={styles.photo}>
                    <img src={ME} className={styles.img} alt='我的尊容' />
                </div>
                <div className={styles.detail}>
                    <p>
                        我叫<b>田路刚</b>，男，生于1989年2月26日。
                        2014年底开始了为期半年的“Web前端开发”课程培训，结业后进入软件开发行业，时至今日！
                        虽然不是软件开发选择了我，也不是我选择了它，但我还是喜欢这个职业，而且我还是个喜欢思想输出的人，
                我会用一些方式方法来表达自己的想法，做软件便是其中之一。
                    </p>
                    <p>
                        这是我的思想输出，是我的一种体现；
                        这是我的心血结晶，是我的一种风采；
                        这还有很多瑕疵，我在努力的迭代和完善；
                        这还有很多外延，我在积极的开拓和探索；
                        如果，您觉得有用， 觉得好用， 用的很爽，那么请您随意给点打赏；
                        相信，有了您的支持， 有了您的建议，有了您的加入，我会做的更好；
                        因此，给个红包，来份支持吧！
                    </p>
                    <p>
                        邮箱：<b>2678962889@qq.com</b>
                    </p>
                    <p>
                        手机：<b>133 8494 5722</b>
                    </p>
                </div>
            </div>
            <div className={styles.contact}>
                <h4 className={styles.title}>支持打赏</h4>
                <div className={styles.item}>
                    <img src={WX} className={styles.img} alt='我的微信' />
                </div>
                <div className={styles.item}>
                    <img src={QQ} className={styles.img} alt='我的QQ' />
                </div>
                <div className={styles.item}>
                    <img src={QQ_GROUP} className={styles.img} alt='我的开发圈' />
                    <h5 className='tac'>(399156969)</h5>
                </div>
                <div className={styles.item}>
                    <img src={WX_ZF} className={styles.img} alt='微信支付' />
                </div>
                <div className={styles.item}>
                    <img src={QQ_ZF} className={styles.img} alt='QQ支付' />
                </div>
                <div className={styles.item}>
                    <img src={ZFB} className={styles.img} alt='支付宝' />
                </div>
            </div>
        </div>
    );
}
export default About;