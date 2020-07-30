import React, { Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Icon, Loading, Menu, Dropdown, ViewBox } from '../lib';

import styles from './Index.module.scss';
import routes from '../routes';

import { openUserLogout, onProfileModal } from '../User/reducers';
import { onMessageModal } from '../../reducers/message';
import { onVisible as onChatModal } from '../../reducers/chat';
import { getDefaultMenuKey, menus } from './menu';
import { Logo } from './Logo';

// import Chat from '../Chat/Index';
// import Group from '../Group/Index';
// import JoinGroup from '../Group/JoinGroup';
// import JoinGroupAudit from '../Group/JoinGroupAudit';
// import Message from '../Message/Index';
import Logout from '../User/Logout';
// import Chat from '../Chat/Index';
// import UserProfile from '../User/Profile';
// import GroupProfile from '../Group/Profile';
// import UserFeedbackEditor from '../UserFeedback/Editor';
// import NoticeEditor from '../Notice/Editor'; 
const Chat = React.lazy(() => import('../Chat/Index'));
const Group = React.lazy(() => import('../Group/Index'));
const JoinGroup = React.lazy(() => import('../Group/JoinGroup'));
const JoinGroupAudit = React.lazy(() => import('../Group/JoinGroupAudit'));
const Message = React.lazy(() => import('../Message/Index'));
// const Logout = React.lazy(() => import('../User/Logout'));
const UserProfile = React.lazy(() => import('../User/Profile'));
const GroupProfile = React.lazy(() => import('../Group/Profile'));
const UserFeedbackEditor = React.lazy(() => import('../UserFeedback/Editor'));
const NoticeEditor = React.lazy(() => import('../Notice/Editor'));

class Index extends React.PureComponent {
   onMenu = key => this.props.history.push(routes[key].path);
   render() {
      const { props } = this;
      const { token } = props;
      if (!token) {
         return <Redirect to={routes.login.path} />;
      }

      return (
         <ViewBox.Provider>
            <div className={styles.header}>
               <div className={styles.headerLogo}>
                  <Logo />
               </div>
               <Menu
                  activeClassName={styles.headerNavActive}
                  className={styles.headerNav} onChange={this.onMenu}
                  lineBar={false}
                  lineBarColor='#fff'
                  lineBarDir='rtt'
                  index={getDefaultMenuKey(this.props.location)}
               >{menus.map(({ route, name }) => (
                  <Menu.Item className={styles.headerNavItem} key={name} title={route.name}>
                     <Icon className={styles.headerNavIcon} type={route.icon} /> {route.name}
                  </Menu.Item>
               ))}</Menu>
               <div className={styles.headerRight}>
                  <Icon type='smile' className={styles.headerRightIcon} onClick={props.onChat} />
                  <Icon type='remind' className={styles.headerRightIcon} onClick={props.onMessage} />
                  <Dropdown placement='right' hoverable>
                     <Dropdown.Head>
                        <Icon type='set' className={styles.headerRightIcon} />
                     </Dropdown.Head>
                     <Dropdown.Item value='我的信息' onClick={() => props.onProfile(props.id)} />
                     <Dropdown.Item value='退出' onClick={props.openUserLogout} />
                  </Dropdown>
               </div>
            </div>
            <div className={styles.content}>
               <Suspense fallback={<Loading />}>
                  <Switch>
                     <Route {...routes.editor} />
                     <Route {...routes.reader} />
                     <Route {...routes.forum} />
                     <Route {...routes.about} />
                     <Redirect from={routes.index.path} to={routes.editor.path} />
                  </Switch>
               </Suspense>
            </div>
            <div className={styles.footer}>
               <div className={styles.footerLeft}></div>
               <div className={styles.footerRight}></div>
            </div>
            {props.modalUserLogout ? <Logout /> : null}
            {props.modalChat ? <Chat /> : null}
            {props.modalUserProfile ? <UserProfile /> : null}
            {props.modalMessage ? <Message /> : null}
            {props.modalGroup ? <Group /> : null}
            {props.modalGroupProfile ? <GroupProfile /> : null}
            {props.modalJoinGroup ? <JoinGroup /> : null}
            {props.modalJoinGroupAudit ? <JoinGroupAudit /> : null}
            {props.modalUserFeedbackEditor ? <UserFeedbackEditor /> : null}
            {props.modalNoticeEditor ? <NoticeEditor /> : null}
         </ViewBox.Provider>
      );
   }
}
const mapStateToProps = function (state) {
   return {
      id: state.users.id,
      token: state.users.token,
      modalChat: state.chat.visible,
      modalUserLogout: state.users.logout.visible,
      modalUserProfile: state.users.modalProfile,
      modalMessage: state.message.visible,
      modalGroupProfile: state.groups.modalProfile,
      modalJoinGroup: state.groups.modalJoinGroup,
      modalJoinGroupAudit: state.groups.modalJoinGroupAudit,
      modalUserFeedbackEditor: state.feedback.modalEdit,
      modalNoticeEditor: state.notice.modalEdit,
      modalGroup: state.groups.modalIndex
   };
};
const mapDispatchToProps = {
   onMessage: onMessageModal,
   onProfile: onProfileModal,
   onChat: onChatModal,
   openUserLogout
};
export default connect(mapStateToProps, mapDispatchToProps)(Index);