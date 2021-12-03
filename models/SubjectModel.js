import Model from "../core/model.js";

class SubjectModel extends Model {
    constructor() {
        super("subjects");
    }
    all = async () => {
        const res = await this.getAll();
        return res;
    }
    childs = async (parent_id) => {
        const res = await this.getAll();
        return res.filter((item, index) => item.parent == parent_id);
    }
    saveOne = async (subject) => {
        try {
            const res = await this.save(subject);
            return true
        }
        catch (err) {
            return false
        }
    }
    updateOne = async (subject) => {
        try {
            const res = await this.update(2,subject);
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
export default SubjectModel