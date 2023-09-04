


function getForm(){
     var name = document.querySelectorAll('input')[0].value;
     var fName = document.querySelectorAll('input')[1].value;
     var rollNum = document.querySelectorAll('input')[2].value;
     var slot = document.querySelectorAll('input[name="radio"]:checked')[0].value;
     var subject = document.querySelectorAll('select')[0].value;
    

     var student = {
        stdName: name,
        fatherName: fName,
        rollNumber: rollNum,
        slot: slot,
        subject: subject
     }

     if(name && fName && rollNum && slot && subject){
        //  printData(student);
         setDataInDB(student);
         printData(student);
        } else{
         alert("All Form Fields are required to be filled!");
}
}

var cardDiv = document.querySelectorAll('.cards')[0];

function printData(student, i){
    console.log(cardDiv)
    cardDiv.innerHTML +=`
    
    <div class="card" id="${i}">
    <div class="left">
    <h3>${student.stdName}</h3>
    <h3>${student.fatherName}</h3>
    <h3>${student.rollNumber}</h3>
</div>

<div class="right">
    <h3>${student.slot}</h3>
    <h3>${student.subject}</h3>
</div>
<button onclick="deleteItem(this)">Delete</button>
<button onclick="updateItem(this)">Update</button>
</div>
`
 }  


var allStudentData = [];
var currentCardID;

console.log(allStudentData);

function getDataFromDB(){
    var studentsData = localStorage.getItem('studentsData');
    console.log(studentsData)
    if(studentsData){
        console.log(allStudentData);
        allStudentData = (JSON.parse(studentsData));
        for(var i=0; i<allStudentData.length; i++){
            console.log(allStudentData.length)
            printData(allStudentData[i], i)
        }
    }
}
getDataFromDB();

function setDataInDB(student){
    allStudentData.push(student);
    localStorage.setItem("studentsData", JSON.stringify(allStudentData))
}

    function deleteItem(card){
        card.parentNode.remove()
        currentCardID = card.parentNode.id;
        // currentCardID = currentCardID - 1
        console.log(currentCardID, allStudentData.length);
        allStudentData.splice(currentCardID, 1);
        localStorage.setItem("studentsData", JSON.stringify(allStudentData))
       
}
var currentElement;
var registerBtn = document.querySelector("#register-btn");
var updateBtn = document.querySelector("#update-btn");

function updateItem(card){
    currentElement = card;
     currentCardID = currentElement.parentNode.id;
    console.log(currentCardID)
    var currentObj = allStudentData[currentCardID]
    console.log(currentObj)

    var name = document.querySelectorAll('input')[0].value = currentObj.stdName ;
    var fName = document.querySelectorAll('input')[1].value = currentObj.fatherName;
    var rollNum = document.querySelectorAll('input')[2].value = currentObj.rollNumber;
    var slot = document.querySelectorAll('input[name="radio"]:checked')[0].value = currentObj.slot;
    var subject = document.querySelectorAll('select')[0].value = currentObj.subject;

        registerBtn.style.display = 'none'
        updateBtn.style.display = 'block'
}
console.log('allStudent',allStudentData)

function updateForm(card){
    var name = document.querySelectorAll('input')[0];
    var fName = document.querySelectorAll('input')[1];
    var rollNum = document.querySelectorAll('input')[2];
    var slot = document.querySelectorAll('input[name="radio"]:checked')[0];
    var subject = document.querySelectorAll('select')[0];


      console.log('allstudentdataInside',allStudentData[currentCardID])
    // console.log('roll Number',rollNum)

    allStudentData[currentCardID].stdName = name.value;
    allStudentData[currentCardID].fatherName = fName.value;
    allStudentData[currentCardID].rollNumber = rollNum.value;
    allStudentData[currentCardID].slot = slot.value;
    allStudentData[currentCardID].subject = subject.value;
    

    localStorage.setItem("studentsData", JSON.stringify(allStudentData))
 
    cardDiv.innerHTML = "";
    getDataFromDB();
    alert("Your Data has been updated!")

    name.value = "";
    fName.value = "";
    rollNum.value = "";
    slot.value = "";
    subject.value = "";

    updateBtn.style.display = 'none'
    registerBtn.style.display = 'block'
}