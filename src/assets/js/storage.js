const storage = window.localStorage; // 客户端缓存用到localstorage  localstorage保存的是字符串，取出来的也是字符串


//  字符串：
//  { "WQR2006":{"data":{"banner":{"linkUrl":"//sale.jd.com/app/act/uyW8R0NSz24333197/1383"}}}  }
//  对象：
//  WQR2006: {data: {banner: {linkUrl: "//sale.jd.com/app/act/uyW8R0NSzUQId2hr.html?ptag=137886.1.11",…},…},…}

export default {
    set(key, val) {
        if (val === undefined) {
            return;
        }
        storage.setItem(key, serialize(val)); // serialize(val) 通过序列化一下我们传进来的值,将它变为字符传，下面用到了JSON.stringify
    },
    get(key, def) {
        const val = deserialize(storage.getItem(key)); // 反序列化(deserialize) 将它转换为JSON格式
        return val === undefined ? def : val; //如果这里最后的val是JSON对象
    },
    remove(key) {
        storage.removeItem(key); // 根据key(键) 清除所有的内容
    },
    clear() {
        storage.clear(); // 不根据key将所有内容都清掉  不能清别人的缓存，只能清自己的
    }
};

function serialize(val) {
    return JSON.stringify(val);
}

function deserialize(val) { //假如传进来是JSON对象，就是走if,返回undefined，假如传进来是字符串，会走try,返回就是JSON对象，假如传进来的是字符串，但是不能被转换为JSON格式，走catch
    if (typeof val !== 'string') {
        return undefined;
    }
    try {
        return JSON.parse(val); // 不能被JSON格式转换(不是标准的JSON格式)
    } catch (e) { // 不是标准的JSON格式怎么办
        return val || undefined; //作的一些处理      
    }
} // 对于catch 之前写了手动抛出错误: throw new Error('没有成功返回数据') catch(err=>{ console.log(err) }) 里面的console.log(err)是捕获手动抛出的错误，
// 对于超时错误/其他错误，有catch就能捕获出来，catch里面不写捕获手动抛出错误的代码就写处理错误的代码
// catch是要写参数的: catch(e)

// true || undefined
// true
// false||undefined
// undefined
// true&&'hello'
// "hello"
// false&&'hello'
// false
// 0&&'hello'
// 0


// 客户端缓存：

// 离线的时候也能看到一些文字内容
// 减少(或不用每次)都去服务端获取数据，减少服务端的压力
// 没有经常变化的内容不需要每次都去服务端获取数据

// Application底下看到的是对象，但是key旁边是字符串(字符串才是实际保存的)


// Promse.resolve( 'hello' )等价于new Promise( resolve=>resolve( 'hello' ) )
// Promse.resolve( ) 返回的是一个Promise实例对象，它不需要使用new
// return new Promise.resolve();， 给它加了一个new就不对了哦