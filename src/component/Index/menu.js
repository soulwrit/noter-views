import routes from '../routes';

export const menus = [
    { name: 'editor', route: routes.editor },
    { name: 'reader', route: routes.reader },
    { name: 'forum', route: routes.forum },
    { name: 'about', route: routes.about },
];

export function getDefaultMenuKey(location) {
    const { pathname } = location;
    const slash = /\/+/;
    const pathes = pathname.split(slash);

    for (let i = 0; i < pathes.length; i++) {
        for (let j = 0; j < menus.length; j++) {
            if (pathes[i] === menus[j].name) return pathes[i];
        }
    }

    return 'editor';
}