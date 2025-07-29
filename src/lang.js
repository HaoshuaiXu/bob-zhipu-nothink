/**
 * 语言映射文件
 * 用于将语言代码映射为可读的语言名称
 */

/**
 * 语言映射表
 */
const langMap = new Map([
    ['auto', '自动检测'],
    ['zh-Hans', '简体中文'],
    ['zh-Hant', '繁体中文'],
    ['en', '英语'],
    ['ja', '日语'],
    ['ko', '韩语'],
    ['fr', '法语'],
    ['de', '德语'],
    ['es', '西班牙语'],
    ['it', '意大利语'],
    ['ru', '俄语'],
    ['pt', '葡萄牙语'],
    ['ar', '阿拉伯语'],
    ['hi', '印地语'],
    ['th', '泰语'],
    ['vi', '越南语'],
    ['id', '印尼语'],
    ['ms', '马来语'],
    ['tr', '土耳其语'],
    ['nl', '荷兰语'],
    ['pl', '波兰语'],
    ['cs', '捷克语'],
    ['sk', '斯洛伐克语'],
    ['hu', '匈牙利语'],
    ['ro', '罗马尼亚语'],
    ['bg', '保加利亚语'],
    ['hr', '克罗地亚语'],
    ['sl', '斯洛文尼亚语'],
    ['et', '爱沙尼亚语'],
    ['lv', '拉脱维亚语'],
    ['lt', '立陶宛语'],
    ['fi', '芬兰语'],
    ['sv', '瑞典语'],
    ['da', '丹麦语'],
    ['no', '挪威语'],
    ['is', '冰岛语'],
    ['el', '希腊语'],
    ['he', '希伯来语'],
    ['fa', '波斯语'],
    ['ur', '乌尔都语'],
    ['bn', '孟加拉语'],
    ['ta', '泰米尔语'],
    ['te', '泰卢固语'],
    ['ml', '马拉雅拉姆语'],
    ['kn', '卡纳达语'],
    ['gu', '古吉拉特语'],
    ['pa', '旁遮普语'],
    ['ne', '尼泊尔语'],
    ['si', '僧伽罗语'],
    ['my', '缅甸语'],
    ['km', '高棉语'],
    ['lo', '老挝语'],
    ['ka', '格鲁吉亚语'],
    ['am', '阿姆哈拉语'],
    ['sw', '斯瓦希里语'],
    ['zu', '祖鲁语'],
    ['af', '南非荷兰语'],
    ['sq', '阿尔巴尼亚语'],
    ['az', '阿塞拜疆语'],
    ['be', '白俄罗斯语'],
    ['bs', '波斯尼亚语'],
    ['eu', '巴斯克语'],
    ['gl', '加利西亚语'],
    ['ga', '爱尔兰语'],
    ['mk', '马其顿语'],
    ['mt', '马耳他语'],
    ['mn', '蒙古语'],
    ['sr', '塞尔维亚语'],
    ['uk', '乌克兰语'],
    ['cy', '威尔士语'],
    ['yi', '意第绪语']
]);

/**
 * 获取语言名称
 * @param {string} langCode 语言代码
 * @returns {string} 语言名称
 */
function getLanguageName(langCode) {
    return langMap.get(langCode) || langCode;
}

/**
 * 获取所有支持的语言
 * @returns {Array} 语言代码数组
 */
function getSupportedLanguages() {
    return Array.from(langMap.keys());
}

/**
 * 检查是否支持某种语言
 * @param {string} langCode 语言代码
 * @returns {boolean} 是否支持
 */
function isLanguageSupported(langCode) {
    return langMap.has(langCode);
}

// 导出
exports.langMap = langMap;
exports.getLanguageName = getLanguageName;
exports.getSupportedLanguages = getSupportedLanguages;
exports.isLanguageSupported = isLanguageSupported;