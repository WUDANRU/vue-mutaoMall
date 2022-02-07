import axios from 'axios';
import jsonp from 'assets/js/jsonp';
import { jsonpOptions, TIMEOUT } from './config';

// 获取热门搜索数据--ajax  现在的数据是JSON/对象的  之前的数据是这样的 https://so.m.jd.com/ware/hotKeyWord.action?_format_=json 这个数据返回的是字符串 需要用JSON.parse
export const getSearchHotKeyword = () => {
    return axios.get('http://www.imooc.com/api/search/hot', {
        // timeout: 10
        timeout: TIMEOUT
    }).then(res => {
        // console.log(res); //{data: {…}, status: 200, statusText: "OK", headers: {…}, config: {…}, …}
        res = res.data.hotKeyWord //数据返回的是对象，如果返回的是字符串，需要将这里这样写 res = JSON.parse(res.data.hotKeyWord )
            // console.log(res) //{def: Array(12), owner: Array(10)}
        if (res && res.owner) { // succeed
            return res.owner;
            // console.log(res.owner); 这个跟 return res.owner;两个只能显示一个,颜色会变化
        }

        throw new Error('没有成功获取到数据！');
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    }).then(res => {
        //if(res){ return res }  这个也有效果   return new Promise(resolve => {是为了写setTimeout
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(res); //成功之后吧res带出去，成功之后返回res
            }, 1000); //延时一秒是为了显示loading  1秒之前显示loading, 1秒之后显示数据
        });
    });
};

// 获取搜索结果数据--jsonp
export const getSearchResult = keyword => { //jsonp需要拼接url 这里引用了assets/js/jsonp.js
    const url = 'https://suggest.taobao.com/sug';
    const params = {
        q: keyword, // 上面的keyword等于这里的keyword, keyword是query是输入的内容， url拼接q=keyword,输入苹果，就是q=苹果
        code: 'utf-8',
        area: 'c2c',
        nick: '',
        sid: null
    };

    // jsonpOptions.timeout = 100;

    return jsonp(url, params, jsonpOptions).then(res => {
        // console.log(res);
        if (res.result) {
            // console.log(res);
            return res.result;
        }
        throw new Error('没有成功获取到数据！');
    }).catch(err => {
        if (err) {
            console.log(err);
        }
        // return undefined; // 这里有错误是没有做处理的，可能会返回undefined，上面打印的只是暴露了错误并没有作处理
    }).then(res => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(res);
            }, 1000);
        });
    });
};