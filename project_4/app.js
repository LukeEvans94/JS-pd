//Book Constructor
function Book(title,author,isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

UI.prototype.showAlert = function(msg,className) {
    const div = document.createElement('div'),
          container = document.querySelector('.container'),
          form = document.querySelector('#book-form');

    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    container.insertBefore(div,form);

    setTimeout(function() {
        document.querySelector('.alert').remove()
    },3000);
}


UI.prototype.addBookToList = function(book) {
    const list = document.getElementById('book-list'),
          row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;
    list.appendChild(row);
}

UI.prototype.clearFields = function() {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove();
    }
}

document.getElementById('book-form').addEventListener('submit',function(e) {
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value,
          book = new Book(title,author,isbn),
          ui = new UI();

    if(title === ''|| author === '' || isbn === ' ') {
        ui.showAlert('Please fill in all fields','error');
    } else {
        ui.addBookToList(book);
        ui.clearFields();
        ui.showAlert('Book Added','success');
    }

    e.preventDefault();
});

document.getElementById('book-list').addEventListener('click',function(e){
    ui = new UI();
    ui.deleteBook(e.target);
    ui.showAlert('Book Removed','success');
    e.preventDefault();
});