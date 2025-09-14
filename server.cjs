// server.cjs
const express = require('express');
const { spawn } = require('child_process');

const app = express();
app.use(express.json());

let lastResult = null; // lưu kết quả gần nhất

app.post('/run-playwright', (req, res) => {
  lastResult = null; // reset trước khi chạy mới
  res.json({ status: 'started' });
  const cmd = 'npx';
  const args = ['playwright', 'test', 'tests', '--project=chromium']; 
  const proc = spawn(cmd, args, { cwd: process.cwd(), shell: true });

  let stdout = '';
  let stderr = '';

  proc.stdout.on('data', (data) => { stdout += data.toString(); });
  proc.stderr.on('data', (data) => { stderr += data.toString(); });

  proc.on('close', (code) => {
    lastResult = {
      exitCode: code,
      stdout,
      stderr,
      finishedAt: new Date().toISOString(),
    };
    console.log('Playwright test finished, result saved in memory');
  });
});

// endpoint để n8n polling lấy kết quả
app.get('/get-latest-result', (req, res) => {
  if (!lastResult) {
    return res.json({ status: 'no result yet' });
  }
  res.json({ status: 'done', result: lastResult });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Runner listening at http://localhost:${PORT}`));
