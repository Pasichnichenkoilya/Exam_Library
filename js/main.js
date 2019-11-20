let bookForm = document.querySelector("#adding-book");
let visitorForm = document.querySelector("#adding-visitor");
let cardForm = document.querySelector("#adding-cards");
document.querySelector("#books-table").removeAttribute("class");
let table = document.querySelector("table");

let Books = {

    booksArray: [],

    findBookByTitle(bookTitle) {
        for (let i = 0; i < this.booksArray.length; i++) {
            if (this.booksArray[i].title === bookTitle) {
                return i;
            }
        }
        return false;
    },

    addNewBook() {
        let elements = bookForm.elements;
        let errors = [];

        if (errors.length !== 0) {
            //сделать валидацию
        } else {
            let iBook = this.findBookByTitle(elements["title"].value);
            if (iBook !== false) {
                this.booksArray[iBook].copiesCount += Number(elements["copies-count"].value);
                let trList = document.querySelectorAll("tr");
                for (let i = 0; i < trList.length; i++) {
                    if (Number(trList[i].getAttribute("data-id")) === iBook) {
                        trList[i].children[6].textContent = this.booksArray[iBook].copiesCount;
                    }
                }

            } else if (iBook === false) {

                this.booksArray.push({
                    id: this.booksArray.length + 1,
                    title: elements["title"].value,
                    autor: elements["autor"].value,
                    releaseYear: Number(elements["release-year"].value),
                    publisher: elements["publisher"].value,
                    pagesCount: Number(elements["pages-count"].value),
                    copiesCount: Number(elements["copies-count"].value),
                });

                //adding new book to DOM
                let last = this.booksArray[this.booksArray.length - 1];
                let tr = document.createElement("tr");
                tr.setAttribute("data-id", this.booksArray.length - 1);

                for (let key in last) {
                    let td = document.createElement("td");
                    td.textContent = last[key];
                    tr.append(td);
                }
                document.querySelector("#books-table-tbody").append(tr);
            }
        }
    },

}

let Visitors = {
    visitorsArray: [],

    findVisitorByFullName(fullName) {
        for (let i = 0; i < this.visitorsArray.length; i++) {
            if (this.visitorsArray[i].fullName === fullName) {
                return i;
            }
        }
        return false;
    },

    addNewVisitor() {
        let elements = visitorForm.elements;
        let errors = [];
        // if (errors.length !== 0) {
        //     //сделать валидацию
        // } else {

        // }
        this.visitorsArray.push({
            id: this.visitorsArray.length + 1,
            fullName: elements["full-name"].value,
            phone: Number(elements["phone"].value)
        });

        let last = this.visitorsArray[this.visitorsArray.length - 1];
        let tr = document.createElement("tr");

        tr.setAttribute("data-id", this.visitorsArray.length - 1);

        for (let key in last) {
            let td = document.createElement("td");
            td.textContent = last[key];
            tr.append(td);
        }
        document.querySelector("#visitors-table-tbody").append(tr);
    },
}

let Cards = {
    cardsArray: [],

    addNewCard() {
        let elements = cardForm.elements;
        this.cardsArray.push({
            id: this.cardsArray.length + 1,
            visitor: elements["visitor"].value,
            book: elements["book"].value,
            borrowDate: elements["borrow-date"].value,
            returnDate: elements["return-date"].value
        });

        let last = this.cardsArray[this.cardsArray.length - 1];
        let tr = document.createElement("tr");

        tr.setAttribute("data-id", this.cardsArray.length - 1);

        for (let key in last) {
            let td = document.createElement("td");
            td.textContent = last[key];
            tr.append(td);
        }

        document.querySelector("#cards-table-tbody").append(tr);
    }
}

$(".menu-item").click(e => {
    $("#active-menu-item").removeAttr("id");
    e.target.setAttribute("id", "active-menu-item");

    $("#menu-item-name").text(`All ${e.target.textContent}:`);
    $("#add-new-title").text(`New ${e.target.textContent.slice(0, e.target.textContent.length - 1)}`);
    switch ($("#active-menu-item").text()) {
        case "Books":
            document.querySelector("#books-table").removeAttribute("class");
            document.querySelector("#visitors-table").className = "hidden";
            document.querySelector("#cards-table").className = "hidden";
            break;

        case "Visitors":
            document.querySelector("#visitors-table").removeAttribute("class");
            document.querySelector("#books-table").className = "hidden";
            document.querySelector("#cards-table").className = "hidden";
            break;

        case "Cards":
            document.querySelector("#cards-table").removeAttribute("class");
            document.querySelector("#visitors-table").className = "hidden";
            document.querySelector("#books-table").className = "hidden";
            break;

        case "Statistics":
            document.querySelector("#cards-table").className = "hidden";
            document.querySelector("#visitors-table").className = "hidden";
            document.querySelector("#books-table").className = "hidden";
            break;
    }
});

$("#new-item").click(e => {
    switch ($("#active-menu-item").text()) {
        case "Books":
            document.querySelector("#adding-book").removeAttribute("class");
            break;

        case "Visitors":
            document.querySelector("#adding-visitor").removeAttribute("class");
            break;

        case "Cards":
            document.querySelector("#adding-cards").removeAttribute("class");
            break;
    }


    $(".content").addClass("blackout");
    $(".adding-block").animate({
        top: "30%",
        left: "40%",
        opacity: "1"
    }, 200);
});

$("#adding-book").submit(e => {
    e.preventDefault();

    Books.addNewBook();
    e.target.setAttribute("class", "hidden");
    $(".content").removeClass("blackout");
    $(".adding-block").animate({
        left: "-100%",
        opacity: "0"
    }, 200);
});

$("#adding-visitor").submit(e => {
    e.preventDefault();

    Visitors.addNewVisitor();
    e.target.setAttribute("class", "hidden");

    $(".content").removeClass("blackout");
    $(".adding-block").animate({
        left: "-100%",
        opacity: "0"
    }, 200);
});

$("#adding-cards").submit(e => {
    e.preventDefault();

    Cards.addNewCard();
    e.target.setAttribute("class", "hidden");

    $(".content").removeClass("blackout");
    $(".adding-block").animate({
        left: "-100%",
        opacity: "0"
    }, 200);
});