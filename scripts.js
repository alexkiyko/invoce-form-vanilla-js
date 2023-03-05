const list = [
  {
    id: "123",
    company: "MGM Management Inc.",
    contactName: "John Smith",
    address: "123 Fulton St. Astoria, NY 11105",
    phone: "1231234455",
    email: "test@email.com"
  },
  {
    id: "1234",
    company: "Star Solutions Inc.",
    contactName: "Alex Smith",
    address: "34 16 Ave. Brooklyn, NY 11204",
    phone: "1231234455",
    email: "test@email.com"
  }
];

localStorage.setItem('clientList', JSON.stringify(list))

const clientList = JSON.parse(localStorage.getItem('clientList'))

function addCustomer() {
  const company = document.getElementById("company").value;
  const contact = document.getElementById("contactName").value;
  const address = document.getElementById("address").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;

  console.log(company, contact, address, phone, email);

  clientList.push({
    id: (Math.floor(Math.random() * 1000)).toString(),
    company: company,
    contactName: contact,
    address: address,
    phone: phone,
    email: email
  })
  console.log(clientList)
  localStorage.setItem('clientList', JSON.stringify(clientList))
  document.getElementById("company").value = '';
  document.getElementById("contactName").value = '';
  document.getElementById("address").value = '';
  document.getElementById("phone").value = '';
  document.getElementById("email").value = '';
  render();
  document.getElementById("clientBox").style.display="none";
  document.getElementById('msg').innerText = 'Customer data successfully added';

  document.getElementById("clientBox").style.display="none";
  document.getElementById("selectCustomer").style.display="block";
  document.getElementById('button').innerText = 'Add new customer';
}

// Hide elements
document.getElementById("clientBox").style.display="none";
document.querySelector(".service-location-input-show").style.display="none";
document.querySelector(".service-call-input-show").style.display="none";

function showAddNewForm() {
  const button = document.getElementById('showAddNewForm').innerText
  if (button === 'Add new customer') {
    document.getElementById("clientBox").style.display="grid";
    document.getElementById("selectCustomer").style.display="none";
    document.getElementById('showAddNewForm').innerText = 'Select customer';
    document.querySelector('#showData').style.display="none";
  } else {
    document.getElementById("clientBox").style.display="none";
    document.getElementById("selectCustomer").style.display="block";
    document.getElementById('showAddNewForm').innerText = 'Add new customer'
    document.querySelector('#showData').style.display="block";
  }
}

function selectCustomer() {
  // render()
  document.querySelector('#showData').style.display="block";
  document.querySelector('#showData').innerHTML = null
  const dropdown = document.getElementById('selectItem');
  const selectedItem = dropdown.options[dropdown.selectedIndex];

  const company = clientList.find((obj) => {
    return obj.id === selectedItem.value;
  })

  const div = document.querySelector('#showData');
  for (let key in company) {
    if (key != 'id') {
      let p = document.createElement('p');
      p.innerText += company[key] ;
      div.appendChild(p);
    }
  }
}

function setAttributes(el, attrs) {
  for(var key in attrs) {
    el.setAttribute(key, attrs[key]);
  }
}

// removes item row
document.addEventListener('click', (event) => {
  const rows = document.querySelectorAll('div[id^="row-addService"]');
  const parent = event.target.parentElement.parentElement.id;

  if(event.target.nodeName === "BUTTON" && event.target.innerText === 'Remove') {
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
  const form = document.getElementById('form');
  const rows = document.querySelectorAll('div[id^="row-addService"]');

  if (rows.length < 10) {
    const parent = document.createElement('div');
    setAttributes(parent, {'id': `row-addService-${rows.length}`, 'class':'addItem' });
    form.appendChild(parent);

    const divDesc = document.createElement('div');
    divDesc.setAttribute('class', 'desc');
    parent.appendChild(divDesc);

    const divPrice = document.createElement('div');
    divPrice.setAttribute('class', 'price');
    parent.appendChild(divPrice);
  
    const inputDesc = document.createElement('input');
    setAttributes(inputDesc, {'type': 'text', 'id':"description", 'placeholder':"Description" });
    divDesc.appendChild(inputDesc);
  
    const inputQYT = document.createElement('input');
    setAttributes(inputQYT, {'type': 'text', 'id':"qyt", 'placeholder':"Qyt." });
    divPrice.appendChild(inputQYT);
  
    const inputUnitPrice = document.createElement('input');
    setAttributes(inputUnitPrice, {'type': 'text', 'id':"unitPrice", 'placeholder':"Unit Price" });
    divPrice.appendChild(inputUnitPrice);
  
    const inputAmount = document.createElement('input');
    setAttributes(inputAmount, {'type': 'text', 'id':"amount", 'placeholder':"Amount", 'disabled': true });
    divPrice.appendChild(inputAmount);

    const removeBtn = document.createElement('button');
    removeBtn.innerText = 'Remove';
    setAttributes(removeBtn, {'class': 'removeRow' });
    divPrice.appendChild(removeBtn);
  }
}

let amountSelector = document.getElementById("amount")
let unitPriceSelector = document.getElementById("unitPrice")
let qytSelector = document.getElementById("qyt")

// update amount fields
document.addEventListener('input', (event) => {
  const parent = event.target.parentElement.parentElement.id

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


function setDropdownValues() {
  let dropdown = document.getElementById("selectItem");
  dropdown.length = 0;
  let defaultOption = document.createElement("option");
  defaultOption.text = "Select";
  dropdown.add(defaultOption);
  dropdown.selectedIndex = 0;
  let option;

  for (let i = 0; i < clientList.length; i++) {
    option = document.createElement("option");
    option.text = clientList[i].company ? clientList[i].company : clientList[i].contactName;
    option.value = clientList[i].id;
    dropdown.add(option);
  }
}

function render() {
  setDropdownValues()

}

render()

// update service location
document.addEventListener('input', (event) => {
  let parent = event
  console.log(event.target.id)
  if(event.target.nodeName === "INPUT") {
    if(event.target.id === 'no') {
      document.querySelector(".service-location-input-show").style.display="block";
    }
    if(event.target.id === 'yes') {
      document.querySelector(".service-location-input-show").style.display="none";
    }
  }

  if(event.target.id === 'serviceCall') {
    if (document.getElementById('serviceCall').checked) {
      console.log('yes')
      document.querySelector(".service-call-input-show").style.display="block";
    } else {
      console.log('n')
      document.querySelector(".service-call-input-show").style.display="none";
    }
  }
}) 


