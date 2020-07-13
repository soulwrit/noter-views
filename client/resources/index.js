const { EventEmitter } = require('events')
const { ipcRenderer } = require('electron')
const kernel = require('./kernel')

class Application extends EventEmitter {
    constructor() {
        super();
    }

    //关闭窗口
    close() {
        ipcRenderer.send('close');
    }
    // 最小化
    minimize() {
        ipcRenderer.send('min');
    }

    // 最大化
    maximize() {
        ipcRenderer.send('max');
    }

    // 拖动
    draggable(el) {
        // 方案二
        let dragging = false;
        let mouseX = 0;
        let mouseY = 0;
        const { remote } = require('electron');

        el.addEventListener('mousedown', (e) => {
            dragging = true;
            const { pageX, pageY } = e;
            mouseX = pageX;
            mouseY = pageY;
        });
        window.addEventListener('mouseup', () => {
            dragging = false;
        });
        window.addEventListener('mousemove', (e) => {
            if (dragging) {
                const { pageX, pageY } = e;
                const win = remote.getCurrentWindow();
                const pos = win.getPosition();
                pos[0] = pos[0] + pageX - mouseX;
                pos[1] = pos[1] + pageY - mouseY;
                win.setPosition(pos[0], pos[1], true);
            }
        });
    }

    // 添加工具栏
    addTitleBar() {
        // 载入样式
        const link = document.createElement('link');
        const head = document.querySelectorAll('head')[0];
        link.href = './resources/title-bar.css';
        link.rel = 'stylesheet';
        head.insertBefore(link, head.firstElementChild);

        // 加入用户标题栏
        const div = document.createElement('div');
        const body = document.body;
        div.className = 'title-bar';
        div.innerHTML = '<a href="javascript:;" id="min-win"></a><a href="javascript:;" id="max-win"></a><a href="javascript:;" id="cls-win"></a>';
        body.insertBefore(div, body.firstElementChild);
    }
}

kernel.register('initialize', function initialize() {
    const app = new Application();

    kernel.register('app', app);
}).fire('initialize');

module.exports = kernel;