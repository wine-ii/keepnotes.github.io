const addButton = document.getElementById("add");


const updateData = ()=>{
    const textAreaData = document.querySelectorAll("textarea");
    const notes = [];
    textAreaData.forEach((note)=>{
        return notes.push(note.value);
    });
    localStorage.setItem("notes", JSON.stringify(notes));
} 

const addNewNote = (text = "") =>{
    const note = document.createElement("div");
    note.classList.add("note");
    const htmlData = `
    <div class="operation">
        <button class="edit"><i class="fa-solid fa-pen-to-square"></i></button>
        <button class="delete"><i class="fa-solid fa-trash-can"></i></button>
    </div>
    <div class="main ${text ? "" : "hidden" }"></div>
    <textarea class="${text ? "hidden" : "" }"></textarea>`;

    note.insertAdjacentHTML("afterbegin",htmlData);
    document.body.append(note);

    const editButton = note.querySelector(".edit");
    const deleteButton = note.querySelector(".delete");
    const main = note.querySelector(".main");
    const textArea = note.querySelector("textarea");


    deleteButton.addEventListener("click",()=>{
        note.remove();
    });

    textArea.value = text;
    main.innerHTML = text;

    editButton.addEventListener("click",()=>{
        main.classList.toggle("hidden");
        textArea.classList.toggle("hidden");
    })

    textArea.addEventListener("change", (e)=>{
        const value = e.target.value;
        main.innerHTML = value;
        updateData();
    })

}

const notes = JSON.parse(localStorage.getItem("notes"));

if(notes){
    notes.forEach((note)=> addNewNote(note))
}


addButton.addEventListener("click",()=> addNewNote())