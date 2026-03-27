export class Node {
    nextNode = null;
    value = null;

    constructor(key = null, data) {
        this.value = data;
        this.key = key;
    }
}