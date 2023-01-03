import colourette from "./colorette.js";

class Logger {
    public info(txt: string) {
        console.log(`${colourette.blue("[INFO]")} ${txt}`)
    }
    public warn(txt: string) {
        console.log(`${colourette.yellow("[WARN]")} ${txt}`)
    }
    public error(txt: string) {
        console.log(`${colourette.red("[ERROR]")} ${txt}`)
    }
    public success(txt: string) {
        console.log(`${colourette.green("[ERROR]")} ${txt}`)
    }
}
const logger = new Logger();
export default logger;