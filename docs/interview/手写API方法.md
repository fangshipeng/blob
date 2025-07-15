# 手写New
```js
Function.prototype.MyNew = function(fn，...args){
  const obj= {}
  obj.__proto__ = fn.prototype
  let result =fn.apply(obj,args)
  
  if( result instanceof Object){
    return result 
  }else{
    return obj
  }
}
//简写
function myNew(constructor,...args){
  // 1.先创建一个对象
  let obj =Object.create(constructor.prototype)
  // 2.改变this指向
  let restult = constructor.apply(obj,args)
  // 3.判断值是否为对象，如果是返回本身，不是返回obj
  return result instancof Object ? result : obj
}

```

# 手写call，apply， bind
```js
// 手动实现一个call函数
Function.prototype.myCall =function (context,..args){
  // 判断调用对象是否是一个函数
  if(typeof this !=='function'){
    throw '被调用的对象必须是一个函数'
  }
  context = context | globalThis
  // 将调用的方法绑定到context上
  let key =Symbol('key')
  context[key] = this
  let result = context[key](...args)
  delete context[key]
  return result
} 
// 手写一个apply
Function.prototype.myApply = function(context,..args){
// 判断调用对象是否是一个函数
  if(typeof this !=='function'){
    throw '被调用的对象必须是一个函数'
  }
  let self =this
  context = context | globalThis
  
  return self.call(context,...args)
}
// 手写一个bind
Function.prototype.myBind = function(context,...args){
  if(type of this !=='function') throw '被调用对象必须是一个函数'
  context = context｜globalThis
  const _this =this
  return fn(...innerArr){
    if(this instanceof fn){
      return new _this(...args,...innerArr)
    } 
    return _this.apply(context,args.concat(innerArr))
  }
}
```

## 手写 Promise 的实现

```js
class MyPromise {
  constructor(executor) {
    this.state = 'pending'; // 初始状态
    this.value = undefined; // 成功的值
    this.reason = undefined; // 失败的原因
    this.onFulfilledCallbacks = []; // 成功回调队列
    this.onRejectedCallbacks = []; // 失败回调队列

    const resolve = (value) => {
      if (this.state === 'pending') {
        this.state = 'fulfilled';
        this.value = value;
        this.onFulfilledCallbacks.forEach((callback) => callback(value));
      }
    };

    const reject = (reason) => {
      if (this.state === 'pending') {
        this.state = 'rejected';
        this.reason = reason;
        this.onRejectedCallbacks.forEach((callback) => callback(reason));
      }
    };

    try {
      executor(resolve, reject);
    } catch (error) {
      reject(error);
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected = typeof onRejected === 'function' ? onRejected : (reason) => { throw reason; };

    const promise2 = new MyPromise((resolve, reject) => {
      if (this.state === 'fulfilled') {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value);
            MyPromise.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === 'rejected') {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason);
            MyPromise.resolvePromise(promise2, x, resolve, reject);
          } catch (error) {
            reject(error);
          }
        });
      } else if (this.state === 'pending') {
        this.onFulfilledCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              MyPromise.resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });

        this.onRejectedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason);
              MyPromise.resolvePromise(promise2, x, resolve, reject);
            } catch (error) {
              reject(error);
            }
          });
        });
      }
    });

    return promise2;
  }

  catch(onRejected) {
    return this.then(null, onRejected);
  }

  finally(onFinally) {
    return this.then(
      (value) => {
        return MyPromise.resolve(onFinally()).then(() => value);
      },
      (reason) => {
        return MyPromise.resolve(onFinally()).then(() => { throw reason; });
      }
    );
  }

  static resolve(value) {
    if (value instanceof MyPromise) {
      return value;
    }
    return new MyPromise((resolve) => resolve(value));
  }

  static reject(reason) {
    return new MyPromise((_, reject) => reject(reason));
  }

  static all(promises) {
    return new MyPromise((resolve, reject) => {
      const results = [];
      let completed = 0;

      promises.forEach((promise, index) => {
        MyPromise.resolve(promise).then((value) => {
          results[index] = value;
          completed += 1;
          if (completed === promises.length) {
            resolve(results);
          }
        }, reject);
      });
    });
  }

  static race(promises) {
    return new MyPromise((resolve, reject) => {
      promises.forEach((promise) => {
        MyPromise.resolve(promise).then(resolve, reject);
      });
    });
  }

  static resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
      return reject(new TypeError('Chaining cycle detected for promise'));
    }

    let called = false;
    if (x && (typeof x === 'object' || typeof x === 'function')) {
      try {
        const then = x.then;
        if (typeof then === 'function') {
          then.call(
            x,
            (y) => {
              if (called) return;
              called = true;
              MyPromise.resolvePromise(promise2, y, resolve, reject);
            },
            (r) => {
              if (called) return;
              called = true;
              reject(r);
            }
          );
        } else {
          resolve(x);
        }
      } catch (error) {
        if (called) return;
        called = true;
        reject(error);
      }
    } else {
      resolve(x);
    }
  }
}
```

