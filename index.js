let myLeads = []
let leadsFromLocalStorage = JSON.parse(localStorage.getItem('myLeads'))

const inputEl = document.querySelector('#input-el')
const inputBtn = document.querySelector('#input-btn')
const tabBtn = document.querySelector('#tab-btn')
const deletBtn = document.querySelector('#delete-btn')
const ulEl = document.querySelector('#ul-el')

if (leadsFromLocalStorage) {
  myLeads = leadsFromLocalStorage
  render(myLeads)
}

const render = arr => {
  let listItems = ''
  for (let i = 0; i < arr.length; i++) {
    listItems += `
    <li>
        <a href='${arr[i]} target='_blank'>
            ${arr[i]}
        </a>
    </li>
    `
  }
  ulEl.innerHTML = listItems
}

tabBtn.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    myLeads.push(tabs[0].url)
    localStorage.myLeads = JSON.stringify(myLeads)
    render(myLeads)
  })
})

deletBtn.addEventListener('dblclick', () => {
  localStorage.clear()
  myLeads = []
  render(myLeads)
})

inputBtn.addEventListener('click', () => {
  myLeads.push(inputEl.value)
  inputEl.value = ''
  localStorage.myLeads = JSON.stringify(myLeads)
  render(myLeads)
})
