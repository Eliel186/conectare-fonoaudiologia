const fs = require('fs');

let proc = fs.readFileSync('src/ProcedimentoPage.tsx', 'utf8');
proc = proc.replace('bg-sunray text-white', 'bg-sunray text-gray-900');
proc = proc.replace(/text-\[10px\]/g, 'text-xs');
fs.writeFileSync('src/ProcedimentoPage.tsx', proc);

let app = fs.readFileSync('src/App.tsx', 'utf8');
app = app.replace(/text-\[10px\]/g, 'text-xs');
app = app.replace(/text-\[9px\]/g, 'text-[10px]');
app = app.replace(/text-\[8px\]/g, 'text-[10px]');
app = app.replace(/<div className="w-1\.5 h-1\.5 bg-sunray rounded-full animate-pulse" \/>/g, '<CheckCircle2 size={12} className="text-sunray" />');
fs.writeFileSync('src/App.tsx', app);
