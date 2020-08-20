import DisplayTemplate from "./DisplayTemplate";


class Abilities extends DisplayTemplate {
    constructor(props) {
        super(props);
        this.url = `http://localhost:8000/abilities/${this.state.pk}/`;
        this.title = "Your Abilities";
    }

    dataProcessor = (data) => {
        return data.map((elem) => elem['ability']).sort();
    }

}


export default Abilities;