const path = require('path');
const fs = require('fs');

module.exports = () => {
  if (!fs.existsSync('./package.json')) {
    console.error('`package.json` does not found.');
    process.exit(1);
  }
  const info = require('../../lib/info');
  const package = require(path.join(path.resolve('./'), 'package.json'));

  let assemblyDefinition = {
      name: info.module_name,
      references: [],
      optionalUnityReferences: [],
      includePlatforms: [],
      excludePlatforms: [],
      allowUnsafeCode: false
  };
  
  assemblyDefinition.references = Object
  .keys(package.dependencies)
  .filter(x => x != '@umm/scripts')
  .map(key => {
    return key.replace(/^(@)?([^\/]+)?(\/)?([^\/]+)$/, "$2$1$4");
  });

  fs.writeFileSync(
    path.join(
      path.resolve('./'),
      'Assets',
      'AssemblyDefinition.asmdef'
    ),
    JSON.stringify(assemblyDefinition, undefined, 2)
  );
};