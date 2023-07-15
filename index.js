const fs = require('fs');
const path = require('path');

function findImportStatements(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {
    // Construct the absolute path
    const file_patch = path.join(directory, file);

    // Check if it's a file
    if (fs.statSync(file_patch).isFile()) {
      // Check if it's a JavaScript file or jsx file
      if (path.extname(file_patch) === '.js' || path.extname(file_patch) === '.jsx') {
        // Read the content of the file
        const content = fs.readFileSync(file_patch, 'utf-8');
        // const import_statements = content.match(/import .* from ['"](.*\.jsx?)['"]/g);
        // const import_statements = content.match(/import .* from ['"](.*\.(js|jsx))['"]/g)
        // get all types of imports
        const import_statements = content.match(/import .* from .*/g);

        // Print the import statements
        if (import_statements) {

          console.log(`----------- Import statements in ${file_patch}: --------`);
          import_statements.forEach((statement) => {
          
            const fileName = statement.match(/import .* from ['"](.*?)['"]/)[1];
            file_names.push(fileName);
            if(statement.match(/import\s+(?:{([^}]+)})?([^{}\s]+)\s+from/)){
                const match_results = statement.match(/import\s+(?:{([^}]+)})?([^{}\s]+)\s+from/);
                 const values = match_results[1] ? match_results[1].split(',').map(value => value.trim()) : [];
                  const moduleName = match_results[2];
                  // console.log('Import values:', values);
                  // console.log('Module name:', moduleName);
                  imports_name.push(moduleName);
                // console.log("this is simple value get", )
                }
                else if(statement.match(/\{([^}]+)\}/)){
                const match_results = statement.match(/\{([^}]+)\}/);
                  
                  const values = match_results[1].trim().split(',').map(value => value.trim());
                  imports_name.push(values);
                  // console.log("this is complex value get", file_names, imports_name);

                }

                const obj_man = {fileName};
                obj_man["value"] = imports_name;
                console.log("this is obj_man", obj_man)
                imports_name = [];
            // console.log("----------------------------------------------------")
          });
        }
      }
    } else {
      // Recursively call the function for subdirectories
      findImportStatements(file_patch);
    }
  });
}

// Specify the directory to search in
const directory = './react-adopt-me/src';

var file_names = [];
var imports_name = [];



// Call the function
findImportStatements(directory);


console.log("this is what is to see important------------------------")
// console.log("these are file names", file_names);
// console.log("these are modules name", imports_name)
