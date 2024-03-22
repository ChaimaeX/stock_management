
let title = document.getElementById('title');
let price = document.getElementById('price');
let qantite = document.getElementById('qantite');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let total = document.getElementById('total');

let mood = 'create';
let tmp ;
let dataPro;
 if(localStorage.getItem('dataPro')==null){
        let dataPro =  [];
 }else{
        dataPro = JSON.parse(localStorage.getItem('dataPro'));
 }

//get total
function getTotal(){
   if(price.value !=''){
    let result = +price.value * +qantite.value;
    console.log(result);
    total.innerHTML = result+' dh';
    total.style.background='rgb(17, 162, 72)';
   } else{
    total.innerHTML = '';
    total.style.background= 'red';

   }
} 
//creat product

submit.onclick = function() {
   
    let NewPro = {
        title: title.value.toLowerCase(),
        price: price.value,
        qantite: qantite.value,
        total: total.innerHTML,
        category: category.value.toLowerCase(),
    }
    if (title.value != '' && price.value != '') {
    if(mood === 'create'){
     dataPro.push(NewPro);
    }else{
       dataPro[tmp] = NewPro;
       mood = 'create';
       submit.innerHTML = 'create';
    }
    clearData();
    }
    showData();
    //save localstorage 
    localStorage.setItem('dataPro', JSON.stringify(dataPro));
    console.log(dataPro);
    // clearData();
    // showData();
}


//clear imputs
function  clearData(){
    title.value = '';
    price.value = '';
    qantite.value = '';
    category.value = '';
    total.innerHTML = '';


}
showData();
//read

function showData(){
    getTotal();
    let table ='';
    for( let i = 0 ;i < dataPro.length ; i++){
        table += `<tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price} dh</td>
        <td>${dataPro[i].qantite}</td>
        <td>${dataPro[i].total}</td>
        <td>${dataPro[i].category}</td>
        <td><button onclick="updateData(${i})" id="upadate">Update</button></td>
        <td><button onclick="deleteData(${i})" id="delete"> Delete</button></td>
        </tr>`       
     }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');
    if(dataPro.length>0){
        btnDelete.innerHTML = `
           <button onclick="deleteAll()"> Delete All(${ dataPro.length }) </button>`
    }else{
        btnDelete.innerHTML= ''
    }
    

}

//delete
function deleteData(i){
   dataPro.splice(i,1);
   localStorage.setItem('dataPro', JSON.stringify(dataPro));
   showData();
}

//delete all
 function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
 }
//update
function updateData(i){
    tmp=i;
    title.value=dataPro[i].title;
    price.value=dataPro[i].price;
    qantite.value=dataPro[i].qantite;
    getTotal();
    category.value=dataPro[i].category;
    submit.innerHTML= 'update';
    mood = 'update';
    scroll({
        top:0,
        behavior:'smooth',
    });
}
//search
let searchMood='title';
function getSearch(id){
    let search = document.getElementById("search");
    if (id == 'searchTitle'){
        searchMood='title';
    }else{
        searchMood='category';
    }
    search.placeholder='search By '+searchMood;
    //console.log(searchMood);
    search.focus();
    search.value='';
    showData();
}

function searchData(value){
    let table = '';
   
        for( let i = 0;i<dataPro.length;i++)
        {
          if(searchMood == 'title'){
          if(dataPro[i].title.toLowerCase().includes(value.toLowerCase())){
            table += `<tr>
                     <td>${i}</td>
                     <td>${dataPro[i].title} </td>
                     <td>${dataPro[i].price} dh</td>
                     <td>${dataPro[i].qantite}</td>
                     <td>${dataPro[i].total}</td>
                     <td>${dataPro[i].category}</td>
                     <td><button onclick="updateData(${i})" id="upadate">Update</button></td>
                     <td><button onclick="deleteData(${i})" id="delete"> Delete</button></td>
                     </tr>`
            }
        }else{
            if(dataPro[i].category.toLowerCase().includes(value.toLowerCase())){
                table += `<tr>
                         <td>${i}</td>
                         <td>${dataPro[i].title}</td>
                         <td>${dataPro[i].price}</td>
                         <td>${dataPro[i].qantite}</td>
                         <td>${dataPro[i].total}</td>
                         <td>${dataPro[i].category}</td>
                         <td><button onclick="updateData(${i})" id="upadate">Update</button></td>
                         <td><button onclick="deleteData(${i})" id="delete"> Delete</button></td>
                         </tr>`
                }

        }
    }
          
    document.getElementById('tbody').innerHTML = table;

}

//clean data