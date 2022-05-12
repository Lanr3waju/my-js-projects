class Book {
  constructor({ author, title, pages, read = false, id = this.generateID() }) {
    if (Book.isValid({ author, title, pages })) {
      this.author = author;
      this.title = title;
      this.pages = pages;
      this.read = read;
      this.id = id;
    }
  }

  static isValid = ({ author, title, pages }) => typeof author === 'string'
    && author.length > 0
    && typeof title === 'string'
    && title.length > 0
    && typeof pages === 'number';

  generateID = () => `_${Math.random()
    .toString(36)
    .substr(2, 9)}`;

  toggleRead = () => {
    this.read = !this.read;
  };
}

class Store {
  constructor(initialData = []) {
    this.memory = [];
    if (localStorage.getItem('lanr3wajuAwesomeBooksLibrary') === null) {
      initialData.forEach(this.add, this);
    } else {
      JSON.parse(localStorage.getItem('lanr3wajuAwesomeBooksLibrary')).forEach(this.add, this);
    }
  }

  static setToLocalStorage = item => {
    localStorage.setItem('lanr3wajuAwesomeBooksLibrary', JSON.stringify(item));
  };

  add = (book = {}) => {
    this.newBook = new Book(book);
    this.memory = [...this.memory, this.newBook];
    Store.setToLocalStorage(this.memory);
    return this.newBook;
  };

  toggleRead = id => {
    this.memory = this.memory.map(element => {
      if (element.id === id) {
        element.toggleRead();
      }
      return element;
    });
    Store.setToLocalStorage(this.memory);
    return this.memory;
  };

  remove = id => {
    this.memory = this.memory.filter(book => book.id !== id);
    Store.setToLocalStorage(this.memory);
    return this.memory;
  };

  count = () => this.memory.length;

  all = () => this.memory;
}

export default Store;
