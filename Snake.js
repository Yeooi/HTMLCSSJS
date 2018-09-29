function Draw()
  {
    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(foodCurrentX,foodCurrentY,20,20);
    for(var j=0;j<snakeSize;j++)
    {
      ctx.fillStyle = "#009900";
      ctx.fillRect(snake[j].x,snake[j].y,20,20);
    }
    ctx.fillStyle = "#007700";
    ctx.fillRect(snakeHeadCurrentX,snakeHeadCurrentY,20,20);
  }

  function Update()
  {
    CheckCollision();
    UpdateSnakeBody();
    UpdateSnakeHead();
    Draw();
    document.getElementById("score").innerHTML = "Snake Length : "+ (snakeSize+1);
  }


  function RunGame(speed)
  {
      if(typeof loop_game !== "undefined")
      clearInterval(loop_game);

      loop_game = setInterval(Update, speed);
  }

  function SetDirection(event)
  {
    switch(event.key)
    {
      case "w" : 	if(direction == "down"){}
                  else{direction = "up";}
                  break;
      case "s" : 	if(direction == "up"){}
                  else{direction = "down";}
                  break;
      case "a" : 	if(direction == "right"){}
                  else{direction = "left";}
                  break;
      case "d" : 	if(direction == "left"){}
                  else{direction = "right";}
                  break;
    }
  }

  function UpdateSnakeHead()
  {
    if(direction == "down")
    {
      snakeHeadCurrentY+=20;
    }
    else if(direction == "up")
    {
      snakeHeadCurrentY-=20;
    }
    else if(direction == "left")
    {
      snakeHeadCurrentX-=20;
    }
    else if(direction == "right")
    {
      snakeHeadCurrentX+=20;
    }

    //move snake when out of bounds
    /*
    if(snakeHeadCurrentY>480)
    {
      snakeHeadCurrentY=0;
    }
    else if(snakeHeadCurrentY<0)
    {
      snakeHeadCurrentY=480;
    }
    else if(snakeHeadCurrentX>480)
    {
      snakeHeadCurrentX=0;
    }
    else if(snakeHeadCurrentX<0)
    {
      snakeHeadCurrentX=480;
    }
    */

    if(snakeHeadCurrentY>480 || snakeHeadCurrentY < 0 || snakeHeadCurrentX > 480 || snakeHeadCurrentX <0)
    {
      GameOver();
    }
  }

  function UpdateFoodPos()
  {
    foodCurrentX= (Math.floor((Math.random() * 24) + 1)) * 20;
    foodCurrentY=	(Math.floor((Math.random() * 24) + 1)) * 20;
  }

  function UpdateSnakeBody()
  {
    for(var i=0;i<snakeSize;i++)
    {
      if(i==snakeSize-1)
      {
        snake[i].x = snakeHeadCurrentX;
        snake[i].y = snakeHeadCurrentY
      }
      else
      {
        snake[i].x = snake[i+1].x;
        snake[i].y = snake[i+1].y;
      }
    }
  }

  function AddSnakeBody()
  {
    snake.unshift({x:0,y:0});
    snakeSize++;
  }

  function RemoveSnakeBody(i)
  {
    for(var j=0;j<i;j++)
    {
      snake.shift();
      snakeSize--;
      gamespeed = gamespeed*1.25;
      RunGame(gamespeed);
    }
  }

  //temporary
  function GameOver()
  {
    location.reload();
  }

  function CheckCollision()
  {
    //check collision with food
    if(foodCurrentX==snakeHeadCurrentX && foodCurrentY==snakeHeadCurrentY)
    {
      AddSnakeBody();
      UpdateFoodPos();
      gamespeed = gamespeed/1.25;
      RunGame(gamespeed);
    }
    else
    {
      for(var i = 0; i<snake.length;i++)
      {
        if(snake[i].x==snakeHeadCurrentX && snake[i].y==snakeHeadCurrentY)
        {
          RemoveSnakeBody(i+1);
          return true;
        }
      }
      return false;
    }
  }
