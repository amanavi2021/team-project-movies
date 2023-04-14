let startY;
let onTouchMoveEnabled = true;

const onTouchStart = (event) => {
  const touch = event.touches[0];
  startY = touch.clientY;
  return onTouchMoveEnabled = true;
}

const onTouchMove = (event) => {
  const touch = event.touches[0];
  const deltaY = touch.clientY - startY;

  // Перевіряємо чи є скрол по вертикалі
  if (Math.abs(deltaY) > 10) {
    onTouchMoveEnabled = false;
  }
  return onTouchMoveEnabled;
}

export default{
  onTouchStart,
  onTouchMove,

}