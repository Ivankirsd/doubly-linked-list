const Node = require('./node');

class LinkedList {
    constructor() {
      this.length = 0;
      this._head = null;
      this._tail = null;
    }

    append(data) {

      if (this.length) {
        this.node = new Node(data, this._tail, null);
        this._tail.next = this.node;
        this._tail = this.node;
      } else {
        this.node = new Node(data, null, null);
        this._head = this.node;
        this._tail = this.node;
      }

      this.length++;

      return this;
    }

    head() {
      return this._head !=null ? this._head.data : null;
    }

    tail() {
      return this._tail !=null ? this._tail.data : null;
    }

    at(index) {
      this.index = index,
      this.message = {failure: 'Failure: non-existent node in this list.'};

      if (this.length === 0 || this.index < 0 || this.index > this.length) {
        throw new Error(this.message.failure);
      }

      if (this.index <= this.length/2) {
        this.count = 0,
        this.node = this._head;
        while (this.count < this.index) {
          this.node = this.node.next;
          this.count++;
        }
      } else {
        this.count = this.length - 1,
        this.node = this._tail;

        while (this.count > this.index) {
          this.node = this.node.prev;
          this.count--;
        }
      }

      return this.node.data;
    }

    insertAt(index, data) {

      this.index = index,
      this.data = data;
      this.count = 0,
      this.node = this._head;
      this.prevNode = null;
      this.nextNode = null;

      this.message = {failure: 'Failure: non-existent node in this list.'};

      if (this.index < 0 || this.index > this.length) {
        throw new Error(this.message.failure);
      }

      if (this.index === this.length) {
        return this.append(data);
      }

      if (this.index === 0) {
        this.node = new Node(data, null, this._head);
        this._head.prev = this.node;
        this._head = this.node;
        this.length++;

        return this;
      }

      while (this.count < this.index) {
        this.node = this.node.next;
        this.count++;
      }
      this.prevNode = this.node.prev;
      this.nextNode = this.node;

      this.node = new Node(data, this.prevNode, this.nextNode);
      this.prevNode.next = this.node;
      this.nextNode.prev = this.node;
      this.length++;

      return this;
    }

    isEmpty() {
      return !this.length;
    }

    clear() {
      this.length = 0;
      this._head = null;
      this._tail = null;
      return this;
    }

    deleteAt(index) {

      this.index = index;
      this.node = this._head,
      this.count = 1,
      this.message = {failure: 'Failure: non-existent node in this list.'},
      this.prevNode = null,
      this.nextNode = null;

      if (this.length === 0 || this.index < 0 || this.index > this.length) {
        throw new Error(this.message.failure);
      }

      if (this.index === 0) {
        this._head = this.node.next;
        this.length--;

        return this;
      }

      if (this.index === this.length) {
        this._tail = this._tail.prev;
        this._tail.next = null;
        this.length--;

        return this;
      }
      while (this.count < this.index) {
        this.node = this.node.next;
        this.count++;
      }

      this.prevNode = this.node.prev;
      this.nextNode = this.node.next;
      this.prevNode.next = this.node.next;
      this.nextNode.prev = this.node.prev;

      this._length--;

      return this;
    }

    reverse() {
      this.node = this._head,
      this.count = 0;
      this.a = null;

      while (this.count < this.length) {
        this.a = this.node.prev;
        this.node.prev = this.node.next;
        this.node.next = this.a;

        this.node = this.node.prev;
        this.count++;
      }

      this.a = this._head;
      this._head = this._tail;
      this._tail = this.a;

      return this;
    }

    indexOf(data) {
      
      this.data = data;
      this.node = this._head,
      this.index = 0;

      while (this.node != null) {
        if (this.node.data === this.data) {
          return this.index;
        }

        this.node = this.node.next;
        this.index++;
      }

      return -1;
    }
}

module.exports = LinkedList;
