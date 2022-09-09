
let messages;

// Open/Close the single card view
function openCard(id) {
    let update = localStorage.getItem('updatedMessages');
    if(messages == null || update) {
        messages = JSON.parse(localStorage.getItem('messages'));
        console.log(`messages: ${messages}`);
    }
    let element = messages.messages.find(element => element.id == id)
    $(".overlay-title").text(element.title);
    $(".overlay-text").text(element.text);
    $("#overlay").fadeIn();
    $("#overlay").css("display", "flex")
}

function closeCard() {
    $("#overlay").fadeOut(500);
    setTimeout(() => {
        $("#overlay").css("display", "none");
    }, 600);
}

function openWriteCard(){
    // $(".overlay-title").text("Prova");
    // $(".overlay-text").text(
    //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum mattis urna volutpat, congue leout, dictum tellus. Vivamus ac arcu ac dui tempor facilisis. Etiam sit amet mollis mauris. Interdum et malesuada fames ac ante ipsum primis in faucibus. Aliquam ultricies, purus eget fringilla iaculis, metus orci placerat purus, quis."
    // );
    $("#overlay-new-card").fadeIn();
    $("#overlay-new-card").css("display", "flex")
}

function closeWriteCard() {
    $("#overlay-new-card").fadeOut(500);
    setTimeout(() => {
        $("#overlay-new-card").css("display", "none");
    }, 600);
}


// TODO: numero di colonne in base alla dimensione dello schermo
function createGrid(totalCardsCount) {
    let width = $(".MainArea").width();
    let colCount = Math.round(width/272)-1;
    let rowCount = Math.round(totalCardsCount/colCount);
    console.log(`row:${rowCount} col:${colCount}`);
    var container = document.createElement('div');
    container.id = "card-grid";
    container.className = "container-grid";

    for (var i = 0; i < rowCount; i++) {
        var row = document.createElement('div');
        row.className = "row";
        row.id = "row" + i;

        for (var j = 0; j < colCount; j++) {
            var box = document.createElement('div');
            box.className = 'col';
            box.id = 'col'+j;
            row.appendChild(box);
        }

        container.appendChild(row);
    }
    $(".MainArea").append(container);
    return container;
}

function backgroundImageGenerator() {
    let first = getRandomNumber(12)
    let second = getRandomNumber(12)
    while(first == second){
        second = getRandomNumber(12);
    }
    console.log(`${first},${second}`);
    $(".first-img").attr("src",`./IMG/img${first}.png`);
    $(".sec-img").attr("src",`./IMG/img${second}.png`);
}

function getRandomNumber(max) {
    return (Math.floor(Math.random() *100) % max+1);
}