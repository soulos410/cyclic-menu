export default class Renderer {
    constructor(element) {
        this.element = element;
        this.renderTo = '';
    }

    render() {
        document.body.insertAdjacentHTML('beforeend', this.element);
    }
}
