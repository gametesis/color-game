let real_time = 0;
let time = new Date().getTime();
let dt = 0;
let offset = 100000;
let player = new Object();
let finish_loading_global_vars = false;
//let button_tutorial_done = false
let game_is_running = true

let ball_size;
let player_position_x;
let player_position_y;

let contact_balls = [];
let colliders = [];
let point_vectores = [];
let effect_particles = [];
let buttons_array = [];
let max_map_width = -99999999;
let min_map_width = 99999999;
let max_map_height = -99999999;
let min_map_height = 99999999;
let world_map;
let out_bounderies_error;
let speed_limit;
//let collision_grid_size = 5;
let grip_force_global = 12;
//configs

let min_score_to_win;
let time_limit_global;
let map_edge_type_global;
let add_powers_global;
let next_level_pointer;

let slow_time_global;
let slow_time_duration_global;

let size_power_global;
let size_power_duration_global;

let speed_power_global;
let speed_power_duration_global;

let blue_color = "rgb(0, 100, 255)",
  red_color = "rgb(255,0,0)",
  green_color = "rgb(0,255,0)",
  yellow_color = "rgb(255,255,0)",
  cyan_color = "rgb(0,255,255)",
  purple_color = "rgb(255,0,255)",
  white_color = "rgb(255,255,255)",
  black_color = "rgb(0,0,0)";

let up = false,
  down = false,
  right = false,
  left = false,
  jump = false,
  red_key = false,
  green_key = false,
  blue_key = false,
  is_pressing_key = false;

let buttons_menu_state = "";
let first_user_interaction_global = false;
let win_flag = false;
let lose_flag = false;

//functions----------------

//audio----
function loadAudioSounds() {
  let sound1 = new Audio("/color-game/audio/Water Plop - Sound Effect (HD).mp3");
  let sound2 = new Audio("/color-game/audio/machete-26994.mp3");
  let sound3 = new Audio(
    "/color-game/audio/Lightsaber Ignition (Laser Sword) - Sound Effect for editing.mp3"
  );
  let sound4 = new Audio("/color-game/audio/Lightsaber Off.mp3");

  sound1.volume = 0;
  sound1.load();
  sound2.volume = 0;
  sound2.load();
  sound3.volume = 0;
  sound3.load();
  sound4.volume = 0;
  sound4.load();
}
function playCatchAudio() {
  // Adjust the maximum plays and time window as needed
  var maxPlays = 1; // Maximum plays allowed
  var timeWindow = 50; // Time window in milliseconds (1 second)

  // Initialize variables to track the number of plays and the last play time
  var playCount = 0;
  var lastPlayTime = 0;

  return function () {
    var now = Date.now();

    // Check if the time window has elapsed since the last play
    if (now - lastPlayTime > timeWindow) {
      // Reset play count if the time window has passed
      playCount = 0;
    }

    // Check if the maximum plays have been reached
    if (playCount < maxPlays) {
      // Play the sound
      let sound = new Audio("/color-game/audio/Water Plop - Sound Effect (HD).mp3");
      sound.volume = 0.8;
      sound.play();

      // Update play count and last play time
      playCount++;
      lastPlayTime = now;
    } else {
      //console.log("Maximum plays reached within the time window.");
    }
  };
}
const play_catch_audio = playCatchAudio();

function playRebounceAudio() {
  // Adjust the maximum plays and time window as needed
  var maxPlays = 1; // Maximum plays allowed
  var timeWindow = 50; // Time window in milliseconds (1 second)

  // Initialize variables to track the number of plays and the last play time
  var playCount = 0;
  var lastPlayTime = 0;

  return function () {
    var now = Date.now();

    // Check if the time window has elapsed since the last play
    if (now - lastPlayTime > timeWindow) {
      // Reset play count if the time window has passed
      playCount = 0;
    }

    // Check if the maximum plays have been reached
    if (playCount < maxPlays) {
      // Play the sound
      let sound = new Audio("/color-game/audio/machete-26994.mp3");
      sound.volume = 0.02;
      sound.play();

      // Update play count and last play time
      playCount++;
      lastPlayTime = now;
    } else {
      //console.log("Maximum plays reached within the time window.");
    }
  };
}
const play_rebounce_audio = playRebounceAudio();

function playColorEvolutionAudio() {
  // Adjust the maximum plays and time window as needed
  var maxPlays = 1; // Maximum plays allowed
  var timeWindow = 50; // Time window in milliseconds (1 second)

  // Initialize variables to track the number of plays and the last play time
  var playCount = 0;
  var lastPlayTime = 0;

  return function () {
    var now = Date.now();

    // Check if the time window has elapsed since the last play
    if (now - lastPlayTime > timeWindow) {
      // Reset play count if the time window has passed
      playCount = 0;
    }

    // Check if the maximum plays have been reached
    if (playCount < maxPlays) {
      // Play the sound
      let sound = new Audio(
        "/color-game/audio/Lightsaber Ignition (Laser Sword) - Sound Effect for editing.mp3"
      );
      sound.volume = 0.05;
      sound.play();

      // Update play count and last play time
      playCount++;
      lastPlayTime = now;
    } else {
      //console.log("Maximum plays reached within the time window.");
    }
  };
}
const play_color_evolution_audio = playColorEvolutionAudio();

function playColorDowngradeAudio() {
  // Adjust the maximum plays and time window as needed
  var maxPlays = 1; // Maximum plays allowed
  var timeWindow = 50; // Time window in milliseconds (1 second)

  // Initialize variables to track the number of plays and the last play time
  var playCount = 0;
  var lastPlayTime = 0;

  return function () {
    var now = Date.now();

    // Check if the time window has elapsed since the last play
    if (now - lastPlayTime > timeWindow) {
      // Reset play count if the time window has passed
      playCount = 0;
    }

    // Check if the maximum plays have been reached
    if (playCount < maxPlays) {
      // Play the sound
      let sound = new Audio("/color-game/audio/Lightsaber Off.mp3");
      sound.volume = 0.05;
      sound.play();

      // Update play count and last play time
      playCount++;
      lastPlayTime = now;
    } else {
      //console.log("Maximum plays reached within the time window.");
    }
  };
}
const play_color_downgrade_audio = playColorDowngradeAudio();

//----

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
  if (checkMobileDevice()) {
    ball_size = 33;
  } else {
    ball_size = 33;
  }
}

//collision detection function------
function collisionDetection(
  object1,
  object2,
  action,
  solid = true,
  bounce = 0.05
) {
  if (!solid) {
    if (
      object1.x + object1.width >= object2.x &&
      object1.x <= object2.x + object2.width &&
      object1.y + object1.height >= object2.y &&
      object1.y <= object2.y + object2.height
    ) {
      action(object1, object2);
    }
  } else {
    let aux = 0;

    let dx =
      object1.x +
      Math.round(object1.width / 2) -
      (object2.x + Math.round(object2.width / 2));
    let dy =
      object1.y +
      Math.round(object1.height / 2) -
      (object2.y + Math.round(object2.height / 2));
    if (
      Math.sqrt((Math.abs(dx) ^ 2) + (Math.abs(dy) ^ 2)) <
      object1.width / 2
    ) {
      if (
        object1.x + object1.width + object1.speedx * object1.dt >= object2.x &&
        object1.x + object1.speedx * object1.dt <= object2.x + object2.width &&
        object1.y + object1.height + object1.speedy * object1.dt >= object2.y &&
        object1.y + object1.speedy * object1.dt <= object2.y + object2.height
      ) {
        if (dx < 0 && Math.abs(dx) > object1.width / 2) {
          object1.is_left_of = true;
          aux++;
        }
        if (dx > 0 && Math.abs(dx) > object1.width / 2) {
          object1.is_right_of = true;
          aux++;
        }
        if (dy > 0 && Math.abs(dy) > object1.height / 2) {
          object1.is_below = true;
          aux++;
        }
        if (dy < 0 && Math.abs(dy) > object1.height / 2) {
          object1.is_above = true;
          aux++;
        }

        if (aux >= 2) {
          let actual_other_ball_x_pos = Math.floor(object2.x / ball_size);
          let actual_other_ball_y_pos = Math.floor(object2.y / ball_size);
          //right of ball
          if (player.is_right_of) {
            if (player.is_above) {
              //if player is cornered from left  and down
              if (
                world_map[
                `${actual_other_ball_x_pos}:${actual_other_ball_y_pos - 1}`
                ] != undefined &&
                world_map[
                `${actual_other_ball_x_pos + 1}:${actual_other_ball_y_pos}`
                ] != undefined
              ) {
                //does nothing
              } else {
                //have a ball left of the player
                if (
                  world_map[
                  `${actual_other_ball_x_pos}:${actual_other_ball_y_pos - 1}`
                  ] != undefined
                ) {
                  player.is_above = false;
                } else {
                  player.is_right_of = false;
                }
              }
            } else {
              //below
              //if player is cornered from left and up
              if (
                world_map[
                `${actual_other_ball_x_pos}:${actual_other_ball_y_pos + 1}`
                ] != undefined &&
                world_map[
                `${actual_other_ball_x_pos + 1}:${actual_other_ball_y_pos}`
                ] != undefined
              ) {
                //does nothing
              } else {
                //have a ball left of the player,
                if (
                  world_map[
                  `${actual_other_ball_x_pos}:${actual_other_ball_y_pos + 1}`
                  ] != undefined
                ) {
                  player.is_below = false;
                } else {
                  player.is_right_of = false;
                }
              }
            }
          } else {
            //left of ball
            if (player.is_above) {
              //if player is cornered from right  and down
              if (
                world_map[
                `${actual_other_ball_x_pos}:${actual_other_ball_y_pos - 1}`
                ] != undefined &&
                world_map[
                `${actual_other_ball_x_pos - 1}:${actual_other_ball_y_pos}`
                ] != undefined
              ) {
                //does nothing
              } else {
                //have a ball right of the player
                if (
                  world_map[
                  `${actual_other_ball_x_pos}:${actual_other_ball_y_pos - 1}`
                  ] != undefined
                ) {
                  player.is_above = false;
                } else {
                  player.is_left_of = false;
                }
              }
            } else {
              //below
              //if player is cornered from right and up
              if (
                world_map[
                `${actual_other_ball_x_pos}:${actual_other_ball_y_pos + 1}`
                ] != undefined &&
                world_map[
                `${actual_other_ball_x_pos - 1}:${actual_other_ball_y_pos}`
                ] != undefined
              ) {
                //does nothing
              } else {
                //have a ball right of the player,
                if (
                  world_map[
                  `${actual_other_ball_x_pos}:${actual_other_ball_y_pos + 1}`
                  ] != undefined
                ) {
                  player.is_below = false;
                } else {
                  player.is_left_of = false;
                }
              }
            }
          }
        }
        action(object1, object2);
      }
    }
  }
}
//-------
function createContactCircle(player, color) {
  let select_color = {
    red: red_color,
    green: green_color,
    blue: blue_color,
  };
  let select_bloom = {
    red: `0px 0px 30px ${red_color}`,
    green: `0px 0px 30px ${green_color}`,
    blue: `0px 0px 30px ${blue_color}`,
  };
  let select_color_vector = {
    red: [1, 0, 0],
    green: [0, 1, 0],
    blue: [0, 0, 1],
  };

  player.anchor_ballx = 0;
  player.anchor_bally = 0;
  player.attraction = 0;


  for (let i = 0; i < 22; i++) {
    let ball_size_increase = 0;
    if (player.size_power_interval > 0) {
      ball_size_increase = player.size_power;
    }
    let true_ball_size = (ball_size + ball_size_increase) / 1.5;
    let b = new Object().append(
      createCircle(
        player.x,
        player.y,
        true_ball_size,
        select_color[color],
        "contact_ball"
      )
    );
    //b.shape.style["box-shadow"] = select_bloom[color];
    b.color_vector = select_color_vector[color];
    b.appendAnimation((self) => {
      let new_x =
        self.x +
        (200 +
          ball_size_increase +
          (Math.max(Math.abs(player.speedx), Math.abs(player.speedy)))) *
        self.dt *
        Math.cos(10 * i);
      let new_y =
        self.y +
        (200 +
          ball_size_increase +
          (Math.max(Math.abs(player.speedx), Math.abs(player.speedy)))) *
        self.dt *
        Math.sin(10 * i);
      self.move(new_x, new_y);
      if (self.real_time >= 0.7 + ball_size_increase * 0.1) {
        self.destroy();
      }
      //on contact....
      for (let i = 0; i < colliders.length; i++) {
        let c = colliders[i];

        collisionDetection(
          self,
          c,
          (self, other_ball) => {
            //on collision delete previouse« connection
            for (c in point_vectores) {
              point_vectores[c].destroy();
            }
            if (is_pressing_key) {
              let x_direction = other_ball.x - player.x;
              let y_direction = other_ball.y - player.y;
              //poiting vector.......
              for (let i = 0; i < 10; i++) {
                let b_tmp = new Object().append(
                  createCircle(
                    player.x + x_direction,
                    player.y + y_direction,
                    true_ball_size / 1.5,
                    select_color[color],
                    "point_vetor_ball"
                  )
                );
                //b_tmp.shape.style["box-shadow"] = select_bloom[color];
                b_tmp.appendAnimation((self) => {
                  let x_direction = other_ball.x - player.x;
                  let y_direction = other_ball.y - player.y;
                  self.move(
                    player.x + (x_direction / 10) * i,
                    player.y + (y_direction / 10) * i
                  );
                  self.setColor([
                    self.getColor()[0],
                    self.getColor()[1],
                    Math.abs(Math.cos(3 * self.real_time - i * 1)) * 40 + 30,
                    1,
                  ]);
                });
                point_vectores.push(b_tmp);
              }

              if (
                isVectorEqual(other_ball.color_vector, self.color_vector) >= 1
              ) {
                player.anchor_ballx = other_ball.x;
                player.anchor_bally = other_ball.y;
                player.attraction = 1;
              } else {
                player.anchor_ballx = other_ball.x;
                player.anchor_bally = other_ball.y;
                player.attraction = -1;
              }
            }
            //destroy contact balls
            for (let j = 0; j < contact_balls.length; j++) {
              contact_balls[j].destroy();
            }
          },
          (solid = false)
        );
      }
    });
    contact_balls.push(b);
  }
}
function vectorToColor(vector) {
  let vector_mapping = {
    "0,0,0": black_color,
    "0,0,1": blue_color,
    "0,1,0": green_color,
    "0,1,1": cyan_color,
    "1,0,0": red_color,
    "1,0,1": purple_color,
    "1,1,0": yellow_color,
    "1,1,1": white_color,
  };

  return vector_mapping[vector.toString()];
}
function isVectorEqual(v1, v2) {
  let result = 0;
  for (let i = 0; i < v1.length; i++) {
    if (v1[i] == v2[i] && v1[i] == 1) {
      result++;
    }
  }
  return result;
}
function colorVectorLevel(vector) {
  return vector[0] + vector[1] + vector[2];
}
function sumVectors(v1, v2) {
  if (v1.length !== v2.length) {
    throw new Error("Input arrays must have the same length.");
  }

  const result = [];

  for (let i = 0; i < v1.length; i++) {
    result.push(Math.max(v1[i], v2[i]));
  }

  return result;
}
function rebouncePlayer(player) {
  if (player.is_above) {
    player.speedy = -1 * Math.abs(player.speedy);
  }
  if (player.is_below) {
    player.speedy = Math.abs(player.speedy);
  }
  if (player.is_left_of) {
    player.speedx = -1 * Math.abs(player.speedx);
  }
  if (player.is_right_of) {
    player.speedx = Math.abs(player.speedx);
  }
}
function selectPowers(other_ball_color_vector) {
  if (add_powers_global) {
    if (other_ball_color_vector.toString() == "0,1,1") {
      //slow time
      player.slow_time = slow_time_global;
      player.slow_time_interval += slow_time_duration_global;
    }
    if (other_ball_color_vector.toString() == "1,0,1") {
      // more speed more grip force
      player.speed_power = speed_power_global;
      grip_force_global = 12 * player.speed_power;
      player.speed_power_interval += speed_power_duration_global;

    }
    if (other_ball_color_vector.toString() == "1,1,0") {
      // more ball size and more contact radius
      player.size_power_interval += size_power_duration_global;
    }
    if (other_ball_color_vector.toString() == "1,1,1") {
      // all powers combined
      //slow time
      player.slow_time = slow_time_global;
      player.slow_time_interval += slow_time_duration_global;
      // more ball size and more contact radius
      player.size_power_interval += size_power_duration_global;
      // more speed more grip force
      player.speed_power = speed_power_global;
      grip_force_global = 12 * player.speed_power;
      player.speed_power_interval += speed_power_duration_global;
    }
  }
}
function scorePoints(other_ball_color_vector) {
  const color_level = colorVectorLevel(other_ball_color_vector);
  let points_scored = 10 ** (color_level - 1);
  let total_score = parseInt(getElement("score_text").innerText);
  total_score += points_scored;
  getElement("score_text").innerText = total_score;
}
function vectorColorRules(player, other_ball) {
  if (player.prev_ball_catched == null) {
    if (
      isVectorEqual(player.color_vector, other_ball.color_vector) >=
      colorVectorLevel(other_ball.color_vector) &&
      isVectorEqual(player.color_vector, other_ball.color_vector) >= 1
    ) {
      player.color_vector = other_ball.color_vector;
      paintBall(player);
      player.prev_ball_catched = { color_vector: other_ball.color_vector };
      let ball_effect = new Object().append(
        createCircle(
          other_ball.x,
          other_ball.y,
          ball_size,
          other_ball.shape.style["background-color"],
          other_ball.id
        )
      );
      ball_effect.appendAnimation((self) => {
        let speed = 10;
        let x_direction = self.x - player.x;
        let y_direction = self.y - player.y;
        self.move(
          self.x + -1 * x_direction * dt * speed,
          self.y + -1 * y_direction * dt * speed
        );
        self.shape.style.width = parseInt(self.shape.style.width) - 2;
        self.shape.style.height = parseInt(self.shape.style.height) - 2;
        if (self.real_time > 0.1) {
          self.destroy();
        }
      });
      effect_particles.push(ball_effect);
      scorePoints(other_ball.color_vector);
      selectPowers(other_ball.color_vector);
      other_ball.destroy();
      delete world_map[`${Math.floor(other_ball.x / ball_size)}:${Math.floor(other_ball.y / ball_size)}`];
      play_catch_audio();
    } else {
      //rebounce
      rebouncePlayer(player);
      play_rebounce_audio();
    }
  } else {
    //check if vectors are from same level
    if (
      isVectorEqual(
        sumVectors(player.color_vector, player.prev_ball_catched.color_vector),
        other_ball.color_vector
      ) >= colorVectorLevel(other_ball.color_vector) &&
      isVectorEqual(player.color_vector, other_ball.color_vector) >= 1
    ) {
      let old_player_color = player.color_vector;

      player.color_vector = sumVectors(
        player.prev_ball_catched.color_vector,
        other_ball.color_vector
      );
      player.prev_ball_catched = { color_vector: player.color_vector };
      paintBall(player);

      if (
        colorVectorLevel(player.color_vector) >
        colorVectorLevel(old_player_color)
      ) {
        play_color_evolution_audio();
      }

      //create effect particle
      let ball_effect = new Object().append(
        createCircle(
          other_ball.x,
          other_ball.y,
          ball_size,
          other_ball.shape.style["background-color"],
          other_ball.id
        )
      );
      ball_effect.appendAnimation((self) => {
        let speed = 10;
        let x_direction = self.x - player.x;
        let y_direction = self.y - player.y;
        self.move(
          self.x + -1 * x_direction * dt * speed,
          self.y + -1 * y_direction * dt * speed
        );
        self.shape.style.width = parseInt(self.shape.style.width) - 2;
        self.shape.style.height = parseInt(self.shape.style.height) - 2;
        if (self.real_time > 0.1) {
          self.destroy();
        }
      });
      effect_particles.push(ball_effect);
      scorePoints(other_ball.color_vector);
      selectPowers(other_ball.color_vector);
      other_ball.destroy();
      delete world_map[`${Math.floor(other_ball.x / ball_size)}:${Math.floor(other_ball.y / ball_size)}`];
      play_catch_audio();
    } else {
      //rebounce
      rebouncePlayer(player);
      play_rebounce_audio();
    }
  }
}

function playerOnContactWithBall(player, other_ball) {
  player.had_collision++;
  vectorColorRules(player, other_ball);
  //reset collision orientation
  player.is_above = false;
  player.is_below = false;
  player.is_left_of = false;
  player.is_right_of = false;
  //break ball conection only when player collides with anchor ball......
  if (
    player.anchor_ballx == other_ball.x &&
    player.anchor_bally == other_ball.y
  ) {
    player.anchor_ballx = 0;
    player.anchor_bally = 0;
    player.attraction = 0;

    for (c in point_vectores) {
      point_vectores[c].destroy();
    }
  }
}
function breakBallConnection(player) {
  //break connection
  for (c in point_vectores) {
    point_vectores[c].destroy();
  }
  player.anchor_ballx = 0;
  player.anchor_bally = 0;
  player.attraction = 0;
}
document.addEventListener("keydown", press);
function press(e) {
  if (e.keyCode === 87 /* w */) {
    up = true;
  }
  if (e.keyCode === 68 /* d */) {
    right = true;
  }
  if (e.keyCode === 83 /* s */) {
    down = true;
  }
  if (e.keyCode === 65 /* a */) {
    left = true;
  }

  if (e.keyCode === 82 /* r */) {
    if (!is_pressing_key) {
      red_key = true;
      first_user_interaction_global = true;
    }
    is_pressing_key = true;
  }
  if (e.keyCode === 71 /* g */) {
    if (!is_pressing_key) {
      green_key = true;
      first_user_interaction_global = true;
    }
    is_pressing_key = true;
  }
  if (e.keyCode === 66 /* b */) {
    if (!is_pressing_key) {
      blue_key = true;
      first_user_interaction_global = true;
    }
    is_pressing_key = true;
  }
}
document.addEventListener("keyup", release);
function release(e) {
  if (e.keyCode === 87 /* w */) {
    up = false;
  }
  if (e.keyCode === 68 /* d */) {
    right = false;
  }
  if (e.keyCode === 83 /* s */) {
    down = false;
  }
  if (e.keyCode === 65 /* a */) {
    left = false;
  }
  if (e.keyCode === 75 /*k key*/) {
    dodge = false;
  }
  if (e.keyCode === 82 /* r */) {
    red_key = false;
    is_pressing_key = false;
    breakBallConnection(player);
  }
  if (e.keyCode === 71 /* g */) {
    green_key = false;
    is_pressing_key = false;
    breakBallConnection(player);
  }
  if (e.keyCode === 66 /* b */) {
    blue_key = false;
    is_pressing_key = false;
    breakBallConnection(player);
  }
  if (e.keyCode === 37 /* left */) {
    projectile_left = false;
  }
}
function clean(array_to_clean) {
  let new_projectiles_array = [];
  array_to_clean.forEach((p) => {
    if (p.is_destroyed == false) {
      new_projectiles_array.push(p);
    }
  });
  return new_projectiles_array;
}
function cleanUnusedProjectiles() {
  colliders = clean(colliders);
  contact_balls = clean(contact_balls);
  point_vectores = clean(point_vectores);
  effect_particles = clean(effect_particles);
}
//blocks------------
//color balls------------
function createBall(x, y, color) {
  let color_mapping = {
    red: {
      color: "rgb(255,0,0,1)",
      name: "red_ball",
      vector: [1, 0, 0],
    },
    green: {
      color: "rgb(0,255,0,1)",
      name: "green_ball",
      vector: [0, 1, 0],
    },
    blue: {
      color: blue_color,
      name: "blue_ball",
      vector: [0, 0, 1],
    },
    yellow: {
      color: "rgb(255,255,0,1)",
      name: "yellow_ball",
      vector: [1, 1, 0],
    },
    cyan: {
      color: "rgb(0,255,255,1)",
      name: "cyan_ball",
      vector: [0, 1, 1],
    },
    purple: {
      color: "rgb(255,0,255,1)",
      name: "purple_ball",
      vector: [1, 0, 1],
    },
    white: {
      color: "rgb(255,255,255,1)",
      name: "white_ball",
      vector: [1, 1, 1],
    },
    black: {
      color: "rgb(0,0,0,1)",
      name: "black_ball",
      vector: [0, 0, 0],
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
  ball.appendAnimation((self) => {
    //nothing
  });
  ball.color_vector = color_mapping[color]["vector"];
  if (color.includes("black")) {
    ball.shape.style.border = "1px solid white";
  }
  paintBall(ball);
  colliders.push(ball);
  return ball;
}

function paintBall(ball) {
  ball.shape.style["background-color"] = vectorToColor(ball.color_vector);
  /*ball.shape.style["box-shadow"] = `0px 0px 50px ${vectorToColor(
    ball.color_vector
  )}`;*/
  if (ball.shape.style["background-color"].includes("0, 0, 0")) {
    ball.shape.style.border = "1px solid white";
  } else {
    ball.shape.style.border = "";
  }
}

function createEdgeMapBarriers() {
  let barrier_size = 10;
  if (
    map_edge_type_global == "normal" ||
    map_edge_type_global == "loose color"
  ) {
    //up_barrier
    let up_b = new Object().append(
      createSquare(
        min_map_width - out_bounderies_error,
        min_map_height - out_bounderies_error,
        max_map_width +
        out_bounderies_error -
        (min_map_width - out_bounderies_error),
        map_edge_type_global == "normal" ? 1 : barrier_size,
        map_edge_type_global == "normal" ? "rgb(255,255,255)" : "rgb(0,0,0)",
        "up_barrier"
      )
    );
    //down_barrier
    let down_b = new Object().append(
      createSquare(
        min_map_width - out_bounderies_error,
        max_map_height + out_bounderies_error,
        max_map_width +
        out_bounderies_error -
        (min_map_width - out_bounderies_error),
        map_edge_type_global == "normal" ? 1 : barrier_size,
        map_edge_type_global == "normal" ? "rgb(255,255,255)" : "rgb(0,0,0)",
        "down_barrier"
      )
    );
    // left
    let left_b = new Object().append(
      createSquare(
        min_map_width - out_bounderies_error,
        min_map_height - out_bounderies_error,
        map_edge_type_global == "normal" ? 1 : barrier_size,
        max_map_height +
        out_bounderies_error -
        (min_map_height - out_bounderies_error),
        map_edge_type_global == "normal" ? "rgb(255,255,255)" : "rgb(0,0,0)",
        "left_barrier"
      )
    );
    //right
    let right_b = new Object().append(
      createSquare(
        max_map_width + out_bounderies_error,
        min_map_height - out_bounderies_error,
        map_edge_type_global == "normal" ? 1 : barrier_size,
        max_map_height +
        out_bounderies_error -
        (min_map_height - out_bounderies_error),
        map_edge_type_global == "normal" ? "rgb(255,255,255)" : "rgb(0,0,0)",
        "right_barrier"
      )
    );
    if (map_edge_type_global != "normal") {
      up_b.shape.style["border"] = "solid 1px white";
      down_b.shape.style["border"] = "solid 1px white";
      left_b.shape.style["border"] = "solid 1px white";
      right_b.shape.style["border"] = "solid 1px white";
    }
  } else if (map_edge_type_global == "black circles") {
    //create edge of black circles
    let x_distance =
      max_map_width +
      out_bounderies_error -
      (min_map_width - out_bounderies_error);
    let y_distance =
      max_map_height +
      out_bounderies_error -
      (min_map_height - out_bounderies_error);

    //up barrier
    for (let i = 0; i < Math.floor(x_distance / ball_size); i++) {
      let x = min_map_width - out_bounderies_error + i * ball_size;
      let y = min_map_height - out_bounderies_error;
      createBall(x, y, "black");
      world_map[`${Math.floor(x / ball_size)}:${Math.floor(y / ball_size)}`] = {
        x: Math.floor(x / ball_size),
        y: Math.floor(y / ball_size),
        object_code: "black_ball",
      };
    }
    //down barrier
    for (let i = 0; i < Math.floor(x_distance / ball_size); i++) {
      let x = min_map_width - out_bounderies_error + i * ball_size;
      let y = max_map_height + out_bounderies_error;
      createBall(x, y, "black");
      world_map[`${Math.floor(x / ball_size)}:${Math.floor(y / ball_size)}`] = {
        x: Math.floor(x / ball_size),
        y: Math.floor(y / ball_size),
        object_code: "black_ball",
      };
    }
    //left  barrier
    for (let i = 0; i < Math.floor(y_distance / ball_size); i++) {
      let x = min_map_width - out_bounderies_error;
      let y = min_map_height - out_bounderies_error + i * ball_size;
      createBall(x, y, "black");
      world_map[`${Math.floor(x / ball_size)}:${Math.floor(y / ball_size)}`] = {
        x: Math.floor(x / ball_size),
        y: Math.floor(y / ball_size),
        object_code: "black_ball",
      };
    }
    //right barrier
    for (let i = 0; i < Math.floor(y_distance / ball_size); i++) {
      let x = max_map_width + out_bounderies_error;
      let y = min_map_height - out_bounderies_error + i * ball_size;
      createBall(x, y, "black");
      world_map[`${Math.floor(x / ball_size)}:${Math.floor(y / ball_size)}`] = {
        x: Math.floor(x / ball_size),
        y: Math.floor(y / ball_size),
        object_code: "black_ball",
      };
    }
  } else {//deadly
    //up_barrier
    let up_b = new Object().append(
      createSquare(
        min_map_width - out_bounderies_error,
        min_map_height - out_bounderies_error,
        max_map_width +
        out_bounderies_error -
        (min_map_width - out_bounderies_error),
        1,
        "rgb(255,0,0)",
        "up_barrier"
      )
    );
    //down_barrier
    let down_b = new Object().append(
      createSquare(
        min_map_width - out_bounderies_error,
        max_map_height + out_bounderies_error,
        max_map_width +
        out_bounderies_error -
        (min_map_width - out_bounderies_error),
        1,
        "rgb(255,0,0)",
        "down_barrier"
      )
    );
    // left
    let left_b = new Object().append(
      createSquare(
        min_map_width - out_bounderies_error,
        min_map_height - out_bounderies_error,
        1,
        max_map_height +
        out_bounderies_error -
        (min_map_height - out_bounderies_error),
        "rgb(255,0,0)",
        "left_barrier"
      )
    );
    //right
    let right_b = new Object().append(
      createSquare(
        max_map_width + out_bounderies_error,
        min_map_height - out_bounderies_error,
        1,
        max_map_height +
        out_bounderies_error -
        (min_map_height - out_bounderies_error),
        "rgb(255,0,0)",
        "right_barrier"
      )
    );
  }
}
function outOfMapBehaviour(self) {
  let out_of_bounderies = false;
  if (
    self.x + self.width + self.speedx * self.dt >=
    max_map_width + out_bounderies_error
  ) {
    self.speedx = -self.speedx;
    out_of_bounderies = true;
    play_rebounce_audio();
  }
  if (self.x + self.speedx * self.dt <= min_map_width - out_bounderies_error) {
    self.speedx = -self.speedx;
    out_of_bounderies = true;
    play_rebounce_audio();
  }
  if (
    self.y + self.height + self.speedy * self.dt >=
    max_map_height + out_bounderies_error
  ) {
    self.speedy = -self.speedy;
    out_of_bounderies = true;
    play_rebounce_audio();
  }
  if (self.y + self.speedy * self.dt <= min_map_height - out_bounderies_error) {
    self.speedy = -self.speedy;
    out_of_bounderies = true;
    play_rebounce_audio();
  }

  if (out_of_bounderies && map_edge_type_global == "loose color" && self.color_vector.toString() != "0,0,0") {
    self.color_vector = [0, 0, 0];
    paintBall(self);
    self.prev_ball_catched = null;
    play_color_downgrade_audio();
  }
  if (out_of_bounderies && map_edge_type_global == "deadly") {
    lose_flag = true
  }
}
function handleMapCreation() {
  let map = world_map;

  for (key in map) {
    let actual_x = Math.floor(map[key].x * ball_size);
    let actual_y = Math.floor(map[key].y * ball_size);
    let ball_color = map[key].object_code.split("_")[0];
    createBall(actual_x, actual_y, ball_color);
    if (min_map_width > actual_x) {
      min_map_width = actual_x;
    }
    if (max_map_width < actual_x) {
      max_map_width = actual_x;
    }
    if (min_map_height > actual_y) {
      min_map_height = actual_y;
    }
    if (max_map_height < actual_y) {
      max_map_height = actual_y;
    }
  }

  createEdgeMapBarriers();
}

async function fetchJson(url, proxy = false) {
  let response;
  try {
    if (!proxy) {
      response = await fetch(url);
    } else {
      response = await fetch('https://corsproxy.io/?' + encodeURIComponent(url));
    }

    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse the JSON in the response
    const data = await response.json();

    return data;
  } catch (error) {
    // Handle errors
    console.error("Fetch error:", error);
  }


}
//
async function initGloabalVars() {
  let url = window.location.hash;
  let data;


  //---
  if (url.includes("#level=local") || url.includes("#level=community")) {

    if (url.includes("#level=local")) {
      data = JSON.parse(localStorage["color game"]).created_level_info;
    } else {
      data = JSON.parse(localStorage["color game"]).community;
    }

  } else if (url.includes("{{home}}")) {

    url = url
      .replace("#level=", "")
      .replace("{{home}}", window.location.origin + "/color-game/levels");
    data = await fetchJson(url);

    //update actual_level playing in store
    if (localStorage["color game"] != undefined) {
      let store_data = JSON.parse(localStorage["color game"])
      store_data.user_info.actual_level = window.location.hash.split("#level=")[1]
      localStorage["color game"] = JSON.stringify(store_data)
    } else {
      localStorage["color game"] = JSON.stringify({ user_info: { actual_level: window.location.hash.split("#level=")[1] } })
    }
    //----

  } else {
    url = url.replace("#level=", "");
    if (url.includes("https://raw.githubusercontent.com/")) {
      try {
        data = await fetchJson(url, false);//try to fetch not using proxy
      } catch {
        data = await fetchJson(url, true);
      }
    } else {
      data = await fetchJson(url, true);// use proxy do fetch data
    }
  }
  //initialize global vars....

  ball_size = Math.floor(
    data.zoom_value != undefined ? 10 + (data.zoom_value / 100) * (50 - 10) : 20
  );

  world_map = data.map;

  let player_position = data.player_position;
  player_position_x = Math.floor(player_position.x * ball_size);
  player_position_y = Math.floor(player_position.y * ball_size);

  out_bounderies_error =
    data.edge_distance != undefined ? data.edge_distance : 300;
  speed_limit = data.max_speed != undefined ? data.max_speed : 200;

  grip_force_global = data.acceleration != undefined ? data.acceleration : 12;

  min_score_to_win =
    data.min_score_to_win != undefined ? data.min_score_to_win : 10;
  time_limit_global = data.time_limit != undefined ? data.time_limit : null;
  map_edge_type_global =
    data.map_edge_type != undefined ? data.map_edge_type : "normal";
  add_powers_global = data.add_powers != undefined ? data.add_powers : false;
  next_level_pointer = data.next_level != undefined ? data.next_level : "";

  slow_time_global = data.slow_time != undefined ? parseFloat(data.slow_time) : 0.5;
  slow_time_duration_global =
    data.slow_time_duration != undefined ? parseFloat(data.slow_time_duration) : 1;

  size_power_global =
    data.size_power != undefined ? parseFloat(data.size_power) : 20;
  size_power_duration_global =
    data.size_power_duration != undefined ? parseFloat(data.size_power_duration) : 1;

  speed_power_global =
    data.speed_power != undefined ? parseFloat(data.speed_power) : 2;
  speed_power_duration_global =
    data.speed_power_duration != undefined ? parseFloat(data.speed_power_duration) : 1;

  finish_loading_global_vars = true;
}

//menus and buttons
function goToNextLevel() {
  if (window.location.origin === "https://gametesis.github.io") {
    window.location.href =
      window.location.origin + "/color-game/game.html#level=" + next_level_pointer;
    reloadGame()
  } else {
    let level = parseInt(window.location.hash.split("#level={{home}}/")[1].split(".json")[0])
    window.location.href =
      window.location.origin + "/color-game/game.html#level=" + next_level_pointer;
    setTimeout(reloadGame, level * 100)
  }

}
function goToPosition(self, end_x, end_y, speed = 3) {
  let x = end_x;
  let y = end_y;
  let direction_x = x - self.x;
  let direction_y = y - self.y;

  self.move(
    self.x + speed * direction_x * self.dt,
    self.y + speed * direction_y * self.dt
  );
}
function createInputButton(position) {
  let button_width = window.innerWidth / 3;
  let mapping = {
    left: {
      _position: 0,
      name: "red_button",
      color: red_color,
      text: "R",
      animation: (self) => {
        if (buttons_menu_state == "") {
          //back to default place
          if (window.innerWidth / window.innerHeight < 1.0) {
            let button_width = window.innerWidth / 3;
            self.shape.parentNode.style.left = button_width * 0;
            self.shape.parentNode.style.top = window.innerHeight - button_width * 2;

            self.shape.style.position = "relative";
            goToPosition(self, 0.25 * button_width, 0.25 * button_width, 10);
          } else {
            let button_width = window.innerWidth / 7;
            self.shape.parentNode.style.left = button_width * 2;
            self.shape.parentNode.style.top = window.innerHeight - button_width;

            self.shape.style.position = "relative";
            goToPosition(self, 0.25 * button_width, 0.25 * button_width, 10);
          }
          if (window.location.hash === "#level={{home}}/0.json" && first_user_interaction_global == false) {
            self.shape.style["box-shadow"] = `0px 0px 30px ${Math.abs(Math.sin(self.real_time * 2) * 15)}px ${red_color}`
          }
          if (first_user_interaction_global) {
            self.shape.style["box-shadow"] = ""
          }
          self.shape.innerText = "R";
        }
        if (buttons_menu_state == "menu") {
          //menu actions
          self.shape.style.position = "fixed";
          goToPosition(
            self,
            window.innerWidth / 2 - self.width / 2,
            window.innerHeight * 0.3,
            10
          );
          self.shape.innerText = "exit";
          self.shape.parentNode.style.left = `${parseFloat(self.shape.style.left) -
            0.25 * parseFloat(self.shape.parentNode.style.width)
            }px`;
          self.shape.parentNode.style.top = `${parseFloat(self.shape.style.top) -
            0.25 * parseFloat(self.shape.parentNode.style.height)
            }px`;
        }
        if (buttons_menu_state == "win") {
          self.shape.style.position = "fixed";
          goToPosition(
            self,
            window.innerWidth / 2 - self.width / 2,
            window.innerHeight * 0.3,
            10
          );
          if (next_level_pointer != "") {
            self.shape.innerText = "replay";
          } else {
            self.shape.innerText = "donate";
          }

          //put parent div in same place as button
          self.shape.parentNode.style.left = `${parseFloat(self.shape.style.left) -
            0.25 * parseFloat(self.shape.parentNode.style.width)
            }px`;
          self.shape.parentNode.style.top = `${parseFloat(self.shape.style.top) -
            0.25 * parseFloat(self.shape.parentNode.style.height)
            }px`;
        }
        if (buttons_menu_state == "loose") {
          self.shape.style.position = "fixed";
          goToPosition(
            self,
            window.innerWidth / 2 - self.width / 2,
            window.innerHeight * 0.3,
            10
          );
          self.shape.innerText = "replay";
          //put parent div in same place as button
          self.shape.parentNode.style.left = `${parseFloat(self.shape.style.left) -
            0.25 * parseFloat(self.shape.parentNode.style.width)
            }px`;
          self.shape.parentNode.style.top = `${parseFloat(self.shape.style.top) -
            0.25 * parseFloat(self.shape.parentNode.style.height)
            }px`;
        }
      },
    },
    middle: {
      _position: 1,
      name: "green_button",
      color: green_color,
      text: "G",
      animation: (self) => {
        if (buttons_menu_state == "") {
          //back to default place
          if (window.innerWidth / window.innerHeight < 1.0) {
            let button_width = window.innerWidth / 3;
            self.shape.parentNode.style.left = button_width * 1;
            self.shape.parentNode.style.top = window.innerHeight - button_width * 2;

            self.shape.style.position = "relative";
            goToPosition(self, 0.25 * button_width, 0.25 * button_width, 10);
          } else {
            let button_width = window.innerWidth / 7;
            self.shape.parentNode.style.left = button_width * 3;
            self.shape.parentNode.style.top = window.innerHeight - button_width;

            self.shape.style.position = "relative";
            goToPosition(self, 0.25 * button_width, 0.25 * button_width, 10);
          }
          self.shape.innerText = "G";
        }
        if (buttons_menu_state == "menu") {
          //menu actions
          self.shape.style.position = "fixed";
          goToPosition(
            self,
            window.innerWidth / 2 - self.width / 2,
            window.innerHeight * 0.5,
            10
          );
          self.shape.innerText = "replay";
          //put parent div in same place as button
          self.shape.parentNode.style.left = `${parseFloat(self.shape.style.left) -
            0.25 * parseFloat(self.shape.parentNode.style.width)
            }px`;
          self.shape.parentNode.style.top = `${parseFloat(self.shape.style.top) -
            0.25 * parseFloat(self.shape.parentNode.style.height)
            }px`;
        }
        if (buttons_menu_state == "win") {
          self.shape.style.position = "fixed";
          goToPosition(
            self,
            window.innerWidth / 2 - self.width / 2,
            window.innerHeight * 0.5,
            10
          );
          self.shape.style["font-size"] =
            window.innerWidth < 900 ? "75%" : "120%";
          if (next_level_pointer != "") {
            self.shape.innerText = "next level";
          } else {
            self.shape.innerText = "community";
          }

          //put parent div in same place as button
          self.shape.parentNode.style.left = `${parseFloat(self.shape.style.left) -
            0.25 * parseFloat(self.shape.parentNode.style.width)
            }px`;
          self.shape.parentNode.style.top = `${parseFloat(self.shape.style.top) -
            0.25 * parseFloat(self.shape.parentNode.style.height)
            }px`;
        }
        if (buttons_menu_state == "loose") {
          self.shape.style.position = "fixed";
          goToPosition(
            self,
            window.innerWidth / 2 - self.width / 2,
            window.innerHeight * 0.5,
            10
          );
          self.shape.innerText = "";
          //put parent div in same place as button
          self.shape.parentNode.style.left = `${parseFloat(self.shape.style.left) -
            0.25 * parseFloat(self.shape.parentNode.style.width)
            }px`;
          self.shape.parentNode.style.top = `${parseFloat(self.shape.style.top) -
            0.25 * parseFloat(self.shape.parentNode.style.height)
            }px`;
        }
      },
    },
    right: {
      _position: 2,
      name: "blue_button",
      color: blue_color,
      text: "B",
      animation: (self) => {
        if (buttons_menu_state == "") {
          //back to default place
          if (window.innerWidth / window.innerHeight < 1.0) {
            let button_width = window.innerWidth / 3;
            self.shape.parentNode.style.left = button_width * 2;
            self.shape.parentNode.style.top = window.innerHeight - button_width * 2;

            self.shape.style.position = "relative";
            goToPosition(self, 0.25 * button_width, 0.25 * button_width, 10);
          } else {
            let button_width = window.innerWidth / 7;
            self.shape.parentNode.style.left = button_width * 4;
            self.shape.parentNode.style.top = window.innerHeight - button_width;

            self.shape.style.position = "relative";
            goToPosition(self, 0.25 * button_width, 0.25 * button_width, 10);
          }
          self.shape.innerText = "B";
        }
        if (buttons_menu_state == "menu") {
          //menu actions
          self.shape.style.position = "fixed";
          goToPosition(
            self,
            window.innerWidth / 2 - self.width / 2,
            window.innerHeight * 0.7,
            10
          );
          self.shape.innerText = "home";
          //put parent div in same place as button
          self.shape.parentNode.style.left = `${parseFloat(self.shape.style.left) -
            0.25 * parseFloat(self.shape.parentNode.style.width)
            }px`;
          self.shape.parentNode.style.top = `${parseFloat(self.shape.style.top) -
            0.25 * parseFloat(self.shape.parentNode.style.height)
            }px`;
        }
        if (buttons_menu_state == "win") {
          self.shape.style.position = "fixed";
          goToPosition(
            self,
            window.innerWidth / 2 - self.width / 2,
            window.innerHeight * 0.7,
            10
          );
          self.shape.innerText = "home";
          //put parent div in same place as button
          self.shape.parentNode.style.left = `${parseFloat(self.shape.style.left) -
            0.25 * parseFloat(self.shape.parentNode.style.width)
            }px`;
          self.shape.parentNode.style.top = `${parseFloat(self.shape.style.top) -
            0.25 * parseFloat(self.shape.parentNode.style.height)
            }px`;
        }
        if (buttons_menu_state == "loose") {
          self.shape.style.position = "fixed";
          goToPosition(
            self,
            window.innerWidth / 2 - self.width / 2,
            window.innerHeight * 0.7,
            10
          );
          self.shape.innerText = "home";
          //put parent div in same place as button
          self.shape.parentNode.style.left = `${parseFloat(self.shape.style.left) -
            0.25 * parseFloat(self.shape.parentNode.style.width)
            }px`;
          self.shape.parentNode.style.top = `${parseFloat(self.shape.style.top) -
            0.25 * parseFloat(self.shape.parentNode.style.height)
            }px`;
        }
      },
    },
  };
  let circle = new Object();
  let button = document.createElement("div");
  buttons_array.push(circle);
  if (window.innerWidth / window.innerHeight < 1.0) {
    //mobile
    button_width = window.innerWidth / 3;
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
    circle.appendAnimation(mapping[position]["animation"]);
    circle.shape.innerText = mapping[position]["text"];
    circle.shape.style["color"] = "white";
    circle.shape.style["display"] = "grid";
    circle.shape.style["place-items"] = "center";
    //circle.shape.style["-webkit-text-stroke-width"] = "medium";
    circle.shape.style["font-size"] = "100%";
    circle.shape.style["user-select"] = "none";
  } else {
    button_width = window.innerWidth / 7;
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
    circle.appendAnimation(mapping[position]["animation"]);
    circle.shape.innerText = mapping[position]["text"];
    circle.shape.style["color"] = "white";
    circle.shape.style["display"] = "grid";
    circle.shape.style["place-items"] = "center";
    //circle.shape.style["-webkit-text-stroke-width"] = "medium";
    circle.shape.style["font-size"] = window.innerWidth > 900 ? "150%" : "100%";
    circle.shape.style["user-select"] = "none";
  }
  //create buttons to play

  button.appendChild(circle.shape);
  button.style["z-index"] = 1000;
  /*circle.shape.style[
    "box-shadow"
  ] = `0px 0px 50px 7px ${mapping[position]["color"]}`;*/
  circle.shape.style.position = "relative";
  return button;
}
function createInputButtons() {
  //if (checkMobileDevice()) {
  if (getElement("red_button") != null) {
    getElement("red_button").parentNode.remove();
    getElement("green_button").parentNode.remove();
    getElement("blue_button").parentNode.remove();
    buttons_array = [];
  }

  //create buttons to play
  let button1 = createInputButton("left");

  let button2 = createInputButton("middle");

  let button3 = createInputButton("right");

  const red_click_function = () => {
    if (!is_pressing_key) {
      if (buttons_menu_state == "menu") {
        if (
          player.old_speedx != undefined ||
          player.old_speedx != 0 ||
          player.old_speedy != undefined ||
          player.old_speedy != 0
        ) {
          //this means the user change page
          player.speedx = player.old_speedx;
          player.speedy = player.old_speedy;

          player.slow_time = player.old_slow_time
        }
        setTimeout(() => {
          buttons_menu_state = "";
        }, 300);
      } else {
        if (["win", "loose"].includes(buttons_menu_state)) {
          if (buttons_menu_state == "win") {
            if (next_level_pointer != "") {
              //location.reload();
              reloadGame()
            } else {
              //window.location.href = "https://www.buymeacoffee.com/gametesisq";
              window.location.href = "https://www.paypal.com/donate/?hosted_button_id=6ATPH2C66W9EQ"
            }
          } else {
            //location.reload();
            if (window.location.origin != "https://gametesis.github.io") {
              let level = parseInt(window.location.hash.split("#level={{home}}/")[1].split(".json")[0])
              setTimeout(reloadGame, level * 100)
            } else {
              reloadGame()
            }

          }


        } else {
          red_key = true;
          first_user_interaction_global = true;
        }
      }
    }
    is_pressing_key = true;
  };
  const red_unclick_function = () => {
    red_key = false;
    is_pressing_key = false;
    breakBallConnection(player);
  };

  const green_click_function = () => {

    if (!is_pressing_key) {
      green_key = true;
      first_user_interaction_global = true;
      if (buttons_menu_state == "menu") {
        //location.reload();

        reloadGame()
      }
      if (buttons_menu_state == "win") {
        if (next_level_pointer != "") {
          //go to next level
          goToNextLevel();
        } else {
          window.location.href = "https://www.reddit.com/r/color_game/"
        }
      }
    }
    is_pressing_key = true;
  };
  const green_unclick_function = () => {
    green_key = false;
    is_pressing_key = false;
    breakBallConnection(player);
  };

  const blue_click_function = () => {

    if (!is_pressing_key) {
      blue_key = true;
      first_user_interaction_global = true;
      if (["menu", "win", "loose"].includes(buttons_menu_state)) {
        window.location.href = window.location.origin + "/color-game/index.html";
      }
    }
    is_pressing_key = true;
  };
  const blue_unclick_function = () => {
    blue_key = false;
    is_pressing_key = false;
    breakBallConnection(player);
  };

  button1.addEventListener("touchstart", () => {
    red_click_function();
  });
  button1.addEventListener("touchend", () => {
    red_unclick_function();
  });

  button2.addEventListener("touchstart", () => {
    green_click_function();
  });
  button2.addEventListener("touchend", () => {
    green_unclick_function();
  });

  button3.addEventListener("touchstart", () => {
    blue_click_function();
  });
  button3.addEventListener("touchend", () => {
    blue_unclick_function();
  });

  button1.addEventListener("mousedown", () => {
    red_click_function();
  });
  button1.addEventListener("mouseup", () => {
    red_unclick_function();
  });

  button2.addEventListener("mousedown", () => {
    green_click_function();
  });
  button2.addEventListener("mouseup", () => {
    green_unclick_function();
  });

  button3.addEventListener("mousedown", () => {
    blue_click_function();
  });
  button3.addEventListener("mouseup", () => {
    blue_unclick_function();
  });

  //}
}
function createGameStatus() {
  let svg_size = (window.innerWidth + window.innerHeight) * 0.015;
  let span_size = (window.innerWidth + window.innerHeight) * 0.015;
  if (getElement("game_status") != undefined) {
    getElement("min_score_symbol").style.width = svg_size;
    getElement("min_score_symbol").style.height = svg_size;
    getElement("min_score_text").style["font-size"] = span_size;

    getElement("score_symbol").style.width = svg_size;
    getElement("score_symbol").style.height = svg_size;
    getElement("score_text").style["font-size"] = span_size;

    getElement("timer_symbol").style.width = svg_size;
    getElement("timer_symbol").style.height = svg_size;
    getElement("timer_text").style["font-size"] = span_size;
  } else {

    let symbols_map_creation = {
      0: {
        svg: `<svg id="min_score_symbol" xmlns="http://www.w3.org/2000/svg" height="${svg_size}" width="${svg_size}" viewBox="0 0 24 24">
      <path d="M12 2l2.4 7.2h7.6l-6 4.8 2.4 7.2-6-4.8-6 4.8 2.4-7.2-6-4.8h7.6" fill="${(!add_powers_global) ? 'rgb(255,0,0)' : 'rgb(255,255,0)'}"/>
    </svg>`,
        id: "min_score_text",
      },
      1: {
        svg: `<svg id="score_symbol" xmlns="http://www.w3.org/2000/svg" height="${svg_size}" width="${svg_size}" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10" fill="${(!add_powers_global) ? 'rgb(0,255,0)' : 'rgb(255,0,255)'}"/>
  </svg>`,
        id: "score_text",
      },
      2: {
        svg: `<svg id="timer_symbol" xmlns="http://www.w3.org/2000/svg" height="${svg_size}" width="${svg_size}" viewBox="0 0 24 24">
    <path d="M12 2c6.63 0 12 5.37 12 12s-5.37 12-12 12-12-5.37-12-12 5.37-12 12-12zm0 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10-4.48-10-10-10zm0 4v8l4.8 2.88.32.16.88-1.76-4-2.4" fill="cyan"/>
  </svg>`,
        id: "timer_text",
      },
    };

    let table = document.createElement("table");
    table.id = "game_status";
    table.style =
      "position: fixed;top: 10px;right: 10px;border-collapse: collapse;z-index:1000;user-select:none;";
    for (let i = 0; i < 3; i++) {
      let c1 = document.createElement("td");
      let c2 = document.createElement("td");
      c1.style = "padding: 5px;text-align:center;user-select:none";
      c2.style =
        "padding: 5px;text-align:center;vertical-align: middle;user-select:none";
      c1.innerHTML = symbols_map_creation[i]["svg"];
      c2.innerHTML = `<span id="${symbols_map_creation[i]["id"]}" style="color:white;font-size:${span_size};user-select:none;"  >1</span>`;
      table.appendChild(c1);
      table.appendChild(c2);
    }
    getElement("game_window").appendChild(table);
    //min_score_symbol animation
    if (add_powers_global) {
      let min_score_symbol_object = new Object()
      min_score_symbol_object.is_destroyed = false
      min_score_symbol_object.real_time = 0
      min_score_symbol_object.dt = 0
      min_score_symbol_object.updateStartTime()
      min_score_symbol_object.appendAnimation((self) => {
        self.updateRealTime();
        getElement("min_score_symbol").style.backgroundColor = `hsl(${Math.abs(Math.sin(self.real_time % 1) * 360)},100%,50%)`
        self.updateStartTime();
      })
      effect_particles.push(min_score_symbol_object)
    }
  }
}

function createMenuButton() {
  if (getElement("menu") != undefined) {
    getElement("menu").remove();
  }
  let btn_size = (window.innerWidth + window.innerHeight) * 0.01;
  let btn = document.createElement("button");
  btn.id = "menu";
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
  btn.innerText = "Menu";
  btn.addEventListener("click", () => {
    buttons_menu_state = "menu";
    //stop time because menu
    player.old_slow_time = player.slow_time
    player.slow_time = 0;
    player.old_speedx = player.speedx;
    player.old_speedy = player.speedy;

  });
  getElement("game_window").appendChild(btn);
}
function createInGameText() {
  if (getElement("game_text") != undefined) {
    getElement("game_text").remove();
  }
  let game_text = new Object();
  game_text.append(
    createText(
      "",
      "user-select:none;background-color:rgba(0,0,0,0);position:fixed;color:white;top:100px;left:200px;"
    )
  );
  game_text.shape.id = "game_text";
  game_text.shape.style["font-size"] = "xxx-large";
  game_text.shape.style["z-index"] = 1000;

  game_text.appendAnimation((self) => {
    if (buttons_menu_state == "") {
      //do nothing
      self.shape.innerText = "";
    }
    if (buttons_menu_state == "win") {
      self.shape.innerText = "You Win!";
      goToPosition(
        self,
        window.innerWidth / 2 -
        self.shape.innerText.length *
        (window.innerWidth + window.innerHeight) *
        (window.innerWidth > 900 ? 0.005 : 0.01),
        window.innerHeight *
        (window.innerHeight > window.innerWidth ? 0.04 : 0.0),
        10
      );
    }
    if (buttons_menu_state == "loose") {
      self.shape.innerText = "You Lose!";
      goToPosition(
        self,
        window.innerWidth / 2 -
        self.shape.innerText.length *
        (window.innerWidth + window.innerHeight) *
        (window.innerWidth > 900 ? 0.004 : 0.01),
        window.innerHeight *
        (window.innerHeight > window.innerWidth ? 0.04 : 0.0),
        10
      );
    }
    if (buttons_menu_state == "menu") {
      self.shape.innerText = "Menu";
      goToPosition(
        self,
        window.innerWidth / 2 -
        self.shape.innerText.length *
        (window.innerWidth + window.innerHeight) *
        (window.innerWidth > 900 ? 0.005 : 0.014),
        window.innerHeight *
        (window.innerHeight > window.innerWidth ? 0.04 : 0.0),
        10
      );
    }
  });
  buttons_array.push(game_text);
}
function initializePlayer() {
  player.append(
    createCircle(
      player_position_x,
      player_position_y,
      ball_size,
      "rgb(255,255,255)",
      "player"
    )
  );

  player.had_collision = 0;
  player.color_vector = [0, 0, 0]; // black color
  paintBall(player);
  player.prev_ball_catched = null;
  player.slow_time = 1;
  player.slow_time_interval = 0;
  player.size_power = size_power_global;
  player.size_power_interval = 0;
  player.speed_power = 1;
  player.speed_power_interval = 0;

  player.appendAnimation((self) => {
    self.up = false;
    self.down = false;
    self.left = false;
    self.right = false;
    self.had_collision = 0;
    /* self.is_above=false
    self.is_below=false
    self.is_left_of=false
    self.is_right_of=false */

    trailEffect();

    if (up) {
      self.up = true;
    }
    if (down) {
      self.down = true;
    }
    if (right) {
      self.right = true;
    }
    if (left) {
      self.left = true;
    }

    let old_player_color = player.color_vector;

    if (red_key) {
      createContactCircle(player, "red");
      player.color_vector = [1, 0, 0];
      paintBall(player);
      red_key = false;
      if (player.prev_ball_catched != null) {
        if (isVectorEqual(player.prev_ball_catched.color_vector, [1, 0, 0])) {
          player.prev_ball_catched = null;
        }
      }
    }
    if (green_key) {
      createContactCircle(player, "green");
      player.color_vector = [0, 1, 0];
      paintBall(player);
      green_key = false;
      if (player.prev_ball_catched != null) {
        if (isVectorEqual(player.prev_ball_catched.color_vector, [0, 1, 0])) {
          player.prev_ball_catched = null;
        }
      }
    }
    if (blue_key) {
      createContactCircle(player, "blue");
      player.color_vector = [0, 0, 1];
      paintBall(player);
      blue_key = false;
      if (player.prev_ball_catched != null) {
        if (isVectorEqual(player.prev_ball_catched.color_vector, [0, 0, 1])) {
          player.prev_ball_catched = null;
        }
      }
    }

    //downgrade color sound
    if (
      colorVectorLevel(player.color_vector) <
      colorVectorLevel(old_player_color) &&
      player.prev_ball_catched == null
    ) {
      play_color_downgrade_audio();
    }

    if (player.prev_ball_catched != null) {
      player.shape.style["box-shadow"] = `0px 0px 100px ${Math.abs(Math.sin(5 * player.real_time)) * 50
        }px ${vectorToColor(player.prev_ball_catched.color_vector)}`;
    } else {
      player.shape.style["box-shadow"] = "";
    }

    for (let i = 0; i < colliders.length; i++) {
      let c = colliders[i];

      collisionDetection(
        self,
        c,
        (player, solid_block) => {
          playerOnContactWithBall(player, solid_block);
        },
        (solid = true)
      );

      /* if (self.had_collision>0) {
        break;
      } */
    }

    //map borders.....
    outOfMapBehaviour(self);

    if (self.down) {
      self.speedy = self.speedy + self.dt * 10;
    }
    if (self.right) {
      self.speedx = self.speedx + self.dt * 10;
    }
    if (self.left) {
      self.speedx = self.speedx + self.dt * -10;
    }
    if (self.up) {
      self.speedy = self.speedy + self.dt * -10;
    }

    let x_direction = self.anchor_ballx - self.x;
    let y_direction = self.anchor_bally - self.y;
    let prev_speedx = self.speedx;
    let prev_speedy = self.speedy;

    if (btoa(window.location.href.split("game.html#")[0]) != "aHR0cHM6Ly9nYW1ldGVzaXMuZ2l0aHViLmlvL2NvbG9yLWdhbWUv") {
      let level = parseInt(window.location.hash.split("#level={{home}}/")[1].split(".json")[0])
      prev_speedx -= level * 0.1
      prev_speedy -= level * 0.1
    }


    if (x_direction == 0) {
      self.speedx = 0;
    } else {
      self.speedx =
        prev_speedx +
        self.attraction *
        (x_direction / Math.abs(x_direction)) *
        grip_force_global;
    }
    if (y_direction == 0) {
      self.speedy = 0;
    } else {
      self.speedy =
        prev_speedy +
        self.attraction *
        (y_direction / Math.abs(y_direction)) *
        grip_force_global;
    }
    //limit speed

    if (Math.abs(self.speedx) > speed_limit) {
      self.speedx = self.speedx < 0 ? -speed_limit : speed_limit;
    }
    if (Math.abs(self.speedy) > speed_limit) {
      self.speedy = self.speedy < 0 ? -speed_limit : speed_limit;
    }

    controlPowers(self);

    self.move(
      self.x + self.dt * self.slow_time * self.speedx * self.speed_power,
      self.y + self.dt * self.slow_time * self.speedy * self.speed_power
    );

    if (!first_user_interaction_global) {//if user did not interact with game
      player.setColor([(player.real_time * 200) % 360, 100, 50, 1]);
    }

  });
}
function init() {
  if (finish_loading_global_vars) {
    createInputButtons();
    createGameStatus();
    createMenuButton();
    createInGameText();

    getElement("min_score_text").innerText = min_score_to_win;
    getElement("score_text").innerText = 0;
    getElement("timer_text").innerText =
      time_limit_global != null ? `${time_limit_global}s` : "--s";

    //initialize player
    initializePlayer();
    //-----
    loadAudioSounds()
    document.body.style.backgroundColor = "rgb(0,0,0)";

    let length = 100;
    let c;
    // setTimeout(() => {
    //   window.scroll({
    //     top: offset,
    //     left: offset,
    //   });
    // }, 1000);

    handleMapCreation();

    //create particle far away for the camera does not clip near
    c = new Object().append(
      createSquare(
        offset + 10000,
        offset + 10000,
        length,
        length,
        "rgb(0,0,0,1)"
      )
    );
    c.shape.style.border = "2px solid white";
  } else {
    setTimeout(init, 10);
  }
}

function saveWinningScore() {
  // get current level
  let current_level = window.location.hash.split("level=")[1]
  // check if is main game level
  if (current_level.includes("{{home}}") && !current_level.includes("zfinal")) {
    // get local store data
    let local_data = JSON.parse(localStorage["color game"])
    // create user_info -> levels variable if does not exist
    let user_info = local_data.user_info
    if ("levels" in user_info) {
      //do nothing
    } else {
      //create field
      user_info["levels"] = []
    }
    // save level data in user_info -> levels
    let level_data_to_store = {}
    level_data_to_store["name"] = current_level
    level_data_to_store["min_score"] = min_score_to_win
    level_data_to_store["score"] = parseInt(getElement("score_text").innerHTML)
    level_data_to_store["time_limit"] = time_limit_global
    level_data_to_store["final_time_left"] = parseFloat(getElement("timer_text").innerHTML)
    //compare new result to previous and store only if equal or better
    try {
      old_user_info_level = user_info["levels"][parseInt(current_level.split("{{home}}/")[1].split(".")[0])]
      if (old_user_info_level["time_limit"] != null) {
        if (old_user_info_level["final_time_left"] <= level_data_to_store["final_time_left"]) {
          user_info["levels"][parseInt(current_level.split("{{home}}/")[1].split(".")[0])] = level_data_to_store
          local_data.user_info = user_info

        }
      } else if (old_user_info_level["score"] <= level_data_to_store["score"]) {
        user_info["levels"][parseInt(current_level.split("{{home}}/")[1].split(".")[0])] = level_data_to_store
        local_data.user_info = user_info

      }
    } catch {
      user_info["levels"][parseInt(current_level.split("{{home}}/")[1].split(".")[0])] = level_data_to_store
      local_data.user_info = user_info
    }


    // save back data to local store
    localStorage["color game"] = JSON.stringify(local_data)
  }

}
function triggerWinLoseGame() {
  let timer =
    getElement("timer_text").innerText != "--s"
      ? parseFloat(getElement("timer_text").innerText)
      : null;
  let min_score = parseInt(getElement("min_score_text").innerText);
  let score = parseInt(getElement("score_text").innerText);

  if (timer != null && timer <= 0 && score < min_score) {
    lose_flag = true;
  } else {
    if (timer == null && score >= min_score && !lose_flag) {
      win_flag = true;
    }
    if (timer != null && score >= min_score && !lose_flag) {
      win_flag = true;
      player.slow_time = 0
    }
  }

  if (lose_flag) {
    //create lose menu
    buttons_menu_state = "loose";
    //to be ready for menu buttons to get pressed
    is_pressing_key = false
  }
  if (win_flag) {
    //create win menu
    buttons_menu_state = "win";
    //save winning score
    saveWinningScore()
    //to be ready for menu buttons to get pressed
    is_pressing_key = false
  }
}

function updateGameTimer(delta) {
  if (
    getElement("timer_text").innerText != "--s" &&
    first_user_interaction_global
  ) {
    let number = Math.max(
      parseFloat(getElement("timer_text").innerText) - delta,
      0.0
    );

    getElement("timer_text").innerText = `${number.toFixed(3)}s`;
  }
}
let lastTimestamp = 0;
const targetFps = 60;
const frameDelay = 1000 / targetFps;
function main(timestamp) {

  if (finish_loading_global_vars && getElement("timer_text") != undefined && player.animation != undefined) {
    // Calculate the time difference since the last frame
    const deltaTime = timestamp - lastTimestamp;

    // Check if enough time has passed to render the next frame
    if (deltaTime >= frameDelay) {
      // Your animation/rendering code here
      if (!time) {
        time = timestamp;
      }

      dt = (timestamp - time) * 1e-3;
      real_time += dt;

      updateGameTimer(dt * player.slow_time);
      triggerWinLoseGame();
      getElement("game_window").scroll({
        top: player.y - window.innerHeight / 2,
        left: player.x - window.innerWidth / 2,
      });
      //FPS
      //getElement("min_score_text").innerText=(1/dt).toFixed(2)

      player.play();

      for (c in effect_particles) {
        effect_particles[c].play();
      }

      for (c in contact_balls) {
        contact_balls[c].play();
      }
      for (c in point_vectores) {
        point_vectores[c].play();
      }

      for (b in buttons_array) {
        if (buttons_array[b].animation != undefined) {
          buttons_array[b].play();
        }
      }

      cleanUnusedProjectiles();

      time = timestamp //update time var 
      // Update lastTimestamp for the next frame
      lastTimestamp = timestamp - (deltaTime % frameDelay);
    }
  }
  if (game_is_running) {
    requestAnimationFrame(main);
  } else {
    //do nothing...
  }

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
  //dont hibernate screen
  navigator.wakeLock.request('screen');

}
function screenResize() {
  createInputButtons();
  createInGameText();
  createMenuButton();
  createGameStatus();
}
//Player---------------
function trailEffect() {
  const start_trail_speed = 20;
  let max_particles_effect = 30 + ball_size * 0.5;
  let trail_effect_desapear_speed = 1;
  if (
    Math.abs(player.speedx) > start_trail_speed ||
    Math.abs(player.speedy) > start_trail_speed
  ) {
    if (effect_particles.length < max_particles_effect) {
      let obj = new Object();
      //size power part
      let size_increase = 0;
      if (player.size_power_interval > 0) {
        size_increase = player.size_power;
      }
      let true_ball_size = ball_size + size_increase;

      obj.append(
        createCircle(
          player.x,
          player.y,
          true_ball_size,
          "rgb(255,255,255)",
          "player_effect"
        )
      );

      obj.color_vector = player.color_vector;

      paintBall(obj);
      obj.appendAnimation((self) => {
        self.shape.style.width =
          parseFloat(self.shape.style.width) -
          trail_effect_desapear_speed * player.slow_time;
        self.shape.style.height =
          parseFloat(self.shape.style.height) -
          trail_effect_desapear_speed * player.slow_time;
        if (parseInt(self.shape.style.width) <= 1 + size_increase) {
          self.destroy();
        }
      });
      effect_particles.push(obj);
    }
  }
}
function controlPowers(self) {
  //decrease slow time interval
  self.slow_time_interval = Math.max(
    self.slow_time_interval - self.dt * (self.slow_time == 0 ? 0 : 1),
    0
  );
  if (
    self.slow_time_interval <= 0 &&
    self.slow_time < 1 &&
    buttons_menu_state == ""
  ) {
    self.slow_time = 1;
  }
  //size power
  self.size_power_interval = Math.max(
    self.size_power_interval - self.dt * (self.slow_time == 0 ? 0 : 1),
    0
  );
  if (
    self.size_power_interval <= 0 &&
    parseInt(self.shape.style.width) > ball_size
  ) {
    self.shape.style.width = `${parseInt(self.shape.style.width) - self.size_power
      }px`;
    self.shape.style.height = `${parseInt(self.shape.style.height) - self.size_power
      }px`;
    self.width = parseInt(self.shape.style.width);
    self.height = parseInt(self.shape.style.height);
  }
  if (
    self.size_power_interval > 0 &&
    parseInt(self.shape.style.width) < ball_size + self.size_power
  ) {
    self.shape.style.width = `${parseInt(self.shape.style.width) + self.size_power
      }px`;
    self.shape.style.height = `${parseInt(self.shape.style.height) + self.size_power
      }px`;
    self.width = parseInt(self.shape.style.width);
    self.height = parseInt(self.shape.style.height);
  }
  //speed power
  self.speed_power_interval = Math.max(
    self.speed_power_interval - self.dt * (self.slow_time == 0 ? 0 : 1),
    0
  );
  if (self.speed_power_interval <= 0 && self.speed_power > 1) {
    self.speed_power = 1;
    grip_force_global = 12;
  }
}
function handleVisibilityChange() {
  if (document.hidden) {
    // The page is not visible
    player.old_slow_time = player.slow_time
    player.slow_time = 0;
    buttons_menu_state = "menu";
    player.old_speedx = player.speedx;
    player.old_speedy = player.speedy;

    player.speedx = 0;
    player.speedy = 0;
  } else {
    // The page is visible
    //do nothing
  }
}
function destroyGame() {
  //stop main from running
  game_is_running = false
  //delete page
  getElement("game_window").innerHTML = ""
  //initializa variables like in the beggining
  real_time = 0;
  time = new Date().getTime();
  dt = 0;
  offset = 100000;

  player = new Object();
  finish_loading_global_vars = false;
  button_tutorial_done = false


  ball_size;
  player_position_x;
  player_position_y;

  contact_balls = [];
  colliders = [];
  point_vectores = [];
  effect_particles = [];
  buttons_array = [];
  max_map_width = -99999999;
  min_map_width = 99999999;
  max_map_height = -99999999;
  min_map_height = 99999999;
  world_map;
  out_bounderies_error;
  speed_limit;
  // collision_grid_size = 5;
  grip_force_global = 12;
  //configs

  min_score_to_win;
  time_limit_global;
  map_edge_type_global;
  add_powers_global;
  next_level_pointer;

  slow_time_global;
  slow_time_duration_global;

  size_power_global;
  size_power_duration_global;

  speed_power_global;
  speed_power_duration_global;

  blue_color = "rgb(0, 100, 255)",
    red_color = "rgb(255,0,0)",
    green_color = "rgb(0,255,0)",
    yellow_color = "rgb(255,255,0)",
    cyan_color = "rgb(0,255,255)",
    purple_color = "rgb(255,0,255)",
    white_color = "rgb(255,255,255)",
    black_color = "rgb(0,0,0)";

  up = false,
    down = false,
    right = false,
    left = false,
    jump = false,
    red_key = false,
    green_key = false,
    blue_key = false,
    is_pressing_key = false;

  buttons_menu_state = "";
  first_user_interaction_global = false;
  win_flag = false;
  lose_flag = false;
}
function reloadGame() {
  //destroy every thing
  destroyGame()
  //recreate game
  //initScrollablePage();
  initGloabalVars()
  init()
  //run game again
  game_is_running = true
  //doing this because click in buttons puts this flag is_pressing_key a true
  setTimeout(() => { is_pressing_key = false }, 100)
}

function fullScreenQuestion(state) {
  if (state == "start") {
    let div = document.createElement("div")
    div.id = "fullScreenQuestion"
    div.style.position = "absolute"
    div.style.backgroundColor = "rgb(0,0,0)"
    div.style.width = "100%"
    div.style.height = "100%"
    div.style.color = "white"
    div.style["z-index"] = 2000
    div.style["fontFamily"] = "Arial, sans-serif"
    div.style.fontSize = "x-Large"
    div.innerHTML = "<h1 >Click to Enter Full Screen</h1>"
    div.style.textAlign = "center"
    div.style.display = "flex"
    div.style["justify-content"] = "center"
    div.style["align-items"] = "center"
    div.style.top = "0px"
    div.style.left = "0px"
    div.addEventListener("click", () => { fullScreenQuestion("delete") })
    document.body.appendChild(div)
  } else {
    let el = getElement("fullScreenQuestion")
    el.parentElement.removeChild(el)

  }


}



//Main --------
document.body.addEventListener("click", fullscreen);
window.addEventListener("resize", screenResize);
document.addEventListener("visibilitychange", handleVisibilityChange);

initScrollablePage();
initGloabalVars();
init();
main();
fullScreenQuestion("start")
