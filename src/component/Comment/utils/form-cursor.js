
/**
 * 测试元素光标向前移动一位
 *  var nowIndex = getPosition(element);
 *  setCaretPosition(element, nowIndex - 1);
 *  console.log(getPosition(element));
 */
export default {

    /**
     * 获取当前光标位置
     * @param ctrl
     * @returns {number}
     */
    getPosition(element) {
        let caretPos = 0;
        console.log(0)
        if (document.selection) {//支持IE
            console.log(1)
            element.focus();
            const Sel = document.selection.createRange();
            Sel.moveStart('character', -element.value.length);
            caretPos = Sel.text.length;
        } else if (element.selectionStart || element.selectionStart == '0') {
            console.log(2)
            //支持firefox
            caretPos = element.selectionStart;
        }
        return caretPos;
    },

    /**
     * 设置光标位置
     * @param ctrl
     * @param pos
     */
    setPosition(element, pos) {
        if (element.setSelectionRange) {
            element.focus();
            element.setSelectionRange(pos, pos);
        } else if (element.createTextRange) {
            const range = element.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    },

    insertContent(content) {
        if (!content) {//如果插入的内容为空则返回
            return;
        }
        let sel = null;
        if (document.selection) { //IE9 以下
            sel = document.selection;
            sel.createRange().pasteHTML(content);
        } else {
            sel = window.getSelection();
            if (sel.rangeCount > 0) {
                let range = sel.getRangeAt(0);      //获取选择范围
                range.deleteContents();             //删除选中的内容
                let el = document.createElement("div"); //创建一个空的div外壳
                el.innerHTML = content;                 //设置div内容为我们想要插入的内容。
                let frag = document.createDocumentFragment();//创建一个空白的文档片段，便于之后插入dom树

                let node = el.firstChild;
                let lastNode = frag.appendChild(node);
                range.insertNode(frag);                 //设置选择范围的内容为插入的内容
                let contentRange = range.cloneRange();  //克隆选区
                contentRange.setStartAfter(lastNode);          //设置光标位置为插入内容的末尾
                contentRange.collapse(true);                   //移动光标位置到末尾
                sel.removeAllRanges();                  //移出所有选区
                sel.addRange(contentRange);             //添加修改后的选区
            }
        }
    }
}
