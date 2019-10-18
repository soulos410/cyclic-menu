export default class Menu {
    constructor({
        items,
        settings,
    }, menuContainer) {
        this.menuItems = items;
        this.settings = settings;
        this.menuContainer = menuContainer;
        this.leftArrowKeyCode = 37;
        this.rightArrowKeyCode = 39;
    }

    createItem(item, itemClass) {
        return `<li class="${itemClass}"><a href="#">${item.text}</a></li>`;
    }

    createItemList() {
        return this.menuItems.reduce((acc, element, index) => {
            let temporary = acc;
            if (index !== 0) {
                temporary += this.createItem(element, this.settings.itemClass);
            } else {
                temporary += this.createItem(element, `${this.settings.itemClass} ${this.settings.activeItemClass}`);
            }
            return temporary;
        }, '');
    }

    createMenuTemplate() {
        const itemList = this.createItemList();
        return `<div class="menu-wrapper"><nav class=menu>${itemList}</nav><button class="close-button">x</button></div>`;
    }

    handleArrowClicks(event) {
        const selectedNodes = document.querySelectorAll('.menu-item.selected');
        switch (event.keyCode) {
        case this.rightArrowKeyCode:
            this.setSelectedItem(selectedNodes, 'right');
            break;
        case this.leftArrowKeyCode:
            this.setSelectedItem(selectedNodes, 'left');
            break;
        default:
            break;
        }
    }

    handleCloseButton(event) {
        if (event.target.classList.contains('close-button')) {
            event.target.closest('.menu-wrapper').remove();
        }
    }

    setSelectedItem(nodes, nodeDirection) {
        nodes.forEach((element) => {
            const nextSibling = nodeDirection === 'right'
                ? (element.nextSibling || element.parentNode.firstChild)
                : (element.previousSibling || element.parentNode.lastChild);
            element.classList.remove('selected');
            nextSibling.classList.add('selected');
        });
    }

    initEventListeners() {
        if (!Menu.isListenersAssigned) {
            Menu.isListenersAssigned = true;
            this.menuContainer.addEventListener('click', this.handleCloseButton.bind(this));
            this.menuContainer.addEventListener('keydown', this.handleArrowClicks.bind(this));
        }
    }
}
