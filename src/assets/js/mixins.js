//这两个是从search/hot.vue文件的methods里剪切过来的
import { SEARCH_HISTORY_KEYWORD_KEY } from 'pages/search/config'; //往localstorage存东西都需要准备一个key  //准备了一个搜索历史的key SEARCH_HISTORY_KEYWORD_KEY
import storage from 'assets/js/storage';

// import { SEARCH_HISTORY_KEYWORD_KEY } from './config';

// 这个mixins[searchMixin] 是从localStorage本地缓存中拿到的值
export const searchMixin = {
    methods: { //从search/hot.vue文件的methods里剪切过来的要这样写

        $_search_selectItem(keyword) { //keyword是点击的li标签(热卖推荐关键词) 
            //  SEARCH_HISTORY_KEYWORD_KEY 这个翻译为搜索历史的key  
            //   let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []): 是通过localstorage拿到的跟搜索历史的key对应的值

            let keywords = storage.get(SEARCH_HISTORY_KEYWORD_KEY, []) //通过storage(get) 获取key(搜索历史的key),如果没获取到返回一个空的数组,现在是热卖推荐去获取搜索历史的key

            if (keywords.length !== 0) { //!==0表示获取到了    假如历史搜索的是3 2 1，传进来的keyword是2 这段代码keywords.filter(val => val !== keyword);就是只有3 1  又有这段代码keywords.unshift(keyword) 就是3 1 2(顺序是最底下是3，中间是1，最上面是2)
                keywords = keywords.filter(val => val !== keyword); // val !==keyword 保留不相等的 之前的值跟现在的值如果相等会保留现在的放在最新的位置，之前的值跟现在的值不相等的话就会吧现在的值放在最前面
            }
            keywords.unshift(keyword); // 从头开始添加用unshift  // 大的数组用filter数组过滤，// 删除比较小的数组可以用splice，有性能问题 
            storage.set(SEARCH_HISTORY_KEYWORD_KEY, keywords); // keywords就是我们要的数组     mall-search-history-keyword-key ["加湿器","铝框拉杆箱"](点击控制台的Application并且点击历史返回键可以看到Storage下的Local Storage下的网址有这个)

            // 最后会跳到淘宝的一个地址，吧keyword拼接在q后面
            location.href = `https://s.m.taobao.com/h5?event_submit_do_new_search_auction=1&_input_charset=utf-8&topSearch=1&atype=b&searchfrom=1&action=home%3Aredirect_app_action&from=1&sst=1&n=20&buying=buyitnow&q=${keyword}`;
            // 点击热门搜索里的关键词，跳转到淘宝了  点击控制台的Application和历史返回键 看看是否
            // 保存了我们刚才点击的关键词，再点击看看最新点击的是否在最前的位置

        } // storage.get和storage.set这个是之前封装好的js，将对象导出

        //keywords=keywords.filter(val=>val!==keyword) 这句代码的解释: 
        // 里面没有你保存的值的话就直接吧它扔到第一个去，如果有的话就
        // 需要吧之前的删除，然后吧我们最近搜索的放到开头  比如你搜索这些（多层保湿盒 香油 蓝牙）放在相应的历史搜索的位置
        // 不管你有没有我都来查找一下，吧你原来的东西删掉 有的话就删掉，没有的话就删不到，然后吧新的值放到数组的开头

    }


    // 这个热门搜索/历史搜索/搜索结果共用的$_search_selectItem这个js代码 使用mixins
    // mixins: 混合，吧我们的代码掺和进来，可以让三个搜索共同复用$_search_selectItem这个js代码


    // mixins 往源代码混代码的时候，风格用私有的，不加短下划线和$
    // 短下划线和$是vue用的，用$_


};