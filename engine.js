function getElement(id) {
  return document.getElementById(id);
}
function createElement(type) {
  return document.createElement(type);
}
function createText(text_in = "", style = "") {
  var text = createElement("p");
  text.innerText = text_in;
  text.setAttribute("style", style);
  return text;
}
function createCircle(x, y, radius, color, id) {
  var circle = createElement("div");
  if (id != "" || id != null) {
    circle.setAttribute("id", id);
  }
  circle.setAttribute(
    "style",
    `left:${x}px;top:${y}px;width:${radius}px;height:${radius}px;background-color:${color};position:absolute;border-radius:50%`
  );
  return circle;
}
function createDiffCircle(x, y, radiusx, radiusy, color, id) {
  var circle = createElement("div");
  if (id != "" || id != null) {
    circle.setAttribute("id", id);
  }
  circle.setAttribute(
    "style",
    `left:${x}px;top:${y}px;width:${radiusx};height:${radiusy};background-color:${color};position:absolute;border-radius:50%`
  );
  return circle;
}

function createSmile(x, y, radius, color, id) {
  var circle = createElement("div");
  circle.setAttribute(
    "style",
    `left:${x}px;top:${y}px;width:${radius};height:${radius};border:solid 8px ${color};border-color:transparent transparent ${color} transparent;border-radius:50%;position:absolute;`
  );
  circle.setAttribute("id", id);

  return circle;
}

function createHotDog(x, y, width, height, color, id) {
  var square = createElement("div");
  square.setAttribute(
    "style",
    `left:${x}px;top:${y}px;width:${width};height:${height};background-color:${color};position:absolute;border-radius:25px`
  );
  if (id != "" || id != null) {
    square.setAttribute("id", id);
  }

  return square;
}

function createSquare(x, y, width, height, color, id) {
  var square = createElement("div");
  square.setAttribute(
    "style",
    `left:${x}px;top:${y}px;width:${width}px;height:${height}px;background-color:${color};position:absolute;`
  );
  if (id != "" || id != null) {
    square.setAttribute("id", id);
  }

  return square;
}

function createTriangle(x, y, leftw, rightw, height, color, id) {
  var triangle = createElement("div");
  triangle.setAttribute(
    "style",
    `left:${x}px;top:${y}px;width:0px;height:0px;position:absolute;border-left: ${leftw}px solid transparent;border-right:${rightw}px solid transparent;border-bottom:${height}px solid ${color}`
  );
  if (id != "" || id != null) {
    triangle.setAttribute("id", id);
  }

  return triangle;
}
function linear_motion(start_pos, final_pos, real_time, duration) {
  let delta = (final_pos - start_pos) / duration;
  return delta * (real_time % duration) + start_pos;
}
function step(t, placement, size) {
  if (t >= placement && t <= placement + size) {
    return 1;
  } else {
    return 0;
  }
}
function rect(real_time, t) {
  if (real_time > t) {
    return true;
  } else {
    return false;
  }
}
function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s * 100, l * 100];
}
function hslToRgb(h, s, l) {
  h /= 360; // Normalize hue to the range [0, 1]
  s /= 100; // Normalize saturation to the range [0, 1]
  l /= 100; // Normalize lightness to the range [0, 1]

  let r, g, b;

  if (s === 0) {
      r = g = b = l; // Grayscale
  } else {
      const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
      };

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1 / 3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1 / 3);
  }

  // Convert to RGB values in the range [0, 255]
  r = Math.round(r * 255);
  g = Math.round(g * 255);
  b = Math.round(b * 255);

  return [r, g, b];
}

function parseRgb(element) {
  if (element.style.backgroundColor.split("(")[1].split(",").length == 3) {
    let r = element.style.backgroundColor.split("(")[1].split(",")[0];
    let g = element.style.backgroundColor.split("(")[1].split(",")[1];
    let b = element.style.backgroundColor
      .split("(")[1]
      .split(",")[2]
      .replace(")", "");

    return [r, g, b, 1];
  } else {
    let r = element.style.backgroundColor.split("(")[1].split(",")[0];
    let g = element.style.backgroundColor.split("(")[1].split(",")[1];
    let b = element.style.backgroundColor.split("(")[1].split(",")[2];
    let a = element.style.backgroundColor
      .split("(")[1]
      .split(",")[3]
      .replace(")", "");

    return [r, g, b, a];
  }
}
function initScrollablePage(){
  
  document.body.style.overflow = "hidden";
  document.body.style.height = window.innerHeight;
  document.body.style.width = window.innerWidth;
  document.body.style["touchAction"] = "manipulation";
  //create scrollable div
  let scrollable_content = document.createElement("div");
  scrollable_content.id = "game_window";
  scrollable_content.style.width = "100%";
  scrollable_content.style.height = "100%";
  scrollable_content.style.overflow = "hidden";
  scrollable_content.style.position = "absolute";
  scrollable_content.style.margin = 0;
  scrollable_content.style.top = 0;
  scrollable_content.style.left = 0;
  scrollable_content.style["user-select"] = "none";
  document.body.appendChild(scrollable_content);
}


class Object {
  /*
  This object has two elements
  - shape
  - animtion
  - color=[h,s,l]
  */
  constructor(id) {
    //this.shape=createElement("div")
    //this.animation=some_lambda
    //this.x=style.left
    //this.y=style.top
    this.up = false;
    this.down = false;
    this.left = false;
    this.right = false;
    this.angle = 0;
    this.speedx = 0;
    this.speedy = 0;
    this.dt = 0;
    this.options = {};
    this.anchor_ballx = 0;
    this.anchor_bally = 0;
    this.attraction = 0;
    this.id=id
  }
  getElement() {
    return this.shape;
  }
  show() {
    getElement("game_window").appendChild(this.shape);
    return this;
  }
  appendChild(element) {
    this.shape.appendChild(element);
    this.show();
    return this;
  }
  append(element) {
    this.shape = element;
    this.real_time = 0;
    this.star_time = new Date().getTime();
    this.x = parseInt(element.style.left);
    this.y = parseInt(element.style.top);
    this.width = parseInt(element.style.width);
    this.height = parseInt(element.style.height);
    let rgb = parseRgb(element);
    this.color = rgbToHsl(rgb[0], rgb[1], rgb[2]);
    this.color[3] = 1;
    this.is_destroyed = false;
    this.show();
    return this;
  }
  destroy() {
    this.shape.remove();
    this.is_destroyed = true;
  }

  move(x, y) {
    this.updateRealTime();
    this.shape.style.left = `${x}px`;
    this.shape.style.top = `${y}px`;
    this.x = x;
    this.y = y;
    this.updateStartTime();
  }
  rotate(angle) {
    this.updateRealTime();
    this.shape.style.transform = `rotate(${angle}deg)`;
    this.angle = angle;
    this.updateStartTime();
  }
  getAngle() {
    return this.angle;
  }
  updateRealTime() {
    this.dt = (new Date().getTime() - this.star_time) * 1e-3;
    this.real_time += this.dt;
  }
  updateStartTime() {
    this.star_time = new Date().getTime();
  }
  velocity(end_value, actual_value, animation_time) {
    var delta = (end_value - actual_value) / animation_time;
    let new_pos = delta * this.real_time + actual_value;

    return new_pos;
  }
  getColor() {
    let rgb = parseRgb(this.shape);
    if (rgb.length == 3) {
      return rgbToHsl(rgb[0], rgb[1], rgb[2], 1);
    }
    if (rgb.length == 4){
        return rgbToHsl(rgb[0], rgb[1], rgb[2], rgb[3]);
    }
  }
  setColor(hsla) {
    this.updateRealTime();
    let shape = this.shape;
    this.color = hsla;
    shape.style.backgroundColor = `hsla(${this.color[0]},${this.color[1]}%,${this.color[2]}%,${this.color[3]})`;
    this.updateStartTime();
  }
  velocityMove(speedx, speedy) {
    let new_x = this.x + speedx;
    let new_y = this.y + speedy;
    this.move(new_x, new_y);
    //return {"x":new_x,"y":new_y}
  }
  goToPosition(xi, yi, xf, yf, animation_time) {
    let new_x = this.velocity(xf, xi, animation_time);
    let new_y = this.velocity(yf, yi, animation_time);
    if (
      Math.abs(this.x - xf) <= this.width / animation_time &&
      Math.abs(this.y - yf) <= this.height / animation_time
    ) {
      //pass
    } else {
      this.move(new_x, new_y);
    }
  }
  rotateVel(init_angle, final_angle, real_time, animation_time) {
    let new_angle = this.velocity(
      final_angle,
      init_angle,
      real_time,
      animation_time
    );
    this.rotate(new_angle);
  }
  rotateAcc(final_angle, real_time, animation_time) {
    let new_angle = this.velocity(
      final_angle,
      this.angle,
      real_time,
      animation_time
    );
    this.rotate(new_angle);
  }
  accelarationMove(xf, yf, real_time, animation_time) {
    let new_x = this.velocity(
      xf,
      parseInt(this.shape.style.left),
      real_time,
      animation_time
    );
    let new_y = this.velocity(
      yf,
      parseInt(this.shape.style.top),
      real_time,
      animation_time
    );
    this.move(new_x, new_y);
  }
  appendAnimation(animation) {
    this.animation = animation;
    return this;
  }
  play(time) {
    this.animation(this);
  }
}

class AnimationObject {
  constructor() {
    //this.state_machine=state_machine
    this.objects = [];

    //this.state_machine.start()
  }
}
