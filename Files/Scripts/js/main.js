
const movingStep = 0.01;

let offsetScreenX = 0;
let offsetScreenY = 0;

let keysPressed = new Set();
let eventMoveAnimationId = null;

document.addEventListener('keydown', (event) => {
    keysPressed.add(event.code);

    if (eventMoveAnimationId === null) {
        eventMoveAnimationId = requestAnimationFrame(HandleEventMovement);
    }
});
document.addEventListener('keyup', (event) => {
    keysPressed.delete(event.code);

    if (keysPressed.size === 0) {
        cancelAnimationFrame(eventMoveAnimationId);
        eventMoveAnimationId = null;
    }
});
function HandleEventMovement() {
    if (keysPressed.has('KeyW') || keysPressed.has('ArrowUp')) offsetScreenY -= movingStep;
    if (keysPressed.has('KeyA') || keysPressed.has('ArrowLeft')) offsetScreenX += movingStep;
    if (keysPressed.has('KeyS') || keysPressed.has('ArrowDown')) offsetScreenY += movingStep;
    if (keysPressed.has('KeyD') || keysPressed.has('ArrowRight')) offsetScreenX -= movingStep;

    eventMoveAnimationId = requestAnimationFrame(HandleEventMovement);
}

function render(now) {
    gl.useProgram(program);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLocation, canvas.width, canvas.height);

    const timeInSeconds = now * 0.001;
    gl.uniform1f(timeLocation, timeInSeconds);

    gl.uniform2f(screenOffset, offsetScreenX, offsetScreenY);
    
    gl.drawArrays(gl.TRIANGLES, 0, 6);


    requestAnimationFrame(render);
}
requestAnimationFrame(render);
