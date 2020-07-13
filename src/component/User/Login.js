import React, { useEffect, useContext } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button, Checkbox, Form, toast } from '../lib';
import { http } from '@writ/utils/request-fetch';

import { Logo } from '../Index/Logo';
import { ConfigContext } from '../Config/Index';
import styles from './login.module.scss';
import { setUserRequired } from '../../reducers/users';
import routes from '../routes';
import User from './User';

const Login = props => {
   const { account, form, history, keepalive, setUserRequired, token, } = props;
   const { fields } = form;
   const context = useContext(ConfigContext);
   const onSubmit = () => {
      try {
         const autoLogin = keepalive && account && token;
         let data;
         if (!autoLogin) {
            data = form.json(false);
            setUserRequired({
               account: data.account
            });
         } else {
            data = {
               account: account,
               token: token
            };
         }

         http.post(autoLogin ? '/user/keep' : '/user/login', data).then(res => {
            if (res.code) {
               setUserRequired({
                  id: undefined,
                  token: undefined
               });
               throw new Error(res.msg);
            }
            setUserRequired({
               id: res.data.id,
               token: res.data.token
            });
            history.push(routes.index.path);
            toast.success('登录成功');
         }).catch(error => {
            toast.error(error.message);
         });
      } catch (error) {
         toast.error(error.message);
      }
   }

   useEffect(() => {
      const onEnter = e => {
         if (e.keyCode === 13) {
            onSubmit();
         }
      };

      document.body.addEventListener('keyup', onEnter);
      return () => {
         document.body.removeEventListener('keyup', onEnter);
      };
   }, []);

   return (
      <div className={styles.warp}>
         <div className={styles.main}>
            <div className={styles.box}>
               <div className={styles.title}><Logo color={context.themeColor} /> 老田笔记</div>
               <Form>
                  <Form.Item label="账号" model={fields.account}>
                     <Input type="text" model={fields.account} size='xl' />
                  </Form.Item>
                  <Form.Item label="密码" model={fields.password} >
                     <Input type="password" model={fields.password} size='xl' />
                  </Form.Item>
                  <Form.Item label="记住" useLabel={false}>
                     <Checkbox name="keepalive" checked={keepalive} onChange={value => setUserRequired(value)} />
                  </Form.Item>
               </Form>
               <div className="tar sm">
                  <Button link><Link to={routes.register.path}>注册</Link></Button>
                  <Button onClick={onSubmit} value="登录" size="xl" type="primary" />
               </div>
            </div>
         </div>
         <div className={styles.help}>©2019 老田笔记; 当前版本号 1.0.0</div>
      </div>
   );
};

const mapStateToProps = ({ users }) => {
   return {
      keepalive: users.keepalive,
      account: users.account,
      id: users.id,
      token: users.token,
      form: Form.create({
         account: User.account,
         password: User.password
      }, {
         account: users.account
      })
   };
};

const actionsCreator = {
   setUserRequired
};

export default connect(mapStateToProps, actionsCreator)(withRouter(Login));
