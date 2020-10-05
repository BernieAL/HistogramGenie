/*  10-5 Update:
    when you upload a new picture its values are being added to the previous images values
        the new is being added to the old.
            Need to find a way to reset the array values before a new image is read
*/


window.onload = ()=>{

    let redArray = [];
    let blueArray = [];
    let greenArray= [];
    let blackArray = [];
    
    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
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
                
                //call to get image Data
                    imageData = getData(ctx,img)
                    console.log("Image data:", imageData)   
                    console.log("image Data length " + imageData.length)
               
                //call to getColors
                    getColors(imageData)
                    console.log("red array length: " + redArray.length)
                    console.log("Green array length " + greenArray.length)
                    console.log("blue array length " + blueArray.length);
                    console.log("black array length " + blackArray.length)

                // call to graph function
                    graph(redArray,greenArray,blueArray,blackArray)
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
    function getData(ctx,img){
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
    

//resetting arrays to 0 so that the old values are removed and not added with the new image data     
redArray.length = 0;
greenArray.length = 0;
blueArray.length = 0;
blackArray.length = 0;
   

    data = imgData;
    var blackCount; 
    //if blackCount == 3, this means red=0,green=0,blue=0 for a pixel making the pixel black

    for(i = 0; i<data.length; i+=4){
            
        var red = data[i]
        if(red == 0){
            blackCount++;
        } else {
            redArray.push(red)
        }
        
        var green = data[i+1]
        if(green == 0){
            blackCount++;
        } else {
            greenArray.push(green)
        }

        var blue = data[i+2]
        if(blue == 0){
            blackCount++;
        } else {
            blueArray.push(blue)
        }
        
        if(blackCount == 3){
            black = data[i] //i,i+2,i+3 r,g,b are all black for this pixel
            blackArray.push(black)
            //console.log("black count when pushed"+blackCount)
        }
        //reset black count to 0 for next pixel
        blackCount = 0;
        //console.log('black count after setting to 0')
    }   
    console.log(redArray)
    console.log(greenArray)
    console.log(blueArray)
    console.log(blackArray)
}
//====================================================
const graph = function(redArray,greenArray,blueArray,blackArray){

    if(myChart){
        //if chart exists already, just update, rather than make new, if not, make new
        
        myChart.data.datasets[0].data[0] = redArray.length;
        myChart.data.datasets[0].data[1] = greenArray.length;
        myChart.data.datasets[0].data[2] = blueArray.length;
        myChart.data.datasets[0].data[3] = blackArray.length;
        myChart.update();

    } else {
        var ctx = document.getElementById('myChart').getContext('2d');
        myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Red', 'Green', 'Blue', 'black', 'White'],
            datasets: [{
                label: '# Pixels',
                data: [redArray.length, greenArray.length, blueArray.length, blackArray.length, 2],
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
*/