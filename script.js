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
  { clothNo: "ZJ14299A", cf: 5.13344 },
  { clothNo: "OD03186A", cf: 2.86523 }
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
  const found = clothData.find(item => item.clothNo === clothNo);
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
    weightInput.value = calcWeight.toFixed(2);
    resultEl.textContent = `计算完成：${length}M ÷ ${cf} = ${calcWeight.toFixed(2)}KG`;
  } else if (type === 'weight' && weight > 0) {
    const calcLength = weight * cf;
    lengthInput.value = calcLength.toFixed(2);
    resultEl.textContent = `计算完成：${weight}KG × ${cf} = ${calcLength.toFixed(2)}M`;
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
  if (clothData.some(item => item.clothNo === clothNo)) {
    alert('该布号已存在');
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