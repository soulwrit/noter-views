const { app } = require('./resources/index.js')

function query(selector) {
    return selector.startsWith('#') ?
        document.querySelector(selector) :
        document.querySelectorAll(selector);
}
app.draggable(window);
app.addTitleBar();
query('#min-win').addEventListener('click', function (e) {
    app.minimize();
});

query('#max-win').addEventListener('click', function () {
    app.maximize();
});

query('#cls-win').addEventListener('click', function () {
    app.close();
});