//This section declares variables to be used

//Variables for game board size
var w = 500;
var h = 500;

//Variables for player position
var playerX=50;
var playerY=50;

//Variables for player pointer/gun
var pointerX=playerX+20;
var pointerY=playerY;

//varbles for bullets
var maxBullets = 5;
var bullets = new Array (maxBullets);

//variables for enemies
var maxEnemies = 5;
var enemies = new Array (maxEnemies);

//varibles for misc
var gamespeed = 1;
var direction = 'right';

  //This function draws all objects on screen
  function Draw()
  {
    //clear game board before drawing again
    ctx.clearRect(0, 0, w, h);

    //draw player
    ctx.fillStyle = "#000000";
    ctx.fillRect(playerX,playerY,20,20);

    //draw pointer/gun
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(pointerX,pointerY,10,10);

    //draw bullets
    for(var i=0;i<bullets.length;i++)
    {
      //if bullet direction is null, dont draw it
      if(bullets[i].direction != "null")
      {
        ctx.fillStyle = "#0000FF";
        ctx.fillRect(bullets[i].x,bullets[i].y,10,10);
      }
    }

    //draw enemies
    for(var i=0;i<bullets.length;i++)
    {
      //if enemy alive is false, dont draw it
      if(enemies[i].alive == true)
      {
        ctx.fillStyle = "#00FF00";
        ctx.fillRect(enemies[i].x,enemies[i].y,20,20);
      }
    }
  }

  //This function runs every frame to update the game
  function Update()
  {
    EnemySpawner();
    UpdatePlayerPos();
    CheckOutOfBounds();
    CheckCollision();
    Draw();
  }

  //This function is used to initialise objects and values
  function Init()
  {
    for(var i=0;i<bullets.length;i++)
    {
      //on initialise set bullets position and direction
      bullets[i] = {x:1,y:1,direction:"null"};
    }

    for(var i=0;i<enemies.length;i++)
    {
      //on initialise set bullets position and direction
      enemies[i] = {x:1,y:1,alive:false};
    }
  }

  //this function runs the game at certain interval
  function RunGame(speed)
  {
      //check if game is currently running
      if(typeof loop_game !== "undefined")
      {
        //if game is running clear current
        clearInterval(loop_game);
      }

      //using setInterval run update function at a set interval.
      //store in loop_game for checking if game is running
      loop_game = setInterval(Update, speed);
  }

  //get keydown event to check for actions
  //do things accodingly to action
  function getMovement(event)
  {
    switch(event.key)
    {
      case "w" : 	playerY-=4;
                  direction='up';
                  break;
      case "s" : 	playerY+=4;
                  direction='down';
                  break;
      case "a" : 	playerX-=4;
                  direction='left';
                  break;
      case "d" : 	playerX+=4;
                  direction='right';
                  break;
      case "f" :  Shoot();
                  break;
    }
  }

  //update position of player and other player related objects
  function UpdatePlayerPos()
  {
    //update position of pointer/gun according to player position
    if(direction=='right')
    {
      pointerX = playerX+20;
      pointerY = playerY;
    }
    else if(direction=='left')
    {
      pointerX = playerX-10;
      pointerY = playerY;
    }
    else if(direction=='up')
    {
      pointerX = playerX;
      pointerY = playerY-10;
    }
    else if(direction=='down')
    {
      pointerX = playerX;
      pointerY = playerY+20;
    }

    //update position of bullets
    for(var i=0;i<bullets.length;i++)
    {
      //if bullet direction is null, dont do anything
      if(bullets[i].direction != "null")
      {
        if(bullets[i].direction=='right')
        {
          bullets[i].x+=1;
        }
        else if(bullets[i].direction=='left')
        {
          bullets[i].x-=1;
        }
        else if(bullets[i].direction=='up')
        {
          bullets[i].y-=1;
        }
        else if(bullets[i].direction=='down')
        {
          bullets[i].y+=1;
        }
      }
    }
  }

  function Shoot()
  {
    for(var j=0;j<bullets.length;j++)
    {
      //if bullet is not doing anything(not already shot), shoot bullet
      if(bullets[j].direction == "null")
      {
        bullets[j].x = pointerX;
        bullets[j].y = pointerY;
        bullets[j].direction = direction;
        break;
      }
    }


  }

  function CheckCollision()
  {
    //for each enemy, check if c[0ollide with player or bullet
    /*enenmies.forEach((enemy) => {

    })[

    ]
    enemies.forEach(function(enemy) {

    })
    for (const enemy of enemies)*/
    for(var i =0;i<enemies.length;i++)
    {
      if(enemies[i].alive == true)
      {
        for(var j =0;j<bullets.length;j++)
        {
          if(bullets[j].x > enemies[i].x && bullets[j].x < enemies[i].x + 20 && bullets[j].y > enemies[i].y && bullets[j].y < enemies[i].y+20)
          {
            enemies[i].alive = false;
            bullets[j].direction = "null";
          }
        }
      }
    }
  }

  function EnemySpawner()
  {
    for(var i=0;i<enemies.length;i++)
    {
      if(enemies[i].alive == false)
      {
        enemies[i].alive = true;
        do
        {
          enemies[i].x= (Math.floor((Math.random() * 24) + 1)) * 20;
          enemies[i].y=	(Math.floor((Math.random() * 24) + 1)) * 20;
        } while (enemies[i].x == playerX || enemies[i].y == playerY);
      }
    }
  }

  function CheckOutOfBounds()
  {
    //check if bullet out of bound, if out of bound, disable bullet
    for(var i=0;i<bullets.length;i++)
    {
      if((bullets[i].x > 480) || (bullets[i].x < 0)|| (bullets[i].y > 480) || (bullets[i].y < 0))
      {
        bullets[i].x = 0;
        bullets[i].y = 0;
        bullets[i].direction = 'null';
      }
    }

    //check if player out of bound, if out of bound, reset player position to within boundary
    if(playerX > 480)
    {
      playerX = 480;
    }
    else if(playerX < 0)
    {
      playerX = 0;
    }
    else if(playerY > 480)
    {
      playerY = 480;
    }
    else if(playerY < 0)
    {
      playerY = 0;
    }
  }
