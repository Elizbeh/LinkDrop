let btnEl = document.getElementById("input-btn");
let inputEl = document.getElementById("input-el")
let myLeads = []
let oldLeads = []
let renderbtn = document.getElementById("renderbtn")
let leadListEl = document.getElementById('leadList-el')
let deleteBtn  = document.getElementById('delete-btn')

let tabBtn = document.getElementById("tab-btn")

const leadsFromLStore = JSON.parse(localStorage.getItem("myLeads"))
console.log(leadsFromLStore)

if (leadsFromLStore) {
    myLeads = leadsFromLStore
    render(myLeads)
}

function render(leads) {
    let listITems = "";
    for (let i = 0; i < leads.length; i++) {
    listITems +=  `<li>
            <a href='#' target='_blank'>
                ${leads[i]}
            </a>
        </li>`;
    }
    leadListEl.innerHTML = listITems
}

btnEl.addEventListener('click', function() {
     myLeads.push(inputEl.value)
    inputEl.value = ""
    localStorage.setItem("myLeads", JSON.stringify(myLeads))
    render(myLeads)

})


deleteBtn.addEventListener("dblclick", function() {
    console.log(localStorage.getItem("myLeads",  myLeads))
    localStorage.clear();
     myLeads = [];
    render(myLeads)
})

tabBtn.addEventListener("click", function() {
    chrome.tabs.query({active: true, currentWindow:true}, function(tabs) {
        myLeads.push(tabs[0].url)
        localStorage.setItem("myLeads", JSON.stringify(myLeads))
        render(myLeads)
    })
})