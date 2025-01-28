
const apiurl = 'https://jsonplaceholder.typicode.com/posts';
let currentEditingRow = null;
// Fetch existing posts (GET request) here...
fetch(apiurl)
            .then(response => response.json())
            .then(posts => {
                const tableBody=document.getElementById('outputTable').querySelector('tbody');
                posts.slice(0, 5).forEach(post => {  // Given Limit to 5 posts
                    const row = tableBody.insertRow();
                    row.insertCell(0).textContent = post.id;
                    row.insertCell(1).textContent = post.title.split(' ')[0];
                    row.insertCell(2).textContent = post.title.split(' ')[1];
                    row.insertCell(3).textContent = 'example@example.com';
                    row.insertCell(4).textContent = "N/A";  // Placeholder for department
                    row.insertCell(5).innerHTML = 

                        '<button onclick="editData(this)">Edit</button>' + 

                        '<button onclick="deleteData(this)">Delete</button>';
                });
            })
            .catch(error => console.error('Error:', error));
            

// Function to adding new user (POST request) here..
function addData() {
    console.log("addData function called");
    // Get input values
    const firstNameEl=document.getElementById("firstName").value.trim();
    const lastNameEl=document.getElementById("lastName").value.trim();
    const emailInputEl=document.getElementById("emailInput").value.trim();
    const departmentEl=document.getElementById("department").value.trim();
    
    console.log('Adding Data:',firstNameEl,lastNameEl,emailInputEl,departmentEl);

    if(!firstNameEl || !lastNameEl || !emailInputEl || !departmentEl){
        alert("Please fill out all fields!");
        return;
    }
 
    // Data to be sent to the server here..(POST)
    const tableBody =document.getElementById('outputTable').querySelector('tbody');
     
    if(currentEditingRow) {
        const postId = currentEditingRow.cells[0].textContent;
        const updatedPost = {
            title: `${firstNameEl} ${lastNameEl}`,
            body: `Email: ${emailInputEl}, Department: ${departmentEl}`,
            userId: 1,
        };
        fetch(`${apiurl}/${postId}`, {
            method: 'PUT',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(updatedPost),
        })
        .then(response => response.json())
        .then(() => {
            currentEditingRow.cells[1].textContent = firstNameEl;
            currentEditingRow.cells[2].textContent = lastNameEl;
            currentEditingRow.cells[3].textContent = emailInputEl;
            currentEditingRow.cells[4].textContent = departmentEl;
    
            currentEditingRow = null;
            document.getElementById('addBtn').textContent='Add User';
            clearInputs();
        })
        .catch(error => console.error('Error:', error));
    } else {
        const newPost = {
            title: `${firstNameEl} ${lastNameEl}`,
            body: `Email: ${emailInputEl}, Department: ${departmentEl}`,
            userId: 1,
        };

        fetch(apiurl, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(newPost),
        })
        .then(response => response.json())
        .then(post => {
            //const tableBody = document.getElementById("outputTable").querySelector("tbody");
            const newRow = tableBody.insertRow();
            newRow.insertCell(0).textContent = post.id;
            newRow.insertCell(1).textContent = firstNameEl;
            newRow.insertCell(2).textContent = lastNameEl;
            newRow.insertCell(3).textContent = emailInputEl;
            newRow.insertCell(4).textContent = departmentEl;
            newRow.insertCell(5).innerHTML=
                '<button onclick="editData(this)">Edit</button>' + 

                '<button onclick="deleteData(this)">Delete</button>';
            
            clearInputs();
        })
        .catch(error => console.error('Error:',error));
    }
}


function editData(button) {
    console.log("editData function called");

    // Get the parent row of the clicked button
    const row = button.parentNode.parentNode;

    // Get the cells within the row
    document.getElementById('firstName').value=row.cells[1].textContent;
    document.getElementById('lastName').value=row.cells[2].textContent;
    document.getElementById('emailInput').value=row.cells[3].textContent;
    document.getElementById('department').value=row.cells[4].textContent;

    currentEditingRow = row
    document.getElementById('addBtn').textContent='Save Changes';

}

// Functioning to delete data here...(DELETE request)
function deleteData(button) {
    console.log("deleteData function called");

    // Getting the parent row of the clicked button
    const row = button.parentNode.parentNode;

    // Removeing the row from the table
    //row.parentNode.removeChild(row);
    const postId = row.cells[0].textContent;

    fetch(`${apiurl}/${postId}`, {
        method: 'DELETE',
    })
        .then(() => {
            console.log('Post deleted:', postId);
            row.parentNode.removeChild(row);
        })
        .catch(error => console.error('Error:',error));
        console.log("Row deleted")
}
function clearInputs() {

    // Clearing the input fields
    document.getElementById("firstName").value="";
    document.getElementById("lastName").value="";
    document.getElementById("emailInput").value="";
    document.getElementById("department").value="";
    console.log("Input fields cleared!");
    currentEditingRow = null
    document.getElementById('addBtn').textContent='Add User';
}
