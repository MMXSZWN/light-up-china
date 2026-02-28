

# 点亮中国 (Light Up China)

一个交互式的中国地图可视化应用，用于追踪和展示您去过的中国省份。

## 功能特性

- **交互式地图**：使用 ECharts 绘制中国地图，直观展示已访问和未访问的省份
- **数据统计**：实时显示已访问省份数量和未访问省份数量
- **省份列表**：分别列出已访问和未访问的省份，方便查看
- **本地存储**：使用 localStorage 保存访问记录，数据持久化

## 项目结构

```
.
├── index.html    # 主页面文件
└── script.js     # 核心逻辑脚本
```

## 使用说明

1. 直接在浏览器中打开 `index.html` 文件
2. 点击地图上的省份标记该省份为"已访问"
3. 再次点击已访问的省份可取消标记
4. 统计数据和省份列表会自动更新

## 技术栈

- HTML5
- JavaScript (原生)
- ECharts (地图可视化)

## 依赖

- ECharts CDN: `https://cdn.jsdelivr.net/npm/echarts@5.4.3/dist/echarts.min.js`

## 浏览器支持

- Chrome
- Firefox
- Safari
- Edge

## 许可证

MIT License