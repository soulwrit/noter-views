//获取当前光标位置
function getPosition(element) {
    let caretOffset = 0;
    let doc = element.ownerDocument || element.document;
    let win = doc.defaultView || doc.parentWindow;
    let sel;
    if (typeof win.getSelection != "undefined") {
        //谷歌、火狐
        sel = win.getSelection();
        if (sel.rangeCount > 0) {// 选中的区域
            const range = win.getSelection().getRangeAt(0);
            const preCaretRange = range.cloneRange(); //克隆一个选中区域
            preCaretRange.selectNodeContents(element); //设置选中区域的节点内容为当前节点
            preCaretRange.setEnd(range.endContainer, range.endOffset);  //重置选中区域的结束位置
            caretOffset = preCaretRange.toString().length;
        }
    } else if ((sel = doc.selection) && sel.type != "Control") {
        //IE
        var textRange = sel.createRange();
        var preCaretTextRange = doc.body.createTextRange();
        preCaretTextRange.moveToElementText(element);
        preCaretTextRange.setEndPoint("EndToEnd", textRange);
        caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
}

//设置光标位置
function setPosition(element, pos) {
    let range, selection;
    if (document.createRange) {
        //Firefox, Chrome, Opera, Safari, IE 9+
        range = document.createRange();//创建一个选中区域
        range.selectNodeContents(element);//选中节点的内容
        if (element.innerHTML.length > 0) {
            range.setStart(element.childNodes[0], pos); //设置光标起始为指定位置
        }
        range.collapse(true);       //设置选中区域为一个点
        selection = window.getSelection();//获取当前选中区域
        selection.removeAllRanges();//移出所有的选中范围
        selection.addRange(range);//添加新建的范围
    } else if (document.selection) {
        //IE 8 and lower
        range = document.body.createTextRange(); //Create a range (a range is a like the selection but invisible)
        range.moveToElementText(element);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select(); //Select the range (make it the visible selection
    }
}

export {
    getPosition,
    setPosition
};