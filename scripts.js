const clientList = [
  {
    id: 1,
    company: "MGM Management Inc.",
    contactName: "John Smith",
    address: "123 Fulton St. Astoria, NY 11105",
    phone: "1231234455",
  },
  {
    id: 2,
    company: "Star Solutions Inc.",
    contactName: "Alex Smith",
    address: "34 16 Ave. Brooklyn, NY 11204",
    phone: "1231234455",
  }
];

function addCustomer() {
  const company = document.getElementById("company").value;
  const contact = document.getElementById("contactName").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  console.log(company, contact, address, phone, email);
}

function selectCustomer() {
  const dropdown = document.getElementById("selectItem");
  const selectedItem = dropdown.options[dropdown.selectedIndex]//.text;
  console.log(selectedItem.value)
  const c = clientList.find((obj) => {
    return obj.id === Number(selectedItem.value)
  })
  console.log(c)
  document.getElementById('selectedCustomer').value = c.id 
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// removes item row
document.addEventListener('click', (event) => {
  const rows = document.querySelectorAll('div[id^="row-addService"]')
  let parent = event.target.parentElement.id

  if(event.target.nodeName === "BUTTON" && event.target.innerText === 'X') {
    if(rows.length === 1) {
      document.querySelector(`#${parent} input[id='description']`).value = '';
      document.querySelector(`#${parent} input[id='qyt']`).value = '';
      document.querySelector(`#${parent} input[id='unitPrice']`).value = '';
      document.querySelector(`#${parent} input[id='amount']`).value = '';
    } else {
      const currentRow = document.querySelector(`#${parent}`);
      currentRow.remove();
    }
  }
}) 

function addNewRow() {
  const form = document.getElementById('form')
  const rows = document.querySelectorAll('div[id^="row-addService"]')

  if (rows.length < 5) {
    const div = document.createElement('div');
    div.setAttribute('id', `row-addService-${rows.length}`)
    div.setAttribute('class', 'addItem')
    form.appendChild(div)
  
    const inputDesc = document.createElement('input')
    setAttributes(inputDesc, {'type': 'text', 'id':"description", 'placeholder':"Description" })
    div.appendChild(inputDesc)
  
    const inputQYT = document.createElement('input')
    setAttributes(inputQYT, {'type': 'text', 'id':"qyt", 'placeholder':"Qyt." })
    div.appendChild(inputQYT)
  
    const inputUnitPrice = document.createElement('input')
    setAttributes(inputUnitPrice, {'type': 'text', 'id':"unitPrice", 'placeholder':"Unit Price" })
    div.appendChild(inputUnitPrice)
  
    const inputAmount = document.createElement('input')
    setAttributes(inputAmount, {'type': 'text', 'id':"amount", 'placeholder':"Amount", 'disabled': true })
    div.appendChild(inputAmount)

    const removeBtn = document.createElement('button')
    removeBtn.innerText = 'X'
    setAttributes(removeBtn, {'class': 'removeRow' })
    div.appendChild(removeBtn)
  }
}

let amountSelector = document.getElementById("amount")
let unitPriceSelector = document.getElementById("unitPrice")
let qytSelector = document.getElementById("qyt")

// update amount fields
document.addEventListener('input', (event) => {
  let parent = event.target.parentElement.id

  if(event.target.nodeName === "INPUT") {
    if(event.target.id === 'qyt' || event.target.id === 'unitPrice') {
      let qytValue = document.querySelector(`#${parent} input[id='qyt']`).value;
      let unitPriceValue = document.querySelector(`#${parent} input[id='unitPrice']`).value;
      qytValue = Number(qytValue);
      unitPriceValue = Number(unitPriceValue);

      if (qytValue > 0 && unitPriceValue > 0) {
        let amountSelector = document.querySelector(`#${parent} input[id='amount']`);
        amountSelector.value = (qytValue * unitPriceValue).toFixed(2)
      }

      if (qytValue === 0 || unitPriceValue === 0) {
        let amountSelector = document.querySelector(`#${parent} input[id='amount']`);
        amountSelector.value = '';
      }
    }
  }
}) 

const data = [];
function postData() {
  const rows = document.querySelectorAll('div[id^="row-addService"]');
  rows.forEach((row) => {
    let descValue = document.querySelector(`#${row.id} input[id='description']`).value;
    let qytValue = document.querySelector(`#${row.id} input[id='qyt']`).value;
    let unitPriceValue = document.querySelector(`#${row.id} input[id='unitPrice']`).value;
    let amountValue = document.querySelector(`#${row.id} input[id='amount']`).value;

    data.push({
      description: descValue,
      quantity: qytValue,
      unitPrice: unitPriceValue,
      amount: amountValue
    })
  })
  console.log(data)
}
// function selectCustomer() {
//   for (let i = 0; i < clientList.length; i++) {
//     const listItem = document.createElement("option");
//     listItem.setAttribute("value", clientList[i].company);
//     const listItemText = document.createTextNode(clientList[i].company);
//     listItem.appendChild(listItemText);
//     document.getElementById("selectItem").appendChild(listItem);
//   }
// }

// selectCustomer();

let dropdown = document.getElementById("selectItem");
dropdown.length = 0;

let defaultOption = document.createElement("option");
defaultOption.text = "Select";

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

let option;
for (let i = 0; i < clientList.length; i++) {
  option = document.createElement("option");
  option.text = clientList[i].company;
  option.value = clientList[i].id;
  dropdown.add(option);
}

