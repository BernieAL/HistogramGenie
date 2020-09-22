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
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d')
                ctx.drawImage(img,0,0)
                imageData = ctx.getImageData(0,0,img.width,img.height).data
                //console.log("Image data:", imageData)   
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

        
        fetch('data:image/jpeg;base64,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')
        .then(function(response){
            return response.blob();
        }).then(function(blob) {
            const objectURL = URL.createObjectURL(blob)
            image.src = objectURL
        })
    })
    
//==============================================================


}




/* Resources */
/*
https://coderwall.com/p/jzdmdq/loading-image-from-local-file-into-javascript-and-getting-pixel-data
https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
https://www.youtube.com/watch?v=-AR-6X_98rM&t=397s&ab_channel=KyleRobinsonYoung
*/