// 函数节流  第一次输入的内容然后还没执行，第二次来了，清空前一次的定时器然后执行，如果还没执行，第三次来了会把第二次的定时器清除，然后执行
export const debounce = (func, delay = 200) => { // 200毫秒后就是下一次来了，就是第二次，第三次
    let timer = null;

    return function(...args) { //args指的是func方法里的this.query，args即输入的query内容 args是数组
        timer && clearTimeout(timer); //先将上一次的定时器给清除，然后200毫秒后执行我们要执行的方法   第一次输入内容，timer是空的，是不会执行timer的，200毫秒后就是第二次，假如第一次还没执行，我就会吧第一次的定时器清除(timer = setTimeout)
        timer = setTimeout(() => {
            func.apply(this, args); //执行这个方法 因为输入的query内容是数组(args),所以用apply这个方法
        }, delay);
    };
};

//search.box/index.vue的console.log(this.query)和search/header.vue的console.log(query)  因为当你输入内容的时候，你每输入一个他就显示一个，当你输入大量的内容的时候，就会触发无数次，所以需要节流函数

// watch:{ //后面使用 debounce这个节流函数
//     query: debounce(function(){
//     this.$emit('query',this.query)

// watch:{ //一开始没有用节流函数
// query(){
//   this.$emit('query',this.query)