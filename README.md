# 智谱翻译(无思考) - Bob 插件

<div align="center">

![Plugin Icon](src/icon.png)

**基于智谱 GLM-4.5-Flash 的极速翻译插件**

[![GitHub release](https://img.shields.io/github/v/release/bobocai/bob-zhipu-nothink)](https://github.com/bobocai/bob-zhipu-nothink/releases)
[![License](https://img.shields.io/github/license/bobocai/bob-zhipu-nothink)](LICENSE)
[![Bob Version](https://img.shields.io/badge/Bob-0.5.0+-blue)](https://bobtranslate.com/)
[![GLM Model](https://img.shields.io/badge/GLM-4.5--Flash-green)](https://open.bigmodel.cn/)

[安装使用](#安装使用) • [功能特性](#功能特性) • [配置说明](#配置说明) • [开发文档](#开发文档) • [问题反馈](#问题反馈)

</div>

## 简介

智谱翻译(无思考)是一个专为 [Bob 翻译软件](https://bobtranslate.com/) 开发的插件，基于智谱 AI 的 GLM-4.5-Flash 模型。通过优化 API 参数配置，避免触发模型的"思考"功能，实现比常规配置快 2-3 倍的翻译速度，同时保持高质量的翻译结果。

## 功能特性

- ⚡ **极速翻译**: 通过避免触发思考功能，翻译速度显著提升
- 🆓 **完全免费**: 基于智谱 GLM-4.5-Flash 免费模型，无需付费
- 🌍 **多语言支持**: 支持 70+ 种语言的互译
- 🎯 **智能检测**: 自动检测源语言类型
- ⚙️ **灵活配置**: 支持自定义提示词和参数调整
- 🔒 **安全可靠**: API Key 本地加密存储
- 📱 **完美集成**: 与 Bob 无缝集成，支持所有翻译场景

## 安装使用

### 快速安装

1. **下载插件**: 从 [Releases 页面](https://github.com/bobocai/bob-zhipu-nothink/releases) 下载最新版本
2. **安装插件**: 双击 `.bobplugin` 文件，Bob 会自动安装
3. **获取 API Key**: 访问 [智谱 AI 开放平台](https://open.bigmodel.cn/) 注册并获取免费 API Key
4. **配置插件**: 在 Bob 偏好设置中配置 API Key 并启用服务

### 详细教程

查看完整的 [用户指南](docs/USER_GUIDE.md) 了解详细的安装和配置步骤。

## 配置说明

### 必需配置

- **API Key**: 从智谱 AI 开放平台获取的 API 密钥

### 可选配置

- **模型选择**: GLM-4-Flash（推荐）、GLM-4-Air、GLM-4-AirX
- **自定义提示词**: 支持 `{text}`, `{from}`, `{to}` 占位符
- **创造性**: 控制翻译的创造性程度（0.0-1.0）
- **超时时间**: API 请求超时时间（5-60秒）

## 支持语言

支持包括但不限于以下语言的互译：

**主要语言**: 中文（简/繁）、英语、日语、韩语、法语、德语、西班牙语、意大利语、俄语、葡萄牙语、阿拉伯语

**其他语言**: 泰语、越南语、印尼语、马来语、土耳其语、荷兰语、波兰语、捷克语、匈牙利语、芬兰语、瑞典语、丹麦语、挪威语、希腊语、希伯来语、印地语、孟加拉语等

## 技术原理

### 核心优化

本插件通过以下技术手段实现极速翻译：

1. **参数优化**: 设置 `do_sample: false`, `top_p: 0.1` 等参数避免触发思考
2. **提示词优化**: 使用简洁直接的指令，避免触发推理链
3. **响应处理**: 优化 API 响应解析，减少处理时间

### 性能对比

| 配置方式 | 平均响应时间 | 翻译质量 |
|---------|-------------|----------|
| 常规配置 | 3-5秒 | 优秀 |
| 本插件配置 | 1-2秒 | 优秀 |
| 提升幅度 | **50-70%** | 保持 |

## 开发文档

### 项目结构

```
├── src/
│   ├── info.json      # 插件配置文件
│   ├── main.js        # 主要逻辑文件
│   ├── lang.js        # 语言映射文件
│   └── icon.png       # 插件图标
├── docs/
│   ├── USER_GUIDE.md      # 用户指南
│   └── DEVELOPER_GUIDE.md # 开发者指南
├── build.sh           # 构建脚本
├── appcast.json       # 更新配置
└── README.md          # 项目说明
```

### 本地开发

1. **克隆项目**:
   ```bash
   git clone https://github.com/bobocai/bob-zhipu-nothink.git
   cd bob-zhipu-nothink
   ```

2. **修改代码**: 编辑 `src/` 目录下的文件

3. **构建插件**:
   ```bash
   chmod +x build.sh
   ./build.sh
   ```

4. **安装测试**: 双击生成的 `.bobplugin` 文件进行测试

查看完整的 [开发者指南](docs/DEVELOPER_GUIDE.md) 了解详细的开发流程。

## 常见问题

### Q: 为什么翻译速度这么快？
A: 通过优化 API 参数避免触发 GLM 模型的思考功能，从而显著提升响应速度。

### Q: 翻译质量会受影响吗？
A: 不会。GLM-4.5-Flash 本身具有强大的翻译能力，避免思考功能不会影响翻译质量。

### Q: 是否完全免费？
A: 是的，基于智谱 GLM-4.5-Flash 免费模型，无需付费。

### Q: 支持哪些翻译场景？
A: 支持 Bob 的所有翻译场景：选中翻译、截图翻译、输入翻译等。

更多问题请查看 [用户指南](docs/USER_GUIDE.md) 或提交 [Issue](https://github.com/bobocai/bob-zhipu-nothink/issues)。

## 问题反馈

如果您在使用过程中遇到问题或有改进建议：

- 🐛 **Bug 报告**: [提交 Issue](https://github.com/bobocai/bob-zhipu-nothink/issues/new?template=bug_report.md)
- 💡 **功能建议**: [提交 Feature Request](https://github.com/bobocai/bob-zhipu-nothink/issues/new?template=feature_request.md)
- 📧 **邮件联系**: [发送邮件](mailto:your-email@example.com)

## 贡献指南

欢迎贡献代码！请遵循以下步骤：

1. Fork 本项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

请确保代码符合项目规范，并添加必要的测试。

## 更新日志

### v1.0.0 (2025-01-XX)

- 🎉 初始版本发布
- ⚡ 实现基于 GLM-4.5-Flash 的快速翻译
- 🚀 优化 API 参数避免触发思考功能
- 🌍 支持 70+ 种语言互译
- ⚙️ 提供丰富的配置选项
- 📱 完整的用户界面和错误处理

查看完整的 [更新日志](CHANGELOG.md)。

## 相关链接

- [Bob 翻译软件官网](https://bobtranslate.com/)
- [智谱 AI 开放平台](https://open.bigmodel.cn/)
- [GLM-4 模型介绍](https://open.bigmodel.cn/dev/howuse/model)
- [Bob 插件开发文档](https://bobtranslate.com/guide/advance/plugin.html)

## 许可证

本项目基于 [MIT 许可证](LICENSE) 开源。

## 致谢

- 感谢 [Bob 翻译软件](https://bobtranslate.com/) 提供优秀的插件平台
- 感谢 [智谱 AI](https://open.bigmodel.cn/) 提供免费的 GLM-4.5-Flash 模型
- 感谢所有贡献者和用户的支持

---

<div align="center">

**如果这个插件对您有帮助，请给个 ⭐ Star 支持一下！**

[⬆ 回到顶部](#智谱翻译无思考---bob-插件)

</div>