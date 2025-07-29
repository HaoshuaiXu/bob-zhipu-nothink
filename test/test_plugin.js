/**
 * Bob 智谱翻译插件测试脚本
 * 用于验证插件的基本功能和 API 调用
 */

// 模拟 Bob 环境
const mockBobEnvironment = {
  $option: {
    apiKey: 'test-api-key',
    model: 'glm-4-flash',
    customPrompt: '',
    temperature: '0.1',
    timeout: '10'
  },
  $http: {
    request: function(config) {
      console.log('Mock HTTP Request:', JSON.stringify(config, null, 2));
      return Promise.resolve({
        data: {
          choices: [{
            message: {
              content: 'Hello World (测试翻译结果)'
            }
          }]
        }
      });
    }
  }
};

// 加载插件代码
function loadPlugin() {
  // 这里应该加载实际的插件文件
  // 由于是测试环境，我们模拟主要函数
  
  const langMap = {
    'auto': '自动检测',
    'zh-Hans': '简体中文',
    'zh-Hant': '繁体中文',
    'en': '英语',
    'ja': '日语',
    'ko': '韩语',
    'fr': '法语',
    'de': '德语',
    'es': '西班牙语',
    'it': '意大利语',
    'ru': '俄语',
    'pt': '葡萄牙语',
    'ar': '阿拉伯语'
  };
  
  function getLanguageName(langCode) {
    return langMap[langCode] || langCode;
  }
  
  function detectLanguage(text) {
    if (/[\u4e00-\u9fff]/.test(text)) {
      return 'zh-Hans';
    } else if (/[\u3040-\u309f\u30a0-\u30ff]/.test(text)) {
      return 'ja';
    } else if (/[\uac00-\ud7af]/.test(text)) {
      return 'ko';
    } else {
      return 'en';
    }
  }
  
  function buildTranslationPrompt(text, from, to) {
    const customPrompt = mockBobEnvironment.$option.customPrompt;
    
    if (customPrompt && customPrompt.trim()) {
      return customPrompt
        .replace(/\{text\}/g, text)
        .replace(/\{from\}/g, getLanguageName(from))
        .replace(/\{to\}/g, getLanguageName(to));
    }
    
    return `直接翻译以下文本到${getLanguageName(to)}，只返回翻译结果：\n\n${text}`;
  }
  
  function translate(query, completion) {
    const { text, from, to } = query;
    
    console.log('翻译请求:', { text, from, to });
    
    // 参数验证
    if (!text || !text.trim()) {
      completion({ error: { type: 'param', message: '翻译文本不能为空' } });
      return;
    }
    
    // 语言检测
    const detectedFrom = from === 'auto' ? detectLanguage(text) : from;
    console.log('检测到的源语言:', detectedFrom);
    
    // 构建提示词
    const prompt = buildTranslationPrompt(text, detectedFrom, to);
    console.log('构建的提示词:', prompt);
    
    // 构建请求体
    const requestBody = {
      model: mockBobEnvironment.$option.model || 'glm-4-flash',
      messages: [{
        role: 'user',
        content: prompt
      }],
      do_sample: false,
      top_p: 0.1,
      temperature: parseFloat(mockBobEnvironment.$option.temperature) || 0.1,
      max_tokens: 2000
    };
    
    console.log('API 请求体:', JSON.stringify(requestBody, null, 2));
    
    // 模拟 API 调用
    mockBobEnvironment.$http.request({
      method: 'POST',
      url: 'https://open.bigmodel.cn/api/paas/v4/chat/completions',
      header: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${mockBobEnvironment.$option.apiKey}`
      },
      body: requestBody
    }).then(response => {
      console.log('API 响应:', response);
      
      const result = response.data.choices[0].message.content.trim();
      completion({
        result: {
          from: detectedFrom,
          to: to,
          toParagraphs: [result]
        }
      });
    }).catch(error => {
      console.error('API 错误:', error);
      completion({
        error: {
          type: 'api',
          message: '翻译失败: ' + error.message
        }
      });
    });
  }
  
  function supportLanguages() {
    return Object.keys(langMap);
  }
  
  return { translate, supportLanguages };
}

// 测试用例
function runTests() {
  console.log('=== Bob 智谱翻译插件测试开始 ===\n');
  
  const plugin = loadPlugin();
  
  // 测试 1: 中文到英文
  console.log('测试 1: 中文到英文翻译');
  plugin.translate(
    { text: '你好，世界！', from: 'auto', to: 'en' },
    (result) => {
      console.log('翻译结果:', result);
      console.log('\n');
    }
  );
  
  // 测试 2: 英文到中文
  console.log('测试 2: 英文到中文翻译');
  plugin.translate(
    { text: 'Hello, World!', from: 'en', to: 'zh-Hans' },
    (result) => {
      console.log('翻译结果:', result);
      console.log('\n');
    }
  );
  
  // 测试 3: 空文本处理
  console.log('测试 3: 空文本处理');
  plugin.translate(
    { text: '', from: 'auto', to: 'en' },
    (result) => {
      console.log('错误处理结果:', result);
      console.log('\n');
    }
  );
  
  // 测试 4: 支持的语言列表
  console.log('测试 4: 支持的语言列表');
  const languages = plugin.supportLanguages();
  console.log('支持的语言:', languages);
  console.log('语言数量:', languages.length);
  
  console.log('\n=== 测试完成 ===');
}

// 运行测试
if (typeof module !== 'undefined' && module.exports) {
  // Node.js 环境
  module.exports = { loadPlugin, runTests };
} else {
  // 浏览器环境
  runTests();
}

// 如果直接运行此文件
if (require.main === module) {
  runTests();
}