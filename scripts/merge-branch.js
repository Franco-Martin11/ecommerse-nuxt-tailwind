import { execSync } from 'child_process';

try {
  // Obtener el nombre de la rama actual
  const branchName = process.argv[2] || execSync('git branch --show-current', { encoding: 'utf8' }).trim();
  
  if (!branchName || branchName === 'dev') {
    console.error('Error: No se puede mergear la rama dev a sí misma.');
    console.error('Debes estar en una rama diferente a dev o especificar el nombre de la rama a mergear.');
    process.exit(1);
  }
  
  console.log(`Se mergeará la rama: ${branchName}`);
  
  // Verificar que la rama existe
  try {
    execSync(`git rev-parse --verify ${branchName}`, { stdio: 'ignore' });
  } catch (error) {
    console.error(`Error: La rama "${branchName}" no existe.`);
    process.exit(1);
  }
  
  // Cambiar a la rama dev
  console.log('Cambiando a la rama dev...');
  execSync('git checkout dev', { stdio: 'inherit' });
  execSync('git pull origin dev', { stdio: 'inherit' });
  
  // Crear el mensaje de commit para el merge
  const commitMessage = `Merge branch '${branchName}' into dev`;
  
  // Hacer merge de la rama especificada a dev con mensaje predefinido
  // Usamos --no-edit para evitar que se abra el editor
  console.log(`Mergeando ${branchName} a dev...`);
  execSync(`git merge --no-ff --no-edit -m "${commitMessage}" ${branchName}`, { stdio: 'inherit' });
  
  // Push a origin/dev
  console.log('Haciendo push a origin/dev...');
  execSync('git push origin dev', { stdio: 'inherit' });
  
  // Eliminar la rama local
  console.log(`Eliminando rama local ${branchName}...`);
  execSync(`git branch -d ${branchName}`, { stdio: 'inherit' });
  
  // Verificar si la rama existe en remoto y eliminarla si es así
  try {
    execSync(`git ls-remote --heads origin ${branchName}`, { stdio: 'ignore' });
    console.log(`Eliminando rama remota origin/${branchName}...`);
    execSync(`git push origin --delete ${branchName}`, { stdio: 'inherit' });
  } catch (error) {
    // La rama no existe en remoto, no es necesario eliminarla
  }
  
  console.log(`\n✅ Merge completo: ${branchName} ha sido mergeado a dev, pusheado a origin/dev y eliminado.`);
} catch (error) {
  console.error('Error durante el proceso de merge:', error.message);
  process.exit(1);
} 