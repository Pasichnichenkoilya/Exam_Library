let books = {
    arr: [],

    isValid() {
        let errors = [];
        let elements = $("#adding-book input");

        for (let i = 0; i < elements.length; i++) {
            if (!elements[i].value) {
                errors.push(elements[i]);
            } else {
                elements[i].parentElement.className = "";
            }
        }
        errors.forEach(key => {
            key.parentElement.className = "error";
        });

        if (errors.length) {
            alert("Fill All Fields!");
            return false;
        } else {
            return true;
        }
    },

    addBook() {
        let elements = document.querySelector("#adding-book").elements;
        let title = elements["title"].value;
        let findedBookIndex = this.findBookByTitle(title);

        if (findedBookIndex >= 0) {
            this.arr[findedBookIndex].copiesCount += Number(elements["copies-count"].value);
            $(`#book-${findedBookIndex + 1}`).children()[6].textContent = this.arr[findedBookIndex].copiesCount;
        } else if (this.isValid()) {
            this.arr.push({
                id: this.arr.length + 1,
                title: title,
                autor: elements["autor"].value,
                releaseYear: Number(elements["release-year"].value),
                publisherName: elements["publisher"].value,
                pageCount: Number(elements["pages-count"].value),
                copiesCount: Number(elements["copies-count"].value)
            });
            let last = this.arr[this.arr.length - 1];
            let tr = $("<tr></tr>");
            tr.attr("id", `book-${last.id}`);



            for (key in last) {
                let td = $("<td></td>");
                td.text(last[key]);
                tr.append(td);
            }
            $("#books-table").append(tr);
            localStorage.setItem(`books`, JSON.stringify(this.arr));
            return true;
        }
        return false;
    },

    findBookByTitle(title) {
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i].title === title) {
                return i;
            }
        }
        return -1;
    },

    loadBooks() {
        if (localStorage.getItem("books") !== null) {
            this.arr = JSON.parse(localStorage.getItem("books"));
            for (let i = 0; i < this.arr.length; i++) {
                let last = this.arr[i];
                let tr = $("<tr></tr>");
                tr.attr("id", `book-${last.id}`);

                for (key in last) {
                    let td = $("<td></td>");
                    td.text(last[key]);
                    tr.append(td);
                }
                $("#books-table").append(tr);
            }
        }
    }
}

let visitors = {
    arr: [],

    isValid() {
        let errors = [];
        let elements = $("#adding-visitor input");

        for (let i = 0; i < elements.length; i++) {
            if (!elements[i].value) {
                errors.push(elements[i]);
            } else {
                elements[i].parentElement.className = "";
            }
        }

        if (!/^[a-zA-Z]*$/.test(elements[0].value)) {
            errors.push(elements[0]);
        }

        errors.forEach(key => {
            key.parentElement.className = "error";
        });

        if (errors.length) {
            if (!/^[a-zA-Z]*$/.test(elements[0].value)) {
                alert("Full name should contain only letters!");
            } else {
                alert("Fill All Fields!");
            }
            return false;
        } else {
            return true;
        }
    },


    addVisitor() {
        if (this.isValid()) {
            let elements = document.querySelector("#adding-visitor").elements;
            this.arr.push({
                id: this.arr.length + 1,
                fullName: elements["full-name"].value,
                phone: elements["phone"].value
            });

            let last = this.arr[this.arr.length - 1];
            let tr = $("<tr></tr>");

            for (key in last) {
                let td = $("<td></td>");
                td.text(last[key]);
                tr.append(td);
            }

            $("#visitors-table").append(tr);
            localStorage.setItem(`visitors`, JSON.stringify(this.arr));
            return true;
        }
        return false;
    },

    findVisitorByName(fullName) {
        for (let i = 0; i < this.arr.length; i++) {
            if (this.arr[i].fullName === fullName) {
                return i;
            }
        }
        return -1;
    },

    loadVisitors() {
        if (localStorage.getItem("visitors") !== null) {
            this.arr = JSON.parse(localStorage.getItem("visitors"));
            for (let i = 0; i < this.arr.length; i++) {
                let last = this.arr[i];
                let tr = $("<tr></tr>");

                for (key in last) {
                    let td = $("<td></td>");
                    td.text(last[key]);
                    tr.append(td);
                }

                $("#visitors-table").append(tr);
            }
        }
    }

}

let cards = {
    arr: [],

    isValid() {
        let errors = [];
        let elements = $("#adding-card input");

        for (let i = 0; i < elements.length - 2; i++) {
            if (!elements[i].value) {
                errors.push(elements[i]);
            } else {
                elements[i].parentElement.className = "";
            }
        }

        if (visitors.findVisitorByName(elements[0].value) < 0) {
            errors.push(elements[0]);
        }

        if (books.findBookByTitle(elements[1].value) < 0) {
            errors.push(elements[1]);
        }

        errors.forEach(key => {
            key.parentElement.className = "error";
        });

        if (errors.length) {
            if (visitors.findVisitorByName(elements[0].value) < 0) {
                alert("No such visitor");
            } else if (books.findBookByTitle(elements[1].value) < 0) {
                alert("No such book");
            } else {
                alert("Fill All Fields!");
            }
            return false;
        } else {
            return true;
        }
    },

    addCard() {
        if (this.isValid()) {
            let elements = document.querySelector("#adding-card").elements;
            this.arr.push({
                id: this.arr.length + 1,
                visitor: elements["visitor"].value,
                book: elements["book"].value,
                borrowDate: elements["borrow-date"].value,
                returnDate: elements["return-date"].value
            });
            console.log(this.arr);
            let last = this.arr[this.arr.length - 1];
            let tr = $("<tr></tr>");
            tr.attr("id", `card-${last.id}`);

            let today = new Date();

            if (last.borrowDate === "Not necessary") {
                last.borrowDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
            }

            for (key in last) {
                let td = $("<td></td>");
                if (last[key] === "Not necessary") {
                    td.append($("<i></i>").toggleClass("fa fa-arrow-left"));
                    td.toggleClass("return-td");
                } else {
                    td.text(last[key]);
                }
                tr.append(td);
            }
            $("#cards-table").append(tr);
            localStorage.setItem(`cards`, JSON.stringify(this.arr));
            return true;
        }
        return false;
    },

    returned(element) {
        let id;
        if (element.tagName === "TD") {
            id = element.parentElement.id;
        } else if (element.tagName === "I") {
            id = element.parentElement.parentElement.id;
        }
        let today = new Date();
        element.textContent = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
        this.arr[Number(id[id.length - 1]) - 1].returnDate = element.textContent;
    },

    loadCard() {
        if (localStorage.getItem("cards") !== null) {
            this.arr = JSON.parse(localStorage.getItem("cards"));
            for (let i = 0; i < this.arr.length; i++) {
                let last = this.arr[i];
                let tr = $("<tr></tr>");
                tr.attr("id", `card-${last.id}`);

                let today = new Date();

                if (last.borrowDate === "Not necessary") {
                    last.borrowDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
                }

                for (key in last) {
                    let td = $("<td></td>");
                    if (last[key] === "Not necessary") {
                        td.append($("<i></i>").toggleClass("fa fa-arrow-left"));
                        td.toggleClass("return-td");
                    } else {
                        td.text(last[key]);
                    }
                    tr.append(td);
                }
                $("#cards-table").append(tr);
            }
        }
    }
}

books.loadBooks();
visitors.loadVisitors();
cards.loadCard();

$(".menu-item")[0].id = "active-menu-item";

function updatePageContent() {
    $("#all-items").text(`All ${$("#active-menu-item").text()}:`);
    $("#add-new-title").text(`New ${$("#active-menu-item").text().slice(0, -1)}`);
    $(`#${$("#active-menu-item").attr("data-table-id")}`).removeClass();
}
updatePageContent();

$(".menu-item").click(e => { // change menu
    $(`#${$("#active-menu-item").attr("data-table-id")}`).toggleClass("hidden");
    $("#active-menu-item").removeAttr("id");
    e.target.id = "active-menu-item";
    updatePageContent();
});

$("#new-item").click(e => { // adding new item
    $("#adding-block").removeClass();
    $(`#${$("#active-menu-item").attr("data-form-id")}`).removeClass();

    $("#adding-block").animate({
        left: $(window).width() / 2 - $("#adding-block").width() / 2,
        top: $(window).height() / 2 - $("#adding-block").height() / 2,
        opacity: "1"
    }, 200);

    $(".content").animate({
        opacity: "0.2"
    }, 200);
});

$(window).resize(e => {
    $("#adding-block").animate({
        left: $(window).width() / 2 - $("#adding-block").width() / 2,
        top: $(window).height() / 2 - $("#adding-block").height() / 2
    }, 0);
});

$("#adding-book").submit(e => { // Adding new book
    if (books.addBook()) {
        $("#adding-block").animate({
            left: 0,
            top: 0,
            opacity: "0"
        });

        $(".content").animate({
            opacity: "1"
        });

        $(`#${$("#active-menu-item").attr("data-form-id")}`).toggleClass("hidden");
        $("#adding-block").toggleClass("hidden");
    }

    e.preventDefault();
});

$("#adding-visitor").submit(e => { // Adding new visitor
    if (visitors.addVisitor()) {
        $("#adding-block").animate({
            left: 0,
            top: 0,
            opacity: "0"
        });

        $(".content").animate({
            opacity: "1"
        });

        $(`#${$("#active-menu-item").attr("data-form-id")}`).toggleClass("hidden");
        $("#adding-block").toggleClass("hidden");
    }

    e.preventDefault();
});

$("#adding-card").submit(e => { // Adding new card
    if (cards.addCard()) {
        $("#adding-block").animate({
            left: 0,
            top: 0,
            opacity: "0"
        });

        $(".content").animate({
            opacity: "1"
        });

        $(`#${$("#active-menu-item").attr("data-form-id")}`).toggleClass("hidden");
        $("#adding-block").toggleClass("hidden");
    }

    e.preventDefault();
});

$("#borrow-date").click(e => {
    if (e.target.value === "Not necessary") {
        e.target.value = null;
    }
});

$("#return-date").click(e => {
    if (e.target.value === "Not necessary") {
        e.target.value = null;
    }
});

$(".return").click(e => {
    console.log(e.target.tagName);

    cards.returned(e.target);
});