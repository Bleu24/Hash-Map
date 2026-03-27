import { LinkedList } from "./LinkedList";

export class HashMap {
    table = []
    tableSize = 16;
    loadFactor = 0.75;
    threshold = Math.floor(this.tableSize * this.loadFactor);

    constructor() { }

    hash(key) {
        try {
            if (typeof key !== "string") throw new TypeError("key should be string");
            let hashCode = 0;
            const prime = 59;

            for (let i = 0; i < key.length; i++) {
                hashCode = (hashCode * prime + key.charCodeAt(i)) % this.tableSize;
            }
            return hashCode;
        } catch (error) {
            console.log(error);
        }

    }

    set(key, value) {
        const idx = this.hash(key);

        if (!this.table[idx]) this.table[idx] = new LinkedList([key, value]);
        else this.table[idx].append([key, value]);

    }

    get(key) {
        const idx = this.hash(key);
        i

    }






}