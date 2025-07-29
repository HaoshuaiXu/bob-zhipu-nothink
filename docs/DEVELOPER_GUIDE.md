# 智谱翻译(无思考) 开发者指南

## 项目概述

本项目是一个为 Bob 翻译软件开发的插件，基于智谱 AI 的 GLM-4.5-Flash 模型。项目的核心目标是通过优化 API 调用参数，避免触发模型的"思考"功能，从而实现更快的翻译响应速度。

## 技术架构

### 核心组件

```
src/
├── info.json      # 插件配置文件
├── main.js        # 主要逻辑文件
├── lang.js        # 语言映射和工具函数
└── icon.png       # 插件图标
```

### 关键技术点

1. **避免思考功能的参数配置**:
   ```javascript
   {
     "do_sample": false,
     "top_p": 0.1,
     "temperature": 0.1,
     "max_tokens": 2000
   }
   ```

2. **优化的提示词设计**:
   - 简洁明确的指令
   - 避免触发推理链
   - 直接要求翻译结果

3. **智能语言检测**:
   - 基于字符特征的简单检测
   - 支持中文、英文、日文等主要语言

## 文件详解

### info.json

插件的配置文件，定义了插件的基本信息和用户可配置选项：

```json
{
  "identifier": "com.bobplugin.zhipu-nothink",
  "version": "1.0.0",
  "category": "translate",
  "name": "智谱翻译(无思考)",
  "summary": "基于智谱 GLM-4.5-Flash 的快速翻译插件，避免触发思考功能以提升翻译速度",
  "icon": "icon.png",
  "author": "Bob Plugin Developer",
  "homepage": "https://github.com/bobocai/bob-zhipu-nothink",
  "appcast": "https://raw.githubusercontent.com/bobocai/bob-zhipu-nothink/main/appcast.json",
  "minBobVersion": "0.5.0",
  "options": [
    // 用户配置选项
  ]
}
```

### main.js

主要的业务逻辑文件，包含以下核心函数：

#### translate(query, completion)

主翻译函数，处理翻译请求：

```javascript
function translate(query, completion) {
    const { text, from, to } = query;
    
    // 参数验证
    if (!text || !text.trim()) {
        completion({ error: { type: 'param', message: '翻译文本不能为空' } });
        return;
    }
    
    // API 调用
    callZhipuAPI(text, from, to, completion);
}
```

#### callZhipuAPI(text, from, to, completion)

调用智谱 AI API 的核心函数：

```javascript
function callZhipuAPI(text, from, to, completion) {
    const apiKey = $option.apiKey;
    const model = $option.model || 'glm-4-flash';
    
    // 构建请求体
    const requestBody = {
        model: model,
        messages: [{
            role: 'user',
            content: buildTranslationPrompt(text, from, to)
        }],
        // 关键参数：避免触发思考
        do_sample: false,
        top_p: 0.1,
        temperature: parseFloat($option.temperature) || 0.1,
        max_tokens: 2000
    };
    
    // 发送请求
    $http.request({
        method: 'POST',
        url: ZHIPU_API_BASE + '/chat/completions',
        header: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: requestBody
    }).then(response => {
        // 处理响应
    }).catch(error => {
        // 错误处理
    });
}
```

#### buildTranslationPrompt(text, from, to)

构建翻译提示词：

```javascript
function buildTranslationPrompt(text, from, to) {
    const customPrompt = $option.customPrompt;
    
    if (customPrompt && customPrompt.trim()) {
        return customPrompt
            .replace(/\{text\}/g, text)
            .replace(/\{from\}/g, getLanguageName(from))
            .replace(/\{to\}/g, getLanguageName(to));
    }
    
    // 默认优化提示词
    return `直接翻译以下文本到${getLanguageName(to)}，只返回翻译结果：\n\n${text}`;
}
```

### lang.js

语言映射和工具函数：

```javascript
// 语言代码到名称的映射
const langMap = {
    'auto': '自动检测',
    'zh-Hans': '简体中文',
    'zh-Hant': '繁体中文',
    'en': '英语',
    'ja': '日语',
    // ... 更多语言
};

// 获取语言名称
function getLanguageName(langCode) {
    return langMap[langCode] || langCode;
}

// 获取支持的语言列表
function getSupportedLanguages() {
    return Object.keys(langMap);
}

// 检查是否支持某种语言
function isLanguageSupported(langCode) {
    return langCode in langMap;
}
```

## 核心优化策略

### 1. API 参数优化

通过以下参数配置避免触发思考功能：

- `do_sample: false` - 禁用采样，使用确定性输出
- `top_p: 0.1` - 限制候选词范围，提高确定性
- `temperature: 0.1` - 降低随机性，提高一致性
- `max_tokens: 2000` - 限制输出长度，避免冗长回复

### 2. 提示词优化

- 使用简洁直接的指令
- 避免要求解释或推理
- 明确指定只返回翻译结果
- 不使用"请思考"、"分析"等触发词

### 3. 错误处理策略

```javascript
// 统一错误处理
function handleError(error, completion) {
    let errorType = 'unknown';
    let errorMessage = '翻译失败';
    
    if (error.response) {
        const status = error.response.statusCode;
        if (status === 401) {
            errorType = 'secretKey';
            errorMessage = 'API Key 无效，请检查配置';
        } else if (status === 429) {
            errorType = 'api';
            errorMessage = 'API 调用频率超限，请稍后重试';
        }
        // ... 更多错误类型
    }
    
    completion({
        error: {
            type: errorType,
            message: errorMessage,
            addition: error.localizedDescription
        }
    });
}
```

## 开发环境设置

### 1. 环境要求

- macOS 系统
- Bob 翻译软件 (>= 0.5.0)
- 文本编辑器或 IDE
- 智谱 AI API Key

### 2. 开发流程

1. **克隆项目**:
   ```bash
   git clone https://github.com/bobocai/bob-zhipu-nothink.git
   cd bob-zhipu-nothink
   ```

2. **修改代码**:
   - 编辑 `src/` 目录下的文件
   - 测试功能逻辑

3. **构建插件**:
   ```bash
   ./build.sh
   ```

4. **安装测试**:
   - 双击生成的 `.bobplugin` 文件
   - 在 Bob 中配置和测试

5. **调试**:
   - 在 Bob 偏好设置中开启日志
   - 查看控制台输出
   - 使用 `console.log()` 调试

### 3. 调试技巧

```javascript
// 在代码中添加调试信息
console.log('API Request:', requestBody);
console.log('API Response:', response);

// 使用 Bob 的错误回调
completion({
    error: {
        type: 'unknown',
        message: '调试信息: ' + JSON.stringify(debugData)
    }
});
```

## 测试策略

### 1. 功能测试

- **基本翻译**: 测试中英文互译
- **多语言**: 测试各种语言组合
- **长文本**: 测试长段落翻译
- **特殊字符**: 测试包含特殊符号的文本
- **错误处理**: 测试各种错误场景

### 2. 性能测试

- **响应速度**: 对比其他翻译服务
- **并发处理**: 测试多个翻译请求
- **网络异常**: 测试网络中断恢复

### 3. 兼容性测试

- **Bob 版本**: 测试不同 Bob 版本
- **macOS 版本**: 测试不同系统版本
- **API 变更**: 测试 API 接口变化

## 发布流程

### 1. 版本准备

1. 更新版本号（`info.json`）
2. 更新变更日志
3. 测试所有功能
4. 构建最终版本

### 2. 发布步骤

1. **构建插件**:
   ```bash
   ./build.sh
   ```

2. **更新 appcast.json**:
   ```json
   {
     "version": "1.0.1",
     "desc": "修复某某问题，新增某某功能",
     "sha256": "计算得到的哈希值",
     "url": "下载链接"
   }
   ```

3. **创建 GitHub Release**:
   - 上传 `.bobplugin` 文件
   - 编写发布说明
   - 标记版本标签

4. **更新文档**:
   - 更新 README
   - 更新用户指南
   - 更新变更日志

## 贡献指南

### 1. 代码规范

- 使用 2 空格缩进
- 函数和变量使用驼峰命名
- 添加必要的注释
- 保持代码简洁清晰

### 2. 提交规范

```
type(scope): description

[optional body]

[optional footer]
```

类型说明：
- `feat`: 新功能
- `fix`: 修复 bug
- `docs`: 文档更新
- `style`: 代码格式调整
- `refactor`: 代码重构
- `test`: 测试相关
- `chore`: 构建或工具相关

### 3. Pull Request

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request
5. 等待代码审查

## 常见问题

### Q: 如何添加新的语言支持？
A: 在 `lang.js` 的 `langMap` 中添加新的语言映射即可。

### Q: 如何调整 API 参数？
A: 修改 `main.js` 中 `callZhipuAPI` 函数的请求体参数。

### Q: 如何添加新的配置选项？
A: 在 `info.json` 的 `options` 数组中添加新的配置项。

### Q: 如何处理 API 接口变更？
A: 更新 `ZHIPU_API_BASE` 常量和相关的请求/响应处理逻辑。

## 技术参考

- [Bob 插件开发文档](https://bobtranslate.com/guide/advance/plugin.html)
- [智谱 AI API 文档](https://open.bigmodel.cn/dev/api)
- [GLM-4 模型说明](https://open.bigmodel.cn/dev/howuse/model)
- [JavaScript ES6+ 语法](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)

## 许可证

本项目基于 MIT 许可证开源，详见 [LICENSE](../LICENSE) 文件。

---

**欢迎贡献代码，让插件变得更好！** 🚀