// PROBLEM: People Mgt. Platform can:
// 1. List all employees
// 2. Add Employees {first, last name, state date, pay, role}
// 3. Modify Employees — give bonus or raise...



//const employeeNameInputUpdate = document.getElementById("employee-name-update");
const employeePayInputUpdate = document.getElementById("employee-pay-update");
const employeeRoleInputUpdate = document.getElementById("employee-role-update");
const employeeNameInputAdd = document.getElementById("employee-name-add");
const employeePayInputAdd = document.getElementById("employee-pay-add");
//const employeeRoleInputAdd = document.getElementById("employee-role-add");
const updateSelector = document.getElementById("employee-update-selector");
const addSelector = document.getElementById("employee-add-selector")

const employeeDisplay = document.getElementById("employees-display");
const employeeUpdateForm = document.getElementById("update-employees");
const employeeAddForm = document.getElementById("add-employees")

//Array Data
let employees = [
    {name:"Bob",pay:120,role:"Dev"},
    {name:"Tom",pay:100,role:"Janitor"},
    {name:"Don",pay:160,role:"Hr"},
    {name:"Rob",pay:190,role:"Dev"},
    {name:"John",pay:110,role:"Tester"},

];

//Creates the initial employee list
createAllEmployees(employees);
//Updates selection menu
employeeUpdateSelectors(employees,updateSelector);

//Clears employee list, then creates object for every item in the array argument
function createAllEmployees (array = employees){
    employeeDisplay.innerHTML = "";
    employees.forEach((item)=>{
        console.log(item)
        createContent(item,"employees-display")
    })
}

//Creates single object and adds it to the 2nd argument (the html element)
function createContent (itemToCreate, elementId = employeeDisplay){

        const createdList = document.createElement("li");
        createdList.innerHTML = `<p>${itemToCreate.name}, $${itemToCreate.pay}, ${itemToCreate.role}</p>`;
        createdList.setAttribute("id", `${itemToCreate.name}`);
        document.getElementById(`${elementId}`).appendChild(createdList);

}
//Adds employee object to old employee array

function addEmployees(newEmployee,oldEmployees){
    employees = [...oldEmployees, newEmployee];
    createAllEmployees(employees);
}
//Creates an existing array and creates a new one with updated object values
function updateEmployee(arrayEmployee,name,pay,role){

         const updatedEmployees = employees.map((item)=>{
             if (name === item.name) {

                 const newPay = Number(pay) + item.pay;
                 const newRole = role;
                 item.pay = newPay
                 item.role = newRole

             }

        })
        createAllEmployees(updatedEmployees)

}
//When the user submits the update form, call the update employee function
employeeUpdateForm.addEventListener("submit", function (event){
    event.preventDefault();

    updateEmployee(employees,updateSelector.value, Number(employeePayInputUpdate.value), employeeRoleInputUpdate.value);

})

//When the user submits the employee add form, call the add employee function and update the
//employee update selector
employeeAddForm.addEventListener("submit", function (event){
    event.preventDefault()
    const addName = employeeNameInputAdd.value;
    const addPay = Number(employeePayInputAdd.value);
    const addRole = addSelector.value;

    const newEmployee = {name:addName,pay:addPay,role:addRole};

    addEmployees(newEmployee,employees);
    employeeUpdateSelectors(employees,updateSelector);

})

//Clears the old update selector and goes through an array creating a new option menu based off that array
function employeeUpdateSelectors (employeeArray, HTMLId) {
    updateSelector.innerHTML = "";
    employeeArray.forEach((item) =>{
        const optionCreate = document.createElement("option")
        optionCreate.value = item.name
        optionCreate.innerText = item.name
        HTMLId.appendChild(optionCreate)

    })

}