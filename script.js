/* ==========================================================
   AVENMARK CODE PLAYGROUND V1.0
   SCRIPT.JS
========================================================== */


/* ==========================================================
   FILE STORAGE
========================================================== */

const files = {

    "index.html": `
<h1>Hello, Avenmark!</h1>
<p>Start building your website.</p>
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
// Write JavaScript here

`

};



let currentFile = "index.html";



/* ==========================================================
   ELEMENTS
========================================================== */

const editor =
    document.getElementById("code-editor");


const fileButtons =
    document.querySelectorAll(".file");


const currentFileTitle =
    document.getElementById("current-file");


const runButton =
    document.getElementById("run-button");


const previewFrame =
    document.getElementById("preview-frame");


const newFileButton =
    document.getElementById("new-file-button");





/* ==========================================================
   LOAD FILE
========================================================== */

function loadFile(fileName) {


    currentFile = fileName;


    currentFileTitle.textContent = fileName;


    editor.value = files[fileName] || "";



    fileButtons.forEach(button => {


        button.classList.remove("active");


        if(button.dataset.file === fileName){

            button.classList.add("active");

        }


    });


}





/* ==========================================================
   SAVE CURRENT FILE
========================================================== */

editor.addEventListener(
    "input",
    () => {

        files[currentFile] =
            editor.value;

    }
);





/* ==========================================================
   FILE SWITCHING
========================================================== */

fileButtons.forEach(button => {


    button.addEventListener(
        "click",
        () => {


            files[currentFile] =
                editor.value;


            loadFile(
                button.dataset.file
            );


        }
    );


});





/* ==========================================================
   CREATE NEW FILE
========================================================== */

newFileButton.addEventListener(
    "click",
    () => {


        const fileName =
            prompt(
                "Enter file name:"
            );


        if(!fileName){

            return;

        }



        files[fileName] = "";



        const newButton =
            document.createElement("button");


        newButton.className =
            "file";


        newButton.dataset.file =
            fileName;


        newButton.textContent =
            fileName;



        document
            .querySelector(".file-list")
            .appendChild(newButton);



        newButton.addEventListener(
            "click",
            () => {


                files[currentFile] =
                    editor.value;


                loadFile(fileName);


            }
        );



        loadFile(fileName);


    }
);






/* ==========================================================
   RUN PROJECT
========================================================== */

runButton.addEventListener(
    "click",
    runCode
);



function runCode(){



    const html =
        files["index.html"] || "";



    const css =
        files["style.css"] || "";



    const javascript =
        files["script.js"] || "";




    const previewContent = `

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

${javascript}

<\/script>



</body>

</html>

`;



    previewFrame.srcdoc =
        previewContent;


}





/* ==========================================================
   STARTUP
========================================================== */

loadFile(
    "index.html"
);


runCode();
