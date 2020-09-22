
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
const redArray = []
var blueArray = []
var greenArray = []
var blackArray = []
var whiteArray = []

var img = new Image();

const canvas = document.querySelector('#myCanvas')
const context = canvas.getContext('2d')

img.addEventListener('load',function() {

    context.drawImage(img,0,0,img.naturalWidth,img.naturalHeight)
    //let t = context.getImageData(25,30,1,1)

    const pixelData = getColor(context,1,1)
    //console.log(pixelData)
    
    getColors(context)
/*
    //set div to color of selected pixel
        const colorDiv = document.querySelector('#myDiv')
        colorDiv.style.background = 'rgba(' + pixelData[0] + ', ' + pixelData[1] +
        ', ' + pixelData[2] + ', ' + (pixelData[3] / 255) + ')';
    
*/
})
img.src = 'regera.jpg'
//==============================================
/*This function gets the RGBA values of specific pixel specified by x,y coordinates */

const getColor = function (context,x,y){
    let t = context.getImageData(x,y,1,1)
    return t.data
}

//===============================================
/* 
    Using this function, we sort all instances of a color into a corresponding color array
        Ex. All instance of red are stored in the red array and so on.
    
        We can than use to graph the occurences of each color and compare to the other colors
        to see which is the dominant color of the image etc.

    This function iterates through each pixel of the image
    and gets the values for each color (RGB) and stores them into corresponding RGB arrays
    for any color value that is 0, it is stored in the blacks array
    
*/
const getColors = function(context){
    var imgData = context.getImageData(0,0,canvas.clientWidth,canvas.height)
    var data = imgData.data
    //console.log(data)

    for(i = 0; i < data.length;i+=4){
        
        var black;

        var red = data[i];
        if(red!= 0){
            redArray.push(red)
        } else {
            black = red
            blackArray.push(black)
        }
        
        var green = data[i+1];
        if(green != 0){
           greenArray.push(green)
        } else {
            black = green;
            blackArray.push(black)
        }
        
        var blue = data[i+2];
        if(blue != 0){
            blueArray.push(blue)
        } else{
            black = blue;
            blackArray.push(black)
        }
        
        var alpha = data[i+3]
    }   
    
    //call to graphing function

    //graph(redArray,greenArray,blueArray,blackArray)
}
//==========================================================
/*
const graph = function(redArray,greenArray,blueArray,blackArray){


    var ctx = document.getElementById('myChart').getContext('2d');
    var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Green', 'black', 'White'],
        datasets: [{
            label: '# Pixels',
            data: [redArray.length, greenArray.length, blueArray.length, blackArray.length, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',  //red
                'rgba(54, 162, 235, 0.2)',  //blue
                'rgba(75, 192, 192, 0.2)',  //green
                'rgba(0, 0, 0, 100)',       //black
                'rgba(220,220,220,0.2)'     //white
                
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',    
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(0,0,0,1)',
                'rgba(200,220,220,1)'
            ],
            borderWidth: 5
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                
                }
            }]
        }
    }
});
    
}

*/

/* 

REFERENCE LINKS:
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images
https://www.w3schools.com/jsref/prop_style_display.asp
https://coderwall.com/p/iyhizq/get-the-pixel-data-of-an-image-in-html 
https://stackoverflow.com/questions/17714742/looping-through-pixels-in-an-image
*/