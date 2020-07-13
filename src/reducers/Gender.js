const gender = [
    { key: 0, name: '保密' },
    { key: 1, name: '男' },
    { key: 2, name: '女' },
];

const findGender = function (key) {
    for (let i = 0; i < gender.length; i++) {
        if (gender[i].key === key) {
            return gender[i].name;
        }
    }
};

export {
    gender as default,
    findGender
}