import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
import { getDatabase , ref, push, onValue, remove} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

const firebaseConfig = {
  databaseURL: "https://droplink-app-default-rtdb.europe-west1.firebasedatabase.app"
}


const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const referenceInDB = ref( database, "links")


let btnEl = document.getElementById("input-btn");
let inputEl = document.getElementById("input-el")
let linkListEl = document.getElementById('linkList-el')
let deleteBtn  = document.getElementById('delete-btn')


function render(links) {
    let listITems = "";
    for (let i = 0; i < links.length; i++) {
    listITems +=  `<li>
            <a href='#' target='_blank'>
                ${links[i]}
            </a>
        </li>`;
    }
    linkListEl.innerHTML = listITems
}

btnEl.addEventListener('click', function() {
    push(referenceInDB, inputEl.value)
    inputEl.value = ""

})
onValue(referenceInDB, function(snapshot) {
    const snapshotDoesExist = snapshot.exists()
    if (snapshotDoesExist) {
        const snapshotValues = snapshot.val()
        const links = Object.values(snapshotValues)
        render(links)
    }
})


deleteBtn.addEventListener("click", function() {
     remove(referenceInDB);
     linkListEl.innerHTML = ""
})
