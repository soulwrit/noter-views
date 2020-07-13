import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Form, toast, SelectHigh, } from '../lib';
import { http } from '@writ/utils/request-fetch';
import styles from './index.module.scss';

class Editor extends React.PureComponent {
   constructor(props) {
      super();
      this.form = Form.create(props.model, props.value);
   }
   onClear = () => {
      this.form.reset();
   }
   onSubmit = () => {
      try {
         const data = this.form.json();

         data.created_by = this.props.created_by;
         http.post(data.id ? '/grp/upd' : '/grp', data).then(res => {
            if (res.code) {
               throw new Error(res.msg);
            }
            toast.success('群组信息编辑成功！');
         }).catch(error => {
            toast.error(error.message);
         });
      } catch (error) {
         toast.error(error.message);
      }
   }
   searchUser = ({ pageNo, pageSize, value }, callback) => {
      http.get('/user/sea', { pageNo, pageSize, name: value }).then(res => {
         if (res.code) throw new Error(res.msg);
         callback(res.data.rows, res.data.total);
      }).catch(error => {
         toast.error(error.message);
      });
   }
   render() {
      const { form } = this;

      return (
         <>
            <h5 className={styles.title}>新建群组</h5>
            <Form onSubmit={this.onSubmit} style={{ paddingTop: 10 }}>
               <Form.Item model={form.fields.name}>
                  <Input model={form.fields.name} maxLength={50} />
               </Form.Item>
               <Form.Item model={form.fields.member}>
                  <SelectHigh model={form.fields.member} vKey='name' fetch={this.searchUser} tagTheme='muted'></SelectHigh>
               </Form.Item>
               <Form.Item model={form.fields.intro}>
                  <Input.Textarea model={form.fields.intro} rows={3} />
                  <div style={{ marginTop: 10 }}>
                     <Button size='md'>确认</Button>
                     <Button size='md' theme='muted' type='button' onClick={this.onClear}>清空</Button>
                  </div>
               </Form.Item>
            </Form>
         </>
      );
   }
}
Editor.defaultProps = {
   model: {
      name: {
         label: '群组名称',
         required: true,
         placeholder: '请输入群组名称',
         validate(value) {
            if (!value) {
               return '请输入群组名称';
            }
            if (value.length > 50) {
               return '群组名称不超过50个字符'
            }
         },
      },
      intro: {
         label: '群组简介',
         required: true,
         placeholder: '请输入群组简介，用于说明群组的用途特色等',
         validate(value) {
            if (!value) {
               return '请输入群组简介';
            }
            if (value.length > 100) {
               return '群组简介不超过100个字符'
            }
         },
      },
      member: {
         label: '群组成员',
         placeholder: '请输入选择群组成员',
      }
   }
}
if (window.DEV) {
   Editor.propTypes = {
      created_by: PropTypes.number.isRequired,
      value: PropTypes.object
   };
}
export default Editor;