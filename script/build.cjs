const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// 项目根目录
const rootDir = path.resolve(__dirname, '..');
const lectureDir = path.join(rootDir, 'lecture');
const publicDir = path.join(rootDir, 'public');

// 如果 public 文件夹不存在，创建它
if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
}

// 遍历 `lecture` 目录下的子文件夹
fs.readdirSync(lectureDir).forEach((folder) => {
    const folderPath = path.join(lectureDir, folder);
    const mdFilePath = path.join(folderPath, `${folder}.md`);

    // 检查子文件夹是否存在相应的 markdown 文件
    if (fs.lstatSync(folderPath).isDirectory() && fs.existsSync(mdFilePath)) {
        try {
            // 执行 `pnpm run export` 导出 PDF 文件到根目录
            console.log(`Exporting PDF for ${mdFilePath}`);
            execSync(`pnpm run export ${mdFilePath}`, { stdio: 'inherit', cwd: folderPath });
        } catch (error) {
            console.error(`Failed to export PDF for ${mdFilePath}:`, error.message);
        }
    }
});

// 查找并移动导出的 PDF 文件，遵循 `name-export.pdf` -> `name.pdf` 的重命名规则
fs.readdirSync(rootDir).forEach((file) => {
    const exportSuffix = '-export.pdf';
    const filePath = path.join(rootDir, file);

    if (file.endsWith(exportSuffix)) {
        const originalName = file.replace(exportSuffix, '.pdf');
        const destPath = path.join(publicDir, originalName);

        // 移动并重命名 PDF 文件到 public 文件夹
        fs.renameSync(filePath, destPath);
        console.log(`Moved and renamed ${filePath} to ${destPath}`);
    }
});

// 生成 index.html 文件，用于访问生成的 PDF
const indexPath = path.join(publicDir, 'index.html');
let indexContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Generated PDFs</title>
</head>
<body>
  <h1>Available PDFs</h1>
  <ul>
`;

// 遍历 `public` 目录中的 PDF 文件，生成相应的链接
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

// 写入 index.html 文件
fs.writeFileSync(indexPath, indexContent);
console.log(`Generated ${indexPath}`);
