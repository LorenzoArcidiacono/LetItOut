const PANTRY_ID = "ec0c17f7-74e8-4735-b0e7-828f037d73db"

let messagesJSON;
let response;

function saveMessage() {
    let title = $(".title-input").val();
    let text = $(".text-input").val();
    if (!title || !text) {
        $(".title-input").attr("placeholder", "Required");
        $(".text-input").attr("placeholder", "Required");
        console.log(`Error: Title and text are required`);
        return;
    }

    $(".title-input").val('');
    $(".text-input").val('');
    $(".title-input").attr("placeholder", "");
    $(".text-input").attr("placeholder", "");

    let id = Math.random().toString(36).slice(2, 12);
    console.log(`${id}:${title}: ${text}`);

    closeWriteCard();

    let jsondata = {
        messages: [{
            id: id,
            title: title,
            text: text,
            date: getDate()
        }]
    }

    messagesJSON.messages.push(jsondata.messages[0]);
    console.log(`Messages: ${JSON.stringify(messagesJSON)}`);
    // console.log(response);

    localStorage.setItem('updatedMessages', true);
    localStorage.setItem('messages', JSON.stringify(messagesJSON));
    updateCardGrid();
    updateJsonBin(jsondata);

}

function retriveJsonData() {
    // n:point
    // $.ajax({
    //     url: "https://api.npoint.io/c4b4a76ba83b56aa77d3",
    //     success: function (result) {
    //         // console.log(JSON.stringify(result));
    //         messagesJSON = result
    //         localStorage.setItem('messages', JSON.stringify(messagesJSON));
    //         createCards();
    //     }
    // });

    // PANTRY
    let req = new XMLHttpRequest();
    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);
            messagesJSON = JSON.parse(req.responseText);
            response = JSON.parse(req.responseText);
            console.log(messagesJSON);
            localStorage.setItem('messages', JSON.stringify(messagesJSON));
            createCards();
        }
    };

    req.open("GET", "https://getpantry.cloud/apiv1/pantry/ec0c17f7-74e8-4735-b0e7-828f037d73db/basket/LetItOut");
    req.send();
}


function updateJsonBin(data) {
    // PANTRY
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);
        }
    };

    req.open("PUT", "https://getpantry.cloud/apiv1/pantry/ec0c17f7-74e8-4735-b0e7-828f037d73db/basket/LetItOut");
    req.setRequestHeader("Content-Type", "application/json");
    req.send(JSON.stringify(data));
}

async function createCards() {
    let card = `<div class="card" onclick="openCard('$ID')"><h2>$TITLE</h2></div>`
    if (messagesJSON == undefined) {
        setTimeout(() => {
            createCards();
        }, 400);
    } else {
        console.log(`messages:${messagesJSON}`);
        await createGrid(messagesJSON.messages.length);
//         let i = 0,
//             j = 0;
//         let width = $(".MainArea").width();
//         // 272 px = 17rem -> card width
//         let colCount = Math.round(width / 272) - 1;
//         // print card from newest
//         messagesJSON.messages.slice().reverse().forEach(element => {
//             console.log(element.title);
//             let next = card.replace('$ID', element.id).replace('$TITLE', element.title);
//             console.log(next);
//             $(`.container-grid #row${i} #col${j}`).append(next);
//             j++;
//             if (j == colCount) {
//                 j = 0;
//                 i++;
//             }
//         });
    }
}

function updateCardGrid() {
    $(".MainArea").empty();
    createCards();
}

function getDate() {
    const date = new Date();

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    // This arrangement can be altered based on how we want the date's format to appear.
    let currentDate = `${day}-${month}-${year}`;
    return currentDate;

}
