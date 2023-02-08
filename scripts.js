const clientList = [
  {
    id: "1",
    company: "Test1",
    contactName: "Alex Smith",
    address: "123 st NY 11105",
    phone: "1231234455",
  },
  {
    id: "1",
    company: "Test2",
    contactName: "Alex Smith",
    address: "123 st NY 11105",
    phone: "1231234455",
  },
  {
    id: "1",
    company: "Test3",
    contactName: "Alex Smith",
    address: "123 st NY 11105",
    phone: "1231234455",
  },
];

function addCustomer() {
  const company = document.getElementById("company").value;
  const contact = document.getElementById("contactName").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  // console.log(company, contact, address, phone, email);
  // console.log(document.getElementById("selectItem").value);
  // get selected value
  // var e = document.getElementById("selectQYT");
  // console.log('qyt', e.options[e.selectedIndex].text);

}
let unitPrice
let qyt;
function getUnitPrice() {
  unitPrice = document.getElementById("unitPrice").value;
  console.log('price', unitPrice)
}

function getQyt() {
  el = document.getElementById("selectQYT");
  qyt = el.options[el.selectedIndex].text
  console.log('qyt', qyt)
  // if (qyt === 'QYT') alert('test')
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

function addNewRow() {
  const form = document.getElementById('form')
  const rows = document.querySelectorAll('div[id^="row-addService"]')
  console.log(rows.length)
  
  const div = document.createElement('div');
  div.setAttribute('id', `row-addService-${rows.length}`)
  form.appendChild(div)

  const inputDesc = document.createElement('input')
  setAttributes(inputDesc, {'type': 'text', 'id':"description", 'placeholder':"Description" })
  div.appendChild(inputDesc)

  const selectQYT = document.createElement('select')
  setAttributes(selectQYT, {'name': 'selectQYT', 'id':"selectQYT" })
  div.appendChild(selectQYT)
  
  for(let i = 0; i <= 5; i++) {
    const option = document.createElement('option')
    setAttributes(option, {'value': i })
    option.innerText = i
    selectQYT.appendChild(option)
  }

  const inputUnitPrice = document.createElement('input')
  setAttributes(inputUnitPrice, {'type': 'number', 'id':"unitPrice", 'placeholder':"Unit Price" })
  div.appendChild(inputUnitPrice)

  const inputAmount = document.createElement('input')
  setAttributes(inputAmount, {'type': 'text', 'id':"amount", 'placeholder':"Amount" })
  div.appendChild(inputAmount)
}

let amountSelector = document.getElementById("amount")
let unit = document.getElementById("unitPrice")
let selectS = document.getElementById("selectQYT")
document.addEventListener('change', (event) => {
  console.log(event.target.nodeName)
  console.log(event)
  // if(event.target.nodeName === "BUTTON") {
  //     const id = event.target.id
  //     console.log(id)
  //     for (let i = 0; i < list.length; i++) {
  //         if(list[i].id === id) list[i].done = !list[i].done
          
  //     }
  // }
}) 
// console.log(document.getElementById("unitPrice").value)


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

