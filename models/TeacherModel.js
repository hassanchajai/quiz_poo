import Model from "../core/model.js";
import SubjectModel from "./SubjectModel.js";

class TeacherModel extends Model {
    constructor() {
        super("teachers");
    }
    all = async () => {
        const subjects = await new SubjectModel().all();
        const res = await this.getAll();
        return (res.map(item => 
            ({ ...item, subjects: [...item.subjects.map(subject =>subjects.filter(subteach => subteach.id === subject))] })));
    }

    saveOne = async (obj) => {
        try {
            const res = await this.save(obj);
            return true
        }
        catch (err) {
            return false
        }
    }
    updateOne = async (id,obj) => {
        try {
            const res = await this.update(id,obj);
            return true
        }
        catch (err) {
            return false
        }
    }
    deleteOne = async (id) => {
        try {
            const res = await this.delete(id);
            return true
        }
        catch (err) {
            return false
        }
    }


}
export default TeacherModel