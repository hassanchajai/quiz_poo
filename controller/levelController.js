// import SubjectModel from "../models/SubjectModel.js";

import LevelModel from "../models/LevelModel.js";


const container = document.getElementById("levels");
const form = document.getElementById("form");

const subjects_modal_update = document.getElementById("container_model_update")
// model
const level = new LevelModel();

const generateTemplateitem = (item, levels) => {
  
    return `
  <tr>
  <td>${item.name}</td>
  <td>${item.min}</td>
  <td>${item.max}</td>
  
  <td>
  <button class="btn btn-info mr-2"   data-toggle="modal"
  data-target="#modal-right${item.id}"
  data-toggle-class="modal-open-aside" data-id="${item.id}">Edit</button>
  <button class="btn btn-danger delete-btn" data-id="${item.id}">Delete</button>
  </td>
</tr>
    `;
}
const generateTemplateFormUpdateitem = (item, levels) => {

    return `
    <div id="modal-right${item.id}" class="modal fade" data-backdrop="true">
    <div class="modal-dialog modal-right w-xl">
      <form class="modal-content h-100 no-radius form-update">
        <div class="modal-header">
          <div class="modal-title text-md">update level</div>
          <button class="close" data-dismiss="modal">&times;</button>
        </div>
        <div class="modal-body">
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Name</label>
            <input
              type="name"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="name"
              name="name"
              value="${item.name}"
            />
          </div>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Min Points</label>
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Min points"
              name="min"
              value="${item.min}"
            />
          </div>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Max Points</label>
            <input
              type="number"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Max points"
              name="max"
              value="${item.max}"
            />
          </div>
        
          <input
          type="hidden"
          name="id"
          value="${item.id}"

        />
     
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-light" data-dismiss="modal">
            Close
          </button>
          <button type="submit" class="btn btn-primary">Update Details</button>
        </div>
      </form>
    </div>
  </div>
    `;


}

const render = (levels) => {
    let template = `<thead>
    <tr>
      <th scope="col">Name</th>
      <th scope="col">Min</th>
      <th scope="col">Max</th>
      <th scope="col">actions</th>
    </tr>
  </thead>
  <tbody>`;
    let templateformupdate = '';
    levels.forEach((item, index) => {
        template += generateTemplateitem(item, levels)
        templateformupdate += generateTemplateFormUpdateitem(item, levels)
    })
    template += " </tbody>"
    container.innerHTML = template
    subjects_modal_update.innerHTML = templateformupdate;
    // add event to btn delete
    const delete_btn = document.querySelectorAll(".delete-btn");
    delete_btn.forEach((item, index) => {
        item.addEventListener("click", onclick_delete)
    })
    const forms_update = document.querySelectorAll(".form-update");

    // forms_update
    forms_update.forEach((item,index)=>{
        item.addEventListener("submit",onclick_edit)
    })
    
    // add event to button edit 
 
}
const onLoad = async e => {
    const levels = await level.all();
    await render(levels)
}
const onsubmit_formadd = e => {
    e.preventDefault();
    console.log(e);
    let name = e.target.name.value;
    let min = e.target.min.value;
    let max = e.target.max.value;
    const obj = {
        name,
        min,
        max,
        
    }
    if (level.saveOne(obj)) {
        alert("added successfuly!");
        onLoad();
       
    } else {
        alert("something wrong")
    }
}
const onclick_delete = async e => {
    const id = e.target.dataset.id;
    await level.deleteOne(id);
    onLoad()
}
const onclick_edit = e => {
    e.preventDefault();
    let name = e.target.name.value;
    let min = e.target.min.value;
    let max = e.target.max.value;
    let id = e.target.id.value;
    const obj = {
        name,
        min,
        max,
    }
    if (level.updateOne(id,obj)) {
        alert("update successfuly!");
        // form.reset()
    } else {
        alert("something wrong")
    }
}
onLoad();
form.addEventListener("submit",onsubmit_formadd);