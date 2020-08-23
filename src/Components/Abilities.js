import DisplayTemplate from "./DisplayTemplate";
import {url_base} from "../helpers";


class Abilities extends DisplayTemplate {
    constructor(props) {
        super(props);
        this.url = `${url_base}abilities/${this.state.pk}/`;
        this.title = "Your Abilities";
    }

    dataProcessor = (data) => {
        return data.map((elem) => elem['ability']).sort();
    }

}


export default Abilities;