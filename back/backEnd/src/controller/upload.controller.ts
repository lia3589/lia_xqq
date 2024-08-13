import { Controller, Post, Files, Inject } from '@midwayjs/decorator';
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
    if (!files || files.length === 0) {
      return { success: false, message: 'No file uploaded' };
    }

    const file = files[0];
    const uploadDir = path.join(__dirname, '../../uploads');
    const filePath = path.join(uploadDir, `${uuidv4()}-${file.filename}`);

    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    fs.writeFileSync(filePath, file.data);

    const fileUrl = `${this.ctx.origin}/uploads/${path.basename(filePath)}`;
    return { success: true, url: fileUrl };
  }
}
