import { LinkedList } from "./LinkedList.js";

export class HashMap {
    table = []
    tableSize = 16;
    loadFactor = 0.75;
    threshold = Math.floor(this.tableSize * this.loadFactor);

    constructor(size = 16, loadFactor = 0.75) {
        this.tableSize = size;
        this.loadFactor = loadFactor;
    }

    metThreshold() {
        return this.length() > this.threshold;
    }

    resize() {
        const newMap = new HashMap(this.tableSize * 2, this.loadFactor);

        // rehash
        // TODO: Fix hanging bug
        const entries = this.entries();


        this.table = newMap.table;
        this.tableSize = newMap.tableSize;
        this.loadFactor = newMap.loadFactor;
        this.threshold = newMap.threshold;

        for (const [key, value] of entries) {
            this.set(key, value);
        }
    }

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
        if (!this.table[idx]) {
            const list = new LinkedList();
            this.table[idx] = list;
            list.append(key, value);
        }
        else if (this.table[idx].contains(key)) this.table[idx].at(key).value = value;
        else this.table[idx].append(key, value);

        if (this.metThreshold()) {
            this.resize();
        }
    }

    get(key) {
        const idx = this.hash(key);
        try {
            if (idx < 0 || idx >= this.table.length) {
                throw new Error("Trying to access index out of bounds");
            }

            if (!this.table[idx]) return null;

            const list = this.table[idx];

            return list.at(key).value;

        } catch (error) {
            console.error(error);
        }
    }

    has(key) {
        const idx = this.hash(key);
        try {
            if (idx < 0 || idx >= this.table.length) {
                throw new Error("Trying to access index out of bounds");
            }

            if (!this.table[idx]) return null;

            const list = this.table[idx];

            return list.contains(key);

        } catch (error) {
            console.error(error);
        }
    }

    remove(key) {
        const idx = this.hash(key);
        try {
            if (idx < 0 || idx >= this.table.length) {
                throw new Error("Trying to access index out of bounds");
            }

            if (!this.table[idx]) return null;

            const list = this.table[idx];

            return list.remove(key);

        } catch (error) {
            console.error(error);
        }
    }

    length() {
        let total = 0;

        for (const bucket of this.table) {
            if (!bucket) continue;
            total += bucket.size();
        }

        return total;
    }

    clear() {
        this.table = [];
        this.tableSize = 16;
    }

    keys() {
        const keys = [];

        for (const bucket of this.table) {
            if (!bucket) continue;
            keys.push(...bucket.keys());
        }

        return [...keys];
    }

    values() {
        const values = [];

        for (const bucket of this.table) {
            if (!bucket) continue;
            values.push(...bucket.values());
        }

        return [...values];
    }

    entries() {
        const entries = [];

        for (const bucket of this.table) {
            if (!bucket) continue;
            entries.push(...bucket.values());
        }

        return [...entries];
    }






}