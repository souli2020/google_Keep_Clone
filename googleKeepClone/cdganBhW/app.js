            const $form = document.querySelector('#form')
        const $noteTitle = document.querySelector('#note-title');
        const $noteText = document.querySelector('#note-text');
        const  $formButtons = document.querySelector('#form-buttons');
       const $placeholder = document.getElementById("placeholder-text")
       const $notes = document.querySelector('#notes');
       const $close =  document.querySelector('#form-close-button')
       const $modal = document.querySelector(".modal")
       const  $modalTitle = document.querySelector(".modal-title");
       const $modalText = document.querySelector(".modal-text");
      const $modalCloseButton = document.querySelector('.modal-close-button')

                     
       let notes = []
       let title =''
       let text = ""
       let id =""
 
 document.body.addEventListener('click', event => {
    handleFormClick(event)
     selectNote(event)
    openModal(event)
 })
   
  
 
 
 
function  handleFormClick(event){
              title = $noteTitle.value
                  text = $noteText.value
                 

            const formIsClicked = $form.contains(event.target)
            
            if(formIsClicked)  openForm()
            else  if( title || text)
                {
                renderNotes({title,text})
                }
            
            else closeForm()
  
}


 

function selectNote(event){
       const $selectedNote = event.target.closest('.note');
     if(!$selectedNote) return
     const [$noteTitle, $noteText] = $selectedNote.children;
     title = $noteTitle.textContent;
     text = $noteText.textContent;
     id=  $selectedNote.dataset.id
     console.log(title, text)
 }
 function openModal(event){

   if(event.target.closest('.note')) 
   $modal.classList.toggle('open-modal')
   $modalTitle.value = title
   $modalText.value = text

}
/////////////////////////////////////////////////////
//the propagation caused many hours to fix the bug

 $modal.addEventListener("click", e => {
     e.stopPropagation()
 })
 $modalCloseButton.addEventListener('click', event => {
            $modal.classList.toggle('open-modal')
            const title = $modalTitle.value;
            const text = $modalText.value;
            notes = notes.map(note => 
            note.id === Number(id) ? { ...note, title, text } : note
            );
     displayNotes();
    })
  //////////////////////////////////////////////////
 
function openForm(event){
        $form.classList.add('form-open')
        $noteTitle.style.display= "block"
        $formButtons.style.display="block"
    
}
function closeForm(event){
        $form.classList.remove('form-open')
        $noteTitle.style.display= "none"
        $formButtons.style.display="none"
        $noteTitle.value=""
        $noteText.value=""
}
$form.addEventListener('submit', event => {
    event.preventDefault()
   const title = $noteTitle.value
    const text = $noteText.value
   const hasNote = title ||  text
   if(hasNote){
       renderNotes({title, text})
   }
    
    })
    
    function renderNotes(note){
        let newNote = {
            title: note.title,
            text: note.text,
            color: "white",
            id: notes.length > 0? notes[notes.length-1].id + 1 : 1
        }
        notes = [...notes, newNote]
         displayNotes()
         closeForm()
      }
      
      function displayNotes(){ 
           const hasNotes = notes.length > 0;  
         $placeholder.style.display = hasNotes ? 'none' : 'flex'; 
         $notes.innerHTML  = notes.map(note =>(
           `<div style="background: ${note.color};" class="note" data-id="${note.id}">
          <div class="${note.title && 'note-title'}">${note.title}</div>
          <div class="note-text">${note.text}</div>
             
          <div class="toolbar-container">
            <div class="toolbar">
              <i class="toolbar-delete ri-palette-line " ></i>
              <i class=" toolbar-color ri-delete-bin-6-line"></i>

            </div>
          </div>
        </div>`
     
         )).join('')
      
          
  
      }
      
    $close.addEventListener('click', (e) => {
    e.stopPropagation()
    closeForm()
     
 } )
 
