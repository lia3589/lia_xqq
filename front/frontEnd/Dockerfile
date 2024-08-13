# 使用Node.js镜像作为基础
FROM node:latest

# 设置工作目录
WORKDIR /app

# 复制项目文件到容器
COPY ./frontend /app

# 安装依赖
RUN npm install

# 暴露端口
EXPOSE 5173

# 启动命令
CMD ["npm", "run",  "preview"]