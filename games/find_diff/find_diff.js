const Canvas = document.querySelector("#find_diff_canvas")


function initCanvas() {
    console.log(Canvas);

    let img = Canvas.querySelector(".game_area__left_side img").src = "/games/find_diff/assets/first/right.png"
    console.log(img);

}

initCanvas()