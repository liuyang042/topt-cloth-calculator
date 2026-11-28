// ==================== 页面元素获取 ====================
const clothNoInput = document.getElementById('clothNo');
const cfValueEl = document.getElementById('cfValue');
const copyCfBtn = document.getElementById('copyCfBtn');
const lengthInput = document.getElementById('length');
const weightInput = document.getElementById('weight');
const resultEl = document.getElementById('result');
const configToggle = document.getElementById('configToggle');
const configPanel = document.getElementById('configPanel');
const configIcon = document.getElementById('configIcon');
const clothCountEl = document.getElementById('clothCount');
const clothValidEl = document.getElementById('clothValid');
const newClothNo = document.getElementById('newClothNo');
const newCF = document.getElementById('newCF');
const clothList = document.getElementById('clothList');
const configSearch = document.getElementById('configSearch');
const configEmpty = document.getElementById('configEmpty');
const suggestBox = document.getElementById('suggestBox');   // 模糊查询下拉容器
const recentWrap = document.getElementById('recentWrap');
const recentChips = document.getElementById('recentChips');

// ==================== 布号配置数据（内置默认值）====================
const DEFAULT_CLOTH_DATA = [
  { clothNo: "OD03186A", cf: 2.631952 }, { clothNo: "OJ06827A", cf: 5.579954 },
  { clothNo: "OJ08247A", cf: 2.973133 }, { clothNo: "OJ08248A", cf: 2.828389 },
  { clothNo: "OJ08349A", cf: 3.626297 }, { clothNo: "OJ08415A", cf: 2.973133 },
  { clothNo: "OR05890A", cf: 2.471601 }, { clothNo: "YH00052A", cf: 3.128636 },
  { clothNo: "YH00064A", cf: 3.128636 }, { clothNo: "ZH00050A", cf: 2.278241 },
  { clothNo: "ZH00063A", cf: 2.278241 }, { clothNo: "ZH00052A", cf: 3.128636 },
  { clothNo: "ZH00064A", cf: 3.128636 }, { clothNo: "ZH00065A", cf: 3.128636 },
  { clothNo: "ZHP0026A", cf: 2.676390 }, { clothNo: "ZHP0041A", cf: 2.585356 },
  { clothNo: "ZHP0045A", cf: 2.585356 }, { clothNo: "ZHP0051A", cf: 2.702433 },
  { clothNo: "ZJ13848A", cf: 4.643133 }, { clothNo: "ZJ13973A", cf: 4.133650 },
  { clothNo: "ZJ13975A", cf: 3.856239 }, { clothNo: "ZJ14148A", cf: 5.889548 },
  { clothNo: "ZJ14150A", cf: 5.846499 }, { clothNo: "ZJ14224A", cf: 5.812916 },
  { clothNo: "ZJ14239A", cf: 5.542249 }, { clothNo: "ZJ14299A", cf: 5.330976 },
  { clothNo: "ZJ15057A", cf: 5.330976 }, { clothNo: "ZJ14500A", cf: 5.812916 },
  { clothNo: "ZJ14501A", cf: 5.889548 }, { clothNo: "ZJ14582A", cf: 5.812916 },
  { clothNo: "ZJ14764A", cf: 5.542249 }, { clothNo: "ZN02320A", cf: 2.749641 },
  { clothNo: "ZN02331A", cf: 2.889161 }, { clothNo: "ZN02340A", cf: 2.749641 },
  { clothNo: "ZN02342A", cf: 2.806048 }, { clothNo: "ZRP0012A", cf: 3.355431 },
  { clothNo: "ZRP0014A", cf: 4.381832 }, { clothNo: "ZRP0026A", cf: 2.997741 },
  { clothNo: "ZRP0030A", cf: 4.351556 }, { clothNo: "ZRP0035A", cf: 4.473237 },
  { clothNo: "ZJ14666A", cf: 4.976888 }, { clothNo: "ZJ14864A", cf: 5.812916 },
  { clothNo: "OD03458A", cf: 2.631952 }, { clothNo: "OJ09107A", cf: 5.579954 },
  { clothNo: "OR06195A", cf: 2.327745 }, { clothNo: "ZA03573A", cf: 4.424922 },
  { clothNo: "ZH00081A", cf: 3.939295 }, { clothNo: "ZHP0075A", cf: 2.643807 },
  { clothNo: "ZHP0078A", cf: 2.650465 }, { clothNo: "ZHP0100A", cf: 2.676390 },
  { clothNo: "ZJ14429A", cf: 4.133650 }, { clothNo: "ZJ15249A", cf: 5.812916 },
  { clothNo: "ZJ15250A", cf: 5.542249 }, { clothNo: "ZJ15283A", cf: 4.976888 },
  { clothNo: "ZJH0033A", cf: 6.111378 }, { clothNo: "ZJH0034A", cf: 6.111378 },
  { clothNo: "ZJH0035A", cf: 6.111378 }, { clothNo: "ZJM0411C", cf: 3.821148 },
  { clothNo: "ZRP0033A", cf: 2.976208 }, { clothNo: "ZRP0034A", cf: 3.432779 },
  { clothNo: "ZRP0037A", cf: 4.351556 }, { clothNo: "ZRP0038A", cf: 4.351556 },
  { clothNo: "ZJH0037A", cf: 6.111378 }, { clothNo: "ZJ15277A", cf: 3.796446 },
  { clothNo: "ZH00089A", cf: 3.128636 }, { clothNo: "ZH00090A", cf: 3.128636 },
  { clothNo: "ZH00091A", cf: 2.278241 }, { clothNo: "ZH00092A", cf: 3.939295 },
  { clothNo: "ZHP0131A", cf: 2.676390 }, { clothNo: "ZHP0132A", cf: 2.702433 },
  { clothNo: "ZJ15503A", cf: 5.330976 }
];

// ==================== 本地持久化 ====================
const STORAGE_KEY = 'topt_cloth_data_v1';
let clothData = loadClothData();

function loadClothData() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const arr = JSON.parse(saved);
      if (Array.isArray(arr) && arr.length) return arr;
    }
  } catch (e) { /* 数据异常时回退默认 */ }
  return DEFAULT_CLOTH_DATA.slice();
}
function saveClothData() {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(clothData)); } catch (e) {}
}
function resetToDefault() {
  if (confirm('确定恢复为出厂默认配置吗？你新增的布号将被清除。')) {
    clothData = DEFAULT_CLOTH_DATA.slice();
    saveClothData();
    renderClothList();
    toast('已恢复默认配置', 'info');
  }
}

// ==================== Toast 通知（替代阻塞式 alert）====================
function toast(msg, type) {
  type = type || 'info';
  const wrap = document.getElementById('toastWrap');
  const el = document.createElement('div');
  el.className = 'toast ' + type;
  const icon = type === 'success' ? 'fa-check-circle'
             : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle';
  el.innerHTML = '<i class="fa ' + icon + '"></i><span></span>';
  el.querySelector('span').textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.transition = 'opacity .25s, transform .25s';
    el.style.opacity = '0'; el.style.transform = 'translateY(-8px)';
    setTimeout(() => el.remove(), 250);
  }, 2200);
}

// ==================== 结果横幅（替代纯文本提示）====================
function setResult(type, msg) {
  if (!type) { resultEl.className = 'hidden'; resultEl.innerHTML = ''; return; }
  const map = {
    success: ['bg-green-50 text-green-700', 'fa-check-circle'],
    warn:    ['bg-amber-50 text-amber-700',   'fa-exclamation-triangle'],
    error:   ['bg-red-50 text-red-700',        'fa-times-circle']
  };
  const [cls, icon] = map[type] || map.success;
  resultEl.className = 'flex items-center gap-2 mt-2 px-4 py-3 rounded-lg text-sm font-medium ' + cls;
  resultEl.innerHTML = '<i class="fa ' + icon + '"></i><span></span>';
  resultEl.querySelector('span').textContent = msg;
}

// ==================== 配置面板折叠/展开 ====================
configToggle.addEventListener('click', () => {
  const hidden = configPanel.classList.toggle('hidden');
  configIcon.classList.toggle('rotate-180');
  configToggle.setAttribute('aria-expanded', String(!hidden));
  updateClothCount();
});

// ==================== 布号模糊查询 ====================
let suggestMatches = [];   // 当前候选列表
let activeIndex = -1;      // 键盘高亮索引

clothNoInput.addEventListener('input', () => {
  // 输入自动转大写，避免大小写带来的匹配困扰
  const pos = clothNoInput.selectionStart;
  clothNoInput.value = clothNoInput.value.toUpperCase();
  try { clothNoInput.setSelectionRange(pos, pos); } catch (e) {}

  const keyword = clothNoInput.value.trim();

  if (keyword.length === 0) {
    hideSuggest();
    clothValidEl.className = 'hidden';
    cfValueEl.textContent = '未查询到';
    toggleCopyCf(false);
    setResult('');
    return;
  }

  // 优先「8位精确匹配」——保持原有逻辑：命中即直接显示并计算
  const exact = clothData.find(it => it.clothNo.toUpperCase() === keyword);
  if (keyword.length === 8 && exact) {
    hideSuggest();
    clothValidEl.textContent = '\u2713 已匹配';
    clothValidEl.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-500';
    queryCFValue(exact.clothNo);
    return;
  }

  // 否则做「模糊匹配」：输入是布号的子串即命中（不区分大小写）
  const matches = clothData.filter(it => it.clothNo.toUpperCase().includes(keyword));
  renderSuggest(matches, keyword);

  if (matches.length > 0) {
    clothValidEl.textContent = matches.length + ' 条匹配';
    clothValidEl.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-500';
    cfValueEl.textContent = '请从下拉中选择';
    toggleCopyCf(false);
  } else {
    clothValidEl.textContent = '未匹配到';
    clothValidEl.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-sm text-red-500';
    cfValueEl.textContent = '未查询到';
    toggleCopyCf(false);
  }
});

function renderSuggest(matches, keyword) {
  suggestMatches = matches;
  activeIndex = -1;
  if (matches.length === 0) { suggestBox.classList.add('hidden'); return; }
  suggestBox.innerHTML = '';
  const limit = 50;
  matches.slice(0, limit).forEach((it, i) => {
    const div = document.createElement('div');
    div.className = 'suggest-item px-4 py-2 cursor-pointer flex items-center justify-between';
    div.dataset.index = i;
    div.setAttribute('role', 'option');
    div.innerHTML = '<span>' + highlight(it.clothNo, keyword) + '</span>'
                  + '<span class="text-xs text-gray-400">C/F ' + it.cf + '</span>';
    div.addEventListener('mousedown', (e) => { e.preventDefault(); chooseSuggestion(i); });
    suggestBox.appendChild(div);
  });
  if (matches.length > limit) {
    const more = document.createElement('div');
    more.className = 'px-4 py-1 text-xs text-gray-400 text-center';
    more.textContent = '还有 ' + (matches.length - limit) + ' 条，请继续输入缩小范围';
    suggestBox.appendChild(more);
  }
  suggestBox.classList.remove('hidden');
}

function highlight(text, keyword) {
  const idx = text.toUpperCase().indexOf(keyword.toUpperCase());
  if (idx === -1) return text;
  return text.slice(0, idx) + '<b class="text-primary font-bold">'
       + text.slice(idx, idx + keyword.length) + '</b>' + text.slice(idx + keyword.length);
}

function chooseSuggestion(i) {
  const it = suggestMatches[i];
  if (!it) return;
  clothNoInput.value = it.clothNo;
  clothValidEl.textContent = '\u2713 已匹配';
  clothValidEl.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-500';
  hideSuggest();
  queryCFValue(it.clothNo);
  lengthInput.focus();   // 选完布号自动跳到米长，加速录入流转
}

function hideSuggest() {
  suggestBox.classList.add('hidden');
  suggestBox.innerHTML = '';
  suggestMatches = [];
  activeIndex = -1;
}

// 键盘操作：↑↓ 选择、Enter 确认、Esc 关闭
clothNoInput.addEventListener('keydown', (e) => {
  if (suggestBox.classList.contains('hidden')) return;
  const max = suggestMatches.length - 1;
  if (e.key === 'ArrowDown') { e.preventDefault(); activeIndex = Math.min(activeIndex + 1, max); highlightActive(); }
  else if (e.key === 'ArrowUp') { e.preventDefault(); activeIndex = Math.max(activeIndex - 1, 0); highlightActive(); }
  else if (e.key === 'Enter') {
    if (activeIndex >= 0) { e.preventDefault(); chooseSuggestion(activeIndex); }
    else if (suggestMatches.length >= 1) { e.preventDefault(); chooseSuggestion(0); }
  } else if (e.key === 'Escape') { hideSuggest(); }
});
function highlightActive() {
  const items = suggestBox.querySelectorAll('.suggest-item');
  items.forEach((el, i) => el.classList.toggle('bg-blue-50', i === activeIndex));
}

// 点击输入框以外区域收起下拉
document.addEventListener('click', (e) => {
  if (e.target !== clothNoInput && !suggestBox.contains(e.target)) hideSuggest();
});

// ==================== C/F 复制按钮 ====================
function toggleCopyCf(show) {
  copyCfBtn.className = show
    ? 'flex items-center gap-1 text-xs text-gray-400 hover:text-primary'
    : 'hidden';
}
function copyCF() {
  const v = cfValueEl.textContent;
  if (!v || v === '未查询到' || isNaN(parseFloat(v))) return;
  const done = () => toast('已复制 C/F 值：' + v, 'success');
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(v).then(done).catch(() => fallbackCopy(v, done));
  } else { fallbackCopy(v, done); }
}
function fallbackCopy(text, done) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); done(); } catch (e) {}
  ta.remove();
}

// ==================== 最近查询 ====================
const RECENT_KEY = 'topt_recent_v1';
let recentList = loadRecent();

function loadRecent() {
  try {
    const saved = localStorage.getItem(RECENT_KEY);
    if (saved) { const arr = JSON.parse(saved); if (Array.isArray(arr)) return arr.slice(0, 6); }
  } catch (e) {}
  return [];
}
function saveRecent() { try { localStorage.setItem(RECENT_KEY, JSON.stringify(recentList)); } catch (e) {} }
function addRecent(clothNo) {
  const key = clothNo.toUpperCase();
  recentList = recentList.filter(x => x.toUpperCase() !== key);
  recentList.unshift(key);
  if (recentList.length > 6) recentList = recentList.slice(0, 6);
  saveRecent();
  renderRecent();
}
function renderRecent() {
  recentWrap.classList.toggle('hidden', recentList.length === 0);
  recentChips.innerHTML = '';
  recentList.forEach(no => {
    const chip = document.createElement('span');
    chip.className = 'chip';
    chip.innerHTML = '<i class="fa fa-bolt"></i>';
    chip.appendChild(document.createTextNode(no));
    chip.addEventListener('click', () => chooseRecent(no));
    recentChips.appendChild(chip);
  });
}
function chooseRecent(no) {
  clothNoInput.value = no;
  clothValidEl.textContent = '\u2713 已匹配';
  clothValidEl.className = 'absolute right-3 top-1/2 -translate-y-1/2 text-sm text-green-500';
  hideSuggest();
  queryCFValue(no);
  lengthInput.focus();
}
function clearRecent() {
  recentList = []; saveRecent(); renderRecent();
}

// ==================== 查询C/F值 ====================
function queryCFValue(clothNo) {
  const found = clothData.find(item => item.clothNo.toUpperCase() === clothNo.toUpperCase());
  if (found) {
    cfValueEl.textContent = found.cf;
    toggleCopyCf(true);
    addRecent(clothNo);
    setResult('');
    if (lengthInput.value) calculate('length');
    else if (weightInput.value) calculate('weight');
  } else {
    cfValueEl.textContent = '未查询到';
    toggleCopyCf(false);
    setResult('warn', '该布号未配置，请先添加配置');
  }
}

// ==================== 计算逻辑 ====================
lengthInput.addEventListener('input', () => { calculate('length'); updateFieldClearButtons(); });
weightInput.addEventListener('input', () => { calculate('weight'); updateFieldClearButtons(); });

function calculate(type) {
  const clothNo = clothNoInput.value.trim();
  const cf = parseFloat(cfValueEl.textContent);
  const length = parseFloat(lengthInput.value) || 0;
  const weight = parseFloat(weightInput.value) || 0;

  if (!clothNo || clothNo.length !== 8) { setResult('warn', '请先输入完整布号'); return; }
  if (isNaN(cf) || cf <= 0) { setResult('error', '该布号C/F值无效'); return; }

  if (type === 'length' && length > 0) {
    const calcWeight = Math.round(length / cf);
    weightInput.value = calcWeight;
    setResult('success', '计算完成：' + length + 'M ÷ ' + cf + ' = ' + calcWeight + 'KG');
  } else if (type === 'weight' && weight > 0) {
    const calcLength = Math.round(weight * cf);
    lengthInput.value = calcLength;
    setResult('success', '计算完成：' + weight + 'KG × ' + cf + ' = ' + calcLength + 'M');
  } else if (length === 0 && weight === 0) {
    setResult('');
  }
  updateFieldClearButtons();
}

// 字段内联清除按钮
function updateFieldClearButtons() {
  document.getElementById('clearLength').classList.toggle('show', lengthInput.value !== '');
  document.getElementById('clearWeight').classList.toggle('show', weightInput.value !== '');
}
function clearField(id) {
  if (id === 'length') lengthInput.value = '';
  else weightInput.value = '';
  if (!lengthInput.value && !weightInput.value) setResult('');
  updateFieldClearButtons();
  document.getElementById(id).focus();
}

// ==================== 配置表管理 ====================
function addCloth() {
  const clothNo = newClothNo.value.trim().toUpperCase();
  const cf = newCF.value.trim();
  if (clothNo.length !== 8) { toast('请输入8位布号', 'error'); return; }
  if (!cf || isNaN(parseFloat(cf)) || parseFloat(cf) <= 0) { toast('请输入有效的C/F值', 'error'); return; }
  if (clothData.some(item => item.clothNo.toUpperCase() === clothNo)) {
    toast('该布号已存在（不区分大小写）', 'error'); return;
  }
  clothData.push({ clothNo, cf: parseFloat(cf) });
  saveClothData();
  renderClothList();
  newClothNo.value = '';
  newCF.value = '';
  toast('已添加布号 ' + clothNo, 'success');
}

function deleteCloth(index) {
  const target = clothData[index];
  if (!target) return;
  if (confirm('确定删除布号【' + target.clothNo + '】吗？')) {
    clothData.splice(index, 1);
    saveClothData();
    renderClothList();
    // 先记录被删布号再比对，避免 splice 后索引错位漏判
    if (clothNoInput.value.trim().toUpperCase() === target.clothNo.toUpperCase()) {
      cfValueEl.textContent = '未查询到';
      toggleCopyCf(false);
    }
    toast('已删除布号 ' + target.clothNo, 'info');
  }
}

function renderClothList() {
  const kw = (configSearch.value || '').trim().toUpperCase();
  clothList.innerHTML = '';
  let shown = 0;
  clothData.forEach((item, index) => {
    if (kw && !item.clothNo.toUpperCase().includes(kw)) return;
    shown++;
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-100 hover:bg-gray-50';
    row.innerHTML =
      '<td class="px-3 py-2">' + item.clothNo + '</td>' +
      '<td class="px-3 py-2">' + item.cf + '</td>' +
      '<td class="px-3 py-2 text-center">' +
        '<button onclick="deleteCloth(' + index + ')" class="text-red-500 hover:text-red-700">' +
          '<i class="fa fa-trash"></i>' +
        '</button>' +
      '</td>';
    clothList.appendChild(row);
  });
  configEmpty.classList.toggle('hidden', shown !== 0);
  updateClothCount();
}

function updateClothCount() { clothCountEl.textContent = clothData.length; }

// ==================== 清空输入 ====================
function clearAllData() {
  clothNoInput.value = '';
  lengthInput.value = '';
  weightInput.value = '';
  cfValueEl.textContent = '未查询到';
  toggleCopyCf(false);
  setResult('');
  clothValidEl.className = 'hidden';
  hideSuggest();
  updateFieldClearButtons();
}

// ==================== 页面初始化 ====================
window.onload = function () {
  renderClothList();
  renderRecent();
  updateFieldClearButtons();
};
