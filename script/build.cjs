const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const lectureDir = path.join(rootDir, 'lecture');
const publicDir = path.join(rootDir, 'public');

if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

fs.readdirSync(lectureDir).forEach((folder) => {
    const folderPath = path.join(lectureDir, folder);
    const mdFilePath = path.join(folderPath, `${folder}.md`);

    if (fs.lstatSync(folderPath).isDirectory() && fs.existsSync(mdFilePath)) {
        try {
            console.log(`Exporting PDF for ${mdFilePath}`);
            execSync(`pnpm run export ${mdFilePath}`, { stdio: 'inherit', cwd: folderPath });
        } catch (error) {
            console.error(`Failed to export PDF for ${mdFilePath}:`, error.message);
        }
    }
});

fs.readdirSync(rootDir).forEach((file) => {
    const exportSuffix = '-export.pdf';
    const filePath = path.join(rootDir, file);

    if (file.endsWith(exportSuffix)) {
        const originalName = file.replace(exportSuffix, '.pdf');
        const destPath = path.join(publicDir, originalName);

        fs.renameSync(filePath, destPath);
        console.log(`Moved and renamed ${filePath} to ${destPath}`);
    }
});

const indexPath = path.join(publicDir, 'index.html');
let indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ARTINX 2025 Vison Train Lectures</title>
</head>
<body>
  <h1>Available PDFs</h1>
  <ul>
`;

fs.readdirSync(publicDir).forEach((file) => {
    const filePath = path.join(publicDir, file);
    if (path.extname(file) === '.pdf') {
        indexContent += `<li><a href="./${file}">${file}</a></li>\n<br/>\n`;
    }
});

indexContent += `
  </ul>
</body>
</html>
`;

fs.writeFileSync(indexPath, indexContent);
console.log(`Generated ${indexPath}`);
