const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Crear interfaz de lectura para interactuar con el usuario
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const baseDir = 'C:/Users/maxin/OneDrive/Undermax-OnlineServicesGit/Undermax-OnlineServices';
const outputFile = 'project_structure.txt'; // El archivo de salida

function readDirectory(dirPath, extensions, level = 0) {
    let result = '';
    const files = fs.readdirSync(dirPath);

    files.forEach(file => {
        const fullPath = path.join(dirPath, file);
        const stats = fs.statSync(fullPath);

        if (file === '.git' || file === 'project_structure.txt') {
            return; 
        }

        const indentation = ' '.repeat(level * 4);

        if (stats.isDirectory()) {
            result += `${indentation}[Folder] ${file}\n`;
            result += readDirectory(fullPath, extensions, level + 1); // Leer subcarpeta
        } else {
            const fileExtension = path.extname(file);
            if (extensions.includes(fileExtension)) {
                result += `${indentation}[File] ${file}\n`;

                // Leer el contenido del archivo
                const fileContent = fs.readFileSync(fullPath, 'utf-8');
                result += `${indentation}---- Content Start ----\n${indentation}${fileContent}\n${indentation}---- Content End ----\n`;
            }
        }
    });

    return result;
}

function exportProject(option) {
    let extensions = [];

    switch (option) {
        case '1':
            extensions = ['.html', '.js', '.css']; // Todos los archivos
            break;
        case '2':
            extensions = ['.html']; // Solo HTML
            break;
        case '3':
            extensions = ['.js']; // Solo JS
            break;
        case '4':
            extensions = ['.css']; // Solo CSS
            break;
        default:
            console.log('Opción no válida. Selecciona una opción correcta.');
            rl.close();
            return;
    }

    // Ejecutar la exportación y escribir en un archivo de texto
    const projectStructure = readDirectory(baseDir, extensions);
    fs.writeFileSync(outputFile, projectStructure);
    console.log(`Project structure saved to ${outputFile}`);
    rl.close();
}

rl.question('Elige una opción para exportar:\n1. Exportar todo\n2. Solo HTML\n3. Solo JS\n4. Solo CSS\nTu elección: ', (option) => {
    exportProject(option);
});
