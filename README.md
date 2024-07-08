# Factory Employee Management System

This project implements a Factory Employee Management System using Node.js, Express, MongoDB, and HTML with native JavaScript on the client side.

## Features

- **Technology Stack:** Node.js, Express server, MongoDB database, and HTML with native JS.
- **Architecture:** Designed with separation of concerns into Data and Business layers.
- **Functionality:** Supports CRUD operations for different models.
- **Authentication:** Implemented using `express-jwt` for secure authentication.
- **Authorization:** Includes a user's number of actions per day limitation mechanism to control access.
Every user's action in the system is logged at the server and when no more actions left for the day, the user is logged out until the following day.   

## Models

The factory includes the following models:
- **users**
- **employees**
- **departments**
- **shifts**
- **empInShift**

Details:
- Each employee belongs to a department.
- Each department has a manager and employees.
- Each employee works several shifts.
- Each shift includes one or more employees.
- empInShift represents a link between an employee and a shift.
- Only registered users can log in to the system.

<img src="images/models.png" width="500">

## Pages

### Login Page

- Users are predefined in the database collection, and their credentials (username and email) are verified against the [JSONplaceholder](https://jsonplaceholder.typicode.com/) REST API.
- After login, the user's name will be displayed on every page.
- On every page there is also "Back To Login" button.

### Menu Page

- Provides information about the system's different pages and available actions.

### Employees Page

- Displays all employee information in a table (full name, department, and list of shifts).
- Offers options to filter employees by department.
- Employee and department names serve as links to edit pages.
- Includes a button for creating a new employee.

### Edit Employee Page

- Presents a form to edit employee information.
- Provides a button to delete the employee (including their `empInShift` associations).
- Displays a table of the employee's shifts with an option to assign them to a new shift.
- Offers buttons to return to the Employees, Departments, or Shifts pages.

### New Employee Page

- Displays an empty form to add new employee data.
- Includes a button to return to the Employees page.

### Departments Page

- Displays all department information in a table (department name, manager name, and list of employee names).
- Employee and department names serve as links to edit pages.
- Includes a button for creating a new department.

### Edit Department Page

- Presents a form to edit department information (including a dropdown to select a new department manager from existing employees).
- Provides a button to delete the department (including all department employees).
- Includes a dropdown and button to assign unassigned employees to the department.
- Offers buttons to return to the Employees or Departments page.

### New Department Page

- Displays an empty form to add new department data.
- Allows selection of a new department manager from a dropdown of non-manager employees.
- Includes a button to return to the Departments page.

### Shifts Page

- Displays a table of shift details (date, start time, end time, registered employees, and option to register additional employees).
- Allows editing of shift details with a save button. 
- Provides a form to create a new shift.
- Shifts cannot be deleted.

### Users Page

- Displays a table of user data (name, maximum daily actions, and remaining actions).

## Restoring MongoDB Dump Using `mongorestore`

To restore the MongoDB database used by this project, follow these steps:

1. **Download and Install MongoDB Database Tools:**
   - If MongoDB Database Tools is not installed, download and install it from the [MongoDB Download Center](https://www.mongodb.com/try/download/database-tools) based on your operating system.

2. **Open a Terminal or Command Prompt in MongoDB Data Tools bin directory:**
   - Open a new terminal or command prompt window.
   - Change directory to the MongoDB bin directory where `mongorestore` is located.

3. **Run `mongorestore` Command:**
   - Use the `mongorestore` command to restore the dump file into your MongoDB:
     ```bash
     mongorestore --archive=node_project.dump --db node_project
     ```
     - Replace `node_project.dump` with the full path to your dump file if you're not in the same directory.
     - `--db node_project`: Specifies the name of the database where the data will be restored. Adjust this if your database has a different name.
