/* global self */
/* eslint no-restricted-globals: off */
self.MonacoEnvironment = {
    getWorkerUrl: function (moduleId, label) {
        if (label === 'json') {
            return '/js/json.worker.bundle.js';
        }
        if (label === 'css') {
            return '/js/css.worker.bundle.js';
        }
        if (label === 'html') {
            return '/js/html.worker.bundle.js';
        } 
        if (label === 'typescript' || label === 'javascript') {
            return '/js/ts.worker.bundle.js';
        }

        return '/js/editor.worker.bundle.js';
    }
}
