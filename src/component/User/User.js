export default {
    account: {
        default: 'admin',
        label: '账号',
        placeholder: '请输入账号',
        validate(value) {
            if (value.length > 15 || value.length < 5) {
                return '用户名长度在5至15位之间';
            }
            if (!/^[a-zA-Z0-9_]{5,15}$/.test(value)) {
                return '用户名由字符、数字、_组成，不支持其他字符';
            }
            return true;
        }
    },
    password: {
        label: '密码',
        default: '',
        placeholder: '请输入密码',
        validate(value) {
            if (value.length > 15 || value.length < 6) {
                return '密码长度在6至15位之间';
            }
        }
    },
    pwdConfirm: {
        label: '密码确认',
        default: '',
        placeholder: '请确认密码',
        validate(value, form) {
            if (value !== form.get('password')) {
                return '两次密码不一致';
            }
        }
    },
    name: {
        label: '昵称',
        default: '木偶师',
        placeholder: '请输入昵称',
        required: true,
        validate(value) {
            if (value.length > 15) {
                return '昵称长度不应该大于15';
            }
        }
    },
    gender: {
        label: '性别',
        default: 0,
    },
    email: {
        label: '邮箱',
        default: '',
        placeholder: '请输入邮箱',
        required: true,
        validate(value) {
            if (value.length > 20) {
                return '请将邮箱地址的长度控制在20以内'
            }
        }
    },
    phone: {
        label: '电话',
        default: '',
        placeholder: '请输入手机号码',
        required: true,
        validate(value) {
            if (value.length > 20) {
                return '手机号长度在20以内，大于20时，请考虑你所在区域！';
            }
        }
    },
    intro: {
        label: '个人简介',
        default: undefined,
        placeholder: '请输入个人简介',
        required: true,
        validate(value) {
            if (value.length > 100) {
                return '个人简介应该控制在100个字以内';
            }
        }
    }
};