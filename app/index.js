import Menu from './Menu';
import Renderer from './Renderer';
import {
    data,
} from '../menu_config.json';
import './styles.scss';

for (let i = 0; i < Object.keys(data).length; i += 1) {
    const menuItem = new Menu(data[i], document.body);
    const menuTemplate = menuItem.createMenuTemplate();
    const renderData = new Renderer(menuTemplate);
    renderData.render();
    menuItem.initEventListeners();
}
