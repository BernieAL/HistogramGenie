window.onload = ()=>{

    var canvas = document.createElement('canvas')
    var ctx = canvas.getContext('2d')
    var imageData;

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
                imageData = getData(ctx,img)
                console.log("Image data:", imageData)   
                // SEND imageData to getColors() from here
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
            image.src = objectURL
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

}




/* Resources */
/*
https://coderwall.com/p/jzdmdq/loading-image-from-local-file-into-javascript-and-getting-pixel-data
https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
https://www.youtube.com/watch?v=-AR-6X_98rM&t=397s&ab_channel=KyleRobinsonYoung
https://developer.mozilla.org/en-US/docs/Web/API/Response
*/