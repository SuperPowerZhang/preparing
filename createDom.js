// 虚拟dom转真实dom
const node = {
  tag: 'div',
  props: {
    id: '111',
    key: 2
  },
  children: [
    'hello world!!!',
    {
      tag: 'p',
      props: {
        id: '222',
        key: 3
      },
      children: [
        'p child!!!'
      ]
    }
  ]
}
function createDom(vnode) {
  if (vnode === null || vnode === undefined || typeof vnode === "number") return "";
  if (typeof vnode === "string") {
    return document.createTextNode(vnode);
  } else if (typeof vnode === "object") {
    const node = document.createElement(vnode.tag);
    for (let key in vnode.props) {
      node.setAttribute(key, vnode.props[key]);
    }
    if (vnode.children.length) {
      vnode.children.forEach(childNode => {
        const childElement = createDom(childNode);
        node.appendChild(childElement);
      })
    }
    return node
  }
}

console.log(createDom(node));
