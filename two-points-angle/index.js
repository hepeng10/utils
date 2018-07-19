const twoPointsAngle = (x1, y1, x2, y2) => {
    let x = x2 - x1;
    let y = y2 - y1;
    let angle = 360 * Math.atan(x / y) / (2 * Math.PI);
    // 修正角度
    if (x <= 0 && y > 0) {
        angle = Math.abs(angle) + 90;
    }
    if (x > 0 && y >= 0) {
        angle = 90 - angle;
    }
    if (x >= 0 && y < 0) {
        angle = Math.abs(angle) + 270;
    }
    if (x < 0 && y <= 0) {
        angle = 270 - Math.abs(angle);
    }

    return angle;
}

module.exports = twoPointsAngle;