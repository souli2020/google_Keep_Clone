    const $form = document.querySelector('#form')
    const $noteTitle = document.querySelector('#note-title');
     const $noteText = document.querySelector('#note-text');
    const  $formButtons = document.querySelector('#form-buttons');
  const notes = document.getElementById("placeholder-text")
 
 document.body.addEventListener('click', event => {
    handleFormClick(event)
 })
 
 
function  handleFormClick(event){
    
    const formIsClicked = $form.contains(event.target)
    
    if(formIsClicked)  openForm()
    else               closeForm()
}

function openForm(event){
        $form.classList.add('form-open')
        $noteTitle.style.display= "block"
        $formButtons.style.display="block"
    
}
function closeForm(event){
        $form.classList.remove('form-open')
        $noteTitle.style.display= "none"
        $formButtons.style.display="none"
}
$form.addEventListener('submit', event => {
    event.preventDefault()
   const title = $noteTitle.value
    const text = $noteText.value
   const hasNote = title ||  text
   if(hasNote){
       renderNotes(title + text)
   }
    
    })
    
    function renderNotes(note){
        notes.textContent = note
    }