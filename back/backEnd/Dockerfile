ARG NODE_IMAGE=node:14
ARG NODE_IMAGE_SOURCE=node:14

# 使用指定的 Node.js 运行时镜像作为基础镜像
FROM ${NODE_IMAGE_SOURCE}

# 设置工作目录
WORKDIR /usr/src/app

# 复制 package.json 和 package-lock.json（如果有）
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 复制项目源代码
COPY . .

# 构建项目
RUN npm run build

# 暴露应用端口（假设你的应用运行在 3001 端口）
EXPOSE 7001

# 启动应用
CMD [ "npm", "run", "start" ]
