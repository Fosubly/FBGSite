/**
 * Игра "Найди отличия"
 * Рефакторинг: исправлены критические баги, улучшена структура кода
 */

const FIND_RADIUS = 20;

const GAME_DATA = [
    {
        name: "mushroom",
        imagePath: [
            "./games/find_diff/assets/first/left.png",
            "./games/find_diff/assets/first/right.png"
        ],
        diffPos: [
            { x: 105, y: 84 },
            { x: 45, y: 100 },
            { x: 150, y: 185 },
            { x: 155, y: 230 }
        ]
    }
];

const canvas = document.querySelector("#find_diff_canvas");
let topBarMarkers = [];

function initCanvas() {
    if (!canvas) {
        console.error("find_diff: контейнер #find_diff_canvas не найден в DOM");
        return false;
    }

    canvas.innerHTML = `
        <div class="top_bar"></div>
        <div class="game_area">
            <div class="game_area__left_side"><img></div>
            <div class="game_area__right_side"><img></div>
        </div>
        <div class="bottom_bar"></div>
    `;
    return true;
}

function startGame() {
    if (!canvas || !GAME_DATA.length) return;

    const imageId = Math.floor(Math.random() * GAME_DATA.length);
    const level = GAME_DATA[imageId];

    const leftImage = canvas.querySelector(".game_area__left_side img");
    const rightImage = canvas.querySelector(".game_area__right_side img");
    leftImage.src = level.imagePath[0];
    rightImage.src = level.imagePath[1];

    initTopBar(level.diffPos.length);
    setupClickHandlers(level.diffPos, leftImage, rightImage);
}

function initTopBar(markerCount) {
    const topBar = canvas.querySelector(".top_bar");
    topBar.innerHTML = "";

    const marker = document.createElement("div");
    marker.classList.add("top_bar__marker");

    for (let i = 0; i < markerCount; i++) {
        topBar.appendChild(marker.cloneNode(true));
    }

    topBarMarkers = Array.from(topBar.children);
}

function setupClickHandlers(diffPosArr, leftImage, rightImage) {
    imgClickHandler(leftImage, diffPosArr);
    imgClickHandler(rightImage, diffPosArr);
}

function imgClickHandler(img, diffPosArr) {
    img.addEventListener("click", (e) => {
        const clickPos = {
            x: e.offsetX,
            y: e.offsetY
        };

        const diffPosId = matchDiff(clickPos, diffPosArr);
        if (diffPosId !== -1) {
            drawFindMarker(diffPosArr[diffPosId]);
            drawTopBarMarkers();
        }
    });
}

function drawTopBarMarkers() {
    const inactive = topBarMarkers.find(el => !el.classList.contains("active"));
    if (inactive) {
        inactive.classList.add("active");
    }
}

function matchDiff(clickPos, diffPosArr) {
    const maxDistSq = FIND_RADIUS * FIND_RADIUS;
    return diffPosArr.findIndex((pos) => {
        const dx = pos.x - clickPos.x;
        const dy = pos.y - clickPos.y;
        return dx * dx + dy * dy <= maxDistSq;
    });
}

function drawFindMarker(pos) {
    const leftContainer = canvas.querySelector(".game_area__left_side");
    const rightContainer = canvas.querySelector(".game_area__right_side");

    const findMarker = document.createElement("div");
    findMarker.classList.add("find_marker");
    findMarker.style.top = `${pos.y - FIND_RADIUS}px`;
    findMarker.style.left = `${pos.x - FIND_RADIUS}px`;

    leftContainer.appendChild(findMarker);

    const rightMarker = findMarker.cloneNode(true);
    rightContainer.appendChild(rightMarker);

    requestAnimationFrame(() => {
        findMarker.style.opacity = "1";
        rightMarker.style.opacity = "1";
    });
}

// Запуск
if (initCanvas()) {
    startGame();
}
