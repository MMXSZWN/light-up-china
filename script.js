// 初始化地图
const chart = echarts.init(document.getElementById('china-map'));

// 存储已访问的省份
let visitedProvinces = new Set();

// 中国省份总数
const totalProvinces = 34;

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
            { value: 0, color: '#e6f7ff', label: '未去过' },
            { value: 1, color: '#52c41a', label: '已去过' }
        ],
        right: 10,
        top: 'center'
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

// 设置地图配置
chart.setOption(option);

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
    const provinceName = params.name;
    
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

// 初始化地图数据和统计信息
updateMapData();
updateStats();

// 响应式处理
window.addEventListener('resize', function() {
    chart.resize();
});