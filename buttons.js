
//=====================================================================
// Classes
//---------------------------------------------------------------------

//Note: Button Class methods MUST be run within the context of a p5.js function
class Button {
  constructor(x,y,w,h,label){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
    this.label = label
    this.NORMAL_COLOR = `#eca`
    this.HOVER_COLOR = `#fff`
    this.CLICK_COLOR = `#c81`
    this.on_click = null
    this.label_size = 20
  }
  //Setter methods
  setRect(x,y,w,h){
    this.x = x
    this.y = y
    this.w = w
    this.h = h
  }

  setLabel(label){
    this.label = label
  }

  setFunction(func){
    this.on_click = func
  }
  
  //Returns whether mouse is within the button boundaries
  // [*] Center the hitbox for the button
  hasMouse(){
    if(this.x-this.w*0.5<=mouseX && mouseX<=this.x+this.w*0.5 && this.y-this.h*0.5<=mouseY&&mouseY<=this.y+this.h*0.5){
    return true
    }
    else{
      return false
    }
  }

  // [] Write a method that will run the on_click function when the button is clicked
  // (this will actually have to be called from the mouseClick() p5.js function)
  handleClick(){
    if(this.hasMouse()){
      this.on_click()
    }
  }
  
  //Draw Method
  draw(){
    push()//Save old Graphics Settings
    //Draw the button
    fill(this.NORMAL_COLOR)
    if(this.hasMouse()){
      fill(this.HOVER_COLOR)
      if(mouseIsPressed){
        fill(this.CLICK_COLOR)
      }
    }
    rectMode(CENTER)
    rect(this.x,this.y,this.w,this.h)
    //Draw the text
    fill(0)
    textSize(this.label_size)
    textAlign(CENTER,CENTER)
    text(this.label,this.x,this.y)
    pop()//Restore old graphics settings
  }

}
//=====================================================================