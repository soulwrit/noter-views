import React, { useContext, useState, useRef } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Input, Radio, Button, Form, toast, Modal } from '@writ/react';

import { Logo } from '../Index/Logo';
import { ConfigContext } from '../Config/Index';
import { http } from '@writ/utils/request-fetch';
import genders from '../../reducers/Gender';
import { setUserRequired } from './reducers';
import routes from '../routes';
import User from './User';
import styles from './register.module.scss';

const Register = props => {
   const size = 'xl';
   const timerRef = useRef(null);
   const countRef = useRef(30);
   const [count, setCount] = useState(30);
   const [visible, setVisible] = useState(false);
   const { form, history } = props;
   const { fields } = form;
   const context = useContext(ConfigContext);
   const onSubmit = () => {
      try {
         const data = form.json();
         delete data.pwdConfirm;
         http.post('/user/register', data).then(res => {
            if (res.code) {
               throw new Error(res.msg);
            }
            props.setUserRequired({
               id: res.data.id,
               token: res.data.token,
               account: data.account
            });
            setVisible(true);
            timerRef.current = setInterval(() => {
               if (countRef.current === 0) {
                  return onAutoLogin();
               }
               countRef.current -= 1;
               setCount(countRef.current)
            }, 1000);
            toast.success('注册成功');
         }).catch(error => {
            toast.error(error.message);
         });
      } catch (error) {
         toast.error(error.message);
      }
   };
   const onAutoLogin = isReturn => {
      if (timerRef.current) {
         clearInterval(timerRef.current);
         timerRef.current = null;
      }
      setVisible(false);
      history.push(isReturn ? routes.login.path : routes.index.path);
   };
   const onCloseAutoLoginModal = () => {
      setVisible(false);
   };

   return (
      <div className={styles.regBox}>
         <div className={styles.regWrap}>
            <h1 className={styles.regTitle}><Logo color={context.themeColor} /> 用户注册</h1>
            <Form isRow labelClassName={styles.regAlgin} onSubmit={onSubmit}>
               <Form.Item required model={fields.account}>
                  <Input type="text" model={fields.account} size={size} />
               </Form.Item>
               <Form.Item required model={fields.password}>
                  <Input type="password" model={fields.password} size={size} />
               </Form.Item>
               <Form.Item required model={fields.pwdConfirm}>
                  <Input type="password" model={fields.pwdConfirm} size={size} />
               </Form.Item>
               <Form.Item model={fields.name}>
                  <Input type="text" model={fields.name} size={size} />
               </Form.Item>
               <Form.Item model={fields.gender}>
                  <Radio.Group name='gender' model={fields.gender}>
                     {genders.map(gender => <Radio value={gender.name} key={gender.key} />)}
                  </Radio.Group>
               </Form.Item>
               <Form.Item model={fields.email}>
                  <Input type="email" model={fields.email} size={size} />
               </Form.Item>
               <Form.Item model={fields.phone}>
                  <Input type="text" model={fields.phone} size={size} />
               </Form.Item>
               <Form.Item model={fields.intro}>
                  <Input.Textarea model={fields.intro} />
               </Form.Item>
               <Form.Item className={styles.regSubmit} label=' '>
                  <Button value="提交" size={size} />
                  <Button value="返回" size={size} type='button' theme='muted' onClick={() => onAutoLogin(true)} />
               </Form.Item>
            </Form>
            <Modal visible={visible} onClose={onCloseAutoLoginModal} footer={
               <>
                  <Button value='确认' key={0} onClick={() => onAutoLogin()} />
                  <Button value='返回' key={1} onClick={() => onAutoLogin(true)} theme='muted' />
               </>
            }>
               <p>是否在 {count} 秒自动登录？</p>
            </Modal>
         </div>
      </div>
   );
};

const mapStateToProps = () => {
   return {
      form: Form.create({
         account: User.account,
         password: User.password,
         pwdConfirm: User.pwdConfirm,
         gender: User.gender,
         name: User.name,
         email: User.email,
         phone: User.phone,
         intro: User.intro,
      })
   };
};

export default connect(mapStateToProps, { setUserRequired })(withRouter(Register));