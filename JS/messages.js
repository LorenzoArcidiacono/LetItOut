const BIN_ID = "6318c12b5c146d63ca92601c";
const MASTER_KEY = "$2b$10$rwQp/SJS4uB0ZTzBw8L5DuNqbw4ZxFvVvzKz91Nxs28n82CkvYgqy";

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
        id: id,
        title: title,
        text: text
    }

    messagesJSON.messages.unshift(jsondata);
    console.log(`Messages: ${JSON.stringify(messagesJSON)}`);
    // console.log(response);

    // updateJsonBin();

}

function retriveJsonData() {
    $.ajax({
        url: "https://api.npoint.io/c4b4a76ba83b56aa77d3",
        success: function (result) {
            // console.log(JSON.stringify(result));
            messagesJSON = result
            localStorage.setItem('messages', JSON.stringify(messagesJSON));
            createCards();
        }
    });

    // let req = new XMLHttpRequest();

    // req.onreadystatechange = () => {
    //     if (req.readyState == XMLHttpRequest.DONE) {
    //         console.log(req.responseText);
    //         messagesJSON = JSON.parse(req.responseText);
    //         response = JSON.parse(req.responseText);
    //         console.log(messagesJSON);
    //         localStorage.setItem('messages', JSON.stringify(messagesJSON));
    //         createCards();
    //     }
    // };

    // req.open("GET", "https://api.jsonbin.io/v3/b/" + BIN_ID + "/latest?meta=false", true);
    // req.setRequestHeader("X-Master-Key", MASTER_KEY);
    // req.setRequestHeader("X-Bin-Meta", "false");
    // req.send();
}

// TODO: On Update show the new card.
// NOTE: Don't reload the page cause it's another api call
// IDEA: Call createCards after emptying MainArea and adjourn messagesJSON
function updateJsonBin() {
    let req = new XMLHttpRequest();

    req.onreadystatechange = () => {
        if (req.readyState == XMLHttpRequest.DONE) {
            console.log(req.responseText);
        }
    };

    req.open("PUT", "https://api.jsonbin.io/v3/b/" + BIN_ID, true);
    req.setRequestHeader("Content-Type", "application/json");
    req.setRequestHeader("X-Master-Key", MASTER_KEY);
    req.send(JSON.stringify(messagesJSON));
}

async function createCards() {
    let card = `<div class="card" onclick="openCard('$ID')"><h2>$TITLE</h2></div>`
    if (messagesJSON == undefined) {
        setTimeout(() => {
            createCards();
        }, 400);
    } else {
        await createGrid(messagesJSON.messages.length);
        let i = 0,
            j = 0;
        let width = $(".MainArea").width();
        // 272 px = 17rem -> card width
        let colCount = Math.round(width / 272) - 1;
        
        messagesJSON.messages.forEach(element => {
            console.log(element.title);
            let next = card.replace('$ID', element.id).replace('$TITLE', element.title);
            console.log(next);
            $(`.container-grid #row${i} #col${j}`).append(next);
            j++;
            if (j == colCount) {
                j = 0;
                i++;
            }
        });
    }
}