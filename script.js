// 存储已访问的省份
let visitedProvinces = new Set();

// 中国省份总数
const totalProvinces = 34;

// 省份名称映射，确保地图数据中的省份名称能够正确映射到我们的省份名称列表中
const provinceMap = {
    '北京市': '北京',
    '天津市': '天津',
    '河北省': '河北',
    '山西省': '山西',
    '内蒙古自治区': '内蒙古',
    '辽宁省': '辽宁',
    '吉林省': '吉林',
    '黑龙江省': '黑龙江',
    '上海市': '上海',
    '江苏省': '江苏',
    '浙江省': '浙江',
    '安徽省': '安徽',
    '福建省': '福建',
    '江西省': '江西',
    '山东省': '山东',
    '河南省': '河南',
    '湖北省': '湖北',
    '湖南省': '湖南',
    '广东省': '广东',
    '广西壮族自治区': '广西',
    '海南省': '海南',
    '重庆市': '重庆',
    '四川省': '四川',
    '贵州省': '贵州',
    '云南省': '云南',
    '西藏自治区': '西藏',
    '陕西省': '陕西',
    '甘肃省': '甘肃',
    '青海省': '青海',
    '宁夏回族自治区': '宁夏',
    '新疆维吾尔自治区': '新疆',
    '香港特别行政区': '香港',
    '澳门特别行政区': '澳门',
    '台湾省': '台湾'
};

// 初始化地图
const chart = echarts.init(document.getElementById('china-map'));

// 地图配置
const option = {
    title: {
        text: '中国地图',
        left: 'center'
    },
    tooltip: {
        trigger: 'item',
        formatter: function(params) {
            return params.name + '<br/>' + (visitedProvinces.has(params.name) ? '已去过' : '未去过');
        }
    },
    visualMap: {
        type: 'piecewise',
        pieces: [
            { value: 1, color: '#52c41a', label: '已去过' },
            { value: 0, color: '#e6f7ff', label: '未去过' }
        ],
        right: 10,
        top: 'center',
        calculable: true
    },
    series: [
        {
            name: '省份',
            type: 'map',
            map: 'china',
            roam: false,
            label: {
                show: true,
                fontSize: 10
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: 12
                },
                itemStyle: {
                    areaColor: '#1890ff'
                }
            },
            data: []
        }
    ]
};

// 异步加载中国地图数据（包含省份级别）
fetch('https://cdn.jsdelivr.net/npm/echarts/map/json/china.json')
    .then(response => response.json())
    .then(data => {
        // 注册地图
        echarts.registerMap('china', data);
        // 设置地图配置
        chart.setOption(option);
        // 初始化地图数据和统计信息
        updateMapData();
        updateStats();
    })
    .catch(error => {
        console.error('加载地图数据失败:', error);
        // 显示错误信息
        const mapContainer = document.getElementById('china-map');
        mapContainer.innerHTML = '<div style="text-align: center; padding-top: 100px; color: #e74c3c;">地图加载失败，请刷新页面重试</div>';
    });

// 更新统计信息
function updateStats() {
    const visitedCount = visitedProvinces.size;
    const unvisitedCount = totalProvinces - visitedCount;
    
    document.getElementById('visited-count').textContent = visitedCount;
    document.getElementById('unvisited-count').textContent = unvisitedCount;
    
    // 更新省份列表
    updateProvincesList();
}

// 更新省份列表
function updateProvincesList() {
    const visitedContainer = document.getElementById('visited-provinces');
    const unvisitedContainer = document.getElementById('unvisited-provinces');
    
    // 清空容器
    visitedContainer.innerHTML = '';
    unvisitedContainer.innerHTML = '';
    
    // 遍历中国所有省份
    const provinces = [
        '北京', '天津', '河北', '山西', '内蒙古',
        '辽宁', '吉林', '黑龙江', '上海', '江苏',
        '浙江', '安徽', '福建', '江西', '山东',
        '河南', '湖北', '湖南', '广东', '广西',
        '海南', '重庆', '四川', '贵州', '云南',
        '西藏', '陕西', '甘肃', '青海', '宁夏',
        '新疆', '香港', '澳门', '台湾'
    ];
    
    provinces.forEach(province => {
        const provinceElement = document.createElement('span');
        provinceElement.className = `province-item ${visitedProvinces.has(province) ? 'visited-item' : 'unvisited-item'}`;
        provinceElement.textContent = province;
        
        if (visitedProvinces.has(province)) {
            visitedContainer.appendChild(provinceElement);
        } else {
            unvisitedContainer.appendChild(provinceElement);
        }
    });
}

// 创建反向省份名称映射，用于将简称映射回全称
const reverseProvinceMap = {};
for (const [fullName, shortName] of Object.entries(provinceMap)) {
    reverseProvinceMap[shortName] = fullName;
}

// 更新地图数据
function updateMapData() {
    const data = [];
    
    // 遍历中国所有省份
    const provinces = [
        '北京', '天津', '河北', '山西', '内蒙古',
        '辽宁', '吉林', '黑龙江', '上海', '江苏',
        '浙江', '安徽', '福建', '江西', '山东',
        '河南', '湖北', '湖南', '广东', '广西',
        '海南', '重庆', '四川', '贵州', '云南',
        '西藏', '陕西', '甘肃', '青海', '宁夏',
        '新疆', '香港', '澳门', '台湾'
    ];
    
    provinces.forEach(province => {
        // 直接使用省份简称，因为ECharts的中国地图数据使用的是简称
        data.push({
            name: province,
            value: visitedProvinces.has(province) ? 1 : 0
        });
    });
    
    chart.setOption({
        series: [
            {
                data: data
            }
        ]
    });
}

// 点击事件处理
chart.on('click', function(params) {
    let provinceName = params.name;
    console.log('点击的省份:', provinceName);
    
    // 切换省份状态
    if (visitedProvinces.has(provinceName)) {
        visitedProvinces.delete(provinceName);
    } else {
        visitedProvinces.add(provinceName);
    }
    
    // 更新地图和统计信息
    updateMapData();
    updateStats();
});

// 响应式处理
window.addEventListener('resize', function() {
    chart.resize();
});