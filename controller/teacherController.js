import SubjectModel from "../models/SubjectModel.js";
import TeacherModel from "../models/TeacherModel.js";

const container = document.getElementById("teachers");
const form = document.getElementById("form");

const subjects_modal_update = document.getElementById("container_model_update")
// model
const teacher = new TeacherModel();
// manuplulate in dom
const generateTemplateitem = (item, teachers) => {
    let templateSubjects = '<ul>';
    let listofsubs = item.subjects[0];
    listofsubs.forEach((item, index) => {
        templateSubjects += `<li>${item.name}</li>`
    })
    templateSubjects += '</ul>'

    return `
  <tr>
  <td>${item.name}</td>
  <td>${item.email}</td>
  <td>${templateSubjects}</td>
  <td>
  <button class="btn btn-info mr-2"   data-toggle="modal"
  data-target="#modal-right${item.id}"
  data-toggle-class="modal-open-aside" data-id="${item.id}">Edit</button>
  <button class="btn btn-danger delete-btn" data-id="${item.id}">Delete</button>
  </td>
</tr>
    `;
}
const generateTemplateFormUpdateitem = (item, teachers) => {

    return `
    <div id="modal-right${item.id}" class="modal fade" data-backdrop="true">
    <div class="modal-dialog modal-right w-xl">
      <form class="modal-content h-100 no-radius form-update">
        <div class="modal-header">
          <div class="modal-title text-md">update teacher</div>
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
            <label for="exampleFormControlInput1">Email</label>
            <input
              type="email"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="Email"
              name="email"
              value="${item.email}"

            />
          </div>
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">CIN</label>
            <input
              type="text"
              class="form-control"
              id="exampleFormControlInput1"
              placeholder="cin"
              name="cin"
              value="${item.cin}"

            />
          </div>
          <input
          type="hidden"
          name="id"
          value="${item.id}"

        />
          <div class="form-group mb-2">
            <label for="exampleFormControlInput1">Subject :</label>
            <select class="form-control subject_id" name="subject_id"  value="${item.subjects[0][0].id}">

            </select>
          </div>
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

const render = (teachers) => {
    let template = `<thead>
    <tr>
      <th scope="col">name</th>
      <th scope="col">email</th>
      <th scope="col">subjects</th>
      <th scope="col">actions</th>
    </tr>
  </thead>
  <tbody>`;
    let templateformupdate = '';
    teachers.forEach((item, index) => {
        template += generateTemplateitem(item, teachers)
        templateformupdate += generateTemplateFormUpdateitem(item, teachers)
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
    console.log(forms_update);
    // forms_update
    forms_update.forEach((item,index)=>{
        item.addEventListener("submit",onclick_edit)
    })
    
    // add event to button edit 
 
}
const onLoad = async e => {
    const teachers = await teacher.all();
    await render(teachers)
    await  fill_select_subjets()
}
const fill_select_subjets = async () => {
    const subject_select = document.querySelectorAll(".subject_id");
    let items = '';
    const subjects = await new SubjectModel().all();

    await subjects.forEach((item, index) => {
        items += `
            <option value="${item.id}">${item.name}</option>
        `
    })
    subject_select.forEach((item, index) => {
        item.innerHTML = items
    })
    
}
const onclick_edit = e => {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let cin = e.target.cin.value;
    let subject_id = e.target.subject_id.value;
    let id = e.target.id.value;
    const obj = {
        name,
        email,
        cin,
        subjects: [subject_id]
    }
    if (teacher.updateOne(id,obj)) {
        alert("update successfuly!");
        // form.reset()
    } else {
        alert("something wrong")
    }
}
const onclick_delete = async e => {
    const id = e.target.dataset.id;
    await teacher.deleteOne(id);
    onLoad()
}
const onsubmit_formadd = e => {
    e.preventDefault();
    console.log(e);
    let name = e.target.name.value;
    let email = e.target.email.value;
    let cin = e.target.cin.value;
    let subject_id = e.target.subject_id.value;
    const obj = {
        name,
        email,
        cin,
        subjects: [subject_id]
    }
    if (teacher.saveOne(obj)) {
        alert("added succefuly!");
        form.reset()
    } else {
        alert("something wrong")
    }
}

onLoad();

form.addEventListener("submit", onsubmit_formadd);