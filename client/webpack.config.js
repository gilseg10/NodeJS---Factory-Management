const path = require('path');

module.exports = {
    entry: {
        bundle_users: './src/users.js',
        bundle_employees: './src/employees.js',
        bundle_edit_emp: './src/edit_emp.js',
        bundle_new_emp: './src/new_emp.js',
        bundle_departments: './src/departments.js',
        bundle_edit_dept: './src/edit_dept.js',
        bundle_new_dept: './src/new_dept.js',
        bundle_shifts: './src/shifts.js',
        bundle_login: './src/login.js',
    },
    output: {
        filename: 'bundles/[name].js',
        path: path.resolve(__dirname, 'dist'),
    },
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
        ],
    },
};
