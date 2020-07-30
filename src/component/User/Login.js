import React, { useContext, memo, useCallback } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Button, Checkbox, Form, toast, useEnter } from '@writ/react';
import { request } from '@writ/utils/request-fetch';

import routes from '../routes';
import { Logo } from '../Index/Logo';
import { ConfigContext } from '../Config/Index';
import { setUserRequired, clsUserRequired } from './reducers/required';
import { setUserKeepLogin } from './reducers/login';
import User from './User';
import styles from './login.module.scss';

const Login = memo(props => {
   const { account, form, history, checked, clsUserRequired, setUserRequired, setUserKeepLogin, token, } = props;
   const { fields } = form;
   const context = useContext(ConfigContext);
   const onSubmit = useCallback(() => {
      try {
         const isAutoLogin = checked && account && token;
         const opts = isAutoLogin ? {
            url: '/user/keep',
            method: 'post',
            options: {
               headers: {
                  Authorization: token
               }
            }
         } : {
               url: '/user/login',
               method: 'post',
               body: form.json(false)
            };

         request(opts).then(res => {
            if (res.code) {
               throw new Error(res.msg);
            }
            setUserKeepLogin(checked, account);
            setUserRequired(res.data.id, res.data.token);
            history.push(routes.index.path);
            toast.success('登录成功');
         }).catch(error => {
            clsUserRequired();
            toast.error(error.message);
         });
      } catch (error) {
         toast.error(error.message);
         clsUserRequired();
      }
   }, [checked, account, token, form]);

   useEnter(onSubmit, [checked, account, token, form]);

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
                     <Checkbox name="checked" checked={checked} onChange={setUserKeepLogin} />
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
});

const mapStateToProps = ({ users }) => {
   const { account, checked, } = users.login;

   return {
      account,
      checked,
      token: users.token,
      id: users.id,
      form: Form.create({
         account: Object.assign({}, User.account, {
            default: account
         }),
         password: User.password
      }, {
         account: users.account
      })
   };
};

const actionsCreator = {
   clsUserRequired,
   setUserRequired,
   setUserKeepLogin,
};

export default connect(mapStateToProps, actionsCreator)(withRouter(Login));
