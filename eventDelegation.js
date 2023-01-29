const eventDelegation = (delegatedElement, triggerElement, type, callback) => {
  const parentName = delegatedElement.localName?.toLowerCase();
  delegatedElement.addEventListener(type, (e) => {
    let current = e.target;
    while (current.localName.toLowerCase() !== parentName) {
      if (current.localName.toLowerCase() === triggerElement) {
        callback.call(current, e);
        break;
      }
      current = current.parentNode;
    }
  })
}
const eventDelegation2 = (delegatedElement, triggerElement, type, callback) => {
  const parentName = delegatedElement.localName?.toLowerCase();
  delegatedElement.addEventListener(type, (e) => {
    let current = e.target;
    while (!current.matches(triggerElement)) {
      if (delegatedElement === current) {
        current = null;
        break;
      }
      current = current.parentNode;
    }
    current && callback.call(current, e)
  })
}

// 可以在
const parent1 = document.querySelector(".parent");
eventDelegation2(parent1, 'h4', 'click', (e) => {
  console.log('clicked', e?.clientX);
})
