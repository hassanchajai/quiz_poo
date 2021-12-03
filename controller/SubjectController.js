import SubjectModel from "../models/SubjectModel.js"

const subjectscontainer = document.getElementById("subjects");
const form = document.getElementById("form");

const subject = new SubjectModel();
let parent = null;

const generateTemplateitem = (item, subjects) => {
  const parentname = subjects.filter(sub => item.parent == sub.id).length > 0 ? subjects.filter(sub => item.parent == sub.id)[0].name : null;
  return `
    <div class="col-xl-3 col-lg-12">
    <div
      class="card shadow mb-4"
      style="
        background-image: url('${item.image}');
        background-size: cover;
        background-repeat: no-repeat;
      "
    >
      <!-- Card Header - Dropdown -->
      <div
        class="
          card-body
          py-3
          d-flex
          flex-row
          align-items-center
          justify-content-between
        "
      >
        <ol class="breadcrumb bg-light">
         ${parentname !== null ? '<li class="breadcrumb-item"><a href="#">' + parentname + '</a></li>' : ""
    } 
          <li class="breadcrumb-item"><a href="#">${item.name}</a></li>
          <!-- <li class="breadcrumb-item active" aria-current="page">sub subject</li> -->
        </ol>
        <button class="btn btn-danger  delete-btn"  data-id="${item.id}" type="button"><i class="fas fa-trash"></i></button>
      </div>
      <!-- Card Body -->
      <div class="card-footer d-flex p-0">
        <button    data-id="${item.parent}" class="btn col-6 btn-info parent-btn" style="border-radius: 0">
          Parent
        </button>
        <button
          class="btn col-6 btn-danger child-btn"
          data-id="${item.id}"
          style="border-radius: 0"
          
        >
          Child
        </button>
      </div>
    </div>
  </div>
    `;


}
const rendersubjects = (subjects) => {
  let template = "";
  subjects.forEach((item, index) => {
    template += generateTemplateitem(item, subjects)
  })
  subjectscontainer.innerHTML = template
  addevent_delete();
  addevent_child();
  addevent_parent()
}
const addevent_child = () => {
  const child_btns = document.querySelectorAll(".child-btn");
  child_btns.forEach(item => {
    item.addEventListener("click", onclick_btnchild)
  })
}
const addevent_delete = () => {
  const delete_btns = document.querySelectorAll(".delete-btn");
  delete_btns.forEach(item => {
    item.addEventListener("click", onclick_btndelete)
  })
}
const addevent_parent = () => {
  const child_btns = document.querySelectorAll(".parent-btn");
  child_btns.forEach(item => {
    item.addEventListener("click", onclick_btnchild)
  })
}
const onLoad = async e => {
  const subjects = await subject.all();
  rendersubjects(subjects)

}
const onclick_btnchild = async (e) => {
  const id_parent = parent = e.target.dataset.id;
  const subjects = await subject.childs(id_parent);
  rendersubjects(subjects)
}

const onclick_btndelete = async (e) => {
  e.preventDefault()
  const id = e.target.dataset.id;
  const subjects = await subject.deleteOne(id);
  rendersubjects(subjects)
}
const onsubmit_formadd = e => {
  e.preventDefault();
  let name = e.target.name.value;
  const obj = {
    name,
    parent,
    "image": "https://images.unsplash.com/photo-1638457190880-b88e867a84f2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=714&q=80"
  }
  if (subject.saveOne(obj)) {
    alert("added succefuly!");
    form.reset()
  } else {
    alert("something wrong")
  }
}
onLoad();
form.addEventListener("submit", onsubmit_formadd);