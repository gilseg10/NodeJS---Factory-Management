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

/***/ "./src/edit_dept.js":
/*!**************************!*\
  !*** ./src/edit_dept.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_js__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function loadData() {\n  const name = sessionStorage.getItem(\"fullName\");\n  document.getElementById(\"user_name\").innerText = name;\n  const urlParams = new URLSearchParams(window.location.search);\n  const dept_id = urlParams.get('id');\n  // check if token exist   \n  const token = sessionStorage.getItem(\"token\");\n  try {\n    // fetch department data\n    const department = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchDeptById)(dept_id, token);\n    // if message then - 1) No token provided; 2) Invalid token\n    if (department.message) {\n      window.alert(department.message);\n      window.location.href = \"./login.html\";\n    } else {\n      // fetch department employees \n      const assignedEmps = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchEmpInDept)(dept_id, token);\n      // fetch employees not in the department\n      const unassignedEmps = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchEmpsNotDept)(dept_id, token);\n      arrangeData(department, assignedEmps, unassignedEmps);\n      // check if the page was reloaded or navigated to\n      const navigationEntries = performance.getEntriesByType('navigation');\n      const navigationEntry = navigationEntries[0];\n      if (navigationEntry.type !== 'reload') {\n        const user_id = sessionStorage.getItem(\"id\");\n        await addActionCheckAllowd(user_id, \"Presenting Department Info\");\n      }\n    }\n  } catch (e) {\n    console.log(e.message);\n  }\n}\nfunction arrangeData(department, assignedEmps, unassignedEmps) {\n  // define var in session storage to save dept_id\n  sessionStorage.setItem(\"dept_id\", department._id.valueOf());\n  // fill the depatment name \n  const dept_name = document.getElementById(\"name\");\n  dept_name.value = department.name;\n  // fill out the manager field and department employees select tag\n  const manager_name = document.getElementById(\"managerName\");\n  const manager_select = document.getElementById(\"empName\");\n  assignedEmps.forEach(emp => {\n    if (emp._id.valueOf() === department.managerID) {\n      manager_name.value = emp.firstName + \" \" + emp.lastName;\n    } else {\n      const empOpt = document.createElement(\"option\");\n      empOpt.value = emp._id.valueOf();\n      empOpt.text = emp.firstName + \" \" + emp.lastName;\n      manager_select.appendChild(empOpt);\n    }\n  });\n  // fill out the select with all the employees not assigned to department\n  const empSelect_tag = document.getElementById(\"notBelongEmps\");\n  unassignedEmps.forEach(emp => {\n    const empOpt = document.createElement(\"option\");\n    empOpt.value = emp.id;\n    empOpt.text = emp.name;\n    empSelect_tag.appendChild(empOpt);\n  });\n}\n\n// changing department info\nasync function updateDept(event) {\n  event.preventDefault();\n  const user_id = sessionStorage.getItem(\"id\");\n  const token = sessionStorage.getItem(\"token\");\n  await addActionCheckAllowd(user_id, \"Update Department Info\");\n  const name = document.getElementById(\"name\").value;\n  const managerID = document.getElementById(\"empName\").value;\n  // if different manager didn't selected, we want to send only the name\n  const body_obj = managerID === '' ? {\n    name\n  } : {\n    name,\n    managerID\n  };\n  const dept_id = sessionStorage.getItem(\"dept_id\");\n  try {\n    const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.updateDepartment)(dept_id, body_obj, token);\n    // if message then - 1) No token provided; 2) Invalid token\n    if (result.message) {\n      window.alert(result.message);\n      window.location.href = \"./login.html\";\n    } else {\n      sessionStorage.setItem(\"updatedDept\", JSON.stringify(result));\n      window.alert(`${name} Department info was updated`);\n    }\n  } catch (e) {\n    console.log(e.message);\n  }\n}\n\n// assigning other department employee to this department\nasync function changeDeptforEmp() {\n  const departmentID = sessionStorage.getItem(\"dept_id\");\n  const token = sessionStorage.getItem(\"token\");\n  const emp_id = document.getElementById(\"notBelongEmps\").value;\n  if (emp_id === '') {\n    window.alert(\"You didnt chose any employee\");\n  } else {\n    const user_id = sessionStorage.getItem(\"id\");\n    await addActionCheckAllowd(user_id, \"Assign Employee To Department\");\n    try {\n      const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.updateEmployee)(emp_id, {\n        departmentID\n      }, token);\n      // if message then - 1) No token provided; 2) Invalid token\n      if (result.message) {\n        window.alert(result.message);\n        window.location.href = \"./login.html\";\n      } else {\n        sessionStorage.setItem(\"updateResults\", JSON.stringify(result));\n        window.alert(`Employee id: ${emp_id} was assign to this department`);\n        window.location.reload();\n      }\n    } catch (e) {\n      console.log(e.message);\n    }\n  }\n}\nasync function deleteDept() {\n  const user_id = sessionStorage.getItem(\"id\");\n  const token = sessionStorage.getItem(\"token\");\n  await addActionCheckAllowd(user_id, \"Delete Department With Related Employees\");\n  const dept_id = sessionStorage.getItem(\"dept_id\");\n  try {\n    const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.deleteDepartment)(dept_id, token);\n    if (result.message) {\n      window.alert(result.message);\n      window.location.href = \"./login.html\";\n    } else {\n      sessionStorage.setItem(\"deleteDeprtment\", JSON.stringify(result));\n      window.alert(`Department id: ${dept_id} was deleted with all it's employees`);\n      window.location.href = \"./departments.html\";\n    }\n  } catch (e) {\n    console.log(e.message);\n  }\n}\nasync function addActionCheckAllowd(user_id, msg) {\n  const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.addAction)(user_id.toString());\n  sessionStorage.setItem(\"actionAllowd\", result.action.actionAllowd);\n  if (result.action.actionAllowd === 0) {\n    window.alert(`Notice! You have exhausted all the actions for today\\nLast Action: ${msg}`);\n    window.location.href = \"./login.html\";\n  }\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.getElementById('submit-form').addEventListener('submit', updateDept);\n  document.getElementById('changeDept').addEventListener('click', changeDeptforEmp);\n  document.getElementById('deleteDept').addEventListener('click', deleteDept);\n  document.getElementById('backToEmps').addEventListener('click', () => {\n    window.location.href = \"./employees.html\";\n  });\n  document.getElementById('backToDepts').addEventListener('click', () => {\n    window.location.href = \"./departments.html\";\n  });\n  document.getElementById('backToLogin').addEventListener('click', () => {\n    window.location.href = \"./login.html\";\n  });\n});\nwindow.loadData = loadData;\n\n//# sourceURL=webpack:///./src/edit_dept.js?");

/***/ }),

/***/ "./src/utils.js":
/*!**********************!*\
  !*** ./src/utils.js ***!
  \**********************/
/***/ ((module) => {

eval("// -------------- Users End Points --------------\n\nconst users_route = \"http://localhost:3000/users\";\nconst fetchUsers = async token => {\n  try {\n    const resp = await fetch(users_route, {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const users = await resp.json();\n    return users;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst checkActionAllowd = async jph_id => {\n  try {\n    const resp = await fetch(`${users_route}/actionAllowd/${jph_id}`, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const actionAllowd = await resp.json();\n    return actionAllowd;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst send_login = async user_cred => {\n  try {\n    const resp = await fetch(users_route + '/login', {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\"\n      },\n      body: JSON.stringify(user_cred)\n    });\n    const data = await resp.json();\n    return data;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst addAction = async user_id => {\n  // // DUMMY - disconnect actions for now\n  // return {action: {actionAllowd: 1}}\n  try {\n    const resp = await fetch(users_route + '/' + user_id, {\n      method: \"GET\"\n      // headers: { \"x-access-token\": token }\n    });\n    const action = await resp.json();\n    return action;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\n\n// -------------- Employees End Points --------------\n\nconst emp_route = \"http://localhost:3000/emps\";\nconst fetchEmps = async token => {\n  try {\n    const resp = await fetch(emp_route, {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const emps = await resp.json();\n    return emps;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchEmpById = async (id, token) => {\n  try {\n    const resp = await fetch(emp_route + '/' + id, {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const employee = await resp.json();\n    return employee;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchEmpInDept = async (dept_id, token) => {\n  try {\n    const resp = await fetch(emp_route + '/department/' + dept_id, {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const assignedEmps = await resp.json();\n    return assignedEmps;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchNotManagers = async token => {\n  try {\n    const resp = await fetch(emp_route + '/catagory/not_managers', {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const not_managers = await resp.json();\n    return not_managers;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst createEmployee = async (emp, token) => {\n  try {\n    const resp = await fetch(`${emp_route}`, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n        \"x-access-token\": token\n      },\n      body: JSON.stringify({\n        ...emp\n      })\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e);\n  }\n};\nconst updateEmployee = async (id, emp, token) => {\n  try {\n    const resp = await fetch(`${emp_route}/${id}`, {\n      method: \"PATCH\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n        \"x-access-token\": token\n      },\n      body: JSON.stringify({\n        ...emp\n      })\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst deleteEmployee = async (id, token) => {\n  try {\n    const resp = await fetch(`${emp_route}/${id}`, {\n      method: \"DELETE\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\n\n// -------------- Departments End Points --------------\n\nconst dept_route = \"http://localhost:3000/department\";\nconst fetchDepts = async token => {\n  try {\n    let resp = await fetch(dept_route, {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const depts = await resp.json();\n    return depts;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchDeptById = async (id, token) => {\n  try {\n    let resp = await fetch(dept_route + '/' + id, {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const department = await resp.json();\n    return department;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchDeptsNameId = async token => {\n  try {\n    const resp = await fetch(dept_route + '/catagory/names', {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const depts_name_id = await resp.json();\n    return depts_name_id;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchEmpsNotDept = async (id, token) => {\n  try {\n    const resp = await fetch(dept_route + '/notInDepartment/' + id, {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const unassignedEmps = await resp.json();\n    return unassignedEmps;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst createDepartment = async (dept, token) => {\n  try {\n    const resp = await fetch(`${dept_route}`, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n        \"x-access-token\": token\n      },\n      body: JSON.stringify({\n        ...dept\n      })\n    });\n    const department = await resp.json();\n    return department;\n  } catch (e) {\n    console.log(e);\n  }\n};\nconst updateDepartment = async (id, dept, token) => {\n  try {\n    const resp = await fetch(`http://localhost:3000/department/${id}`, {\n      method: \"PATCH\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n        \"x-access-token\": token\n      },\n      body: JSON.stringify({\n        ...dept\n      })\n    });\n    const updatedDept = await resp.json();\n    return updatedDept;\n  } catch (e) {\n    console.log(e);\n  }\n};\nconst deleteDepartment = async (id, token) => {\n  try {\n    const resp = await fetch(`${dept_route}/${id}`, {\n      method: \"DELETE\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\n\n// -------------- Shifts End Points --------------\n\nconst shift_route = \"http://localhost:3000/shift\";\nconst fetchShifts = async token => {\n  try {\n    let resp = await fetch(shift_route, {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const shifts = await resp.json();\n    return shifts;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst fetchUnassigned = async (id, token) => {\n  try {\n    const resp = await fetch(shift_route + '/emp/' + id, {\n      method: \"GET\",\n      headers: {\n        \"x-access-token\": token\n      }\n    });\n    const depts_name_id = await resp.json();\n    return depts_name_id;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst createShift = async (shift, token) => {\n  try {\n    const resp = await fetch(shift_route, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n        \"x-access-token\": token\n      },\n      body: JSON.stringify({\n        ...shift\n      })\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e);\n  }\n};\nconst createEmpShift = async (empShift, token) => {\n  try {\n    const resp = await fetch(`${shift_route}/empInShift`, {\n      method: \"POST\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n        \"x-access-token\": token\n      },\n      body: JSON.stringify({\n        ...empShift\n      })\n    });\n    const result = await resp.json();\n    return result;\n  } catch (e) {\n    console.log(e.message);\n  }\n};\nconst updateShift = async (id, shift, token) => {\n  try {\n    const resp = await fetch(`${shift_route}/${id}`, {\n      method: \"PUT\",\n      headers: {\n        \"Content-Type\": \"application/json\",\n        \"x-access-token\": token\n      },\n      body: JSON.stringify({\n        ...shift\n      })\n    });\n    const updatedShift = await resp.json();\n    return updatedShift;\n  } catch (e) {\n    console.log(e);\n  }\n};\nmodule.exports = {\n  fetchUsers,\n  checkActionAllowd,\n  send_login,\n  addAction,\n  fetchEmps,\n  fetchEmpById,\n  fetchEmpInDept,\n  fetchNotManagers,\n  createEmployee,\n  updateEmployee,\n  deleteEmployee,\n  fetchDepts,\n  fetchDeptById,\n  fetchDeptsNameId,\n  fetchEmpsNotDept,\n  createDepartment,\n  updateDepartment,\n  deleteDepartment,\n  fetchShifts,\n  fetchUnassigned,\n  createShift,\n  createEmpShift,\n  updateShift\n};\n\n//# sourceURL=webpack:///./src/utils.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/edit_dept.js");
/******/ 	
/******/ })()
;