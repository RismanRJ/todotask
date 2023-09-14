// form validation 

const formEl=document.forms.feedbackForm
const submitBtn= formEl.submitBtn


formEl.addEventListener('submit',(e)=>{
    e.preventDefault();
    const formData= new FormData(formEl)
    const formobject= Object.fromEntries(formData)
    const json= JSON.stringify(formobject)
    console.log(json);
})


