const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const cors = require('cors')
let fs = require('fs'); 
// 存储上传文件的目录
const uploadDir = path.join(__dirname, 'uploads');

// 使用Multer中间件处理文件上传
const upload = multer({ dest: uploadDir });

app.use(cors())
// 处理POST请求，上传图片
app.post('/upload', upload.single('file'), (req, res) => {

  // req.file 包含上传的文件信息
  if (!req.file) {
    return res.status(400).send('No files were uploaded.');
  }

  let oldname = req.file.path //获取path: 'public\\upload\\0f625978d5d1a783b12e149718f8b634',
  let newname = req.file.path + path.parse(req.file.originalname).ext //.jpg
  fs.renameSync(oldname, newname)//将老的文件名改成新的有后缀的文件 #同步写法
  console.log('req.file :', req.file);

  // 返回上传成功的消息
  res.send('File uploaded successfully.');
});

// 启动服务器
app.listen(4000, () => {
  console.log('Server started on http://localhost:4000');
});
