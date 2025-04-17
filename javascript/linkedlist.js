"use strict";
class LinkedListNode {
    constructor(value) {
        this.value = null;
        this.next = null;
        this.value = value;
    }
}
// node = new LikedListNode(4) => { value: 4, next: null, prev: null }
class LinkedList {
    constructor(value) {
        this.head = new LinkedListNode(null);
        this.length = 0;
        const node = new LinkedListNode(value);
        this.head = node;
        this.length++;
    }
    append(value) {
        const node = new LinkedListNode(value);
        let current = this.head;
        while (current.next) {
            current = current.next;
        }
        current.next = node;
        this.length++;
    }
    insert(position, element) {
        const node = new LinkedListNode(element);
        let currentPos = 1;
        let currentEle = this.head;
        while (currentEle.next && currentPos < position) {
            currentEle = currentEle.next;
            currentPos++;
        }
        const next = currentEle.next;
        currentEle.next = node;
        node.next = next;
        this.length++;
    }
    removeAt(position) {
        let currentPos = 1;
        let currentEle = this.head;
        while (currentEle.next && currentPos < position - 1) {
            currentEle = currentEle.next;
            currentPos++;
        }
        const removeItem = currentEle.next;
        if (removeItem === null || removeItem === void 0 ? void 0 : removeItem.next) {
            currentEle.next = removeItem === null || removeItem === void 0 ? void 0 : removeItem.next;
        }
        else {
            currentEle.next = null;
        }
        this.length--;
        return removeItem;
    }
}
const myLinkedList = new LinkedList(1);
myLinkedList.append(2);
myLinkedList.append(5);
myLinkedList.insert(2, 4);
myLinkedList.insert(10, 10);
myLinkedList.removeAt(3);
console.log("myLinkedList", JSON.stringify(myLinkedList));
