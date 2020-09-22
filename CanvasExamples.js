
/* Render image in canvas from existing html image element and existing canvas element

-the only issue here might be the default size of the canvas element is too small to fit the picture,
    so it might be better to create the canvas element dynamically here in the script 
*/

/* REMOVE COMMENT TO SHOW
    const img = document.querySelector('#regera')
    img.style.display = "none"
    const canvas = document.querySelector('#myCanvas')
   
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img,0,0,500,500)
*/

//=================================================================

/* Getting image data from image using canvas */


    /*

    var canvas = document.querySelector('#myCanvas')
    var context = canvas.getContext('2d')

    var img = new Image()
   

    img.onload = ()=>{
      context.drawImage(img,0,0,img.naturalWidth,img.naturalHeight)
    }

    img.src = 'regera.jpg'
    console.log(context.getImageData(3,17,10,5))
*/
//===================================================================

/*
REFERENCE LINKS:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
https://www.w3schools.com/jsref/prop_style_display.asp
https://coderwall.com/p/iyhizq/get-the-pixel-data-of-an-image-in-html 
*/
