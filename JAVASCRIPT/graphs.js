function grafico1() {
    am5.ready(function () {
        var root = am5.Root.new("chartdiv");

        root.setThemes([am5themes_Animated.new(root)]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "panX",
            wheelY: "zoomX",
            pinchZoomX: true
        }));

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineY.set("visible", false);

        var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });

        xRenderer.labels.template.setAll({
            rotation: 0,
            centerY: am5.p100,
            centerX: am5.p50,
            paddingTop: 10
        });

        xRenderer.grid.template.setAll({
            location: 1
        });

        var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0.3,
            categoryField: "country",
            renderer: xRenderer,
            tooltip: am5.Tooltip.new(root, {})
        }));

        var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
            strictMinMax: true,
            maxPrecision: 0.3,
            min: 1.4,
            max: 2.6,
            numberFormat: "#.0'%'",
            renderer: am5xy.AxisRendererY.new(root, {
                strokeOpacity: 0.1
            }),
        }));

        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            name: "Series 1",
            xAxis: xAxis,
            yAxis: yAxis,
            valueYField: "value",
            sequencedInterpolation: true,
            categoryXField: "country",
            tooltip: am5.Tooltip.new(root, {
                labelText: "{valueY}"
            })
        }));

        series.columns.template.setAll({ cornerRadiusTL: 5, cornerRadiusTR: 5, strokeOpacity: 0 });
        series.columns.template.adapters.add("fill", function (fill, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            return chart.get("colors").getIndex(series.columns.indexOf(target));
        });

        var data = [{
            country: "L",
            value: 1.55
        }, {
            country: "M",
            value: 2.0
        }, {
            country: "X",
            value: 1.95
        }, {
            country: "J",
            value: 1.95
        }, {
            country: "V",
            value: 1.85
        }, {
            country: "S",
            value: 2.1
        }, {
            country: "D",
            value: 1.98
        }];

        xAxis.data.setAll(data);
        series.data.setAll(data);

        series.appear(1000);
        chart.appear(1000, 100);

    });
}

function grafica2() {
    am5.ready(function () {
        var root = am5.Root.new("chartdiv2");
        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var data = [
            {
                name: "Noche",
                steps: 23561,
                pictureSettings: {
                    src: '/assets/svg/sun.svg'
                }
            },
            {
                name: "Tarde",
                steps: 36465,
                pictureSettings: {
                    src: '/assets/svg/cloud-sun.svg'
                }
            },
            {
                name: "Mañana",
                steps: 36465,
                pictureSettings: {
                    src: '/assets/svg/moon.svg'
                }
            }
        ];

        var chart = root.container.children.push(
            am5xy.XYChart.new(root, {
                panX: false,
                panY: false,
                wheelX: "none",
                wheelY: "none",
                paddingLeft: 50,
                paddingRight: 40
            })
        );

        var yRenderer = am5xy.AxisRendererY.new(root, {});
        yRenderer.grid.template.set("visible", false);

        var yAxis = chart.yAxes.push(
            am5xy.CategoryAxis.new(root, {
                categoryField: "name",
                renderer: yRenderer,
                paddingRight: 40
            })
        );

        var xRenderer = am5xy.AxisRendererX.new(root, {});
        xRenderer.grid.template.set("strokeDasharray", [3]);

        var xAxis = chart.xAxes.push(
            am5xy.ValueAxis.new(root, {
                min: 0,
                renderer: xRenderer,
                visible: false
            })
        );

        var series = chart.series.push(
            am5xy.ColumnSeries.new(root, {
                name: "Income",
                xAxis: xAxis,
                yAxis: yAxis,
                valueXField: "steps",
                categoryYField: "name",
                sequencedInterpolation: true,
                calculateAggregates: true,
                maskBullets: false,
                tooltip: am5.Tooltip.new(root, {
                    dy: -30,
                    pointerOrientation: "vertical",
                    labelText: "{valueX}"
                })
            })
        );

        series.columns.template.setAll({
            strokeOpacity: 0,
            cornerRadiusBR: 10,
            cornerRadiusTR: 10,
            cornerRadiusBL: 10,
            cornerRadiusTL: 10,
            maxHeight: 25,
            fillOpacity: 0.8
        });

        var currentlyHovered;

        series.columns.template.events.on("pointerover", function (e) {
            handleHover(e.target.dataItem);
        });

        series.columns.template.events.on("pointerout", function (e) {
            handleOut();
        });

        function handleHover(dataItem) {
            if (dataItem && currentlyHovered != dataItem) {
                handleOut();
                currentlyHovered = dataItem;
                var bullet = dataItem.bullets[0];
                bullet.animate({
                    key: "locationX",
                    to: 1,
                    duration: 600,
                    easing: am5.ease.out(am5.ease.cubic)
                });
            }
        }

        function handleOut() {
            if (currentlyHovered) {
                var bullet = currentlyHovered.bullets[0];
                bullet.animate({
                    key: "locationX",
                    to: 0,
                    duration: 600,
                    easing: am5.ease.out(am5.ease.cubic)
                });
            }
        }


        var circleTemplate = am5.Template.new({});

        series.bullets.push(function (root, series, dataItem) {
            var bulletContainer = am5.Container.new(root, {});
            var circle = bulletContainer.children.push(
                am5.Circle.new(
                    root,
                    {
                        radius: 25
                    },
                    circleTemplate
                )
            );

            var maskCircle = bulletContainer.children.push(
                am5.Circle.new(root, { radius: 27 })
            );

            var imageContainer = bulletContainer.children.push(
                am5.Container.new(root, {
                    mask: maskCircle
                })
            );

            var image = imageContainer.children.push(
                am5.Picture.new(root, {
                    templateField: "pictureSettings",
                    centerX: am5.p50,
                    centerY: am5.p50,
                    width: 60,
                    height: 60
                })
            );

            return am5.Bullet.new(root, {
                locationX: 0,
                sprite: bulletContainer
            });
        });

        series.set("heatRules", [
            {
                dataField: "valueX",
                min: am5.color(0x5b6f8e),
                max: am5.color(0xd39e42),
                target: series.columns.template,
                key: "fill"
            },
            {
                dataField: "valueX",
                min: am5.color(0x5b6f8e),
                max: am5.color(0xd39e42),
                target: circleTemplate,
                key: "fill"
            }
        ]);

        series.data.setAll(data);
        yAxis.data.setAll(data);

        var cursor = chart.set("cursor", am5xy.XYCursor.new(root, {}));
        cursor.lineX.set("visible", false);
        cursor.lineY.set("visible", false);

        cursor.events.on("cursormoved", function () {
            var dataItem = series.get("tooltip").dataItem;
            if (dataItem) {
                handleHover(dataItem)
            }
            else {
                handleOut();
            }
        })

        series.appear();
        chart.appear(1000, 100);

    });
}

function grafica3() {
    am5.ready(function () {

        var allData = {
            "2002": {
                "Moda": 35.7,
                "Belleza": 24.0,
                "Familia": 15.2,
                "Viajes": 9.5,
                "Mascotas": 7.9,
                "Otros": 5.2
            },
        };

        var categoryColors = {
            "Moda": "#FFD700",
            "Belleza": "#FFA500",
            "Familia": "#FF00FF",
            "Viajes": "#6699CC",
            "Mascotas": "#FFCC33",
            "Otros": "#FFCCCB"
        };

        var root = am5.Root.new("chartdiv3");

        root.numberFormatter.setAll({
            numberFormat: "#a",
            bigNumberPrefixes: [
                { number: 1e6, suffix: "M" },
                { number: 1e9, suffix: "B" }
            ],
            smallNumberPrefixes: []
        });

        var stepDuration = 0;

        root.setThemes([am5themes_Animated.new(root)]);

        var chart = root.container.children.push(am5xy.XYChart.new(root, {
            panX: true,
            panY: true,
            wheelX: "none",
            wheelY: "none"
        }));

        chart.zoomOutButton.set("forceHidden", true);

        var yRenderer = am5xy.AxisRendererY.new(root, {
            minGridDistance: 20,
            inversed: true
        });
        yRenderer.grid.template.set("visible", false);

        var yAxis = chart.yAxes.push(am5xy.CategoryAxis.new(root, {
            maxDeviation: 0,
            categoryField: "network",
            renderer: yRenderer
        }));

        var xAxis = chart.xAxes.push(am5xy.ValueAxis.new(root, {
            maxDeviation: 0,
            min: 0,
            max: 40,
            strictMinMax: true,
            extraMax: 0.1,
            renderer: am5xy.AxisRendererX.new(root, {})
        }));

        xAxis.set("interpolationDuration", stepDuration / 10);
        xAxis.set("interpolationEasing", am5.ease.linear);

        var series = chart.series.push(am5xy.ColumnSeries.new(root, {
            xAxis: xAxis,
            yAxis: yAxis,
            valueXField: "value",
            categoryYField: "network"
        }));

        series.columns.template.set("strokeOpacity", 1);
        series.columns.template.set("strokeWidth", 2);

        series.columns.template.adapters.add("fill", function (fill, target) {
            var category = target.dataItem.get("categoryY");
            return categoryColors[category];
        });

        series.columns.template.adapters.add("stroke", function (stroke, target) {
            var category = target.dataItem.get("categoryY");
            return categoryColors[category];
        });

        series.bullets.push(function () {
            return am5.Bullet.new(root, {
                locationX: 1,
                sprite: am5.Label.new(root, {
                    text: "{valueXWorking.formatNumber('#.# a')}",
                    fill: root.interfaceColors.get("alternativeText"),
                    centerX: am5.p100,
                    centerY: am5.p50,
                    populateText: true
                })
            });
        });

        var label = chart.plotContainer.children.push(am5.Label.new(root, {
            fontSize: "8em",
            opacity: 0.2,
            x: am5.p100,
            y: am5.p100,
            centerY: am5.p100,
            centerX: am5.p100
        }));

        function setInitialData() {
            var d = allData[2002];

            for (var n in d) {
                series.data.push({ network: n, value: d[n] });
                yAxis.data.push({ network: n });
            }
        }

        setInitialData();

    });
}

function grafica4() {
    am5.ready(function () {


        var root = am5.Root.new("chartdiv4");

        root.setThemes([
            am5themes_Animated.new(root)
        ]);

        var chart = root.container.children.push(am5percent.PieChart.new(root, {
            layout: root.verticalLayout
        }));

        var series = chart.series.push(am5percent.PieSeries.new(root, {
            valueField: "value",
            categoryField: "category"
        }));

        series.data.setAll([
            { value: 13.5, category: "Hombres" },
            { value: 86.5, category: "Mujeres" },
        ]);



        var legend = chart.children.push(am5.Legend.new(root, {
            centerX: am5.percent(50),
            x: am5.percent(50),
            marginTop: 15,
            marginBottom: 15
        }));

        legend.data.setAll(series.dataItems);

        series.appear(1000, 100);

    });
}