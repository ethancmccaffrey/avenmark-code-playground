/* ==========================================================
   AVENMARK CODE PLAYGROUND
   SCRIPT ENGINE V1.1
========================================================== */


/* ==========================================================
   PROJECT FILE STORAGE
========================================================== */

const files = {

    "index.html": `
<h1>Hello from Avenmark Code Playground</h1>

<p>
Start building your website.
</p>

<button onclick="hello()">
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
function hello() {
    alert("JavaScript is working!");
}
`

};



let currentFile = "index.html";





/* ==========================================================
   ELEMENT REFERENCES
========================================================== */

const editor = 
    document.getElementById("code-editor");

const fileList =
    document.getElementById("file-list");

const currentFileTitle =
    document.getElementById("current-file");

const preview =
    document.getElementById("preview-frame");

const runButton =
    document.getElementById("run-button");

const newFileButton =
    document.getElementById("new-file-button");

const exportButton =
    document.getElementById("export-button");







/* ==========================================================
   FILE MANAGEMENT
========================================================== */


function loadFile(name) {

    saveFile();

    currentFile = name;

    editor.value = files[name];

    currentFileTitle.textContent = name;

    updateFileHighlight();

}





function saveFile() {

    files[currentFile] = editor.value;

}





function updateFileHighlight() {


    document
    .querySelectorAll(".file")
    .forEach(button => {


        button.classList.remove("active");


        if(button.dataset.file === currentFile) {

            button.classList.add("active");

        }


    });


}





function createFileButton(name) {


    const button =
        document.createElement("button");


    button.className = "file";


    button.dataset.file = name;


    button.textContent = name;


    button.addEventListener(
        "click",
        () => loadFile(name)
    );


    fileList.appendChild(button);


}







/* ==========================================================
   EXISTING FILE BUTTONS
========================================================== */


document
.querySelectorAll(".file")
.forEach(button => {


    button.addEventListener(
        "click",
        () => {

            loadFile(button.dataset.file);

        }
    );


});







/* ==========================================================
   NEW FILE
========================================================== */


newFileButton.addEventListener(
    "click",
    () => {


        const name =
            prompt(
                "Enter file name:"
            );


        if(!name) return;


        if(files[name]) {

            alert(
                "File already exists."
            );

            return;

        }



        files[name] = "";

        createFileButton(name);

        loadFile(name);


    }
);







/* ==========================================================
   BUILD WEBSITE PREVIEW
========================================================== */


function runProject() {


    saveFile();



    let html =
        files["index.html"] || "";



    let styles = "";

    let scripts = "";




    Object.keys(files)
    .forEach(file => {


        if(file.endsWith(".css")) {


            styles += `

/* ${file} */

${files[file]}

`;

        }



        if(file.endsWith(".js")) {


            scripts += `

// ${file}

${files[file]}

`;

        }


    });





    const output = `

<!DOCTYPE html>

<html>

<head>

<style>

${styles}

</style>

</head>


<body>

${html}


<script>

${scripts}

<\/script>


</body>

</html>

`;





    preview.srcdoc = output;


}







/* ==========================================================
   RUN BUTTON
========================================================== */


runButton.addEventListener(
    "click",
    runProject
);







/* ==========================================================
   EXPORT PROJECT
========================================================== */


exportButton.addEventListener(
    "click",
    () => {


        let project = "";


        Object.keys(files)
        .forEach(file => {


            project +=
`
====================
${file}
====================

${files[file]}

`;

        });



        const blob =
            new Blob(
                [project],
                {
                    type:
                    "text/plain"
                }
            );


        const link =
            document.createElement("a");


        link.href =
            URL.createObjectURL(blob);


        link.download =
            "avenmark-project.txt";


        link.click();


    }
);







/* ==========================================================
   START
========================================================== */


loadFile("index.html");

runProject();
