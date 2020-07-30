import marked from 'marked';
import hljs from 'highlight.js';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/atom-one-dark.css';
import 'highlight.js/styles/lightfair.css';
// import './github.css';

export default function parse(value) {
    return marked(value, {
        gfm: true,
        tables: true,
        breaks: false,
        pedantic: false,
        sanitize: false,
        smartLists: true,
        smartypants: false,
        highlight(code) {
            return hljs.highlightAuto(code).value;
        }
    });
}