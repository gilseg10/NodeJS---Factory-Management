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

/***/ "./src/employees.js":
/*!**************************!*\
  !*** ./src/employees.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ \"./src/utils.js\");\n/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_utils_js__WEBPACK_IMPORTED_MODULE_0__);\n\nasync function loadData() {\n  const name = sessionStorage.getItem(\"fullName\");\n  document.getElementById(\"name\").innerText = name;\n\n  // const token = sessionStorage.getItem(\"token\")\n  // if (!token) {\n  //     window.location.href = \"./login.html\"\n  // }\n\n  try {\n    const emps = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchEmps)();\n    const depts_name_id = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.fetchDeptsNameId)();\n    arrangeData(emps, depts_name_id);\n    const user_id = sessionStorage.getItem(\"id\");\n    await addActionCheckAllowd(user_id, \"Presenting Employees Page\");\n  } catch (e) {\n    console.log(e.message);\n  }\n}\nfunction arrangeData(emps, depts_name_id) {\n  // arrange employees info in the table\n  const tbody = document.getElementById(\"tbody\");\n  emps.forEach(emp => {\n    const empTr = document.createElement(\"tr\");\n    const empTdName = document.createElement(\"td\");\n    const empLink = document.createElement(\"a\");\n    const empTdDept = document.createElement(\"td\");\n    const deptLink = document.createElement(\"a\");\n    const empTdShifts = document.createElement(\"td\");\n    const empUlShifts = document.createElement(\"ul\");\n    emp.shifts.forEach(shift => {\n      const shiftIL = document.createElement(\"li\");\n      shiftIL.innerText = shift.date + \": \" + shift.startingHour + \"-\" + shift.endingHour;\n      empUlShifts.appendChild(shiftIL);\n    });\n\n    // editButton.onclick = () => {\n    //     sessionStorage.setItem(\"prodData\", JSON.stringify(prod))\n\n    //     window.location.href = \"./addOrUpdate.html\"\n    // }\n\n    empLink.innerText = emp.name;\n    empLink.href = `edit_emp.html?id=${emp.id}`;\n    empTdName.appendChild(empLink);\n    deptLink.innerText = emp.department;\n    deptLink.href = `edit_dept.html?id=${emp.departmentID}`;\n    empTdDept.appendChild(deptLink);\n    empTr.value = emp.department; // for the search filter\n    empTdShifts.appendChild(empUlShifts);\n    empTr.appendChild(empTdName);\n    empTr.appendChild(empTdDept);\n    empTr.appendChild(empTdShifts);\n    tbody.appendChild(empTr);\n  });\n\n  // arrange department names in the dropdown\n  const select_tag = document.getElementById(\"departments\");\n  depts_name_id.forEach(dept => {\n    const nameOpt = document.createElement(\"option\");\n    nameOpt.text = dept.name;\n    nameOpt.value = dept.name;\n    select_tag.appendChild(nameOpt);\n  });\n}\nasync function filterEmps() {\n  const department_name = document.getElementById(\"departments\").value;\n  const tbody = document.getElementById(\"tbody\");\n  for (const row of tbody.children) {\n    if (department_name === \"\") {\n      row.style.display = \"\";\n    } else if (row.value !== department_name) {\n      row.style.display = \"none\";\n    } else {\n      row.style.display = \"\";\n    }\n  }\n  const user_id = sessionStorage.getItem(\"id\");\n  await addActionCheckAllowd(user_id, \"Filtering Employees\");\n}\nasync function addActionCheckAllowd(user_id, msg) {\n  const result = await (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.addAction)(user_id.toString());\n  sessionStorage.setItem(\"actionAllowd\", result.action.actionAllowd);\n  if (result.action.actionAllowd === 0) {\n    window.alert(`Notice! You have exhausted all the actions for today\\nLast Action: ${msg}`);\n    window.location.href = \"./login.html\";\n  }\n}\ndocument.addEventListener('DOMContentLoaded', () => {\n  document.getElementById('newEmployeeBtn').addEventListener('click', () => {\n    window.location.href = \"./new_emp.html\";\n  });\n  document.getElementById('departments').addEventListener('change', filterEmps);\n  document.getElementById('backToMenuBtn').addEventListener('click', () => {\n    window.location.href = \"./menu.html\";\n  });\n});\nwindow.loadData = loadData;\n\n//# sourceURL=webpack:///./src/employees.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./src/employees.js");
/******/ 	
/******/ })()
;