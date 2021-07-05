let arr = ['aakash','bhavan','charnee','dinesh','elavarasan']
for(let i=0;i<3;i++){
    let random=Math.floor(Math.random()*arr.length)
    console.log(arr[random] + ' is being deleted...');
    arr.splice(random,1)
    console.log(arr);
}
// console.log(arr);