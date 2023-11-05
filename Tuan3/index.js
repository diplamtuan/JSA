// // 3 khai niem khai bao bien
// // var , let , constance

// const animes =[
//   {
//     id:1,
//     name:'Onepice',
//     nameSx: 1990,
//     episode:700,
//     img:'/img/sanpham1.jpg',
//     category:'banhngot'
//   },{
//     id:2,
//     name:'Dragonball',
//     nameSx: 1990,
//     episode:700
//   },{
//     id:3,
//     name:'Naruto',
//     nameSx: 1990,
//     episode:700
//   }
// ]

// function getAnime(inputValue){
//     for(let i=0;i<animes.length;i++){
//         let nameAnime = animes[i].name.toLowerCase()
//         let newInputValue = inputValue.toLowerCase();
//         if(nameAnime.includes(newInputValue)){
//             console.log(animes[i])
//         }else {
//             console.log('Khong tim thay')
//         }
//     }
// }

// getAnime('..')




function xinChao(name){
    alert('xin chao tri va '+name)
}
xinChao('tai')