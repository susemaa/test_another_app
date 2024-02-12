/* eslint-disable import/prefer-default-export */
import { Service, Tree } from './types';

function createTree(services: Array<Service>): Array<Tree> {
  const serviceMap = new Map<number, Tree>(services.map((s) => [s.id, { ...s, children: [] }]));

  const tree: Array<Tree> = [];
  serviceMap.forEach((service) => {
    if (service.head === null) {
      tree.push(service);
    } else {
      const parent = serviceMap.get(service.head);
      if (parent && parent.children) {
        parent.children.push(service);
      }
    }
  });

  const sortChildren = (node: Tree) => {
    if (node.children) {
      node.children.sort((a, b) => a.sorthead - b.sorthead);
      node.children.forEach(sortChildren);
    }
  };

  tree.sort((a, b) => a.sorthead - b.sorthead);
  tree.forEach(sortChildren);

  return tree;
}

export { createTree };
