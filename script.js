<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TOPT 布号计算器</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    <style>
        .rotate-180 {
            transform: rotate(180deg);
        }
        .transition-all {
            transition: all 0.3s ease;
        }
    </style>
</head>
<body class="bg-gray-50 min-h-screen">
    <div class="max-w-4xl mx-auto p-4">
        <!-- 标题栏 -->
        <div class="bg-blue-600 text-white rounded-lg p-4 mb-6 shadow-lg">
            <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                    <i class="fas fa-calculator text-2xl"></i>
                    <h1 class="text-2xl font-bold">TOPT 布号计算器</h1>
                </div>
                <div class="text-sm">
                    <span>作者：刘洋 | 部门：CPO</span>
                </div>
            </div>
        </div>

        <!-- 计算器主体 -->
        <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
            <!-- 布号输入 -->
            <div class="mb-6 relative">
                <label class="block text-sm font-medium text-gray-700 mb-2">布号(8位，如ZJ14299A)</label>
                <input type="text" id="clothNo" maxlength="8" 
                       class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                       placeholder="请输入8位布号">
                <span id="clothValid" class="hidden absolute right-3 top-3 text-sm"></span>
            </div>

            <!-- C/F值显示 -->
            <div class="mb-6">
                <label class="block text-sm font-medium text-gray-700 mb-2">C/F值</label>
                <div id="cfValue" class="px-3 py-2 bg-gray-100 rounded-md text-gray-600">未查询到</div>
            </div>

            <!-- 米长和重量输入 -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">
                        <i class="fas fa-arrow-left text-blue-500 mr-1"></i>米长 (M)
                    </label>
                    <input type="text" id="length" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="输入米长">
                </div>
                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-2">重量 (KG)</label>
                    <input type="text" id="weight" 
                           class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                           placeholder="输入重量">
                </div>
            </div>

            <!-- 结果显示 -->
            <div id="result" class="bg-green-50 border border-green-200 rounded-md p-3 text-green-700 min-h-[3rem]"></div>
        </div>

        <!-- 布号配置管理 -->
        <div class="bg-white rounded-lg shadow-lg">
            <div id="configToggle" class="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-50">
                <div class="flex items-center justify-between">
                    <h2 class="text-lg font-semibold text-gray-800">布号配置管理</h2>
                    <i id="configIcon" class="fas fa-chevron-down transition-all"></i>
                </div>
            </div>

            <div id="configPanel" class="hidden p-4">
                <!-- 添加新布号 -->
                <div class="mb-6 p-4 bg-gray-50 rounded-lg">
                    <h3 class="text-md font-medium text-gray-700 mb-3">添加新布号配置</h3>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">布号</label>
                            <input type="text" id="newClothNo" maxlength="8" 
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="8位布号">
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">C/F值</label>
                            <input type="number" id="newCF" step="0.000001"
                                   class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                   placeholder="C/F值">
                        </div>
                        <div class="flex items-end">
                            <button id="addClothBtn" 
                                    class="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <i class="fas fa-plus mr-1"></i>添加配置
                            </button>
                        </div>
                    </div>
                </div>

                <!-- 配置列表 -->
                <div>
                    <div class="flex justify-between items-center mb-3">
                        <h3 class="text-md font-medium text-gray-700">当前配置列表</h3>
                        <span class="text-sm text-gray-500">共 <span id="clothCount">0</span> 个布号配置</span>
                    </div>
                    <div class="overflow-x-auto">
                        <table class="w-full border-collapse">
                            <thead>
                                <tr class="bg-gray-100">
                                    <th class="px-3 py-2 text-left text-sm font-medium text-gray-700 border-b">布号</th>
                                    <th class="px-3 py-2 text-left text-sm font-medium text-gray-700 border-b">C/F值</th>
                                    <th class="px-3 py-2 text-center text-sm font-medium text-gray-700 border-b">操作</th>
                                </tr>
                            </thead>
                            <tbody id="clothList">
                                <!-- 配置列表将通过JavaScript动态生成 -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // 布号配置数据
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

        // 页面初始化函数
        function initializeApp() {
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
            const addClothBtn = document.getElementById('addClothBtn');

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
                    clearResults();
                } else {
                    clothValidEl.className = 'hidden';
                    cfValueEl.textContent = '未查询到';
                    clearResults();
                }
            });

            // 查询C/F值
            function queryCFValue(clothNo) {
                const found = clothData.find(item => item.clothNo.toUpperCase() === clothNo.toUpperCase());
                if (found) {
                    cfValueEl.textContent = found.cf;
                    if (lengthInput.value) calculate('length');
                    if (weightInput.value) calculate('weight');
                } else {
                    cfValueEl.textContent = '未查询到';
                    resultEl.textContent = '该布号未配置，请先添加配置';
                    clearInputs();
                }
            }

            // 计算逻辑
            lengthInput.addEventListener('input', () => calculate('length'));
            weightInput.addEventListener('input', () => calculate('weight'));

            function calculate(type) {
                const clothNo = clothNoInput.value.trim();
                const cfText = cfValueEl.textContent;
                
                if (!clothNo || clothNo.length !== 8) {
                    resultEl.textContent = '请先输入8位布号';
                    return;
                }
                
                if (cfText === '未查询到' || isNaN(parseFloat(cfText))) {
                    resultEl.textContent = '该布号C/F值无效';
                    return;
                }
                
                const cf = parseFloat(cfText);
                const length = parseFloat(lengthInput.value) || 0;
                const weight = parseFloat(weightInput.value) || 0;

                if (type === 'length' && length > 0) {
                    const calcWeight = Math.round(length / cf);
                    weightInput.value = calcWeight;
                    resultEl.textContent = `计算完成：${length.toLocaleString()}M ÷ ${cf} = ${calcWeight.toLocaleString()}KG`;
                } else if (type === 'weight' && weight > 0) {
                    const calcLength = Math.round(weight * cf);
                    lengthInput.value = calcLength;
                    resultEl.textContent = `计算完成：${weight.toLocaleString()}KG × ${cf} = ${calcLength.toLocaleString()}M`;
                } else if (length === 0 && weight === 0) {
                    resultEl.textContent = '';
                }
            }

            // 清空结果
            function clearResults() {
                resultEl.textContent = '';
                clearInputs();
            }

            // 清空输入框
            function clearInputs() {
                lengthInput.value = '';
                weightInput.value = '';
            }

            // 配置表管理
            addClothBtn.addEventListener('click', addCloth);

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
                if (clothData.some(item => item.clothNo.toUpperCase() === clothNo.toUpperCase())) {
                    alert('该布号已存在（不区分大小写）');
                    return;
                }

                clothData.push({ clothNo: clothNo.toUpperCase(), cf: parseFloat(cf) });
                renderClothList();
                newClothNo.value = '';
                newCF.value = '';
                
                // 如果当前输入的布号匹配新添加的布号，更新C/F值显示
                if (clothNoInput.value.toUpperCase() === clothNo.toUpperCase()) {
                    cfValueEl.textContent = parseFloat(cf);
                    if (lengthInput.value) calculate('length');
                    if (weightInput.value) calculate('weight');
                }
            }

            function deleteCloth(index) {
                const clothToDelete = clothData[index];
                if (confirm(`确定删除布号【${clothToDelete.clothNo}】吗？`)) {
                    clothData.splice(index, 1);
                    renderClothList();
                    // 如果删除的是当前选中的布号，清空相关显示
                    if (clothNoInput.value.toUpperCase() === clothToDelete.clothNo.toUpperCase()) {
                        cfValueEl.textContent = '未查询到';
                        resultEl.textContent = '该布号配置已被删除';
                        clearInputs();
                    }
                }
            }

            function renderClothList() {
                clothList.innerHTML = '';
                // 按布号排序
                clothData.sort((a, b) => a.clothNo.localeCompare(b.clothNo));
                
                clothData.forEach((item, index) => {
                    const row = document.createElement('tr');
                    row.className = 'border-b border-gray-100 hover:bg-gray-50';
                    row.innerHTML = `
                        <td class="px-3 py-2 font-mono">${item.clothNo}</td>
                        <td class="px-3 py-2">${item.cf}</td>
                        <td class="px-3 py-2 text-center">
                            <button onclick="window.deleteCloth(${index})" class="text-red-500 hover:text-red-700 px-2 py-1 rounded">
                                <i class="fas fa-trash"></i>
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

            // 将deleteCloth函数暴露到全局作用域
            window.deleteCloth = deleteCloth;

            // 初始化配置列表
            renderClothList();
        }

        // 页面加载完成后初始化
        document.addEventListener('DOMContentLoaded', function() {
            initializeApp();
        });
    </script>
</body>
</html>
