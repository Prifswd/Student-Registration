

// wait until the page is loaded
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("studentForm");
    const tableBody = document.querySelector("#studentTable tbody");
  
    // load students from localStorage or empty list
    let students = JSON.parse(localStorage.getItem("students")) || [];
  
    // show students in the table
    function showTable() {
      tableBody.innerHTML = ""; // clear table
  
      // looping through each student and add them
      students.forEach((student, index) => {
        const row = document.createElement("tr");
  
        row.innerHTML = `
          <td>${student.name}</td>
          <td>${student.studentId}</td>
          <td>${student.email}</td>
          <td>${student.contact}</td>
          <td>
            <button onclick="editStudent(${index})">Edit</button>
            <button onclick="deleteStudent(${index})">Delete</button>
          </td>
        `;
  
        tableBody.appendChild(row);
      });
    }
  
    // form validation
    function isValidInput(name, id, email, contact) {

      // name should only have letters and spaces
      for (let char of name) {
        if (!(char >= 'A' && char <= 'Z') &&
            !(char >= 'a' && char <= 'z') &&
            char !== ' ') {
          return false;
        }
      }
  
      // ID and Contact must be numbers
      if (isNaN(id) || isNaN(contact)) return false;
  
      // email check
      if (!email.includes("@") || !email.endsWith(".com")) return false;
  
      return true;
    }
  
    // form submission
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // prevent default form behavior

      const name = document.getElementById("name").value.trim();
      const studentId = document.getElementById("studentId").value.trim();
      const email = document.getElementById("email").value.trim();
      const contact = document.getElementById("contact").value.trim();
  
      // check if any field is empty or not
      if (!name || !studentId || !email || !contact) {
        alert("Please fill out all fields!");
        return;
      }
  
      // validate input values
      if (!isValidInput(name, studentId, email, contact)) {
        alert("Invalid input! Make sure all values are correct.");
        return;
      }

      students.push({ name, studentId, email, contact });
      localStorage.setItem("students", JSON.stringify(students));
      showTable();
  
      // clear the form
      form.reset();
    });
  
    // edit the form with pre-filled form data
    window.editStudent = function(index) {
      const student = students[index];
      document.getElementById("name").value = student.name;
      document.getElementById("studentId").value = student.studentId;
      document.getElementById("email").value = student.email;
      document.getElementById("contact").value = student.contact;
  
      // remove from list so we can add the updated version
      students.splice(index, 1);
      localStorage.setItem("students", JSON.stringify(students));
      showTable();
    };
  
    // delete function
    window.deleteStudent = function(index) {
      if (confirm("Do you really want to delete this student?")) {
        students.splice(index, 1);
        localStorage.setItem("students", JSON.stringify(students));
        showTable();
      }
    };
  
    // show all data
    showTable();
  });
  












  