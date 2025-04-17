import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

try {
  // Obtener la ruta del directorio actual para módulos ES
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  // Asegurarse de estar en la rama dev primero
  console.log('Cambiando a la rama dev...');
  execSync('git checkout dev', { stdio: 'inherit' });
  execSync('git pull origin dev', { stdio: 'inherit' });
  
  // Determinar el número para la nueva rama
  const branchesFile = path.join(__dirname, 'branch-counter.json');
  let counter = 1;
  
  if (fs.existsSync(branchesFile)) {
    const data = JSON.parse(fs.readFileSync(branchesFile, 'utf8'));
    counter = data.counter;
  }
  
  // Crear nombre de la nueva rama
  const newBranchName = `feat-${counter}`;
  
  // Crear y cambiar a la nueva rama
  console.log(`Creando nueva rama: ${newBranchName}`);
  execSync(`git checkout -b ${newBranchName}`, { stdio: 'inherit' });
  
  // Actualizar el contador
  fs.writeFileSync(branchesFile, JSON.stringify({ counter: counter + 1 }, null, 2));
  
  console.log(`\n✅ Rama ${newBranchName} creada con éxito!`);
  console.log('Para hacer merge a dev cuando termines, simplemente ejecuta:');
  console.log('pnpm run merge-branch');
} catch (error) {
  console.error('Error al crear la rama:', error.message);
  process.exit(1);
} 