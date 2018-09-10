const ls = window.localStorage;
const ss = window.sessionStorage;

const typeJudge = (arg, type) => {
  return Object.prototype.toString.call(arg).slice(8, -1) === type;
}
export const Local = {
  get(key) {
    if (key) return JSON.parse(ls.getItem(key))
    return null
  },
  set(key, value) {
    const arg = arguments[0];
    // 判断传入的是否为对象，是的话遍历存值
    if (typeJudge(arg, "Object")) {
      for (let i in arg) {
        ls.setItem(i, JSON.stringify(arg[i]))
      }
    } else {
      ls.setItem(key, JSON.stringify(value))
    }
  },
  remove(key) {
    ls.removeItem(key)
  },
  clear() {
    ls.clear()
  }
}
export const Session = {
    get(key){
        if(key) return JSON.parse(ss.getItem(key))
        return null
    },
    set(key,value){
        const arg = arguments[0];
        if(typeJudge(arg,"Object")){
            for(let i in arg){
                ss.setItem(i,JSON.stringify(arg[i]))
            }
        }else{
            ss.setItem(key,JSON.stringify(value))
        }
    },
    remove(key){
        if(typeJudge(key,"Array")){
          for(let i in key){
            ss.removeItem(key[i])
          }
        }else{
          ss.removeItem(key)
        }
    },
    clear(){
        ss.clear()
    }
}