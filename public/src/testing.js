// function* hello() {
//   let x = 'hello om';
//   yield x;
//   yield 'jai mata di';
// }

// let callFunction = hello();
// console.log(callFunction.next().value);
// console.log(callFunction.next());

// console.log(callFunction.next());

// // console.log(hello().next().value);
// // console.log(hello().next());

// // console.log(hello().next());

// const fruits = ['Banana', 'Orange', 'Apple', 'Mango'];
// fruits.push(fruits.shift());
// console.log(fruits);

function f3() {
  return function f2() {
    console.log('hello function f2');
    return function f1() {
      console.log('hello function f1');
    };
  };

  console.log('hello function f3');
}
f3()();
