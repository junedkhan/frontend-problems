

interface linbkedListNode {
    value: number;
    next: linbkedListNode | null;
}


function reverseLinkedList(head: linbkedListNode | null) {
    let prev = null;
    let current = head;
    let next = null;

    while(current !== null) {
        next = current.next;
        current.next = prev;
        prev = current;
        current = next;
    }

    return prev;
}