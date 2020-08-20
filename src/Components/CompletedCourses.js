import DisplayTemplate from "./DisplayTemplate";


class CompletedCourses extends DisplayTemplate {
    constructor(props) {
        super(props);
        this.url = `http://localhost:8000/courses/${this.state.pk}/`;
        this.title = "Courses you have completed";
    }

    dataProcessor = (data) => {
        let ects = 0;
        data = data.map((elem) => {
            ects += elem.ects;
            return `${elem.course} ECTS: ${elem.ects}`
        }).sort();
        data.push(`Total ECTS: ${ects}`);
        return data;
    }
}

export default CompletedCourses;
