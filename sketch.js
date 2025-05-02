let capture;
let graphics;

function setup() {
  // 設定畫布為全螢幕大小
  createCanvas(windowWidth, windowHeight);
  // 設定背景顏色為 #ffd500
  background('#ffd500');

  // 初始化攝影機擷取
  capture = createCapture(VIDEO);
  capture.size(windowWidth * 0.8, windowHeight * 0.8); // 設定影像大小為視窗的 80%
  capture.hide(); // 隱藏原始的攝影機影像

  // 建立與視訊畫面相同大小的 graphics
  graphics = createGraphics(capture.width, capture.height);
}

function draw() {
  // 清除畫布並重新設定背景顏色
  background('#ffd500');

  // 計算影像顯示位置 (置中)
  let x = (width - capture.width) / 2;
  let y = (height - capture.height) / 2;

  // 更新 graphics 的內容
  graphics.background(0); // 設定背景為黑色
  for (let i = 0; i < capture.width; i += 20) {
    for (let j = 0; j < capture.height; j += 20) {
      // 從 capture 中取得顏色
      let col = capture.get(i, j);
      graphics.fill(col);
      graphics.noStroke();
      graphics.ellipse(i + 10, j + 10, 15, 15); // 繪製圓，中心點偏移 10
    }
  }

  // 顯示 graphics 在視訊畫面上方
  image(graphics, x, y - capture.height); // 顯示 graphics 在視訊畫面上方

  // 翻轉影像左右顛倒
  push();
  translate(x + capture.width, y); // 移動到影像右上角
  scale(-1, 1); // 水平翻轉影像
  image(capture, 0, 0, capture.width, capture.height);
  pop();
}

function windowResized() {
  // 當視窗大小改變時，重新調整畫布大小
  resizeCanvas(windowWidth, windowHeight);
  capture.size(windowWidth * 0.8, windowHeight * 0.8);

  // 重新調整 graphics 大小
  graphics = createGraphics(capture.width, capture.height);
}
