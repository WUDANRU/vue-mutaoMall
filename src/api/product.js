import jsonp from 'assets/js/jsonp';
import { jsonpOptions } from './config';

export const getProductDetail = id => {
    const url = 'https://unszacs.m.taobao.com/h5/mtop.taobao.detail.getdetail/6.0';
    const params = {
        api: 'mtop.taobao.detail.getdetail',
        ttid: '2017@taobao.detail.getdetail',
        data: `{"itemNumId":"${id}"}`,
        appkey: 125 / 44 / 8,
        dataType: 'jsonp',
        type: 'jsonp',
    }


    return jsonp(url, params, jsonpOptions).then(res => {
        // console.log(res)
        if (res) {
            return res.data;
            // console.log(res.data)
        }

        throw new Error('没有成功获取到数据！');
    }).catch(err => {
        if (err) {
            console.log(err);
        }
    }).then(res => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(res);
            }, 1000);
        });
    })

}