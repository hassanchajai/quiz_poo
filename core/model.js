// import api from "../DB/api.js"
import { url } from "../helpers/url.js";
class Model {
    constructor(table) {
        this.uri = url
        this.table = table;
    }
    getAll = async () => {
        const res = await fetch(this.uri + this.table);
        const data = await res.json();
        return data;
    }

    save =async (data) => {
        const res = await fetch(this.uri + this.table, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...data})
        });
        const j = await res.json();
        return j;
    }
    update =async (id,data) => {
        const res = await fetch(this.uri + this.table+"/"+id, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...data})
        });
        const j = await res.json();
        return j;
    }
    delete =async (id,data) => {
        const res = await fetch(this.uri + this.table+"/"+id, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const j = await res.json();
        return j;
    }
}
export default Model