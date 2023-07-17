const fs = require('fs');
const path = require('path');

function findImportStatements(directory) {
  const files = fs.readdirSync(directory);

  files.forEach((file) => {

    const file_patch = path.join(directory, file);


    if (fs.statSync(file_patch).isFile()) {
  
      if (path.extname(file_patch) === '.js' || path.extname(file_patch) === '.jsx') {
        const content = fs.readFileSync(file_patch, 'utf-8');

        const import_statements = content.match(/import .* from .*/g);

    
        if (import_statements) {

          console.log(`----------- Import statements in ${file_patch}: --------`);
          import_statements.forEach((statement) => {
          
            const fileName = statement.match(/import .* from ['"](.*?)['"]/)[1];
          
            file_names.push({id: the_index + 1, label: fileName});
            if(statement.match(/import\s+(?:{([^}]+)})?([^{}\s]+)\s+from/)){
                const match_results = statement.match(/import\s+(?:{([^}]+)})?([^{}\s]+)\s+from/);
                 const values = match_results[1] ? match_results[1].split(',').map(value => value.trim()) : [];
                  const moduleName = match_results[2];
          
                  imports_name = moduleName;
                }
                else if(statement.match(/\{([^}]+)\}/)){
                const match_results = statement.match(/\{([^}]+)\}/);
                  
                  const values = match_results[1].trim().split(',').map(value => value.trim());
                  imports_name = values;

                }

                const obj_man = {fileName};
                obj_man["value"] = imports_name;
                console.log("this is obj_man", obj_man)
                imports_name = [];

                the_index++;
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
// var imports_name = [];
let the_index = 0;
var the_nodes = [];



// Call the function
findImportStatements(directory);
console.log(file_names)


function removeDuplicateNodes(file_names){

  for(let i = 0 ; i < file_names.length ; i++){
    for(let j = 0 ; j < file_names.length; j++){
      if(file_names[i] != file_names[j]){
        the_nodes.push(file_names[i])
      }
    }
  }
}

removeDuplicateNodes(file_names);
console.log("these are files", the_nodes)
