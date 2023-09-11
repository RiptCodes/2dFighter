const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

// canvas settings
canvas.width = 1024
canvas.height = 576

const gravity = 0.7

c.fillRect(0, 0, canvas.width, canvas.height)

// creating a background
const background = new Sprite({
position: {
  x: 0,
  y: 0
},
imageSrc: './img/background.png'
})

// creating a shop in the background
const shop = new Sprite({
  position: {
    x: 470,
    y: 0
  },
  imageSrc: "./img/shop.png",
  scale: 2.75,
  framesMax: 6
})


// creating a player and enemy

const player = new Fighter({
  position: {
    x: 0,
    y: 0
  },
  velocity: {
    x: 0,
    y: 10
  },
  offset: {
    x: 0,
    y: 0
  }
})


const enemy = new Fighter({
  position: {
    x: 400,
    y: 100
  },
  velocity: {
    x: 0,
    y: 10
  },
  color: 'blue',
  offset: {
    x: -50,
    y: 0
  }

})


decreaseTimer()

console.log(player)
console.log(enemy)
console.log("\n")

const keys = {
  //player keys
  a: {
    pressed: false
  },
  d: {
    pressed: false
  },
  w: {
    pressed: false
  },
  //enemy keys
  ArrowUp: {
    pressed: false
  },
  ArrowLeft: {
    pressed: false
  },
  ArrowRight: {
    pressed: false
  }
}



function animate() {
  window.requestAnimationFrame(animate)
  c.fillStyle = "black"
  c.fillRect(0, 0, canvas.width, canvas.height)
  background.update()
  shop.update()
  player.update()
  enemy.update()
  player.velocity.x = 0
  enemy.velocity.x = 0

  //player movement
  if (keys.a.pressed && player.lastKey === 'a') {
    player.velocity.x = -5
  } else if (keys.d.pressed && player.lastKey === 'd') {
    player.velocity.x = 5
  }
  //enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === 'ArrowLeft') {
    enemy.velocity.x = -5
  } else if (keys.ArrowRight.pressed && enemy.lastKey === 'ArrowRight') {
    enemy.velocity.x = 5
  }

  //detect for collisions
  if (rectangularCollision({
      rectangle1: player,
      rectangle2: enemy
    }) &&
    player.isAttacking) {
      player.isAttacking = false
      enemy.health -= 20
      document.querySelector("#enemyHealth").style.width = enemy.health + "%"
    console.log("player attacked")
  }

  if (rectangularCollision({
      rectangle1: enemy,
      rectangle2: player
    }) &&
    enemy.isAttacking) {
      enemy.isAttacking = false
      player.health -= 20
      document.querySelector("#playerHealth").style.width = player.health + "%"

    console.log("enemy attacked")
  }

  if(enemy.health <= 0 || player.health <= 0){
    determineWinner({player, enemy, timerID})
  }
}
animate()



window.addEventListener("keydown", (event) => {
  //player keys
  switch (event.key) {
    case 'd':
      player.lastKey = 'd'
      keys.d.pressed = true

      break;

    case 'a':
      player.lastKey = 'a'
      keys.a.pressed = true
      break;

    case 'w':
      player.velocity.y = -20

      break;

    case ' ':
      player.attack()
      break;

    case 'ArrowDown':
      enemy.attack()
      break;


  }

  //enemy keys
  switch (event.key) {
    case 'ArrowRight':
      enemy.lastKey = 'ArrowRight'
      keys.ArrowRight.pressed = true


      break;
    case 'ArrowLeft':
      enemy.lastKey = 'ArrowLeft'
      keys.ArrowLeft.pressed = true


      break;
    case 'ArrowUp':
      enemy.velocity.y = -20

      break;
  }

})
window.addEventListener("keyup", (event) => {
  //player keys
  switch (event.key) {
    case 'd':

      keys.d.pressed = false

      break;

    case 'a':
      keys.a.pressed = false

      break;

    case 'w':
      keys.w.pressed = false

      break;

    case 'b':
      keys.b.pressed = false
      break;

  }
  //enemy keys
  switch (event.key) {
    case 'ArrowRight':

      keys.ArrowRight.pressed = false

      break;

    case 'ArrowLeft':
      keys.ArrowLeft.pressed = false

      break;

    case 'ArrowUp':
      keys.ArrowUp.pressed = false


  }
})
