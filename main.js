const input=document.querySelector(".input-grp input")
const inputBtn = document.querySelector(".input-grp button")
const todoContainer= document.querySelectorAll('.box')
const todobox=document.querySelector(".box ul")
const todoBoxInput= document.querySelectorAll(".box li>span")
const todo= document.getElementsByTagName("li")
const modalTxt= document.querySelector(".modal-txt p")
const modalAlert= document.querySelector(".modal-alert")
const todoList= document.querySelectorAll(".box ul>li")
const boxBtn= document.querySelector(".boxbtn")
var list=[...todo]


input.addEventListener('keypress',(event)=>{
    if(event.key=="Enter"){
        if(input.value=='')
            alert("Enter a valid task")
        else
            add(input.value)
            localStorage.setItem("todoTasks",JSON.stringify([...JSON.parse(localStorage.getItem('todoTasks')||'[]'),{todotask:input.value}]))
            input.value=''

    }
    
})


inputBtn.addEventListener('click',(event)=>{
    event.preventDefault();
    if(input.value=='')
            alert("Enter a valid task")
    else
        add(input.value)
        localStorage.setItem("todoTasks",JSON.stringify([...JSON.parse(localStorage.getItem('todoTasks')||'[]'),{todotask:input.value}]))
    input.value=''
})


document.addEventListener('DOMContentLoaded',()=>{
    const fetchedLists=[...JSON.parse(localStorage.getItem('todoTasks'))]
    fetchedLists.forEach((val)=>{
        todoContainer[1].style.display="flex"
        let p=document.createElement('p')
        let li = document.createElement('li')
        let span= document.createElement('span')
        p.textContent=val.todotask
        span.textContent='✖️'
        li.append(p)
        li.append(span)
        span.setAttribute('onclick',"removeitem(event)")
        todobox.append(li)
        li.setAttribute('onclick','Alert(event)')
         list=[...todo]
    })
})


function add(val){
    todoContainer[1].style.display="flex"
    let p=document.createElement('p')
    let li = document.createElement('li')
    let span= document.createElement('span')
    p.textContent=val
    span.textContent='✖️'
    li.append(p)
    li.append(span)
    span.setAttribute('onclick',"removeitem(event)")
    todobox.append(li)
    li.setAttribute('onclick','Alert(event)')
     list=[...todo]
}


function removeitem(event){
     event.target.parentNode.remove()
    const fetchedLists=[...JSON.parse(localStorage.getItem('todoTasks'))]
    fetchedLists.forEach(val=>{
        if(val.todotask==event.target.parentNode.children[0].innerText){
            fetchedLists.splice(fetchedLists.indexOf(val),1)
        }
    })
  localStorage.setItem('todoTasks',JSON.stringify(fetchedLists))

}



    function Alert(event){
   
if(event.target.tagName.toLowerCase()=="p")
{
        modal.style.display="grid"
       modalTxt.innerText=event.target.innerText;
       modal.classList.remove('hide')
}
else if(event.target.tagName.toLowerCase()=='span'){
    modal.style.display="none"
}
else{
    modal.style.display="grid"
    modalTxt.innerText=event.target.children[0].innerText;
    modal.classList.remove('hide')
}
// complete Butoom action start
complete=()=>{
    modal.classList.add('hide')
    modalAlert.classList.add('modalAnime')
    alertbox('Congratulations you have Successfully completed✅','green')
    setTimeout(()=>{
        modalAlert.classList.remove('modalAnime')
    },2000)
    event.target.style.color="black"
    if(event.target.tagName.toLowerCase()=="p"){
        event.target.parentNode.style.backgroundColor="lightgreen"
        setTimeout(()=>{
            event.target.parentNode.remove()
        },2000)
        completeBtn.removeEventListener('click',complete)
        const fetchedLists=[...JSON.parse(localStorage.getItem('todoTasks'))]
        fetchedLists.forEach(val=>{
            if(val.todotask==event.target.innerText){
                fetchedLists.splice(fetchedLists.indexOf(val),1)
            }
        })
      localStorage.setItem('todoTasks',JSON.stringify(fetchedLists))
    }
    else{
        event.target.style.backgroundColor="lightgreen"
        setTimeout(()=>{
            event.target.remove()
        },2000)
        completeBtn.removeEventListener('click',complete)
        const fetchedLists=[...JSON.parse(localStorage.getItem('todoTasks'))]
        fetchedLists.forEach(val=>{
            if(val.todotask==event.target.children[0].innerText){
                fetchedLists.splice(fetchedLists.indexOf(val),1)
            }
        })
      localStorage.setItem('todoTasks',JSON.stringify(fetchedLists))
    }
    completeBtn.removeEventListener('click',complete)      
}
completeBtn.addEventListener('click',complete,false)
// complete Butoom action ends

// incomplete button action starts
incomplete=()=>{
    modal.classList.add('hide')
    modalAlert.classList.add('modalAnime')
    alertbox('Sorry you have failed the task👎','orangered')
    setTimeout(()=>{
        modalAlert.classList.remove('modalAnime')
    },2000)
     event.target.style.color='black'
     if(event.target.tagName.toLowerCase()=="p"){
        event.target.parentNode.style.backgroundColor="rgba(234, 47, 5, 0.685)"
        incompleteBtn.removeEventListener('click',incomplete,false)
    }
    else{
        event.target.style.backgroundColor="rgba(234,47,5,0.685)"
        incompleteBtn.removeEventListener('click',complete)
    }
    
     completeBtn.removeEventListener('click',complete) 
       
}
incompleteBtn.addEventListener('click',incomplete,false)

// incomplete button action starts
}



const modal= document.querySelector(".modal")
const completeBtn= document.getElementById("completeBtn");
const  incompleteBtn = document.getElementById("incompleteBtn");
const modaldltBtn= document.querySelector('#modaldltBtn')



modaldltBtn.addEventListener('click',()=>{
    modal.classList.add('hide')
    incompleteBtn.removeEventListener('click',incomplete,false)
    completeBtn.removeEventListener('click',complete)
})

 

function alertbox(msg,color){
    modalAlert.style.backgroundColor=color
    modalAlert.children[0].innerText=msg
}



boxBtn.addEventListener("click",(event)=>{
    const fetchedLists=[...JSON.parse(localStorage.getItem('todoTasks'))]

    for(let i =0;i<list.length;i++){
        setTimeout(()=>{
            list[i].remove()
        },i*200)
        fetchedLists.forEach(val=>{
            fetchedLists.pop()
        })
    }
    setTimeout(()=>{
        todoContainer[1].style.display="none"
    },list.length*300)
    

    localStorage.setItem('todoTasks',JSON.stringify(fetchedLists))
})



