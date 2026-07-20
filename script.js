/* ==========================================================
   AVENMARK CODE PLAYGROUND V2
   SCRIPT ENGINE
========================================================== */


/* ==========================================================
   PROJECT FILE SYSTEM
========================================================== */


const files = {


    "index.html": `
<h1>Welcome to Avenmark Code Playground</h1>

<p>
Start building your website.
</p>

<button onclick="testFunction()">
Click Me
</button>
`,


    "style.css": `
body {

    font-family: Arial, sans-serif;

    padding: 40px;

}


h1 {

    color: #C47A45;

}

`,


    "script.js": `

function testFunction(){

    alert("JavaScript is working!");

}

`

};





let currentFile = "index.html";





/* ==========================================================
   ELEMENTS
========================================================== */


const editor =
    document.getElementById("code-editor");


const fileList =
    document.getElementById("file-list");


const currentFileTitle =
    document.getElementById("current-file");


const runButton =
    document.getElementById("run-button");


const newFileButton =
    document.getElementById("new-file-button");


const previewFrame =
    document.getElementById("preview-frame");







/* ==========================================================
   LOAD FILE
========================================================== */


function loadFile(fileName){


    saveCurrentFile();


    currentFile = fileName;


    editor.value =
        files[fileName] || "";



    currentFileTitle.textContent =
        fileName;



    updateActiveFile();


}





/* ==========================================================
   SAVE FILE
========================================================== */


function saveCurrentFile(){


    if(currentFile){

        files[currentFile] =
            editor.value;

    }

}






/* ==========================================================
   ACTIVE FILE STYLE
========================================================== */


function updateActiveFile(){


    document
        .querySelectorAll(".file")
        .forEach(button => {


            button.classList.remove(
                "active"
            );


            if(button.dataset.file === currentFile){

                button.classList.add(
                    "active"
                );

            }


        });


}








/* ==========================================================
   FILE BUTTONS
========================================================== */


document
.querySelectorAll(".file")
.forEach(button => {


    button.addEventListener(
        "click",
        ()=>{


            loadFile(
                button.dataset.file
            );


        }
    );


});







/* ==========================================================
   LIVE EDIT SAVING
========================================================== */


editor.addEventListener(
    "input",
    ()=>{


        files[currentFile] =
            editor.value;


    }
);







/* ==========================================================
   CREATE NEW FILE
========================================================== */


newFileButton.addEventListener(
    "click",
    ()=>{


        const name =
            prompt(
                "File name:"
            );


        if(!name){

            return;

        }



        if(files[name]){

            alert(
                "File already exists."
            );

            return;

        }



        files[name] = "";



        const button =
            document.createElement(
                "button"
            );


        button.className =
            "file";


        button.dataset.file =
            name;


        button.textContent =
            name;



        button.addEventListener(
            "click",
            ()=>{

                loadFile(name);

            }
        );



        fileList.appendChild(
            button
        );



        loadFile(name);


    }
);








/* ==========================================================
   BUILD PREVIEW
========================================================== */


function runProject(){



    saveCurrentFile();



    let html =
        files["index.html"] || "";



    let css =
        "";



    let js =
        "";




    Object.keys(files)
    .forEach(file => {



        if(file.endsWith(".css")){


            css += `

/* ${file} */

${files[file]}

`;

        }



        if(file.endsWith(".js")){


            js += `

// ${file}

${files[file]}

`;

        }



    });







    const preview = `


<!DOCTYPE html>

<html>


<head>


<style>

${css}

</style>


</head>



<body>


${html}



<script>

${js}

<\/script>



</body>


</html>


`;





    previewFrame.srcdoc =
        preview;


}








/* ==========================================================
   RUN BUTTON
========================================================== */


runButton.addEventListener(
    "click",
    runProject
);







/* ==========================================================
   START APPLICATION
========================================================== */


loadFile(
    "index.html"
);


runProject();
