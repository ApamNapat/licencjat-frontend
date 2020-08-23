import DisplayTemplate from "./DisplayTemplate";
import {url_base} from "../helpers";


class CurrentTimetable extends DisplayTemplate {
    constructor(props) {
        super(props);
        this.url = `${url_base}timetable/${this.state.pk}/`;
        this.title = "Your Timetable";
    }

    dataProcessor = (data) => {
        return data.filter((elem) => elem.action !== "End Day" && elem.action !== "Finish Semester").map((elem) => `${new Date(elem.time).getUTCHours()} o'clock: ${elem.action}`);
    }
}

export default CurrentTimetable;