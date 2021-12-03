import Model from "../core/model.js";

class TestModel extends Model {
    constructor() {
        super("tests");
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
            const res = await this.delete(2);
            return true
        }
        catch (err) {
            return false
        }
    }
}
export default TestModel