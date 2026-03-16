const API = "http://localhost:5000/api";

function register(){

const name=document.getElementById("name").value;
const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

fetch(API+"/auth/register",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({name,email,password})
})
.then(res=>res.json())
.then(data=>{
alert("Registered Successfully");
window.location="login.html";
});

}

function login(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

fetch(API+"/auth/login",{
method:"POST",
headers:{"Content-Type":"application/json"},
body:JSON.stringify({email,password})
})
.then(res=>res.json())
.then(data=>{

localStorage.setItem("token",data.token);

window.location="dashboard.html";

});

}

function logout(){

localStorage.removeItem("token");

window.location="login.html";

}

function addBook(){

const title=document.getElementById("title").value;
const author=document.getElementById("author").value;
const year=document.getElementById("year").value;

fetch(API+"/books/add",{

method:"POST",

headers:{
"Content-Type":"application/json",
"Authorization":"Bearer "+localStorage.getItem("token")
},

body:JSON.stringify({
title:title,
author:author,
published_year:year
})

})
.then(res=>res.json())
.then(data=>{
loadBooks();
});

}

function loadBooks(){

fetch(API+"/books",{

headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}

})
.then(res=>res.json())
.then(data=>{

let rows="";

data.forEach(book=>{

rows+=`
<tr>
<td>${book.id}</td>
<td>${book.title}</td>
<td>${book.author}</td>
<td>${book.published_year}</td>
<td>
<button class="btn btn-sm btn-danger" onclick="deleteBook(${book.id})">Delete</button>
</td>
</tr>
`;

});

document.getElementById("bookTable").innerHTML=rows;

});

}

function deleteBook(id){

fetch(API+"/books/"+id,{

method:"DELETE",

headers:{
"Authorization":"Bearer "+localStorage.getItem("token")
}

})
.then(()=>loadBooks());

}