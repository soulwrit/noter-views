function ProcessAnimationCanvas({ active }) {
    const [context, setContext] = useState(null);
    const [canvas, setCanvas] = useState(null);
    const [dataList, setDataList] = useState(null);
    //获取指定的canvas元素getContext
    useEffect(() => {
        const canvas = document.getElementById("processAnimationCanvas");
        if (!canvas) return;
        //调用canvas元素的getContext 方法访问获取2d渲染的上下文
        setCanvas(canvas);
        setContext(canvas.getContext("2d"));
    }, [canvas]);
    //创建图片
    const bgProcessImg = new Image();
    bgProcessImg.src = useBaseUrl("img/process@2x.png");
    useEffect(() => {
        if (!context) return;
        //图片加载完后，将其显示在canvas中
        bgProcessImg.onload = function () {
            context.drawImage(this, 0, 0, 1100, 560);
            //改变图片大小到1100,560
        };
    }, [context]);
    //重置页面
    const clearRect = () => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(bgProcessImg, 0, 0, 1100, 560);
    };
    // 二次贝塞尔曲线动画
    function drawCurvePath(start, point, end, percent, color) {
        context.beginPath(); //开始画线
        context.moveTo(start[0], start[1]);
        //画笔移动到起点
        let x, y;
        for (let t = 0; t <= percent / 100; t += 0.005) {
            //获取每个时间点的坐标
            x = quadraticBezier(start[0], point[0], end[0], t);
            y = quadraticBezier(start[1], point[1], end[1], t);
            context.lineTo(x, y); //画出上个时间点到当前时间点的直线
            //添加提示标注
            if (!showTip && t.toFixed(4) == 0.8) {
                //控制标志添加次数
                showTip = true;
                drawArcText(data, count, color);
            }
        }
        context.stroke(); //描边
    }
    //二次贝塞尔曲线方程
    //绘制进度(0-1)
    function quadraticBezier(p0, p1, p2, t) {
        let k = 1 - t;
        return k * k * p0 + 2 * (1 - t) * t * p1 + t * t * p2;
    }
    //绘制信息
    let showTip = false;
    let data = null;
    let percent = 0;
    let count;
    const drawNext = useCallback(
        (index) => {
            //每次重置进程
            showTip = false;
            percent = 0;
            //重置line数据
            data = dataList[index];
            drawline();
        },
        [dataList],
    );
    //标志信息
    function drawArcText(item, index, color) {
        const { lineText, textPoint, arcPoint } = item;
        // context.beginPath();
        context.fillStyle = color;
        context.font = "16px 微软雅黑";
        context.fillText(lineText, ...textPoint);
        context.stroke(); //描边
        context.beginPath();
        context.moveTo(...arcPoint);
        context.arc(arcPoint[0] + 10, arcPoint[1] + 10, 10, 0, 2 * Math.PI);
        context.fill();
        context.beginPath();
        context.fillStyle = "#FFF";
        context.font = "16px 微软雅黑 bold";
        context.fillText(index + 1, arcPoint[0] + 5, arcPoint[1] + 15);
        context.stroke(); //描边
    }
    //画动态路径
    const drawline = useCallback(() => {
        if (!dataList || !data) {
            return;
        }
        context.setLineDash([2, 4]);
        context.lineWidth = 2;
        if (!data.start) return;
        const gnt1 = context.createLinearGradient(...data.start, ...data.end);
        gnt1.addColorStop(0, "#F84243"); //创建渐变的开始颜色，0表示偏移量，个人理解为直线上的相对位置，最大为1，一个渐变中可以写任意个渐变颜色
        gnt1.addColorStop(1, "#FF924E");
        context.strokeStyle = gnt1;
        context.beginPath();
        drawCurvePath(data.start, data.point, data.end, percent, active === "update" ? "#F84243" : "#FF924E");
        percent += 1.2; //进程增加,这个控制动画速度

        if (percent <= 100) {
            //没有画完接着调用,画完的话画下一根
            requestAnimationFrame(drawline);
        } else {
            drawArcText(data, count, active === "update" ? "#F84243" : "#FF924E");
            if (count < dataList.length - 1) {
                count += 1;
                drawNext(count);
            }
        }
    }, [context, dataList]);

    //绘制线
    useEffect(() => {
        if (!dataList) return;
        //先重置画布
        clearRect();
        count = 0;
        percent = 0;
        drawNext(0);
    }, [dataList]);

    useEffect(() => {
        console.log("开始动画");
        setDataList(getDataLineList);
        return () => {
            console.log("停止动画");
        };
    }, []);
    return (
        <canvas width="1100" height="560" id="processAnimationCanvas" className={classnames(styles.canvasDom)}>
            当前浏览器不支持canvas
      </canvas>
    );
}