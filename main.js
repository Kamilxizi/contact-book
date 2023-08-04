const contactForm = document.getElementById("contact-form");
const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");
// const imageInput = document.getElementById("image");
const contactList = document.querySelector(".contact-list");
const modal = document.querySelector(".main-modal");
const editInp = document.querySelector(".inp-edit");
// const imgEditInput = document.querySelector(".img-edit");
const btnSave = document.querySelector(".btn-save");
const btnCloser = document.querySelector(".btn-closer");

let contacts = [];

contactForm.addEventListener("submit", addContact);
function addContact(event) {
  event.preventDefault();
  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (name !== "" && phone !== "") {
    const newContact = {
      name: name,
      phone: phone,
    };

    contacts.push(newContact);
    nameInput.value = "";
    phoneInput.value = "";
    renderContacts();
  }
}

function deleteContact(index) {
  contacts.splice(index, 1);
  renderContacts();
}

function renderContacts() {
  contactList.innerHTML = "";
  contacts.forEach((contact, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${contact.name}: ${contact.phone} <button onclick="deleteContact(${index})">Удалить</button> <button onclick="editContact(${index})">Edit</button>`;
    contactList.appendChild(li);
  });
}

function editContact(index) {
  modal.style.display = "block";
  const contact = contacts[index];
  editInp.value = contact.name;
  editInp.dataset.index = index;
}

btnSave.addEventListener("click", () => {
  const index = editInp.dataset.index;
  const newName = editInp.value.trim();

  if (!newName) {
    alert("Заполните поле Имя");
    return;
  }

  const contact = contacts[index];
  contact.name = newName;

  modal.style.display = "none";
  renderContacts();
});

btnCloser.addEventListener("click", () => {
  modal.style.display = "none";
});
