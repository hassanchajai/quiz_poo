import Model from "../core/model.js";

class LevelModel extends Model {
    constructor() {
        super("levels");
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
export default LevelModel