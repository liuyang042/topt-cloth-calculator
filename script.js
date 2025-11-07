// 页面元素获取
const clothNoInput = document.getElementById('clothNo');
const cfValueEl = document.getElementById('cfValue');
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

// 布号配置数据（本地维护，可手动更新）
let clothData = [
  { clothNo: "OD03186A", cf: 2.631952 },
  { clothNo: "OJ06827A", cf: 5.579954 },
  { clothNo: "OJ08247A", cf: 2.973133 },
  { clothNo: "OJ08248A", cf: 2.828389 },
  { clothNo: "OJ08349A", cf: 3.626297 },
  { clothNo: "OJ08415A", cf: 2.973133 },
  { clothNo: "OR05890A", cf: 2.471601 },
  { clothNo: "YH00052A", cf: 3.128636 },
  { clothNo: "YH00064A", cf: 3.128636 },
  { clothNo: "ZH00050A", cf: 2.278241 },
  { clothNo: "ZH00063A", cf: 2.278241 },
  { clothNo: "ZH00052A", cf: 3.128636 },
  { clothNo: "ZH00064A", cf: 3.128636 },
  { clothNo: "ZHP0026A", cf: 2.676390 },
  { clothNo: "ZHP0041A", cf: 2.585356 },
  { clothNo: "ZHP0045A", cf: 2.585356 },
  { clothNo: "ZHP0051A", cf: 2.702433 },
  { clothNo: "ZJ13848A", cf: 4.643133 },
  { clothNo: "ZJ13973A", cf: 4.133650 },
  { clothNo: "ZJ13975A", cf: 3.856239 },
  { clothNo: "ZJ14148A", cf: 5.889548 },
  { clothNo: "ZJ14150A", cf: 5.846499 },
  { clothNo: "ZJ14224A", cf: 5.812916 },
  { clothNo: "ZJ14239A", cf: 5.542249 },
  { clothNo: "ZJ14299A", cf: 5.330976 },
  { clothNo: "ZJ15057A", cf: 5.330976 },
  { clothNo: "ZJ14500A", cf: 5.812916 },
  { clothNo: "ZJ14501A", cf: 5.889548 },
  { clothNo: "ZJ14582A", cf: 5.812916 },
  { clothNo: "ZJ14764A", cf: 5.542249 },
  { clothNo: "ZN02320A", cf: 2.749641 },
  { clothNo: "ZN02331A", cf: 2.889161 },
  { clothNo: "ZN02340A", cf: 2.749641 },
  { clothNo: "ZN02342A", cf: 2.806048 },
  { clothNo: "ZRP0012A", cf: 3.355431 },
  { clothNo: "ZRP0014A", cf: 4.381832 },
  { clothNo: "ZRP0026A", cf: 2.997741 },
  { clothNo: "ZRP0030A", cf: 4.351556 },
];

// 配置面板折叠/展开
configToggle.addEventListener('click', () => {
  configPanel.classList.toggle('hidden');
  configIcon.classList.toggle('rotate-180');
  updateClothCount();
});

// 布号输入验证
clothNoInput.addEventListener('input', () => {
  const value = clothNoInput.value.trim();
  if (value.length === 8) {
    clothValidEl.textContent = '✓ 格式正确';
    clothValidEl.className = 'absolute right-3 top-3 text-sm text-green-500';
    queryCFValue(value);
  } else if (value.length > 0) {
    clothValidEl.textContent = '请输入8位布号';
    clothValidEl.className = 'absolute right-3 top-3 text-sm text-red-500';
    cfValueEl.textContent = '未查询到';
  } else {
    clothValidEl.className = 'hidden';
    cfValueEl.textContent = '未查询到';
  }
});

// 查询C/F值
function queryCFValue(clothNo) {
  // 将输入的布号和配置中的布号都转为大写（或小写）后匹配
  const found = clothData.find(item => item.clothNo.toUpperCase() === clothNo.toUpperCase());
  if (found) {
    cfValueEl.textContent = found.cf;
    if (lengthInput.value) calculate('length');
    if (weightInput.value) calculate('weight');
  } else {
    cfValueEl.textContent = '未查询到';
    resultEl.textContent = '该布号未配置，请先添加配置';
  }
}

// 计算逻辑
lengthInput.addEventListener('input', () => calculate('length'));
weightInput.addEventListener('input', () => calculate('weight'));

function calculate(type) {
  const clothNo = clothNoInput.value.trim();
  const cf = parseFloat(cfValueEl.textContent);
  const length = parseFloat(lengthInput.value) || 0;
  const weight = parseFloat(weightInput.value) || 0;

  if (!clothNo || clothNo.length !== 8) {
    resultEl.textContent = '请先输入8位布号';
    return;
  }
  if (isNaN(cf) || cf <= 0) {
    resultEl.textContent = '该布号C/F值无效';
    return;
  }

  if (type === 'length' && length > 0) {
    const calcWeight = length / cf;
    weightInput.value = Math.round(calcWeight); // 取整
    resultEl.textContent = `计算完成：${length}M ÷ ${cf} = ${Math.round(calcWeight)}KG`;
  } else if (type === 'weight' && weight > 0) {
    const calcLength = weight * cf;
    lengthInput.value = Math.round(calcLength); // 取整
    resultEl.textContent = `计算完成：${weight}KG × ${cf} = ${Math.round(calcLength)}M`;
  } else if (length === 0 && weight === 0) {
    resultEl.textContent = '';
  }
}

// 配置表管理（本地维护）
function addCloth() {
  const clothNo = newClothNo.value.trim();
  const cf = newCF.value.trim();

  if (clothNo.length !== 8) {
    alert('请输入8位布号');
    return;
  }
  if (!cf || isNaN(parseFloat(cf)) || parseFloat(cf) <= 0) {
    alert('请输入有效的C/F值');
    return;
  }
  // 不区分大小写检查布号是否已存在
  if (clothData.some(item => item.clothNo.toUpperCase() === clothNo.toUpperCase())) {
    alert('该布号已存在（不区分大小写）');
    return;
  }

  clothData.push({ clothNo, cf: parseFloat(cf) });
  renderClothList();
  newClothNo.value = '';
  newCF.value = '';
}

function deleteCloth(index) {
  if (confirm(`确定删除布号【${clothData[index].clothNo}】吗？`)) {
    clothData.splice(index, 1);
    renderClothList();
    if (clothNoInput.value === clothData[index]?.clothNo) {
      cfValueEl.textContent = '未查询到';
    }
  }
}

function renderClothList() {
  clothList.innerHTML = '';
  clothData.forEach((item, index) => {
    const row = document.createElement('tr');
    row.className = 'border-b border-gray-100 hover:bg-gray-50';
    row.innerHTML = `
      <td class="px-3 py-2">${item.clothNo}</td>
      <td class="px-3 py-2">${item.cf}</td>
      <td class="px-3 py-2 text-center">
        <button onclick="deleteCloth(${index})" class="text-red-500 hover:text-red-700">
          <i class="fa fa-trash"></i>
        </button>
      </td>
    `;
    clothList.appendChild(row);
  });
  updateClothCount();
}

function updateClothCount() {
  clothCountEl.textContent = clothData.length;
}

// 页面初始化
window.onload = function() {
  renderClothList();

};
