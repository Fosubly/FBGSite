const FIND_RADIUS = 20;

const GAME_DATA = [
    {
        name: "mushrom",
        imagePath: [
            "./games/find_diff/assets/first/left.png",
            "./games/find_diff/assets/first/right.png"
        ],
        diffPos: [
            {
                x: 105,
                y: 84,
            },
            {
                x: 45,
                y: 100,
            },
            {
                x: 150,
                y: 185,
            },
            {
                x: 155,
                y: 230,
            }
        ]
    }
    ,
]

const Canvas = document.querySelector("#find_diff_canvas")

let topBarMarkers = [];


function initCanvas() {
    Canvas.innerHTML = `
    <div class="top_bar"></div>
    <div class="game_area">
        <div class="game_area__left_side"><img></div>
        <div class="game_area__right_side"><img></div>
    </div>
    <div class="bottom_bar"></div>
    `

}


function startGame() {
    imageId = Math.floor(Math.random() * (GAME_DATA.length - 1));
    const LeftImage = Canvas.querySelector(".game_area__left_side img");
    const RightImage = Canvas.querySelector(".game_area__right_side img");
    LeftImage.src = GAME_DATA[imageId].imagePath[0]
    RightImage.src = GAME_DATA[imageId].imagePath[1]
    initTopBar(GAME_DATA[imageId].diffPos.length)

    diffCheck(GAME_DATA[imageId].diffPos, LeftImage, RightImage)
}

function initTopBar(markerCount) {
    let topBar = Canvas.querySelector(".top_bar");
    let marker = document.createElement("div");
    marker.classList.add("top_bar__marker");
    for (let i = 0; i < markerCount; i++) {
        topBar.appendChild(marker.cloneNode())
    }

    topBarMarkers = Array(...topBar.childNodes)

}

function diffCheck(diffPosArr, leftImage, rightImage) {
    imgClickHandler(leftImage, diffPosArr);
    imgClickHandler(rightImage, diffPosArr)
}


function imgClickHandler(img, diffPosArr) {
    img.addEventListener("click", (e) => {
        let clickPos = {
            x: e.offsetX,
            y: e.offsetY
        }
        let diffPosId = matchDiff(clickPos, diffPosArr);
        if (diffPosId + 1) {
            // console.log(diffPosId);
            drawFindMarker(diffPosArr[diffPosId])
            drawTopBarMarkers();
        }
        console.log("click position: ", clickPos);
    })
}

function drawTopBarMarkers() {
    topBarMarkers.find(el => {
        if (!el.classList.contains('active')) {
            el.classList.add("active")
            return true
        }
    })

    // console.log(topBarMarkers);
}

function matchDiff(clickPos, diffPosArr) {
    return diffPosArr.findIndex((el) => {
        return Math.pow(el.x - clickPos.x, 2) + Math.pow(el.y - clickPos.y, 2) <= FIND_RADIUS * FIND_RADIUS
    })
}

function drawFindMarker(pos) {

    const findMarker = document.createElement("div");
    findMarker.classList.add("find_marker");
    findMarker.style.top = pos.y - FIND_RADIUS + "px";
    findMarker.style.left = pos.x - FIND_RADIUS + "px";
    setTimeout(() => {
        findMarker.style.opacity = 1;
        leftImage.appendChild(findMarker);
        rightImage.appendChild(findMarker.cloneNode());
    }, 1);

    let leftImage = Canvas.querySelector(".game_area__left_side");
    let rightImage = Canvas.querySelector(".game_area__right_side");



}

initCanvas()
startGame();