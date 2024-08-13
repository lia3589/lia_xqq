import { Controller, Post, Files, Inject, Param } from '@midwayjs/decorator';
import { Context } from '@midwayjs/web';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Controller('/upload')
export class UploadController {

  @Inject()
  ctx: Context;

  @Post('/')
  async uploadImage(@Files() files) {
    console.log(files);
    if (!files || files.length === 0) {
      return { success: false, message: 'No file uploaded' };
    }

    const file = files[0];
    const uploadDir = path.join(__dirname, '../../uploads');
    const filePath = path.join(uploadDir, `${uuidv4()}-${file.filename}`);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileContent = fs.readFileSync(file.data);
    fs.writeFileSync(filePath, fileContent);

    const fileUrl = `${this.ctx.origin}/${path.basename(filePath)}`;
    return { success: true, url: fileUrl };
  }

  @Post('/avatar/:userId')
  async updateAvatar(@Files() files, @Param('userId') userId: number) {
    if (!files || files.length === 0) {
      return { success: false, message: 'No file uploaded' };
    }

    const file = files[0];
    const uploadDir = path.join(__dirname, '../../uploads');
    const filePath = path.join(uploadDir, `${uuidv4()}-${file.filename}`);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const fileContent = fs.readFileSync(file.data);
    fs.writeFileSync(filePath, fileContent);

    const userDataPath = path.join(__dirname, '../data/user.data.json');
    const userData = JSON.parse(fs.readFileSync(userDataPath, 'utf-8'));

    const user = userData.users.find(u => u.id === userId);
    if (!user) {
      return { success: false, message: 'User not found' };
    }

    fs.writeFileSync(userDataPath, JSON.stringify(userData, null, 2));

    const fileUrl = `${this.ctx.origin}/${path.basename(filePath)}`;
    user.avatar = fileUrl;
    return { success: true, url: fileUrl };
  }
}
