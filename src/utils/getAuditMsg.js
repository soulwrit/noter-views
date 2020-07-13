/**
 * 0 管理员创建了群组
 * 1 uid用户发起了的入组申请；
 * 2 管理员通过了uid用户的申请；- 已同意
 * 3 管理员拒绝了uid用户的申请；- 已拒绝
 * 4 管理员邀请uid用户入组；
 * 5 用户接受了管理员的入组邀请； - 已同意
 * 6 用户拒绝了管理员的入组邀请； - 已拒绝
 * 7 管理员解散了群组
 */
import React from 'react';
export default function getAuditMsg(req, uname, gname) {
    switch (req) {
        case 0: return <>您创建了群组{gname}。</>;
        case 1: return <>{uname}申请加入群组{gname}，请您确认？</>;
        case 2: return <>您通过了{uname}的加入群组{gname}的申请！</>;
        case 3: return <>您拒绝了{uname}的加入群组{gname}的申请。</>;
        case 4: return <>{uname}邀请您加入群组{gname}, 请您确认？</>;
        case 5: return <>您同意了{uname}加入群组{gname}的邀请！</>;
        case 6: return <>您拒绝了{uname}加入群组{gname}的邀请。</>;
        case 7: return <>您解散了群组{gname}。</>;
        default: break;
    }
}