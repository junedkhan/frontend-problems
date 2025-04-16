"use strict";
class ListNode {
    constructor(value) {
        this.next = null;
        this.prev = null;
        this.value = value;
    }
}
class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    append(value) {
        const node = new ListNode(value);
        if (!this.head) {
            this.head = this.tail = node;
        }
        else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.length++;
    }
    prepend(value) {
        const node = new ListNode(value);
        if (!this.head) {
            this.head = this.tail = node;
        }
        else {
            node.next = this.head;
            this.head.prev = node;
            this.head = node;
        }
        this.length++;
    }
    insertAt(index, value) {
        if (index < 0 || index > this.length) {
            throw new Error("Index out of bounds");
        }
        if (index === 0)
            return this.prepend(value);
        if (index === this.length)
            return this.append(value);
        let current = this.head;
        for (let i = 0; i < index - 1; i++) {
            current = current.next;
        }
        const node = new ListNode(value);
        const nextNode = current.next;
        current.next = node;
        node.prev = current;
        if (nextNode) {
            nextNode.prev = node;
            node.next = nextNode;
        }
        this.length++;
    }
    removeAt(index) {
        if (index < 0 || index >= this.length) {
            throw new Error("Index out of bounds");
        }
        if (index === 0)
            return this.removeHead();
        if (index === this.length - 1)
            return this.removeTail();
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        current.prev.next = current.next;
        current.next.prev = current.prev;
        this.length--;
        return current.value;
    }
    removeHead() {
        if (!this.head)
            return null;
        const value = this.head.value;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        }
        else {
            this.head = this.head.next;
            this.head.prev = null;
        }
        this.length--;
        return value;
    }
    removeTail() {
        if (!this.tail)
            return null;
        const value = this.tail.value;
        if (this.head === this.tail) {
            this.head = this.tail = null;
        }
        else {
            this.tail = this.tail.prev;
            this.tail.next = null;
        }
        this.length--;
        return value;
    }
    indexOf(value) {
        let current = this.head;
        let index = 0;
        while (current) {
            if (current.value === value)
                return index;
            current = current.next;
            index++;
        }
        return -1;
    }
    reverse() {
        let current = this.head;
        let temp = null;
        this.tail = this.head;
        while (current) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            if (!current.prev) {
                this.head = current;
            }
            current = current.prev;
        }
    }
    toArray() {
        const result = [];
        let current = this.head;
        while (current) {
            result.push(current.value);
            current = current.next;
        }
        return result;
    }
    printList() {
        console.log(this.toArray().join(" <-> "));
    }
    size() {
        return this.length;
    }
    clear() {
        this.head = this.tail = null;
        this.length = 0;
    }
}
const list = new DoublyLinkedList();
list.append(10);
list.append(20);
list.prepend(5);
list.insertAt(1, 8); // Insert 8 at index 1
list.printList(); // 5 <-> 8 <-> 10 <-> 20
list.removeAt(2); // Remove 10
list.reverse(); // Reverse the list
list.printList(); // 20 <-> 8 <-> 5
console.log("Index of 8:", list.indexOf(8)); // 1
console.log("Size:", list.size()); // 3
list.clear();
console.log("After clear:", list.toArray()); // []
