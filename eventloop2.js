Promise.resolve()
  .then(() => {
    console.log(0);
    return Promise.resolve('4x');
  })
  .then((res) => { console.log(res) })
Promise.resolve()
  .then(() => { console.log(1); })
  .then(() => { console.log(2); }, () => { console.log(2.1) })
  .then(() => { console.log(3); })
  .then(() => { console.log(5); })
  .then(() => { console.log(6); })




Promise.resolve()
  .then(() => {
    console.log(0);// 说是相当于两个then
    return '4x';
  })
  .then((data) => { console.log('then1', data); return data })
  .then((data) => { console.log('then2', data); return data })
  .then((res) => { console.log('2个then之后', res) })
Promise.resolve()
  .then(() => { console.log(1); })
  .then(() => { console.log(2); }, () => { console.log(2.1) })
  .then(() => { console.log(3); })
  .then(() => { console.log(5); })
  .then(() => { console.log(6); })