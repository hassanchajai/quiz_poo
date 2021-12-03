import Model from "../core/model.js";

class QuestionModel extends Model {
    constructor() {
        super("questions");
    }
    all = async () => {
        const res = await this.getAll();
        return res;
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
    updateOne = async (obj) => {
        try {
            const res = await this.update(2,obj);
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
export default QuestionModel