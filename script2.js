/*  10-5 Update:
    when you upload a new picture its values are being added to the previous images values
        the new is being added to the old.
            Need to find a way to reset the array values before a new image is read

    when trying to get the percent of a color by diviing the color array by the image data,
        i was not considering that the image data array format is RGBA which is 4 values
    
*/

window.onload = () =>{


    let redArray = [];
    let blueArray = [];
    let greenArray= [];
    let alphaArray = [];
    let blackArray = [];
    
   
    var canvas = document.createElement('canvas')
    //var ctx;
    var imageData;
    var myChart;

//=============================================================
    /* Handle file upload */
    const preview = document.querySelector('#preview')
    const submitButton = document.querySelector('#submit-button')
    const reader = new FileReader();
    
    submitButton.addEventListener('click',(e)=>{
       e.preventDefault();
        const file = document.querySelector('input[type="file"]').files[0]
        reader.readAsDataURL(file)
        reader.onload = ()=>{
            const img = new Image();
            img.onload = ()=>{
                
                    
                    imageData = getData(img);
                    
                    console.log("Image data:", imageData)   
                    console.log("image Data length (raw: r,g,b,a): " + imageData.length)
                    console.log("image pixel count (image data / 4): " + (imageData.length / 4 ))
                    
                    //call to getColors
                    getColors(imageData)
                        //console.log("red array length: " + redArray.length)
                        //console.log("Green array length " + greenArray.length)
                        //console.log("blue array length " + blueArray.length);
                        //console.log("black array length " + blackArray.length)

                // call to graph function
                    graph(redArray,greenArray,blueArray,blackArray,imageData)
            }
            img.src = reader.result
            preview.setAttribute('src',img.src)
            
        }
    })
//=============================================================
    /* Handle URL submission */
     const image = document.querySelector('#myImage')
    const getButton = document.querySelector('#get-Button')
    getButton.addEventListener('click',(e)=>{
        e.preventDefault();
        //alert('GET button clicked')

        let url = document.querySelector('#textarea2').value
        //console.log(url)
        
        fetch(url)
        .then(function(response){
            return response.blob();
        }).then(function(blob) {
            const objectURL = URL.createObjectURL(blob)
            image.onload = ()=> {
                imageData = getData(ctx,image)
                console.log("Image data:", imageData) 
            }
            //image.src = objectURL
            document.querySelector('#preview').setAttribute('src',objectURL)
        })
    })
    
//==============================================================
/*Function to get image data using canvas */


    function getData(img){
        canvas.height = img.naturalHeight || img.offsetHeight || img.height;
        canvas.width = img.naturalWidth || img.offsetWidth || img.width;
        height = canvas.height;
        width = canvas.width;
        ctx = canvas.getContext('2d')
        ctx.drawImage(img,0,0)           
        imageData = ctx.getImageData(0,0,img.width,img.height).data
        return imageData;
    }
//==============================================================
const getColors = function(imgData){

     //var imgData = context.getImageData(0,0,canvas.clientWidth,canvas.height)
     //var data = imgData.data
     //console.log(data)
    
    /*RESETTING ARRAYS TO 0 SO THAT OLD VALUES ARE REMOVES AND NOT ADDED 
        TOGETHER WITH NEW IMAGE DATA ON NEW FUNCTION CALL */
    redArray.length = 0;
    greenArray.length = 0;
    blueArray.length = 0;
    alphaArray.length = 0;
    blackArray.length = 0;
   

    data = imgData;

    var blackCount = 0;

    /* IMPORTANT: i+=4 because a single pixel is 0,1,2,3 
        if we are at i = 0 for red value, then we need i+2 to get to blue, and i+3 to take care of the alpha value
    */
    for(i = 0; i < data.length; i+=4){ 
        
      
        var red = data[i];
            //console.log(data[i])
        var green = data[i+1];
            //console.log(green)
        var blue = data[i+2];
           // console.log(blue)
        var alpha = data[i+3];

        if(red == 0){
            blackCount++;
    
        } else {
            redArray.push(1) //increment red array to reflect counting a non-zero red value
        }
        
        if(green == 0){
            blackCount++;
        } else {
            greenArray.push(1)
        }

        if(blue == 0){
            blackCount++;
        } else {
            blueArray.push(1)
        }

        if(blackCount == 3 && (alpha == 255)){
            //console.log("we have a black pixel")
            blackArray.push(1);
            blackCount = 0; //reset blackCounter
        }
    }
    console.log("black array length: " + blackArray.length)
}
//====================================================
const graph = function(redArray,greenArray,blueArray,blackArray,imageData){

   
    redPercent = Math.round((redArray.length));
    greenPercent = Math.round((greenArray.length));
    bluePercent = Math.round((blueArray.length));
    blackPercent = Math.round((blackArray.length));

/* These are for checking proper lengths being passed in */
    //console.log("image Data length " + imageData.length)
    //console.log("red array length: " + redArray.length)
    //console.log("Green array length " + greenArray.length)
    //console.log("blue array length " + blueArray.length);
    //console.log("black array length " + blackArray.length)
   

    if(myChart){
        //if chart exists already, just update, rather than make new, if not, make new
        
        myChart.data.datasets[0].data[0] = redPercent;
        myChart.data.datasets[0].data[1] = greenPercent;
        myChart.data.datasets[0].data[2] = bluePercent;
        myChart.data.datasets[0].data[3] = blackPercent;
        myChart.update();

    } else {
        var ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Green', 'Blue', 'black', 'White'],
            datasets: [{
                label: '# Pixels',
                data: [redPercent, greenPercent, bluePercent, blackPercent, 0],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',  //red
                    'rgba(0, 192, 0, 0.2)',     //green
                    'rgba(54, 162, 235, 0.2)',  //blue
                    'rgba(0, 0, 0, 100)',       //black
                    'rgba(220,220,220,0.2)'     //white
                    
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',    
                    'rgba(0, 192, 0, 1)',
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
    }

//==============================================================


}
/* Resources */
/*
https://coderwall.com/p/jzdmdq/loading-image-from-local-file-into-javascript-and-getting-pixel-data
https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
https://www.youtube.com/watch?v=-AR-6X_98rM&t=397s&ab_channel=KyleRobinsonYoung
https://developer.mozilla.org/en-US/docs/Web/API/Response


**** This fixed the issue of large indexes of imageData all being 0
https://stackoverflow.com/questions/2541481/get-average-color-of-image-via-javascript

                     canvas.height = img.naturalHeight || img.offsetHeight || img.height;
                     canvas.width = img.naturalWidth || img.offsetWidth || img.width;
                     height = canvas.height;
                     width = canvas.width;

*/