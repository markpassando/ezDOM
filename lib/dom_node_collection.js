class DomNodeCollection {
  constructor (nodes) {
    this.nodes = nodes;
  }

  each(cb) {
    this.nodes.forEach(cb);
  }

  html(string) {
    if (typeof string === "string") {
      this.nodes.forEach((el) => {
        el.innerHTML = string;
      });
    } else {
      return this.nodes[0].innerHTML;
    }
  }

  empty() {
    this.html("");
  }

  append(el) {
    if (this.nodes.length === 0) return;

    if (typeof el === 'object' &&
        !(el instanceof DomNodeCollection)) {
      el = $ez(el);
    }

    if (typeof el === "string") {
      this.each(node => node.innerHTML += el);
    } else if (el instanceof DomNodeCollection) {
      this.each(node => {
        el.each(childNode => {
          node.appendChild(childNode.cloneNode(true))
        });
      })
    }

  }

  attr(attribute, val) {
    if (typeof val === "string") {
      for (let i = 0; i < this.nodes.length; i++) {
        this.nodes[i].setAttribute(attribute, val);
        return val;
      }
    } else {
        return this.nodes[0].getAttribute(attribute);
    }
  }

  addClass(newClass) {
    this.each(node => node.classList.add(newClass));
  }

  removeClass(oldClass) {
    this.each(node => node.classList.remove(oldClass));
  }

  toggleClass(toggleClass) {
    this.each(node => node.classList.toggle(toggleClass));
  }

  children() {
    let childNodes = [];
    this.each(node => {
      const childNodeList = node.children;
      childNodes = childNodes.concat(Array.from(childNodeList));
    });
    return new DomNodeCollection(childNodes);
  }

  parent() {
    let parents = [];

    for (let i = 0; i < this.nodes.length; i++) {
      if (!parents.length) {
        parents.push(this.nodes[i].parentNode);
      } else {
        let inParents = false;

        for (let j = 0; j < parents.length; j++) {
          if (this.nodes[i].parentNode === parents[j]) {
            inParents = true;
          }
        }

        if (!inParents) {
          parents.push(this.nodes[i].parentNode);
        }
      }
    }

    return parents;
  }

  find(selector) {
    let found = [];

    this.each((node) => {
      let findItem = node.querySelectorAll(selector);
      if (findItem.length > 0) {
        found.push(findItem);
      }
    });

    return new DomNodeCollection(found);
  }

  remove(){
    this.nodes.forEach( (node) => {
      node.remove();
    });
  }

  on(eventName, callback) {
    this.each(node => {
      node.addEventListener(eventName, callback);
      const eventKey = `ezDOM-${eventName}`;
      if (typeof node[eventKey] === "undefined") {
        node[eventKey] = [];
      }
      node[eventKey].push(callback);
    });
  }

  off(eventName) {
    this.each(node => {
      const eventKey = `ezDOM-${eventName}`;
      if (node[eventKey]) {
        node[eventKey].forEach(callback => {
          node.removeEventListener(eventName, callback);
        });
      }
      node[eventKey] = [];
    });
  }

}

module.exports = DomNodeCollection;
