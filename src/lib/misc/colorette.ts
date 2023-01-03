import { createColors } from "colorette"
const { green, yellow, red, blue } = createColors({ useColor: false })
class Colourette {
    public green = green
    public yellow = yellow
    public red = red
    public blue = blue
}
const colourette = new Colourette();
export default colourette;