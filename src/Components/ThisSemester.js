import DisplayTemplate from "./DisplayTemplate";


class ThisSemester extends DisplayTemplate {
    constructor(props) {
        super(props);
        this.url = `http://localhost:8000/classes/${this.state.pk}/`;
        this.title = "Your attendance this semester";
    }

    dataProcessor = (data) => {
        return data.map((elem) => `${elem['course']}. Attended ${elem.times_present} ${elem.times_present === 1 ? "time" : "times"}`).sort();
    }
}


export default ThisSemester;