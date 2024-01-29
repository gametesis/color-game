let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let local_store_data;
let offset = 100000;
let mouse_click = false;
let object_code = null;
let level_map = {}; //each with "x:y":{x:1,y:2,obkect_code:green_block}
let colliders = [];
let mouse = [0, 0];
let mouse_obj = new Object();
let ball_size;
let player = null;
let selection_vector = [0, 0, 0];
let can_create = true;

let blue_color = "rgb(0, 100, 255)",
  red_color = "rgb(255,0,0)",
  green_color = "rgb(0,255,0)",
  yellow_color = "rgb(255,255,0)",
  cyan_color = "rgb(0,255,255)",
  purple_color = "rgb(255,0,255)",
  white_color = "rgb(255,255,255)",
  black_color = "rgb(0,0,0)";

document.body.addEventListener("touchmove", touchMove, false);
document.body.addEventListener("touchstart", touchStart, false);
document.body.addEventListener("touchend", touchEnd, false);
document.body.addEventListener("mousemove", mouseMove, false);
document.body.addEventListener("mousedown", mouseDown, false);
document.body.addEventListener("mouseup", mouseUp, false);

function checkMobileDevice() {
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    return true;
  } else {
    return false;
  }
}

function calculateBallSize() {
  let ball_size_ration = 33 / window.innerWidth;
  //let ball_size_rationy=33/window.innerHeight
  ball_size = window.innerWidth * ball_size_ration;
}

function mouseUp(e) {
  mouse_click = false;
}
function mouseDown(e) {
  mouse[0] = e.clientX;
  mouse[1] = e.clientY;
  mouse_click = true;
}

function mouseMove(e) {
  mouse[0] = e.clientX;
  mouse[1] = e.clientY;
}

function touchEnd(e) {
  mouse_click = false;
}
function touchStart(e) {
  mouse[0] = e.touches[0].clientX;
  mouse[1] = e.touches[0].clientY;
  mouse_click = true;
}

function touchMove(e) {
  mouse[0] = e.touches[0].clientX;
  mouse[1] = e.touches[0].clientY;
}

document.addEventListener("keydown", press);
function press(e) {
  if (e.keyCode === 48 /* 0 */) {
    object_code = "delete";
  }
  if (e.keyCode === 49 /* 1 */) {
    object_code = "red_ball";
    console.log("1");
  }
  if (e.keyCode === 50 /* 2 */) {
    object_code = "green_ball";
  }
  if (e.keyCode === 51 /* 3 */) {
    object_code = "blue_ball";
  }
  if (e.keyCode === 52 /* 4 */) {
    object_code = "yellow_ball";
  }
  if (e.keyCode === 53 /* 5 */) {
    object_code = "cyan_ball";
  }
  if (e.keyCode === 54 /* 6 */) {
    object_code = "purple_ball";
  }
  if (e.keyCode === 55 /* 7 */) {
    object_code = "white_ball";
  }
  if (e.keyCode === 56 /* 8 */) {
    object_code = "black_ball";
  }
}
document.addEventListener("keyup", release);
function release(e) { }

function cleanUnusedProjectiles() {
  let new_projectiles_array = [];
  colliders.forEach((p) => {
    if (p.is_destroyed == false) {
      new_projectiles_array.push(p);
    }
  });
  return new_projectiles_array;
}
//color balls------------
function createBall(x, y, color) {
  let color_mapping = {
    red: {
      color: "rgb(255,0,0,1)",
      name: "red_ball",
      color_vector: [1, 0, 0],
    },
    green: {
      color: "rgb(0,255,0,1)",
      name: "green_ball",
      color_vector: [0, 1, 0],
    },
    blue: {
      color: "rgb(0,0,255,1)",
      name: "blue_ball",
      color_vector: [0, 0, 1],
    },
    yellow: {
      color: "rgb(255,255,0,1)",
      name: "yellow_ball",
      color_vector: [1, 1, 0],
    },
    cyan: {
      color: "rgb(0,255,255,1)",
      name: "cyan_ball",
      color_vector: [0, 1, 1],
    },
    purple: {
      color: "rgb(255,0,255,1)",
      name: "purple_ball",
      color_vector: [1, 0, 1],
    },
    white: {
      color: "rgb(255,255,255,1)",
      name: "white_ball",
      color_vector: [1, 1, 1],
    },
    black: {
      color: "rgb(0,0,0,1)",
      name: "black_ball",
      color_vector: [0, 0, 0],
    },
  };
  let ball = new Object().append(
    createCircle(
      x,
      y,
      ball_size,
      color_mapping[color]["color"],
      color_mapping[color]["name"]
    )
  );
  ball.color_vector = color_mapping[color]["color_vector"];
  if (color.includes("black")) {
    ball.shape.style.border = "1px solid white";
  }
  colliders.push(ball);
  return ball;
}


//----------------------
function init() {
  let player_position_x
  let player_position_y

  window.addEventListener("resize", screenResize);
  document.body.addEventListener("click", fullscreen);
  initScrollablePage();
  createMaxScoreText();
  createReturnButton()
  if (checkMobileDevice()) {
    getElement("game_window").style["overflow"] = "hidden";
  } else {
    getElement("game_window").style["overflow"] = "scroll";
  }

  can_create = false;

  setTimeout(() => {
    createInputButtons();
  }, 100);
  document.body.style.backgroundColor = "rgb(0,0,0)";
  //calculateBallSize();


  const data = JSON.parse(localStorage["color game"]).created_level_info;
  ball_size = Math.floor(10 + (data.zoom_value / 100) * (50 - 10))
  
  if (data["player_position"].x != undefined && data["player_position"].y != undefined) {
    player_position_x = data["player_position"].x * ball_size;
    player_position_y = data["player_position"].y * ball_size;
  } else {
    player_position_x = Math.floor(offset / 2 / ball_size) * ball_size;
    player_position_y = Math.floor(offset / 2 / ball_size) * ball_size;
  }
  
  player = new Object().append(
    createCircle(
      player_position_x,
      player_position_y,
      ball_size,
      "rgb(255,255,255)",
      "player"
    )
  );
  handleMapCreation();

  player.appendAnimation(() => {
    player.setColor([(player.real_time * 200) % 360, 100, 50, 1]);
  });

  setTimeout(() => {
    getElement("game_window").scroll({
      top: player.y - window.innerHeight / 2,
      left: player.x - window.innerWidth / 2,
    });
  }, 1000);

  c = new Object().append(
    createSquare(
      offset + 10000,
      offset + 10000,
      length,
      length,
      "rgb(0,0,0,1)",
      "level_limit"
    )
  );
  c.shape.style.border = "2px solid white";
  colliders.push(c);
}
function saveToLevelMap(x, y, object_code, object) {
  let local_store_level_map = {};
  let data = {};

  data = JSON.parse(localStorage["color game"]);
  local_store_level_map = data.created_level_info["map"];

  level_map[`${Math.floor(x / ball_size)}:${Math.floor(y / ball_size)}`] = {
    x: Math.floor(x / ball_size),
    y: Math.floor(y / ball_size),
    object_code: object_code,
    object: object,
  };

  updateMaxScore(object.color_vector, "+");
  local_store_level_map[
    `${Math.floor(x / ball_size)}:${Math.floor(y / ball_size)}`
  ] = {
    x: Math.floor(x / ball_size),
    y: Math.floor(y / ball_size),
    object_code: object_code,
  };

  localStorage["color game"] = JSON.stringify({
    created_level_info: {
      map: local_store_level_map,
      player_position: {
        x: Math.floor(player.x / ball_size),
        y: Math.floor(player.y / ball_size),
      },
      min_score_to_win: data.created_level_info.min_score_to_win,
      time_limit: data.created_level_info.time_limit,
      acceleration:data.created_level_info.acceleration,
      max_speed: data.created_level_info.max_speed,
      zoom_value: data.created_level_info.zoom_value,
      add_powers: data.created_level_info.add_powers,
      map_edge_type: data.created_level_info.map_edge_type,
      edge_distance: data.created_level_info.edge_distance,
      next_level: data.created_level_info.next_level,
      slow_time: data.created_level_info.slow_time,
      slow_time_duration: data.created_level_info.slow_time_duration,
      size_power: data.created_level_info.size_power,
      size_power_duration: data.created_level_info.size_power_duration,
      speed_power: data.created_level_info.speed_power,
      speed_power_duration: data.created_level_info.speed_power_duration,
    },
    user_info: data.user_info
  });
}
function colorVectorLevel(vector) {
  return vector[0] + vector[1] + vector[2];
}

function updateMaxScore(color_vector, option) {
  const color_level = colorVectorLevel(color_vector);
  let points_scored =(color_level>0)? 10 ** (color_level - 1):0;
  let total_score = parseInt(getElement("max_score").innerText.split(":")[1]);
  total_score += option == "+" ? points_scored : -points_scored;
  total_score = Math.max(total_score, 0);
  getElement("max_score").innerText = `max score: ${total_score}`;
}


function fullScreenQuestion(state){
  if(state=="start"){
    let div=document.createElement("div")
    div.id="fullScreenQuestion"
    div.style.position = "absolute"
    div.style.backgroundColor = "rgb(0,0,0)"
    div.style.width = "100%"
    div.style.height = "100%"
    div.style.color="white"
    div.style["z-index"]=2000
    div.style["fontFamily"]="Arial, sans-serif"
    div.style.fontSize="x-Large"
    div.innerHTML="<h1 >Click to Enter Full Screen</h1>"
    div.style.textAlign="center"
    div.style.display= "flex"
    div.style["justify-content"]="center"
    div.style["align-items"]="center"
    div.style.top="0px"
    div.style.left="0px"
    div.addEventListener("click",()=>{fullScreenQuestion("delete")})
    document.body.appendChild(div)
  } else{
    let el = getElement("fullScreenQuestion")
    el.parentElement.removeChild(el)
    can_create=true
    
  }
  

}



function deleteFromLevelMap(x, y) {
  updateMaxScore(level_map[`${x}:${y}`].object.color_vector, "-");
  level_map[`${x}:${y}`].object.destroy();
  delete level_map[`${x}:${y}`];
  let json_data = JSON.parse(localStorage["color game"]);
  let new_storage_data = json_data.created_level_info.map;
  delete new_storage_data[`${x}:${y}`];
  localStorage["color game"] = JSON.stringify({
    created_level_info: {
      map: new_storage_data,
      player_position: json_data.created_level_info.player_position,
      min_score_to_win: json_data.created_level_info.min_score_to_win,
      time_limit: json_data.created_level_info.time_limit,
      acceleration: json_data.created_level_info.acceleration,
      max_speed: json_data.created_level_info.max_speed,
      zoom_value: json_data.created_level_info.zoom_value,
      add_powers: json_data.created_level_info.add_powers,
      map_edge_type: json_data.created_level_info.map_edge_type,
      edge_distance: json_data.created_level_info.edge_distance,
      next_level: json_data.created_level_info.next_level,
      slow_time: json_data.created_level_info.slow_time,
      slow_time_duration: json_data.created_level_info.slow_time_duration,
      size_power: json_data.created_level_info.size_power,
      size_power_duration: json_data.created_level_info.size_power_duration,
      speed_power: json_data.created_level_info.speed_power,
      speed_power_duration: json_data.created_level_info.speed_power_duration,
    },
    user_info: json_data.user_info
  });
}

function handleMapCreation() {
  let map = JSON.parse(localStorage["color game"]).created_level_info["map"];
  let block = null;
  let ifs = {
    red_ball: (x, y) => {
      block = createBall(x, y, "red");
      saveToLevelMap(x, y, "red_ball", block);
    },
    green_ball: (x, y) => {
      block = createBall(x, y, "green");
      saveToLevelMap(x, y, "green_ball", block);
    },
    blue_ball: (x, y) => {
      block = createBall(x, y, "blue");
      saveToLevelMap(x, y, "blue_ball", block);
    },
    yellow_ball: (x, y) => {
      block = createBall(x, y, "yellow");
      saveToLevelMap(x, y, "yellow_ball", block);
    },
    cyan_ball: (x, y) => {
      block = createBall(x, y, "cyan");
      saveToLevelMap(x, y, "cyan_ball", block);
    },
    purple_ball: (x, y) => {
      block = createBall(x, y, "purple");
      saveToLevelMap(x, y, "purple_ball", block);
    },
    white_ball: (x, y) => {
      block = createBall(x, y, "white");
      saveToLevelMap(x, y, "white_ball", block);
    },
    black_ball: (x, y) => {
      block = createBall(x, y, "black");
      saveToLevelMap(x, y, "black_ball", block);
    },
  };
  for (key in map) {
    ifs[map[key].object_code](
      Math.floor(map[key].x * ball_size),
      Math.floor(map[key].y * ball_size)
    );
  }
}
function handleMouseClick() {
  let cell_width = ball_size;
  let x =
    Math.floor((getElement("game_window").scrollLeft + mouse[0]) / cell_width) *
    cell_width;
  let y =
    Math.floor((getElement("game_window").scrollTop + mouse[1]) / cell_width) *
    cell_width;

  let index_x = Math.floor(x / ball_size);
  let index_y = Math.floor(y / ball_size);
  let selection_vector_mapping = {
    "0,0,0": "black_ball",
    "1,0,0": "red_ball",
    "0,1,0": "green_ball",
    "0,0,1": "blue_ball",
    "1,1,0": "yellow_ball",
    "1,0,1": "purple_ball",
    "0,1,1": "cyan_ball",
    "1,1,1": "white_ball",
  };

  let ifs = {
    red_ball: (x, y) => {
      block = createBall(x, y, "red");
      saveToLevelMap(x, y, "red_ball", block);
    },
    green_ball: (x, y) => {
      block = createBall(x, y, "green");
      saveToLevelMap(x, y, "green_ball", block);
    },
    blue_ball: (x, y) => {
      block = createBall(x, y, "blue");
      saveToLevelMap(x, y, "blue_ball", block);
    },
    yellow_ball: (x, y) => {
      block = createBall(x, y, "yellow");
      saveToLevelMap(x, y, "yellow_ball", block);
    },
    cyan_ball: (x, y) => {
      block = createBall(x, y, "cyan");
      saveToLevelMap(x, y, "cyan_ball", block);
    },
    purple_ball: (x, y) => {
      block = createBall(x, y, "purple");
      saveToLevelMap(x, y, "purple_ball", block);
    },
    white_ball: (x, y) => {
      block = createBall(x, y, "white");
      saveToLevelMap(x, y, "white_ball", block);
    },
    black_ball: (x, y) => {
      block = createBall(x, y, "black");
      saveToLevelMap(x, y, "black_ball", block);
    },
  };

  if (
    object_code == "delete" &&
    can_create &&
    mouse[1] < window.innerHeight - parseInt(getElement("red_button").parentNode.style.height) &&
    !((mouse[0] < parseInt(getElement("return").style.left) + 100) &&
      mouse[1] < parseInt(getElement("return").style.top) + 100)
  ) {
    try {
      deleteFromLevelMap(index_x, index_y);
    } catch {
      //pass
    }
  } else {
    if (
      level_map[`${index_x}:${index_y}`] == undefined &&
      !(
        Math.floor(Math.abs(x - player.x)) < 2 * ball_size &&
        Math.floor(Math.abs(y - player.y)) < 2 * ball_size
      ) &&
      can_create &&
      mouse[1] < window.innerHeight - parseInt(getElement("red_button").parentNode.style.height) &&
      !((mouse[0] < parseInt(getElement("return").style.left) + 100) &&
        mouse[1] < parseInt(getElement("return").style.top) + 100)
    ) {
      //map selection_vector to object code
      let select_ball_color =
        selection_vector_mapping[selection_vector.toString()];
      ifs[select_ball_color](x, y);
    }
  }
}
function helpInterface() {
  if (
    selection_vector[0] == 1 &&
    getElement("red_button").style["box-shadow"] == ``
  ) {
    getElement("red_button").style[
      "box-shadow"
    ] = `0px 0px 50px 7px ${red_color}`;
  }
  if (
    selection_vector[0] == 0 &&
    getElement("red_button") != null &&
    getElement("red_button").style["box-shadow"] != ``
  ) {
    getElement("red_button").style["box-shadow"] = ``;
  }
  if (
    selection_vector[1] == 1 &&
    getElement("green_button").style["box-shadow"] == ``
  ) {
    getElement("green_button").style[
      "box-shadow"
    ] = `0px 0px 50px 7px ${green_color}`;
  }
  if (
    selection_vector[1] == 0 &&
    getElement("green_button") != null &&
    getElement("green_button").style["box-shadow"] != ``
  ) {
    getElement("green_button").style["box-shadow"] = ``;
  }
  if (
    selection_vector[2] == 1 &&
    getElement("blue_button").style["box-shadow"] == ``
  ) {
    getElement("blue_button").style[
      "box-shadow"
    ] = `0px 0px 50px 7px ${blue_color}`;
  }
  if (
    selection_vector[2] == 0 &&
    getElement("blue_button") != null &&
    getElement("blue_button").style["box-shadow"] != ``
  ) {
    getElement("blue_button").style["box-shadow"] = ``;
  }
  try {
    // in case this btn does not exist

    if (
      getElement("game_window").style["overflow"] == "scroll" &&
      getElement("displacement_button").style["box-shadow"] !=
      `0px 0px 50px 7px rgb(100,100,100)`
    ) {
      getElement("displacement_button").style[
        "box-shadow"
      ] = `0px 0px 50px 7px rgb(100,100,100)`;
    }

    if (
      getElement("game_window").style["overflow"] == "hidden" &&
      getElement("displacement_button").style["box-shadow"] != ``
    ) {
      getElement("displacement_button").style["box-shadow"] = ``;
    }
  } catch { }
  if (
    object_code == "delete" &&
    getElement("delete_button").style["box-shadow"] == ``
  ) {
    getElement("delete_button").style[
      "box-shadow"
    ] = `0px 0px 50px 7px rgb(100,100,100)`;
  }

  if (
    object_code != "delete" &&
    getElement("delete_button") != null &&
    getElement("delete_button").style["box-shadow"] != ``
  ) {
    getElement("delete_button").style["box-shadow"] = ``;
  }
}
function helpButtonSelection(option) {
  if (option == "rgb") {
    if (object_code == "delete") {
      object_code = null;
    }
    if (
      (getElement("game_window").style["overflow"] = "scroll") &&
      checkMobileDevice()
    ) {
      getElement("game_window").style["overflow"] = "hidden";
      can_create = true;
    }
  }
  if (option == "delete") {
    selection_vector = [0, 0, 0];
    if (
      (getElement("game_window").style["overflow"] = "scroll") &&
      checkMobileDevice()
    ) {
      getElement("game_window").style["overflow"] = "hidden";
      can_create = true;
    }
  }
  if (option == "displacement") {
    selection_vector = [0, 0, 0];
    if (object_code == "delete") {
      object_code = null;
    }
  }
}
function main() {
  dt = (new Date().getTime() - time) * 1e-3;
  real_time += dt;

  if (mouse_click) {
    handleMouseClick();
  }
  player.play();

  helpInterface();

  //colliders = cleanUnusedProjectiles();
  time = new Date().getTime();
  requestAnimationFrame(main);
}
function createReturnButton() {
  if (getElement("return") != undefined) {
    getElement("return").remove();
  }
  let btn_size = (window.innerWidth + window.innerHeight) * 0.01;
  let btn = document.createElement("button");
  btn.id = "return";
  btn.style = `position: fixed;
  top: 10px;
  left: 10px;
  background-color: black; /* Red background color */
  color: #ccc; /* White text color */
  border: none;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  border: #ccc solid 1px;
  margin-top:5px;
  z-index:1000;
  font-size:${btn_size};
  user-select:none;`;
  btn.innerText = "Return";
  btn.addEventListener("click", () => {
    window.location.href = window.location.origin + "/color-game/level_creation_form.html?continue"
  });
  getElement("game_window").appendChild(btn);
}
function createMaxScoreText() {
  let el = createText(
    "max score: 0",
    "right:100px;top:10px;color:white;position:fixed;font-size:x-large;user-select:none"
  );
  el.id = "max_score";
  getElement("game_window").appendChild(el);
}
function createInputButton(position) {
  let button_width = window.innerWidth / 3;
  let mapping = {
    left: {
      _position: 0,
      name: "red_button",
      color: red_color,
      text: "R",
    },
    middle: {
      _position: 1,
      name: "green_button",
      color: green_color,
      text: "G",
    },
    right: {
      _position: 2,
      name: "blue_button",
      color: blue_color,
      text: "B",
    },
    displacement: {
      _position: 3,
      name: "displacement_button",
      color: "rgb(100,100,100)",
      text: "&#8646;",
    },
    delete: {
      _position: 4,
      name: "delete_button",
      color: "rgb(100,100,100)",
      text: "D",
    },
  };
  let circle = new Object();
  let button = document.createElement("div");
  //mobile....
  if (window.innerWidth / window.innerHeight < 1.0) {
    button_width = window.innerWidth / 5;
    button.style.left = button_width * mapping[position]["_position"];
    button.style.top = window.innerHeight - button_width;
    button.style.width = button_width;
    button.style.height = button_width;
    button.style.position = "fixed";
    getElement("game_window").appendChild(button);
    circle.append(
      createCircle(
        0.25 * button_width,
        0.25 * button_width,
        button_width * 0.5,
        mapping[position]["color"],
        mapping[position]["name"]
      )
    );
    circle.shape.innerHTML = mapping[position]["text"];
    circle.shape.style["color"] = "white";
    circle.shape.style["display"] = "grid";
    circle.shape.style["place-items"] = "center";
    //circle.shape.style["-webkit-text-stroke-width"] = "medium";
    circle.shape.style["font-size"] = "150%";
    circle.shape.style["user-select"] = "none";
  } else {
    //wide screen.... PC
    button_width = window.innerWidth / 9;
    button.style.left = button_width * (mapping[position]["_position"] + 2);
    button.style.top = window.innerHeight - button_width;
    button.style.width = button_width;
    button.style.height = button_width;
    button.style.position = "fixed";
    getElement("game_window").appendChild(button);
    circle.append(
      createCircle(
        0.25 * button_width,
        0.25 * button_width,
        button_width * 0.5,
        mapping[position]["color"],
        mapping[position]["name"]
      )
    );
    circle.shape.innerHTML = mapping[position]["text"];
    circle.shape.style["color"] = "white";
    circle.shape.style["display"] = "grid";
    circle.shape.style["place-items"] = "center";
    //circle.shape.style["-webkit-text-stroke-width"] = "medium";
    circle.shape.style["font-size"] = "150%";
    circle.shape.style["user-select"] = "none";
  }
  //create buttons to play

  button.appendChild(circle.shape);
  /* circle.shape.style[
    "box-shadow"
  ] = `0px 0px 50px 7px ${mapping[position]["color"]}`; */
  button.style["z-index"] = 1000;
  circle.shape.style.position = "relative";
  return button;
}
function createInputButtons() {
  //if (checkMobileDevice()) {
  if (getElement("red_button") != null) {
    getElement("red_button").parentNode.remove();
    getElement("green_button").parentNode.remove();
    getElement("blue_button").parentNode.remove();
    if (checkMobileDevice()) {
      getElement("displacement_button").parentNode.remove();
    }
    getElement("delete_button").parentNode.remove();
  }

  //create buttons to play
  let button1 = createInputButton("left");

  let button2 = createInputButton("middle");

  let button3 = createInputButton("right");
  let button4;
  if (checkMobileDevice()) {
    button4 = createInputButton("displacement");
  }

  let button5 = createInputButton("delete");

  button1.addEventListener("click", () => {
    if (selection_vector[0] == 0) {
      selection_vector[0] = 1;
      getElement("red_button").style[
        "box-shadow"
      ] = `0px 0px 50px 7px ${red_color}`;
      helpButtonSelection("rgb");
    } else {
      selection_vector[0] = 0;
      getElement("red_button").style["box-shadow"] = ``;
    }
  });

  button2.addEventListener("click", () => {
    if (selection_vector[1] == 0) {
      selection_vector[1] = 1;
      getElement("green_button").style[
        "box-shadow"
      ] = `0px 0px 50px 7px ${green_color}`;
      helpButtonSelection("rgb");
    } else {
      selection_vector[1] = 0;
      getElement("green_button").style["box-shadow"] = ``;
    }
  });

  button3.addEventListener("click", () => {
    if (selection_vector[2] == 0) {
      selection_vector[2] = 1;
      getElement("blue_button").style[
        "box-shadow"
      ] = `0px 0px 50px 7px ${blue_color}`;
      helpButtonSelection("rgb");
    } else {
      selection_vector[2] = 0;
      getElement("blue_button").style["box-shadow"] = ``;
    }
  });
  if (checkMobileDevice()) {
    button4.addEventListener("click", () => {
      if (getElement("game_window").style["overflow"] == "hidden") {
        helpButtonSelection("displacement");
        getElement("game_window").style["overflow"] = "scroll";
        can_create = false;
        getElement("displacement_button").style[
          "box-shadow"
        ] = `0px 0px 50px 7px rgb(100,100,100)`;
      } else {
        getElement("game_window").style["overflow"] = "hidden";
        can_create = true;
        getElement("displacement_button").style["box-shadow"] = ``;
      }
    });
  }

  button5.addEventListener("click", () => {
    if (object_code != "delete") {
      helpButtonSelection("delete");
      object_code = "delete";
      getElement("delete_button").style[
        "box-shadow"
      ] = `0px 0px 50px 7px rgb(100,100,100)`;
    } else {
      object_code = null;
      getElement("delete_button").style["box-shadow"] = ``;
    }
  });
}
function fullscreen() {
  let element = getElement("game_window");
  // Find the right method, call on correct element
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
}
function screenResize() {
  createInputButtons();
  getElement("game_window").scroll({
    top: player.y - window.innerHeight / 2,
    left: player.x - window.innerWidth / 2,
  });
  createReturnButton()
}
//Main ---

init();
main();
fullScreenQuestion("start")