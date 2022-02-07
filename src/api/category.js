import axios from 'axios';
import { SUCC_CODE, TIMEOUT } from './config';
// http://www.imooc.com/api/category/content/WQ1970 浏览器打开，不加id是显示打不开的
// network的xhr可以看到点击了tab的id是多少   // 下面获取数据写console.log(res)也可以看到控制台打印的url后带的id是多少，只显示当前点击的一个id


const CancelToken = axios.CancelToken; //取消请求
let cancel;

// 当你乱点的时候会有很多数据 前一次还没发完的请求就不发了，发最后点的

// 获取内容数据--ajax
export const getCategoryContent = (id) => {

    cancel && cancel('取消了前一次的请求!'); // 如果你当前一次请求并没有完成，那就取消掉  //console显示Cancel {message: "取消了前一次的请求!"}
    cancel = null; // 吧cacel赋值为空，没有这个就会一直显示取消了前一次的请求，不会正确显示内容 

    return axios.get(`http://www.imooc.com/api/category/content/${id}`, {
        timeout: TIMEOUT,
        //这个是固定的写法，c是别人封装好的函数，cancel被c赋值也成了函数，可以作为方法调用：
        cancelToken: new CancelToken(function executor(c) {
            cancel = c; // 每次取消请求都会吧c赋值给cancel //写在这里，当错误的时候，可以被捕获错误，跟timeout一样被捕获错误
        })
    }).then(res => {
        // console.log(res.data.content) // 需要点击tab才能打印内容

        if (res.data.code === SUCC_CODE) {
            return res.data.content;

        }

        throw new Error('没有成功获取到数据！');
    }).catch(err => {

        // 原来是这样的
        // if (err) { 
        //     console.log(err);
        // }


        if (axios.isCancel(err)) { // 取消前一次的请求 isCancel是axios内置的
            console.log(err);
        } else {
            // handle error 捕获错误
            console.log(err);
        }
        //一种是其他错误，一种是取消请求的错误

    }); // 跟之前有点不同的是自己不用写延时一秒，后端写了延时一秒，为取消ajax请求准备的
}; //一般我们自己写延时一秒都是用于loading，后端写了延时一秒是取消前一次请求用的，但是我们的loading也用到了这一秒