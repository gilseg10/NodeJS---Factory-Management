/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/edit_emp.js":
/*!*************************!*\
  !*** ./src/edit_emp.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_js__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function loadData() {\n  const name = sessionStorage.getItem(\"fullName\");\n  document.getElementById(\"name\").innerText = name;\n  const urlParams = new URLSearchParams(window.location.search);\n  const emp_id = urlParams.get('id');\n  try {\n    // fetch employee data and his shifts\n    const employee = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchEmpById)(emp_id);\n    // fetch department names and ids \n    const depts = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchDeptsNameId)();\n    // fetch unassigned shifts of the employee\n    const unassignedShifts = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchUnassigned)(emp_id);\n    arrangeData(employee, depts, unassignedShifts);\n    // check if the page was reloaded or navigated to\n    const navigationEntries = performance.getEntriesByType('navigation');\n    const navigationEntry = navigationEntries[0];\n    if (navigationEntry.type !== 'reload') {\n      const user_id = sessionStorage.getItem(\"id\");\n      await addActionCheckAllowd(user_id, \"Presenting Employee Info\");\n    }\n  } catch (e) {\n    console.log(e.message);\n  }\n}\nfunction arrangeData(emp, depts, unassignedShifts) {\n  // define var in session storage to save emp_id\n  sessionStorage.setItem(\"emp_id\", emp._id.valueOf());\n  // save also department id\n\n  // fill out the form with the employee data (to be edited)\n  const firstName = document.getElementById(\"firstName\");\n  firstName.value = emp.firstName;\n  const lastName = document.getElementById(\"lastName\");\n  lastName.value = emp.lastName;\n  const startWorkYear = document.getElementById(\"startWorkYear\");\n  startWorkYear.value = emp.startWorkYear;\n  // fill out the department select tag\n  const dept_select = document.getElementById(\"department\");\n  depts.forEach(dept => {\n    const deptOpt = document.createElement(\"option\");\n    deptOpt.value = dept.id;\n    deptOpt.text = dept.name;\n    if (dept.name === emp.department) {\n      deptOpt.selected = true;\n    }\n    dept_select.appendChild(deptOpt);\n  });\n\n  // fill out the table with the employee shifts\n  const tbody = document.getElementById(\"tbody\");\n  emp.shifts.forEach(shift => {\n    const shiftTr = document.createElement(\"tr\");\n    const dateTd = document.createElement(\"td\");\n    const startTimeTd = document.createElement(\"td\");\n    const endTimeTd = document.createElement(\"td\");\n    dateTd.innerText = shift.date;\n    startTimeTd.innerText = shift.startingHour;\n    endTimeTd.innerText = shift.endingHour;\n    shiftTr.appendChild(dateTd);\n    shiftTr.appendChild(startTimeTd);\n    shiftTr.appendChild(endTimeTd);\n    tbody.appendChild(shiftTr);\n  });\n\n  // fill out the dropdown with all the shifts not assigned to employee\n  const select_tag = document.getElementById(\"emp_shifts\");\n  unassignedShifts.forEach(shift => {\n    const shiftOpt = document.createElement(\"option\");\n    shiftOpt.value = shift._id.valueOf();\n    shiftOpt.text = shift.date + \": \" + shift.startingHour + \"-\" + shift.endingHour;\n    select_tag.appendChild(shiftOpt);\n  });\n}\n\n// update employee data \nasync function updateEmp(event) {\n  event.preventDefault();\n  const user_id = sessionStorage.getItem(\"id\");\n  await addActionCheckAllowd(user_id, \"Update Employee Info\");\n  // send body of employee properties\n  const firstName = document.getElementById(\"firstName\").value;\n  const lastName = document.getElementById(\"lastName\").value;\n  const startWorkYear = document.getElementById(\"startWorkYear\").value;\n  const departmentID = document.getElementById(\"department\").value;\n  const emp_id = sessionStorage.getItem(\"emp_id\");\n  try {\n    const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.updateEmployee)(emp_id, {\n      firstName,\n      lastName,\n      startWorkYear,\n      departmentID\n    });\n    sessionStorage.setItem(\"updateEmpResult\", JSON.stringify(result));\n    window.alert(`${firstName} ${lastName} info was updated`);\n\n    // if the employee is manager and we changed his department\n    // the department managerID will be updated to \"\"\n    if (result.isManager && result.departmentID !== result.departmentID_change) {\n      updateDeptNoManager(result.departmentID_change);\n    }\n  } catch (e) {\n    console.log(e.message);\n  }\n}\n\n// delete the employee data and his shifts\nasync function deleteEmp() {\n  const user_id = sessionStorage.getItem(\"id\");\n  await addActionCheckAllowd(user_id, \"Delete Employee\");\n  const emp_id = sessionStorage.getItem(\"emp_id\");\n  try {\n    const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.deleteEmployee)(emp_id);\n    sessionStorage.setItem(\"deleteResult\", JSON.stringify(result));\n\n    // if the employee is manager, the department managerID will be updated to \"\"\n    if (result.isManager) {\n      updateDeptNoManager(result.departmentID_change);\n    }\n    window.alert(`Employee id: ${emp_id} was deleted`);\n    window.location.href = \"./employees.html\";\n  } catch (e) {\n    console.log(e.message);\n  }\n}\n\n// internal function to update the deparment managerID field to \"' in case of: \n// 1. delete employee who is manager; 2. assigning (update) manager to a different department \nasync function updateDeptNoManager(dept_id) {\n  try {\n    const updatedDept = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.updateDepartment)(dept_id, {\n      managerID: \"\"\n    });\n    sessionStorage.setItem(\"updateResults\", JSON.stringify(updatedDept));\n  } catch (e) {\n    console.log(e);\n  }\n}\n\n// when assign new shift for employee, new empInShift object is created and saved\nasync function createNewEmpShift() {\n  const employeeID = sessionStorage.getItem(\"emp_id\");\n  const shiftID = document.getElementById(\"emp_shifts\").value;\n  if (shiftID !== \"\") {\n    try {\n      const msg = \"Created New Employee Shift\";\n      const user_id = sessionStorage.getItem(\"id\");\n      await addActionCheckAllowd(user_id, msg);\n      const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createEmpShift)({\n        employeeID,\n        shiftID\n      });\n      window.alert(msg);\n      window.location.reload();\n    } catch (e) {\n      console.log(e.message);\n    }\n  } else {\n    window.alert(\"Please choose a shift first!\");\n  }\n}\nasync function addActionCheckAllowd(user_id, msg) {\n  const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.addAction)(user_id.toString());\n  sessionStorage.setItem(\"actionAllowd\", result.action.actionAllowd);\n  if (result.action.actionAllowd === 0) {\n    window.alert(`Notice! You have exhausted all the actions for today\\nLast Action: ${msg}`);\n    window.location.href = \"./login.html\";\n  }\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.getElementById('submit-form').addEventListener('submit', updateEmp);\n  document.getElementById('newShift').addEventListener('click', createNewEmpShift);\n  document.getElementById('deleteEmp').addEventListener('click', deleteEmp);\n  document.getElementById('backToEmps').addEventListener('click', () => {\n    window.location.href = \"./employees.html\";\n  });\n  document.getElementById('backToDepts').addEventListener('click', () => {\n    window.location.href = \"./departments.html\";\n  });\n  document.getElementById('backToShifts').addEventListener('click', () => {\n    window.location.href = \"./shifts.html\";\n  });\n});\nwindow.loadData = loadData;\n\n//# sourceURL=webpack:///./src/edit_emp.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("// -------------- Users End Points --------------\n\nconst users_route = \"http://localhost:3000/users\";\nconst fetchUsers = async () => {\n  try {\n    const resp = await fetch(users_route, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const users = await resp.json();\n    return users;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst addAction = async user_id => {\n  try {\n    const resp = await fetch(users_route + '/' + user_id, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const action = await resp.json();\n    return action;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\n\n// -------------- Employees End Points --------------\n\nconst emp_route = \"http://localhost:3000/emps\";\nconst fetchEmps = async () => {\n  try {\n    const resp = await fetch(emp_route, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const emps = await resp.json();\n    return emps;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchEmpById = async id => {\n  try {\n    const resp = await fetch(emp_route + '/' + id, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const employee = await resp.json();\n    return employee;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchEmpInDept = async dept_id => {\n  try {\n    const resp = await fetch(emp_route + '/department/' + dept_id, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const assignedEmps = await resp.json();\n    return assignedEmps;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchNotManagers = async () => {\n  try {\n    const resp = await fetch(emp_route + '/catagory/not_managers', {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const not_managers = await resp.json();\n    return not_managers;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst createEmployee = async emp => {\n  try {\n    const resp = await fetch(`${emp_route}`, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n        // token\n      },\n      body: JSON.stringify({\n        ...emp\n      })\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e);\n  }\n};\nconst updateEmployee = async (id, emp) => {\n  try {\n    const resp = await fetch(`${emp_route}/${id}`, {\n      method: \"PATCH\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n        // token\n      },\n      body: JSON.stringify({\n        ...emp\n      })\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst deleteEmployee = async id => {\n  try {\n    const resp = await fetch(`${emp_route}/${id}`, {\n      method: \"DELETE\"\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\n\n// -------------- Departments End Points --------------\n\nconst dept_route = \"http://localhost:3000/department\";\nconst fetchDepts = async () => {\n  try {\n    let resp = await fetch(dept_route, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const depts = await resp.json();\n    return depts;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchDeptById = async id => {\n  try {\n    let resp = await fetch(dept_route + '/' + id, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const department = await resp.json();\n    return department;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchDeptsNameId = async () => {\n  try {\n    const resp = await fetch(dept_route + '/catagory/names', {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const depts_name_id = await resp.json();\n    return depts_name_id;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchEmpsNotDept = async id => {\n  try {\n    const resp = await fetch(dept_route + '/notInDepartment/' + id, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const unassignedEmps = await resp.json();\n    return unassignedEmps;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst createDepartment = async dept => {\n  try {\n    const resp = await fetch(`${dept_route}`, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n        // token\n      },\n      body: JSON.stringify({\n        ...dept\n      })\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e);\n  }\n};\nconst updateDepartment = async (id, dept) => {\n  try {\n    const resp = await fetch(`http://localhost:3000/department/${id}`, {\n      method: \"PATCH\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n        // token\n      },\n      body: JSON.stringify({\n        ...dept\n      })\n    });\n    const updatedDept = await resp.json();\n    return updatedDept;\n  } catch (e) {\n    console.log(e);\n  }\n};\nconst deleteDepartment = async id => {\n  try {\n    const resp = await fetch(`${dept_route}/${id}`, {\n      method: \"DELETE\"\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\n\n// -------------- Shifts End Points --------------\n\nconst shift_route = \"http://localhost:3000/shift\";\nconst fetchShifts = async () => {\n  try {\n    let resp = await fetch(shift_route, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const shifts = await resp.json();\n    return shifts;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchUnassigned = async id => {\n  try {\n    const resp = await fetch(shift_route + '/emp/' + id, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const depts_name_id = await resp.json();\n    return depts_name_id;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst createShift = async shift => {\n  try {\n    const resp = await fetch(shift_route, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n        // token\n      },\n      body: JSON.stringify({\n        ...shift\n      })\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e);\n  }\n};\nconst createEmpShift = async empShift => {\n  try {\n    const resp = await fetch(`${shift_route}/empInShift`, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n        // token\n      },\n      body: JSON.stringify({\n        ...empShift\n      })\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst updateShift = async (id, shift) => {\n  try {\n    const resp = await fetch(`${shift_route}/${id}`, {\n      method: \"PUT\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n        // token\n      },\n      body: JSON.stringify({\n        ...shift\n      })\n    });\n    const updatedShift = await resp.json();\n    console.log(updatedShift);\n  } catch (e) {\n    console.log(e);\n  }\n};\nmodule.exports = {\n  fetchUsers,\n  addAction,\n  fetchEmps,\n  fetchEmpById,\n  fetchEmpInDept,\n  fetchNotManagers,\n  createEmployee,\n  updateEmployee,\n  deleteEmployee,\n  fetchDepts,\n  fetchDeptById,\n  fetchDeptsNameId,\n  fetchEmpsNotDept,\n  createDepartment,\n  updateDepartment,\n  deleteDepartment,\n  fetchShifts,\n  fetchUnassigned,\n  createShift,\n  createEmpShift,\n  updateShift\n};\n\n//# sourceURL=webpack:///./src/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/edit_emp.js");
/******/ 	
/******/ })()
;