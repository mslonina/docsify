import { getAndRemoveConfig } from '../utils';
import { isAbsolutePath, getPath, getParentPath } from '../../router/util';

export const imageCompiler = ({ renderer, contentBase, router }) =>
  (renderer.image = (href, title, text) => {
    let url = href;
    let attrs = [];

    const { str, config } = getAndRemoveConfig(title);
    title = str;

    if (config['no-zoom']) {
      attrs.push('data-no-zoom');
    }

    if (title) {
      attrs.push(`title="${title}"`);
    }

    if (config.size) {
      const [width, height] = config.size.split('x');
      if (height) {
        attrs.push(`width="${width}" height="${height}"`);
      } else {
        attrs.push(`width="${width}"`);
      }
    }

    if (config.class) {
      attrs.push(`class="${config.class}"`);
    }

    if (config.id) {
      attrs.push(`id="${config.id}"`);
    }

    if (!isAbsolutePath(href)) {
      url = getPath(contentBase, getParentPath(router.getCurrentPath()), href);
    }

    let out = `<figure>`;
    if (attrs.length > 0) {
      out += `<img src="${url}" data-origin="${href}" alt="${text}" ${attrs.join(
        ' '
      )} />`;
    } else {
      out += `<img src="${url}" data-origin="${href}" alt="${text}"${attrs}>`;
    }

    if (title) {
      out += `<figcaption>${title}</figcaption>`;
    }

    out += `</figure>`;

    return out;
  });
