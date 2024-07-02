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

/***/ "./src/shifts.js":
/*!***********************!*\
  !*** ./src/shifts.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_js__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function loadData() {\n  const name = sessionStorage.getItem(\"fullName\");\n  document.getElementById(\"name\").innerText = name;\n\n  // const token = sessionStorage.getItem(\"token\")\n  // if (!token) {\n  //     window.location.href = \"./login.html\"\n  // }\n\n  try {\n    const shifts = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchShifts)();\n    arrangeData(shifts);\n    // check if the page was reloaded or navigated to\n    const navigationEntries = performance.getEntriesByType('navigation');\n    const navigationEntry = navigationEntries[0];\n    if (navigationEntry.type !== 'reload') {\n      const user_id = sessionStorage.getItem(\"id\");\n      await addActionCheckAllowd(user_id, \"Presenting Shifts Page\");\n    }\n  } catch (e) {\n    console.log(e.message);\n  }\n}\nfunction arrangeData(shifts) {\n  // arrange employees info in the table\n  const tbody = document.getElementById(\"tbody\");\n\n  // arranging time input for start and end times \n  shifts.forEach(shift => {\n    const shiftTr = document.createElement(\"tr\"); // row\n    shiftTr.id = shift._id.valueOf();\n    const shiftTdDate = document.createElement(\"td\"); // date cell\n    const shiftTdStart = document.createElement(\"td\"); // start hour cell\n    const shiftTdEnd = document.createElement(\"td\"); // end hour cell\n    const shiftInputs = createTimeInput(shift.date, shift.startingHour, shift.endingHour);\n    shiftTdDate.appendChild(shiftInputs[0]); // date input inside td\n    shiftTdStart.appendChild(shiftInputs[1]); // starting hour input inside td\n    shiftTdEnd.appendChild(shiftInputs[2]); // ending hour input inside td\n\n    // arranging list of employees in this shift\n    const empsTd = document.createElement(\"td\"); // employees names cell\n    const empList = document.createElement(\"ul\"); // employees names list                    \n    shift.employees.forEach(emp => {\n      const empNameLi = document.createElement(\"li\");\n      const empLink = document.createElement(\"a\");\n      empLink.innerText = emp.name;\n      empLink.href = `edit_emp.html?id=${emp.id}`;\n      empNameLi.appendChild(empLink);\n      empList.appendChild(empNameLi);\n    });\n    empsTd.appendChild(empList);\n\n    // arranging select tag for not-assigned employees\n    const registerTd = document.createElement(\"td\"); // register other emps cell\n    const registerTdDiv = document.createElement(\"div\");\n    registerTdDiv.className = \"register-td\";\n    const selectTag = document.createElement(\"select\"); // register other emps select\n    selectTag.id = shift._id.valueOf() + \"_select\";\n    shift.empsNotInShift.forEach(emp => {\n      const empName = document.createElement(\"option\");\n      empName.innerText = emp.name;\n      empName.value = emp.id;\n      selectTag.appendChild(empName);\n    });\n    const registerBtn = document.createElement(\"button\");\n    registerBtn.innerText = 'Register';\n    registerBtn.addEventListener('click', async () => await registerEmp(`${shift._id.valueOf()}`));\n    registerTdDiv.appendChild(selectTag);\n    registerTdDiv.appendChild(registerBtn);\n    registerTd.appendChild(registerTdDiv);\n\n    // shiftTr.appendChild(shiftTdDate)\n    shiftTr.appendChild(shiftTdDate);\n    shiftTr.appendChild(shiftTdStart);\n    shiftTr.appendChild(shiftTdEnd);\n    shiftTr.appendChild(empsTd);\n    shiftTr.appendChild(registerTd);\n    tbody.appendChild(shiftTr);\n  });\n}\nasync function registerEmp(shiftID) {\n  const employeeID = document.getElementById(shiftID + '_select').value;\n  const user_id = sessionStorage.getItem(\"id\");\n  await addActionCheckAllowd(user_id, \"Registerd Employee To Shift\");\n  try {\n    const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createEmpShift)({\n      shiftID,\n      employeeID\n    });\n    sessionStorage.setItem(\"New EmpShift\", JSON.stringify(result));\n    window.location.reload();\n  } catch (e) {\n    console.log(e);\n  }\n}\nasync function saveChanges() {\n  const user_id = sessionStorage.getItem(\"id\");\n  await addActionCheckAllowd(user_id, \"Update Shifts Info\");\n  const dom_shifts = document.getElementById(\"tbody\").children;\n  // let shifts = []\n  for (let i = 0; i < dom_shifts.length; i++) {\n    const dom_shift = dom_shifts[i];\n    const id = dom_shift.id;\n    const dateInput = dom_shift.cells[0].children[0].value; // yyyy-mm-dd\n    const startingHour = dom_shift.cells[1].children[0].value; // hh:mm\n    const endingHour = dom_shift.cells[2].children[0].value; // hh:mm\n    const date = dateInput.split('-').reverse().join('/'); // dd/mm/yyyy\n\n    if (startingHour < endingHour) {\n      try {\n        const updatedShift = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.updateShift)(id, {\n          date,\n          startingHour,\n          endingHour\n        });\n        console.log(updatedShift);\n      } catch (e) {\n        console.log(e);\n      }\n    } else {\n      window.alert(\"Highlighted shifts has start time AFTER end time\");\n      const row = document.getElementById(`${id}`);\n      const startTimeInput = row.children[1].children[0];\n      highlight(startTimeInput);\n      const endTimeInput = row.children[2].children[0];\n      highlight(endTimeInput);\n    }\n  }\n}\nasync function createNewShift(event) {\n  event.preventDefault();\n  const user_id = sessionStorage.getItem(\"id\");\n  await addActionCheckAllowd(user_id, \"Created New Shift\");\n  const shiftDate = document.getElementById(\"date\").value;\n  const date = shiftDate.split('-').reverse().join('/');\n  const startingHour = document.getElementById(\"shift-start\").value;\n  const endingHour = document.getElementById(\"shift-end\").value;\n  if (startingHour < endingHour) {\n    try {\n      const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.createShift)({\n        date,\n        startingHour,\n        endingHour\n      });\n      sessionStorage.setItem(\"New Shift\", JSON.stringify(result));\n      window.location.reload();\n    } catch (e) {\n      console.log(e);\n    }\n  } else if (startingHour !== '' && endingHour !== '') {\n    window.alert(\"start time must be earlier then end time\");\n  }\n}\nfunction createTimeInput(date, startTime, endTime) {\n  // transition form dd/mm/yy to yy-mm-dd\n  const formatDate = date.split('/').reverse().join('-');\n  const date_input = document.createElement(\"input\");\n  date_input.type = \"date\";\n  date_input.value = formatDate;\n  // startTime input\n  const start_input = document.createElement(\"input\");\n  start_input.type = \"time\";\n  start_input.value = startTime;\n  // endTime input\n  const end_input = document.createElement(\"input\");\n  end_input.type = \"time\";\n  end_input.value = endTime;\n  return [date_input, start_input, end_input];\n}\nfunction highlight(obj) {\n  var orig = obj.style.backgroundColor;\n  obj.style.backgroundColor = '#f07486';\n  setTimeout(function () {\n    obj.style.backgroundColor = orig;\n  }, 5000);\n}\nasync function addActionCheckAllowd(user_id, msg) {\n  const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.addAction)(user_id.toString());\n  sessionStorage.setItem(\"actionAllowd\", result.action.actionAllowd);\n  if (result.action.actionAllowd === 0) {\n    window.alert(`Notice! You have exhausted all the actions for today\\nLast Action: ${msg}`);\n    window.location.href = \"./login.html\";\n  }\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.getElementById('saveChanges').addEventListener('click', saveChanges);\n  document.getElementById('submit-form').addEventListener('submit', createNewShift);\n  document.getElementById('backToMenuBtn').addEventListener('click', () => {\n    window.location.href = \"./menu.html\";\n  });\n});\nwindow.loadData = loadData;\n\n//# sourceURL=webpack:///./src/shifts.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/shifts.js");
/******/ 	
/******/ })()
;