// Get the hostname of the current website
const site = window.location.hostname;

// Function to dynamically add custom CSS
const addCustomStyle = css => document.head.appendChild(document.createElement("style")).innerHTML = css;

// Function to create a custom HTML element
function createCustomElement(tag, attr_tag, attr_name, value) {
  const custom_element = document.createElement(tag);
  custom_element.setAttribute(attr_tag, attr_name);
  custom_element.innerHTML = value;
  document.body.append(custom_element);
}

// Create a link element for linking the style.css file
const linkElement = document.createElement('link');
linkElement.rel = 'stylesheet';
linkElement.href = chrome.runtime.getURL('style.css');
document.head.appendChild(linkElement);

// JavaScript codes for TankTrouble
if (site.includes("tanktrouble.com")) {
   addCustomStyle(`
    @font-face {
        font-family: 'TankTrouble';
        src: url('fonts/Classic_TankTrouble_font.ttf')
    }
    .snippet {
        background: linear-gradient(to bottom, #fff, #fff);
        border: #333 2px solid;
        box-shadow: 0 3px 4px 0 rgba(0,0,0, .5)
    }
    .forum .bubble {
        background-color: #f2f2f2;
        border: #333 2px solid;
        font-family: 'TankTroubleClassic';
        box-shadow: 0 3px 4px 0 rgba(0,0,0, .5)
    }
    .body {
        font-family: 'TankTroubleClassic';
        font-size: 14px;
    }
    .forum .tank {
        font-family: 'TankTrouble';
        font-size: 14px;
    }
    .box .content {
        background: #c7c7c7;
        border-radius: 0px;
        border: #999 3px solid;
        padding: 5px;
     }  
     `);

  // Classic Mouse code
  MouseInputManager.method('update', function() {
    this._super();
    const game = GameManager.getGame();
    if (game) {
      let forwardState = false;
      const backState = false;
      const leftState = [];
      const rightState = [];
      let fireState = false;
      
      const gameBounds = game.scale.bounds;
      const gameScale = game.scale.scaleFactor;
      this.mouseX = (MouseInputManager.mousePageX - gameBounds.x) * gameScale.x;
      this.mouseY = (MouseInputManager.mousePageY - gameBounds.y) * gameScale.y;
      
      if (game.input.enabled && MouseInputManager.mouseActivated) {
        if (game.state.getCurrentState().getTankSprite) {
          const tankSprite = game.state.getCurrentState().getTankSprite(this.playerId);
          if (tankSprite) {
            const relativeToTank = tankSprite.toLocal(new Phaser.Point(this.mouseX, this.mouseY));
            const angle = Phaser.Math.angleBetween(0, 0, relativeToTank.x, relativeToTank.y);
            const distance = Math.abs((angle / Math.PI) + 0.5);
            
            const rotationSpeedMultiplier = distance > 0.1
              ? Math.max(Math.min(distance * 12, 4), 1)
              : 1;
            
            leftState.push(angle + (Math.PI * 0.5) < -UIConstants.CLASSIC_MOUSE_INPUT.ROTATION_DEAD_ANGLE, rotationSpeedMultiplier);
            rightState.push(angle + (Math.PI * 0.5) > UIConstants.CLASSIC_MOUSE_INPUT.ROTATION_DEAD_ANGLE, rotationSpeedMultiplier);
            
            forwardState = relativeToTank.getMagnitude() > UIConstants.CLASSIC_MOUSE_INPUT.POSITION_DEAD_DISTANCE / UIConstants.GAME_ASSET_SCALE;
            
            fireState ||= KeyboardInputManager.leftMouseDown || game.input.mousePointer.leftButton.isDown;
          }
        }
      }
      
      let stateChanged = false;
      stateChanged ||= this.storedStates.forward !== forwardState;
      stateChanged ||= this.storedStates.fire !== fireState;
      stateChanged ||= !leftState.every((el, i) => this.storedStates.left[i] === el);
      stateChanged ||= !rightState.every((el, i) => this.storedStates.right[i] === el);
      
      const gameController = GameManager.getGameController();
      if (stateChanged && gameController) {
        const inputState = InputState.withState(this.playerId, forwardState, backState, leftState, rightState, fireState);
        gameController.setInputState(inputState);
      }
      
      this.storedStates.forward = forwardState;
      this.storedStates.back = backState;
      this.storedStates.left = leftState;
      this.storedStates.right = rightState;
      this.storedStates.fire = fireState;
    }
  });

  Tank.method('setTankState', function(tankState) {
    this.playerId = tankState.getPlayerId();
    this.x = tankState.getX();
    this.y = tankState.getY();
    this.forward = tankState.getForward();
    this.back = tankState.getBack();
    this.rotation = tankState.getRotation();
    this.fireDown = tankState.getFireDown();
    this.locked = tankState.getLocked();
    
    const left = tankState.getLeft();
    const right = tankState.getRight();
    [this.left, this.rotationSpeedMultiplier] = Array.isArray(left) ? left : [left, 1.0];
    [this.right, this.rotationSpeedMultiplier] = Array.isArray(right) ? right : [right, 1.0];
    
    if (this.b2dbody) {
      this.b2dbody.SetPosition(Box2D.Common.Math.b2Vec2.Make(this.x, this.y));
      this.b2dbody.SetAngle(this.rotation);
      
      this.update();
    }
  });

  Tank.method('update', function() {
    this.x = this.b2dbody.GetPosition().x;
    this.y = this.b2dbody.GetPosition().y;
    this.rotation = this.b2dbody.GetAngle();
    if (this.locked) {
      this.b2dbody.SetLinearVelocity(Box2D.Common.Math.b2Vec2.Make(0.0, 0.0));
      this.b2dbody.SetAngularVelocity(0.0);
    } else {
      this._computeSpeed();
      this._computeRotationSpeed();
      const speedX = Math.sin(this.rotation) * this.speed;
      const speedY = -Math.cos(this.rotation) * this.speed;
      this.b2dbody.SetLinearVelocity(Box2D.Common.Math.b2Vec2.Make(speedX, speedY));
      this.b2dbody.SetAngularVelocity(this.rotationSpeed * (this.rotationSpeedMultiplier || 1));
    }
  });
}
